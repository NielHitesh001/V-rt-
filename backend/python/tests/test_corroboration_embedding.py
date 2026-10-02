import unittest
import os
import sys

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from src.newsx.corroboration import (
    are_claims_matching_semantic,
    calculate_cosine_similarity
)

class TestCorroborationEmbedding(unittest.TestCase):
    def test_ten_paraphrase_pairs(self):
        # 10 realistic paraphrase pairs across news domains
        paraphrase_pairs = [
            (
                "The vessel collided with the bridge at 1:28 AM.",
                "A cargo ship struck the bridge early morning."
            ),
            (
                "Co-pilot stabbed the captain during the flight.",
                "Flydubai pilot describes cockpit attack by co-pilot in mid-air."
            ),
            (
                "The aircraft made an emergency landing in Karachi.",
                "The airplane completed an unscheduled landing in Karachi."
            ),
            (
                "French police fired tear gas during student walkouts.",
                "Riot police clash with students as education protests rage in France."
            ),
            (
                "Coast Guard stopped vessels transporting fuel to Cuba.",
                "US authorities seized tankers delivering petroleum to Havana."
            ),
            (
                "Russian strikes damaged electrical grids in Kyiv.",
                "Bombardment struck power transmission infrastructure in Kyiv."
            ),
            (
                "Pedro Sánchez lost a parliamentary housing decree vote.",
                "Spanish lawmakers rejected the government rental cap proposal."
            ),
            (
                "Seismological agency recorded a magnitude 6.2 earthquake in Chile.",
                "Tremors from a 6.2 magnitude quake shook northern Chile."
            ),
            (
                "OpenAI dismissed two researchers for leaking model evaluations.",
                "Two research staff were terminated for sharing proprietary AI tests."
            ),
            (
                "European Central Bank cut its deposit facility rate by twenty-five basis points.",
                "ECB reduced interest rates by a quarter percentage point."
            )
        ]

        print("\n--- Paraphrase Pair Similarity Verification (Threshold = 0.75) ---")
        for idx, (p1, p2) in enumerate(paraphrase_pairs, 1):
            is_match = are_claims_matching_semantic(p1, p2, threshold=0.75)
            sim = calculate_cosine_similarity(p1, p2)
            print(f"[{idx}/10] Sim = {sim:.3f} | Match = {is_match}")
            print(f"  A: {p1}")
            print(f"  B: {p2}")
            self.assertTrue(
                is_match,
                f"Pair {idx} failed semantic matching: sim={sim:.3f}, expected >= 0.75\n{p1}\n{p2}"
            )

    def test_distractor_pairs_stay_uncorroborated(self):
        # Distractors must NOT match (ensures FP rate stays at 0.0%)
        distractors = [
            (
                "The vessel collided with the bridge at 1:28 AM.",
                "Investigators boarded the vessel at 8:00 AM."
            ),
            (
                "Over thirty arrests were reported across Paris.",
                "Pedro Sánchez lost a parliamentary housing decree vote."
            ),
            (
                "Four workers died in the incident.",
                "Six workers died in the incident."
            )
        ]
        for p1, p2 in distractors:
            self.assertFalse(
                are_claims_matching_semantic(p1, p2, threshold=0.75),
                f"Distractor falsely matched:\n{p1}\n{p2}"
            )

if __name__ == "__main__":
    unittest.main()
