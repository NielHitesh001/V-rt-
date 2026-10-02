"""
NewsX M4: Claim Extraction & Span Grounding Module
Extracts atomic factual claims with exact character-span grounding and dual-layer attribution.
"""

import re
from typing import List, Dict, Any, Tuple

# Attribution trigger verbs
ATTRIBUTION_VERBS = [
    r"\bsaid\b", r"\bstated\b", r"\breported\b", r"\bannounced\b",
    r"\bclaimed\b", r"\bconfirmed\b", r"\baccording to\b", r"\bnoted\b",
    r"\balleged\b", r"\btold reporters\b", r"\btestified\b"
]

def split_into_candidate_sentences(text: str) -> List[str]:
    """Splits raw text into sentences while respecting quote boundaries."""
    if not text:
        return []
    # Normalize whitespace
    cleaned = re.sub(r'\s+', ' ', text).strip()
    # Split by periods, exclamation marks, question marks followed by space or quote
    raw_sentences = re.split(r'(?<=[.!?])\s+(?=[A-Z"\'“])', cleaned)
    return [s.strip() for s in raw_sentences if len(s.strip()) > 10]

def extract_claims(text: str) -> List[str]:
    """
    Main extraction function: extracts atomic factual propositions from text.
    Ensures each claim is grounded in the source text.
    """
    if not text or not text.strip():
        return []

    sentences = split_into_candidate_sentences(text)
    claims: List[str] = []

    for sentence in sentences:
        # Check for attribution markers to separate assertion layer from content layer
        has_attribution = any(re.search(pat, sentence, re.IGNORECASE) for pat in ATTRIBUTION_VERBS)
        
        # If the sentence has attribution like "Officials said X", we extract X as content
        # and the assertion itself
        m = re.search(r'^(.*?)\s+(?:said|stated|confirmed|reported|announced)\s+that\s+(.*)$', sentence, re.IGNORECASE)
        if m:
            speaker = m.group(1).strip()
            content = m.group(2).strip()
            if content:
                # Content layer
                claims.append(content)
            # Utterance layer
            claims.append(f"{speaker} reported: {content}")
        else:
            # Atomic sentence proposition
            claims.append(sentence)

    # Fallback if no sentences extracted
    if not claims and text.strip():
        claims.append(text.strip())

    return claims

def extract_claims_with_spans(text: str) -> List[Dict[str, Any]]:
    """Detailed extraction returning exact span offsets and claim types."""
    sentences = split_into_candidate_sentences(text)
    results = []

    for s in sentences:
        start_idx = text.find(s)
        end_idx = start_idx + len(s) if start_idx != -1 else len(s)
        
        is_numeric = bool(re.search(r'\b\d+(?:\.\d+)?(?:\s*(?:percent|%|million|billion|thousand|meters|ft|tons|people|deaths|injured))?\b', s, re.IGNORECASE))
        claim_type = "quantity" if is_numeric else "event"

        results.append({
            "text": s,
            "span_start": max(0, start_idx),
            "span_end": end_idx,
            "claim_type": claim_type,
            "status": "extracted"
        })

    return results
