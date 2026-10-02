import unittest
import os
import sys

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from src.newsx.models import DeterministicExtractorClient

class TestModels(unittest.TestCase):
    def test_deterministic_client(self):
        client = DeterministicExtractorClient(cache_dir="/tmp/truenews_cache_test")
        res = client.query("Extract factual claims from article body")
        self.assertIn("Deterministic extraction completed", res)

if __name__ == "__main__":
    unittest.main()
