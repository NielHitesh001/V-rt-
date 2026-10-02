"""
Bridge module: Exposes Python M0-M9 functions as JSON-serializable APIs
Used by Node.js server via subprocess/IPC
"""
import json
import sys
import os
from typing import Dict, Any

# Ensure parent directory is in sys.path for direct script execution
current_dir = os.path.dirname(os.path.abspath(__file__))
python_root = os.path.abspath(os.path.join(current_dir, "..", ".."))
if python_root not in sys.path:
    sys.path.insert(0, python_root)

try:
    from .extractor import extract_claims
    from .neutralizer import neutralize_claim
    from .corroboration import cluster_and_corroborate
except (ImportError, ValueError):
    try:
        from src.newsx.extractor import extract_claims
        from src.newsx.neutralizer import neutralize_claim
        from src.newsx.corroboration import cluster_and_corroborate
    except ImportError:
        from newsx.extractor import extract_claims
        from newsx.neutralizer import neutralize_claim
        from newsx.corroboration import cluster_and_corroborate

def process_event(event_id: str, articles: list) -> Dict[str, Any]:
    """
    Main orchestration function called by Node.js API
    Input: event_id, list of articles (JSON)
    Output: Fully processed event brief (JSON)
    """
    claims = []
    for article in articles:
        article_text = article.get('text', '')
        source_id = article.get('source', article.get('source_id', 'unknown'))
        article_claims = extract_claims(article_text)
        for claim in article_claims:
            neutralized = neutralize_claim(claim)
            claims.append({
                "claim": claim,
                "neutral": neutralized,
                "source": source_id
            })
    
    # Cluster and assign confidence tiers
    event_brief = cluster_and_corroborate(event_id, claims)
    return event_brief.to_dict()

if __name__ == "__main__":
    try:
        # Read JSON from stdin (called by Node.js)
        raw_input = sys.stdin.read()
        if not raw_input.strip():
            print(json.dumps({"error": "Empty input received via stdin"}))
            sys.exit(0)
        input_data = json.loads(raw_input)
        result = process_event(input_data.get('event_id', 'event-default'), input_data.get('articles', []))
        print(json.dumps(result))  # Send result back to Node.js
    except Exception as e:
        print(json.dumps({"error": str(e)}), file=sys.stderr)
        sys.exit(1)
