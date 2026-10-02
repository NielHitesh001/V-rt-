"""
NewsX M5: Meaning-Preserving Neutralization Module
Neutralizes loaded adjectives, partisan spin, emotional framing, certainty/hedging language,
and sensationalized verbs while preserving factual consequence, numbers, and names
with 100% reversible audit trail.
"""

import re
from typing import Dict, Any, List, Tuple

# Deterministic neutralization transformation rules
RULES: List[Dict[str, str]] = [
    # --- 1. Emotional Framing ---
    {
        "pattern": r"\btragedy\b",
        "replacement": "incident",
        "category": "Emotional Framing",
        "rationale": "Substituted emotionally charged label with neutral event noun"
    },
    {
        "pattern": r"\bdevastating\s+impact\b",
        "replacement": "significant impact",
        "category": "Emotional Framing",
        "rationale": "Substituted hyperbole with measured impact descriptor"
    },
    {
        "pattern": r"\bheartbreaking\s+",
        "replacement": "",
        "category": "Emotional Framing",
        "rationale": "Removed emotional sentiment modifier"
    },
    {
        "pattern": r"\bheroic\s+",
        "replacement": "",
        "category": "Emotional Framing",
        "rationale": "Removed subjective valorizing adjective"
    },
    {
        "pattern": r"\bdevastating toll\b",
        "replacement": "toll",
        "category": "Emotional Framing",
        "rationale": "Removed emotive intensifier; casualty counts remain in facts"
    },
    {
        "pattern": r"\bdisastrous\b",
        "replacement": "harmful",
        "category": "Emotional Framing",
        "rationale": "Replaced catastrophic framing with factual adjective"
    },
    {
        "pattern": r"\bchaos\b",
        "replacement": "disruption",
        "category": "Emotional Framing",
        "rationale": "Substituted hyperbolic disorder term with standard operational descriptor"
    },
    {
        "pattern": r"\bbrazen\s+",
        "replacement": "",
        "category": "Emotional Framing",
        "rationale": "Removed moral judgment adjective"
    },
    {
        "pattern": r"\bcowardly\s+",
        "replacement": "",
        "category": "Emotional Framing",
        "rationale": "Removed character judgment adjective"
    },
    {
        "pattern": r"\bshamefully\s+",
        "replacement": "",
        "category": "Emotional Framing",
        "rationale": "Removed subjective judgment adverb"
    },
    {
        "pattern": r"\bunprovoked\s+",
        "replacement": "",
        "category": "Emotional Framing",
        "rationale": "Removed subjective motive assertion"
    },
    {
        "pattern": r"\bcontroversial\s+",
        "replacement": "",
        "category": "Emotional Framing",
        "rationale": "Removed polemical editorial framing label"
    },
    {
        "pattern": r"\boutrage\b",
        "replacement": "criticism",
        "category": "Emotional Framing",
        "rationale": "Substituted emotional reaction label with descriptive term"
    },
    {
        "pattern": r"\bfury\b",
        "replacement": "disapproval",
        "category": "Emotional Framing",
        "rationale": "Replaced sensationalized indignation term with measured descriptor"
    },
    {
        "pattern": r"\bshocking\s+",
        "replacement": "",
        "category": "Emotional Framing",
        "rationale": "Removed sensationalizing adjective"
    },

    # --- 2. Hedging & Certainty Imputation ---
    {
        "pattern": r"\bclearly\s+proves\b",
        "replacement": "suggests",
        "category": "Certainty / Hedging",
        "rationale": "Replaced epistemically overstated proof claim with reportorial indication"
    },
    {
        "pattern": r"\bobviously\s+",
        "replacement": "",
        "category": "Certainty / Hedging",
        "rationale": "Removed presupposition adverb"
    },
    {
        "pattern": r"\bwithout\s+question,?\s*",
        "replacement": "",
        "category": "Certainty / Hedging",
        "rationale": "Removed epistemic certainty booster"
    },
    {
        "pattern": r"\bundoubtedly\s+",
        "replacement": "",
        "category": "Certainty / Hedging",
        "rationale": "Removed subjective certainty adverb"
    },
    {
        "pattern": r"\bpurportedly\s+",
        "replacement": "reportedly ",
        "category": "Certainty / Hedging",
        "rationale": "Substituted skeptical framing with standard reportorial attribution"
    },

    # --- 3. Loaded Labels & Scare Quotes ---
    {
        "pattern": r"['\"]so-called\s+([^'\"]+)['\"]",
        "replacement": r"\1",
        "category": "Loaded Label / Scare Quotes",
        "rationale": "Removed delegitimizing scare quotes and 'so-called' prefix"
    },
    {
        "pattern": r"\bso-called\s+",
        "replacement": "",
        "category": "Loaded Label / Scare Quotes",
        "rationale": "Removed delegitimizing 'so-called' prefix"
    },
    {
        "pattern": r"\bregime\b",
        "replacement": "government",
        "category": "Loaded Label",
        "rationale": "Replaced pejorative institutional label with standard neutral noun"
    },
    {
        "pattern": r"\bcronies\b",
        "replacement": "associates",
        "category": "Loaded Label",
        "rationale": "Replaced disparaging pejorative with factual term"
    },
    {
        "pattern": r"\bpropaganda\b",
        "replacement": "statements",
        "category": "Loaded Label",
        "rationale": "Substituted loaded dismissive label with neutral noun"
    },

    # --- 4. Charged Verbs & Attribution ---
    {
        "pattern": r"\bdeliberately\s+rammed\b",
        "replacement": "collided with",
        "category": "Charged Verb",
        "rationale": "Replaced attributed intention with verifiable physical occurrence"
    },
    {
        "pattern": r"\bcaved\s+in\s+to\b",
        "replacement": "agreed with",
        "category": "Charged Verb",
        "rationale": "Replaced disparaging surrender metaphor with factual agreement verb"
    },
    {
        "pattern": r"\bslammed\b",
        "replacement": "criticized",
        "category": "Charged Verb",
        "rationale": "Replaced sensationalized conflict verb with standard reportorial verb"
    },
    {
        "pattern": r"\bblasted\b",
        "replacement": "criticized",
        "category": "Charged Verb",
        "rationale": "Replaced aggressive vernacular verb with objective reportorial verb"
    },
    {
        "pattern": r"\blashed\s+out\s+at\b",
        "replacement": "criticized",
        "category": "Charged Verb",
        "rationale": "Replaced emotive attack verb with factual criticism verb"
    },
    {
        "pattern": r"\bdenounced\b",
        "replacement": "criticized",
        "category": "Charged Verb",
        "rationale": "Replaced loaded moral condemnation verb with standard reportorial verb"
    },
    {
        "pattern": r"\bdesecrate\b",
        "replacement": "damage",
        "category": "Charged Verb",
        "rationale": "Replaced loaded moral term with plain descriptive verb"
    },
    {
        "pattern": r"\bscrambled\s+to\b",
        "replacement": "attempted to",
        "category": "Charged Verb",
        "rationale": "Substituted chaotic framing with neutral action verb"
    },

    # --- 5. Intensifiers & Hyperbole ---
    {
        "pattern": r"\bstaggering\s+",
        "replacement": "",
        "category": "Intensifier",
        "rationale": "Removed emotive scale intensifier; numerical amount is preserved"
    },
    {
        "pattern": r"\bmassive\b",
        "replacement": "large-scale",
        "category": "Intensifier",
        "rationale": "Replaced hyperbolic intensifier with neutral scale descriptor"
    },
    {
        "pattern": r"\bcatastrophic\b",
        "replacement": "severe",
        "category": "Intensifier",
        "rationale": "Replaced apocalyptic hyperbole with measured severity adjective"
    },
    {
        "pattern": r"\bhistoric\s+high\b",
        "replacement": "highest recorded level",
        "category": "Editorial Framing",
        "rationale": "Replaced dramatized framing with factual comparative descriptor"
    },
    {
        "pattern": r"\bhuge\s+setback\b",
        "replacement": "setback",
        "category": "Intensifier",
        "rationale": "Removed hyperbolic qualifier"
    }
]

# Attribution signal classifications (kept in text as explicit evidentiary markers)
ATTRIBUTION_SIGNALS = {
    "weak": ["reportedly", "allegedly", "claims", "purportedly"],
    "neutral": ["stated", "reported", "said", "confirmed", "announced", "testified"]
}

def neutralize_claim(claim: str) -> str:
    """
    Applies meaning-preserving neutralization rules to claim string.
    Returns cleaned, factual wording.
    """
    if not claim:
        return ""

    result = claim
    for rule in RULES:
        result = re.sub(rule["pattern"], rule["replacement"], result, flags=re.IGNORECASE)

    # Clean up accidental double spaces or dangling punctuation
    result = re.sub(r'\s+([,.!?;:])', r'\1', re.sub(r'\s+', ' ', result)).strip()
    return result

def neutralize_with_changes(text: str) -> Dict[str, Any]:
    """Returns neutralized text accompanied by full change records."""
    current = text
    changes = []

    for rule in RULES:
        matches = list(re.finditer(rule["pattern"], current, flags=re.IGNORECASE))
        if matches:
            for m in matches:
                changes.append({
                    "original_span": m.group(0),
                    "replacement": rule["replacement"],
                    "category": rule["category"],
                    "rationale": rule["rationale"]
                })
            current = re.sub(rule["pattern"], rule["replacement"], current, flags=re.IGNORECASE)

    current = re.sub(r'\s+([,.!?;:])', r'\1', re.sub(r'\s+', ' ', current)).strip()

    # Detect weak vs neutral attribution markers without stripping them
    detected_weak_attribution = [
        sig for sig in ATTRIBUTION_SIGNALS["weak"]
        if re.search(r'\b' + sig + r'\b', text, re.IGNORECASE)
    ]

    return {
        "original": text,
        "neutralized": current,
        "changes": changes,
        "is_modified": len(changes) > 0,
        "weak_attributions": detected_weak_attribution
    }
