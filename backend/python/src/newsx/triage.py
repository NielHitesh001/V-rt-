"""
NewsX M3: Content Triage Routing Module
Classifies ingested articles into reporting, opinion, analysis, or sponsored content,
and routes individual passages into the core fact base or excluded bins.
"""

from typing import Dict, Any, List

ARTICLE_CATEGORIES = ["reporting", "opinion", "analysis", "sponsored"]

OPINION_MARKERS = [
    "in my opinion", "i believe", "we argue", "editorial board",
    "columnist", "perspective", "commentary", "op-ed"
]

SPONSORED_MARKERS = [
    "sponsored content", "paid advertisement", "promoted story", "partner content"
]

def triage_article(title: str, text: str, section: str = "") -> Dict[str, Any]:
    """Classifies an article and determines fact-base admissibility."""
    text_lower = (title + " " + text + " " + section).lower()
    
    if any(m in text_lower for m in SPONSORED_MARKERS):
        category = "sponsored"
        admissible = False
    elif any(m in text_lower for m in OPINION_MARKERS) or "opinion" in section.lower():
        category = "opinion"
        admissible = False
    elif "analysis" in section.lower() or "deep dive" in text_lower:
        category = "analysis"
        admissible = True
    else:
        category = "reporting"
        admissible = True

    return {
        "category": category,
        "admissible_to_fact_base": admissible,
        "confidence": 0.98 if not admissible else 1.0
    }

def route_passage(passage_text: str, article_category: str) -> bool:
    """Returns True if the passage feeds the factual core ledger."""
    if article_category in ["opinion", "sponsored"]:
        return False
    # Filter out rhetorical questions or pure commentary sentences
    if passage_text.strip().endswith("?") and not any(char.isdigit() for char in passage_text):
        return False
    return True
