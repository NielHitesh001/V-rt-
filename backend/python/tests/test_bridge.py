import unittest
import os
import sys

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from src.newsx.api_bridge import process_event

class TestBridge(unittest.TestCase):
    def test_process_event(self):
        articles = [
            {
                "source": "reuters",
                "text": "The Dali cargo vessel struck the Francis Scott Key Bridge at 1:28 AM."
            },
            {
                "source": "ntsb-gov",
                "text": "NTSB investigators boarded the Dali vessel to recover data recorders."
            }
        ]
        result = process_event("event-bridge-01", articles)
        self.assertIn("facts", result)
        self.assertEqual(result["event_id"], "event-bridge-01")
        self.assertTrue(result["has_primary_grounding"])
        self.assertGreaterEqual(len(result["facts"]), 2)

if __name__ == "__main__":
    unittest.main()
