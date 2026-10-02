import unittest
import os
import sys

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from src.newsx.neutralizer import neutralize_claim, neutralize_with_changes

class TestNeutralizer(unittest.TestCase):
    def test_loaded_label_replacement(self):
        text = "The regime announced new border measures."
        res = neutralize_claim(text)
        self.assertEqual(res, "The government announced new border measures.")

    def test_scare_quotes_removal(self):
        text = "The \"so-called reform\" was debated in parliament."
        res = neutralize_claim(text)
        self.assertEqual(res, "The reform was debated in parliament.")

    def test_charged_verbs(self):
        text = "The senator slammed the proposed budget cut."
        res = neutralize_claim(text)
        self.assertEqual(res, "The senator criticized the proposed budget cut.")

    def test_intensifiers_removal(self):
        text = "The city suffered a devastating toll after the storm."
        res = neutralize_claim(text)
        self.assertEqual(res, "The city suffered a toll after the storm.")

    def test_neutralize_with_changes(self):
        text = "The massive cargo ship deliberately rammed the pier."
        res = neutralize_with_changes(text)
        self.assertTrue(res["is_modified"])
        self.assertGreaterEqual(len(res["changes"]), 2)
        self.assertIn("large-scale", res["neutralized"])
        self.assertIn("collided with", res["neutralized"])

if __name__ == "__main__":
    unittest.main()
