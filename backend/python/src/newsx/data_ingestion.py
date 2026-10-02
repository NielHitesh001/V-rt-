"""
NewsX Data Ingestion Module (NewsAggregator)
Fetches live articles from BBC, NYT World, and The Guardian RSS feeds,
normalizes and stores them into the SQLite database.
"""

import os
import re
import sqlite3
import hashlib
import xml.etree.ElementTree as ET
from datetime import datetime, timezone
from typing import List, Dict, Any, Optional

try:
    import requests
except ImportError:
    import urllib.request
    import urllib.error

    class SimpleResponse:
        def __init__(self, content: bytes, status_code: int):
            self.content = content
            self.text = content.decode('utf-8', errors='replace')
            self.status_code = status_code

    class RequestsShim:
        @staticmethod
        def get(url: str, timeout: int = 10, headers: Optional[Dict[str, str]] = None) -> SimpleResponse:
            hdrs = headers or {}
            req = urllib.request.Request(url, headers=hdrs)
            with urllib.request.urlopen(req, timeout=timeout) as resp:
                return SimpleResponse(resp.read(), resp.status)

    requests = RequestsShim()

DEFAULT_DB_PATH = os.path.abspath(
    os.path.join(os.path.dirname(__file__), "../../../shared/db/truenews.db")
)

FEED_CONFIGS = [
    {
        "source": "bbc",
        "name": "BBC News (World)",
        "url": "https://feeds.bbci.co.uk/news/world/rss.xml",
        "fallback_url": "http://feeds.bbc.co.uk/news/rss.xml"
    },
    {
        "source": "nyt",
        "name": "The New York Times (World)",
        "url": "https://rss.nytimes.com/services/xml/rss/nyt/World.xml"
    },
    {
        "source": "guardian",
        "name": "The Guardian (World)",
        "url": "https://www.theguardian.com/world/rss"
    }
]

def clean_html(raw_html: str) -> str:
    """Strips HTML tags and normalizes whitespace."""
    if not raw_html:
        return ""
    clean = re.sub(r'<[^>]+>', ' ', raw_html)
    clean = re.sub(r'\s+', ' ', clean).strip()
    return clean

class NewsAggregator:
    def __init__(self, db_path: Optional[str] = None):
        self.db_path = db_path or os.environ.get("DATABASE_URL", "").replace("sqlite:///", "") or DEFAULT_DB_PATH
        os.makedirs(os.path.dirname(self.db_path), exist_ok=True)
        self.init_database()

    def get_connection(self) -> sqlite3.Connection:
        conn = sqlite3.connect(self.db_path)
        conn.row_factory = sqlite3.Row
        return conn

    def init_database(self) -> None:
        """Initializes tables for articles, claims, and events."""
        with self.get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("""
                CREATE TABLE IF NOT EXISTS articles (
                    article_id TEXT PRIMARY KEY,
                    source TEXT NOT NULL,
                    title TEXT NOT NULL,
                    text TEXT NOT NULL,
                    fetched_at TEXT NOT NULL
                )
            """)
            cursor.execute("""
                CREATE TABLE IF NOT EXISTS claims (
                    claim_id TEXT PRIMARY KEY,
                    article_id TEXT NOT NULL,
                    claim_text TEXT NOT NULL,
                    tier INTEGER NOT NULL,
                    corroborated BOOLEAN NOT NULL,
                    neutralized_text TEXT NOT NULL,
                    original_text TEXT NOT NULL,
                    sources_json TEXT NOT NULL,
                    FOREIGN KEY (article_id) REFERENCES articles(article_id)
                )
            """)
            cursor.execute("""
                CREATE TABLE IF NOT EXISTS events (
                    event_id TEXT PRIMARY KEY,
                    created_at TEXT NOT NULL,
                    total_claims INTEGER NOT NULL,
                    status TEXT NOT NULL
                )
            """)
            conn.commit()

    def fetch_feed(self, feed_cfg: Dict[str, Any], max_items: int = 15) -> List[Dict[str, Any]]:
        """Fetches and parses a single RSS feed."""
        url = feed_cfg["url"]
        headers = {"User-Agent": "TrueNews/1.0"}
        articles = []

        try:
            resp = requests.get(url, timeout=10, headers=headers)
            content = resp.content
        except Exception:
            fallback = feed_cfg.get("fallback_url")
            if fallback:
                try:
                    resp = requests.get(fallback, timeout=10, headers=headers)
                    content = resp.content
                except Exception as e:
                    print(f"[{feed_cfg['source']}] Failed to fetch feed: {e}")
                    return []
            else:
                return []

        try:
            root = ET.fromstring(content)
            items = root.findall(".//item")
            for item in items[:max_items]:
                title = clean_html(item.findtext("title") or "")
                description = clean_html(item.findtext("description") or "")
                link = item.findtext("link") or ""

                if not title:
                    continue

                full_text = f"{title}. {description}".strip()
                article_hash = hashlib.sha256(f"{feed_cfg['source']}:{link or title}".encode("utf-8")).hexdigest()[:12]
                article_id = f"art-{feed_cfg['source']}-{article_hash}"
                fetched_at = datetime.now(timezone.utc).isoformat()

                article_record = {
                    "article_id": article_id,
                    "source": feed_cfg["source"],
                    "title": title,
                    "text": full_text,
                    "fetched_at": fetched_at
                }
                articles.append(article_record)
        except Exception as e:
            print(f"[{feed_cfg['source']}] Error parsing XML: {e}")

        return articles

    def store_articles(self, articles: List[Dict[str, Any]]) -> int:
        """Stores new articles into SQLite, skipping duplicates."""
        stored_count = 0
        with self.get_connection() as conn:
            cursor = conn.cursor()
            for art in articles:
                cursor.execute("""
                    INSERT OR IGNORE INTO articles (article_id, source, title, text, fetched_at)
                    VALUES (?, ?, ?, ?, ?)
                """, (
                    art["article_id"],
                    art["source"],
                    art["title"],
                    art["text"],
                    art["fetched_at"]
                ))
                if cursor.rowcount > 0:
                    stored_count += 1
            conn.commit()
        return stored_count

    def fetch_all_sources(self, max_per_source: int = 15) -> List[Dict[str, Any]]:
        """Fetches from all configured feeds and stores them into the database."""
        all_articles = []
        for feed in FEED_CONFIGS:
            arts = self.fetch_feed(feed, max_items=max_per_source)
            self.store_articles(arts)
            all_articles.extend(arts)
        return all_articles
