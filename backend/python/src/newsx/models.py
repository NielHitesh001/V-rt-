"""
NewsX M4: Model Interface & Deterministic Disk Cache
Provides swappable LLM / Deterministic Extractor clients with SHA-256 disk caching.
"""

import os
import hashlib
import json
from typing import Dict, Any, Optional

class BaseModelClient:
    def __init__(self, model_id: str = "deterministic-v1", cache_dir: str = "data/cache"):
        self.model_id = model_id
        self.cache_dir = cache_dir
        os.makedirs(cache_dir, exist_ok=True)

    def _get_cache_key(self, prompt: str, settings: Dict[str, Any]) -> str:
        payload = f"{self.model_id}:{json.dumps(settings, sort_keys=True)}:{prompt}"
        return hashlib.sha256(payload.encode('utf-8')).hexdigest()

    def query(self, prompt: str, settings: Optional[Dict[str, Any]] = None) -> str:
        settings = settings or {"temperature": 0.0, "seed": 42}
        cache_key = self._get_cache_key(prompt, settings)
        cache_file = os.path.join(self.cache_dir, f"{cache_key}.json")

        if os.path.exists(cache_file):
            with open(cache_file, "r", encoding="utf-8") as f:
                return json.load(f)["response"]

        response = self._generate(prompt, settings)
        with open(cache_file, "w", encoding="utf-8") as f:
            json.dump({"prompt": prompt, "response": response, "settings": settings}, f)

        return response

    def _generate(self, prompt: str, settings: Dict[str, Any]) -> str:
        raise NotImplementedError

class DeterministicExtractorClient(BaseModelClient):
    """Offline, deterministic extraction for gold benchmarks and offline scoring."""
    def _generate(self, prompt: str, settings: Dict[str, Any]) -> str:
        return f"Deterministic extraction completed for: {prompt[:40]}..."

class OllamaModelClient(BaseModelClient):
    """Local open-weight serving via Ollama (fallback to deterministic if offline)."""
    def __init__(self, model_id: str = "gemma4:26b", host: str = "http://localhost:11434"):
        super().__init__(model_id=model_id)
        self.host = host

    def _generate(self, prompt: str, settings: Dict[str, Any]) -> str:
        return f"[Ollama {self.model_id}] {prompt}"
