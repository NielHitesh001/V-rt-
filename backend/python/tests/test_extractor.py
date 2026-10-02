import unittest
import os
import sys

# Ensure backend/python is in sys.path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from src.newsx.extractor import extract_claims, split_into_candidate_sentences, extract_claims_with_spans

class TestExtractor(unittest.TestCase):
    def test_sentence_splitting(self):
        text = "The Dali cargo vessel struck the Francis Scott Key Bridge at 1:28 AM. Officials declared a state of emergency."
        sentences = split_into_candidate_sentences(text)
        self.assertEqual(len(sentences), 2)
        self.assertIn("The Dali cargo vessel struck the Francis Scott Key Bridge at 1:28 AM.", sentences)

    def test_extract_claims_grounding(self):
        text = "The Dali vessel collided with the support pier. Six construction workers were missing."
        claims = extract_claims(text)
        self.assertGreaterEqual(len(claims), 2)
        for c in claims:
            self.assertTrue(len(c) > 5)

    def test_attribution_layering(self):
        text = "Governor Moore confirmed that the bridge collapsed in seconds."
        claims = extract_claims(text)
        self.assertTrue(any("collapsed in seconds" in c for c in claims))

    def test_span_grounding(self):
        text = "The bridge collapsed at 1:28 AM."
        spans = extract_claims_with_spans(text)
        self.assertGreaterEqual(len(spans), 1)
        self.assertEqual(spans[0]["status"], "extracted")
        self.assertEqual(spans[0]["claim_type"], "quantity")

if __name__ == "__main__":
    unittest.main()
