"""
NewsX Pipeline Processor (news_processor.py)
Fetches live RSS articles from BBC, NYT, and The Guardian,
runs atomic extraction, neutralization, and corroboration,
and persists verified results into SQLite.
"""

import os
import sys
import json
import sqlite3
from datetime import datetime, timezone
from typing import List, Dict, Any

# Ensure import paths work regardless of execution directory
CURRENT_DIR = os.path.dirname(os.path.abspath(__file__))
SRC_DIR = os.path.abspath(os.path.join(CURRENT_DIR, ".."))
if SRC_DIR not in sys.path:
    sys.path.insert(0, SRC_DIR)

try:
    from .data_ingestion import NewsAggregator
    from .extractor import extract_claims
    from .neutralizer import neutralize_claim
    from .corroboration import cluster_and_corroborate
except ImportError:
    from newsx.data_ingestion import NewsAggregator
    from newsx.extractor import extract_claims
    from newsx.neutralizer import neutralize_claim
    from newsx.corroboration import cluster_and_corroborate

def process_live_news(max_per_source: int = 10, db_path: str = None) -> Dict[str, Any]:
    """
    Main workflow:
    1. Fetches real articles from configured RSS feeds.
    2. Extracts candidate claims.
    3. Neutralizes biased / loaded wording.
    4. Evaluates cross-source corroboration and assigns confidence tiers.
    5. Persists articles, claims, and event records to SQLite.
    """
    aggregator = NewsAggregator(db_path=db_path)
    print(f"[*] Fetching live RSS feeds from BBC, NYT World, and The Guardian (max {max_per_source}/source)...")
    articles = aggregator.fetch_all_sources(max_per_source=max_per_source)
    print(f"[+] Ingested {len(articles)} articles into SQLite ({aggregator.db_path}).")

    if not articles:
        print("[!] No articles fetched. Exiting.")
        return {"articles_count": 0, "claims_count": 0}

    # Extract claims per article
    raw_claims: List[Dict[str, Any]] = []
    article_claim_map = {}

    for art in articles:
        art_id = art["article_id"]
        source = art["source"]
        text = art["text"]
        claims = extract_claims(text)

        article_claim_map[art_id] = []
        for c_text in claims:
            neut_text = neutralize_claim(c_text)
            c_record = {
                "article_id": art_id,
                "source": source,
                "claim": c_text,
                "neutral": neut_text
            }
            raw_claims.append(c_record)
            article_claim_map[art_id].append(c_record)

    print(f"[+] Extracted and neutralized {len(raw_claims)} candidate claims across {len(articles)} articles.")

    # Run clustering & corroboration across the ingested batch
    batch_event_id = f"event-live-{datetime.now(timezone.utc).strftime('%Y%m%d-%H%M%S')}"
    event_brief = cluster_and_corroborate(batch_event_id, raw_claims).to_dict()

    # Store claims and event in SQLite
    conn = aggregator.get_connection()
    cursor = conn.cursor()

    claims_stored = 0
    for idx, fact in enumerate(event_brief.get("facts", [])):
        art_id = raw_claims[idx]["article_id"] if idx < len(raw_claims) else "art-unknown"
        claim_id = f"claim-{fact['claim_id']}"
        claim_text = fact["text"]
        tier = fact["tier"]
        corroborated = 1 if fact["corroborated"] else 0
        neutralized_text = fact["text"]
        original_text = fact["original_text"]
        sources_json = json.dumps(fact["sources"])

        cursor.execute("""
            INSERT OR REPLACE INTO claims (
                claim_id, article_id, claim_text, tier, corroborated,
                neutralized_text, original_text, sources_json
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        """, (
            claim_id,
            art_id,
            claim_text,
            tier,
            corroborated,
            neutralized_text,
            original_text,
            sources_json
        ))
        claims_stored += 1

    # Store event metadata
    cursor.execute("""
        INSERT OR REPLACE INTO events (event_id, created_at, total_claims, status)
        VALUES (?, ?, ?, ?)
    """, (
        batch_event_id,
        event_brief.get("generated_at", datetime.now(timezone.utc).isoformat()),
        len(event_brief.get("facts", [])),
        event_brief.get("status", "PROVISIONAL")
    ))

    conn.commit()
    conn.close()

    print(f"[+] Persisted {claims_stored} verified claims into SQLite database.")
    print(f"[+] Batch Event ID: {batch_event_id} (Status: {event_brief.get('status')})")
    print(f"[+] Tier Distribution: {json.dumps(event_brief.get('tier_distribution', {}))}")

    return {
        "event_id": batch_event_id,
        "articles_count": len(articles),
        "claims_count": claims_stored,
        "tier_distribution": event_brief.get("tier_distribution", {})
    }

if __name__ == "__main__":
    process_live_news()
