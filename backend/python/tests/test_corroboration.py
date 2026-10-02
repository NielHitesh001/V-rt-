import unittest
import os
import sys

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from src.newsx.corroboration import cluster_and_corroborate

class TestCorroboration(unittest.TestCase):
    def test_single_source_tier3(self):
        claims = [
            {"claim": "Ship lost power prior to collision.", "neutral": "Ship lost power prior to collision.", "source": "reuters"}
        ]
        brief = cluster_and_corroborate("event-test-1", claims).to_dict()
        self.assertEqual(len(brief["facts"]), 1)
        self.assertEqual(brief["facts"][0]["tier"], 3)
        self.assertFalse(brief["facts"][0]["corroborated"])

    def test_multi_source_tier2(self):
        claims = [
            {"claim": "Ship lost power prior to collision.", "neutral": "Ship lost power prior to collision.", "source": "reuters"},
            {"claim": "Vessel experienced blackout before impact.", "neutral": "Vessel experienced blackout before impact.", "source": "ap-wire"}
        ]
        brief = cluster_and_corroborate("event-test-2", claims).to_dict()
        self.assertEqual(brief["facts"][0]["tier"], 2)
        self.assertTrue(brief["facts"][0]["corroborated"])

    def test_primary_source_tier1(self):
        claims = [
            {"claim": "NTSB recovered the voyage data recorder.", "neutral": "NTSB recovered the voyage data recorder.", "source": "ntsb-gov"}
        ]
        brief = cluster_and_corroborate("event-test-3", claims).to_dict()
        self.assertEqual(brief["facts"][0]["tier"], 1)
        self.assertTrue(brief["has_primary_grounding"])

    def test_two_different_claims_two_sources_stay_uncorroborated(self):
        claims = [
            {"claim": "The vessel collided with the bridge at 1:28 AM.", "neutral": "The vessel collided with the bridge at 1:28 AM.", "source": "reuters"},
            {"claim": "Investigators boarded the vessel at 8:00 AM.", "neutral": "Investigators boarded the vessel at 8:00 AM.", "source": "ntsb-gov"}
        ]
        brief = cluster_and_corroborate("event-test-diff", claims).to_dict()
        self.assertEqual(len(brief["facts"]), 2)
        # Neither claim is corroborated because each claim is only asserted by 1 source
        self.assertFalse(brief["facts"][0]["corroborated"])
        self.assertFalse(brief["facts"][1]["corroborated"])
        # Reuters is tier 3 (single wire), NTSB is tier 1 (primary official)
        self.assertEqual(brief["facts"][0]["tier"], 3)
        self.assertEqual(brief["facts"][1]["tier"], 1)

    def test_dispute_detection(self):
        claims = [
            {"claim": "Four workers died in the incident.", "neutral": "Four workers died in the incident.", "source": "source-a"},
            {"claim": "Six workers died in the incident.", "neutral": "Six workers died in the incident.", "source": "source-b"}
        ]
        brief = cluster_and_corroborate("event-test-4", claims).to_dict()
        self.assertGreaterEqual(len(brief["disputes"]), 1)
        self.assertEqual(brief["disputes"][0]["status"], "Contested")

if __name__ == "__main__":
    unittest.main()
