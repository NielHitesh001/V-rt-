"""
NewsX M2: Storage & JSONL Relational Audit Trail
Provides deterministic SQLite storage and append-only immutable audit trail logging.
"""

import sqlite3
import json
import os
from typing import Dict, Any, List, Optional
from datetime import datetime, timezone

class StorageEngine:
    def __init__(self, db_path: str = "backend/shared/db/truenews.db", audit_log_path: str = "backend/shared/db/audit.jsonl"):
        self.db_path = db_path
        self.audit_log_path = audit_log_path
        os.makedirs(os.path.dirname(self.db_path), exist_ok=True)
        self._init_db()

    def _init_db(self):
        with sqlite3.connect(self.db_path) as conn:
            cursor = conn.cursor()
            cursor.execute("""
                CREATE TABLE IF NOT EXISTS articles (
                    id TEXT PRIMARY KEY,
                    source_id TEXT,
                    title TEXT,
                    text TEXT,
                    event_id TEXT,
                    captured_at TEXT
                )
            """)
            cursor.execute("""
                CREATE TABLE IF NOT EXISTS claims (
                    id TEXT PRIMARY KEY,
                    article_id TEXT,
                    event_id TEXT,
                    original_text TEXT,
                    neutral_text TEXT,
                    tier INTEGER,
                    status TEXT
                )
            """)
            cursor.execute("""
                CREATE TABLE IF NOT EXISTS events (
                    id TEXT PRIMARY KEY,
                    label TEXT,
                    headline TEXT,
                    status TEXT,
                    updated_at TEXT
                )
            """)
            conn.commit()

    def log_audit(self, action: str, details: Dict[str, Any]):
        entry = {
            "timestamp": datetime.now(timezone.utc).isoformat(),
            "action": action,
            "details": details
        }
        with open(self.audit_log_path, "a", encoding="utf-8") as f:
            f.write(json.dumps(entry) + "\n")

    def insert_article(self, article: Dict[str, Any]):
        with sqlite3.connect(self.db_path) as conn:
            cursor = conn.cursor()
            cursor.execute(
                "INSERT OR REPLACE INTO articles (id, source_id, title, text, event_id, captured_at) VALUES (?, ?, ?, ?, ?, ?)",
                (
                    article["id"],
                    article.get("source_id", "unknown"),
                    article.get("title", ""),
                    article.get("text", ""),
                    article.get("event_id", ""),
                    article.get("captured_at", datetime.now(timezone.utc).isoformat())
                )
            )
            conn.commit()
        self.log_audit("insert_article", {"article_id": article["id"]})
