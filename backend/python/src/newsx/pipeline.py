"""
NewsX End-to-End Orchestration Pipeline
Coordinates M1 Source Verification -> M2 Storage -> M3 Triage -> M4 Claim Extraction
-> M5 Neutralization -> M6 Corroboration & Tier Assignment -> M7 Brief Production.
"""

from typing import Dict, Any, List
from .triage import triage_article, route_passage
from .extractor import extract_claims_with_spans
from .neutralizer import neutralize_with_changes
from .corroboration import cluster_and_corroborate, EventBrief

def run_pipeline_for_event(event_id: str, articles: List[Dict[str, Any]]) -> Dict[str, Any]:
    """Runs the full pipeline for an event and returns an EventBrief dict."""
    extracted_claims = []

    for art in articles:
        # Step 1: Content Triage
        triage = triage_article(art.get("title", ""), art.get("text", ""))
        if not triage["admissible_to_fact_base"]:
            continue

        # Step 2: Extractive Claim Extraction
        raw_claims = extract_claims_with_spans(art.get("text", ""))
        for rc in raw_claims:
            if not route_passage(rc["text"], triage["category"]):
                continue

            # Step 3: Meaning-Preserving Neutralization
            neut = neutralize_with_changes(rc["text"])
            extracted_claims.append({
                "claim": rc["text"],
                "neutral": neut["neutralized"],
                "source": art.get("source_id", art.get("source", "unknown")),
                "changes": neut["changes"],
                "claim_type": rc["claim_type"]
            })

    # Step 4: Clustering & Corroboration
    brief = cluster_and_corroborate(event_id, extracted_claims)
    return brief.to_dict()
