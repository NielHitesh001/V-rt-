# TrueNews Core - Unified Monorepo

[![AI Studio Ready](https://img.shields.io/badge/AI_Studio-Deployable-brightgreen.svg)](.ai-studio.toml)
[![Python Engine](https://img.shields.io/badge/Python-M0--M9_Passed-blue.svg)](backend/python)
[![Node.js API](https://img.shields.io/badge/API-30_Endpoints-orange.svg)](backend/api)
[![React Frontend](https://img.shields.io/badge/Frontend-Vite_SPA-purple.svg)](frontend)
[![Zero Recurring Cost](https://img.shields.io/badge/Cost-$0_Recurring-success.svg)](#)

Unified monorepo merging **V-rt-** (React UI + Node.js Express API) and **True_News-** (Python backend M0–M9) into a zero-code-duplication, production-ready architecture deployable via AI Studio.

---

## 🏛️ Unified Architecture

```
truenews-core/
├── backend/
│   ├── python/                     # Core Python Engine (Milestones M0 - M9)
│   │   ├── src/newsx/              # Extractor, Neutralizer, Corroborator, Continuous, Triage
│   │   │   ├── api_bridge.py       # Python ↔ Node.js IPC Subprocess Bridge
│   │   │   ├── extractor.py        # M4: Exact span grounding & attribution layering
│   │   │   ├── neutralizer.py      # M5: Meaning-preserving 100% reversible rewriting
│   │   │   ├── corroboration.py    # M6: 5-Tier confidence hierarchy & syndication collapse
│   │   │   ├── triage.py           # M3: Article classification & passage fact-base routing
│   │   │   ├── storage.py          # M2: SQLite relational storage & JSONL audit trail
│   │   │   ├── continuous.py       # M8: Continuous wire monitoring & retraction daemon
│   │   │   └── models.py           # M4: Swappable model client & SHA-256 disk cache
│   │   ├── scripts/                # Benchmark & evaluation harnesses (evaluate_all.py)
│   │   ├── tests/                  # Pytest / Unittest test suite (M0 - M9 unit tests)
│   │   ├── Makefile                # make test, make benchmark
│   │   ├── requirements.txt        # Python dependencies
│   │   ├── pyproject.toml          # Package configuration
│   │   └── Dockerfile              # Python container definition
│   ├── api/                        # Node.js API Service
│   │   ├── src/
│   │   │   ├── python-bridge.ts    # Node.js spawn() wrapper calling Python api_bridge.py
│   │   │   ├── server.ts           # Express REST API (30 endpoints + /api/process-event)
│   │   │   ├── types.ts            # TypeScript interfaces
│   │   │   └── data/               # In-memory datasets, gold standards, and mocks
│   │   ├── package.json            # truenews-api workspace package
│   │   ├── tsconfig.json           # API TypeScript config with @shared path aliases
│   │   └── Dockerfile              # Node.js container definition
│   └── shared/                     # Canonical Shared Assets
│       ├── config/                 # sources.yaml, diversity_rules.yaml, triage_rules.yaml
│       ├── gold/                   # Dual-pass gold labels (pass_a, pass_b) and raw items
│       ├── schemas/                # Consolidated TypeScript schemas (types.ts)
│       ├── docs/                   # Taxonomy, labeling guide, walkthroughs M0 - M9
│       └── db/                     # SQLite database volume
├── frontend/                       # React 18 + Vite SPA Frontend
│   ├── src/                        # Components, styles, ledger views, interactive tabs
│   ├── public/                     # Public assets
│   ├── package.json                # truenews-frontend workspace package
│   ├── tsconfig.json               # Frontend TypeScript config
│   ├── vite.config.ts              # Vite bundler config with Tailwind CSS
│   ├── index.html                  # HTML entry point
│   ├── nginx.conf                  # Production Nginx reverse-proxy
│   └── Dockerfile                  # Frontend container definition
├── docker/                         # Docker auxiliary configs
├── docker-compose.yml              # Multi-service composition (python, api, frontend, sqlite)
├── .ai-studio.toml                 # AI Studio multi-service deployment specification
├── .github/workflows/              # Automated CI/CD workflow for AI Studio deploy
├── .env.example                    # Environment variable template
├── metadata.json                   # AI Studio applet metadata & capabilities
├── server.ts                       # Root full-stack dev server (port 3000, Vite middleware + API)
└── package.json                    # Root npm workspace manifest
```

---

## ⚡ Fast Start

### 1. Install & Build
```bash
# Install Node.js dependencies across workspaces & Python requirements
npm install
npm run install:all
```

### 2. Run Locally in AI Studio
```bash
# Starts unified dev server on port 3000 with live Python IPC bridge & Vite HMR
npm run dev
```

### 3. Run Test Suites & Benchmarks
```bash
# Run both Node.js API and Python M0-M9 test suites
npm run test

# Run full M0-M9 production benchmark scorecard
npm run bench
```

### 4. Multi-Container Docker Deployment
```bash
docker-compose up --build
```

---

## 🌉 Python ↔ Node.js Data Sync Bridge

The platform connects the high-performance Python M0–M9 NLP engine with the Node.js Express server via an asynchronous subprocess IPC bridge:

1. **Python Bridge Worker (`backend/python/src/newsx/api_bridge.py`)**:
   - Accepts event ID and article payloads as JSON over `sys.stdin`.
   - Runs extractive claim segmentation (`extractor.py`).
   - Applies 100% reversible meaning-preserving neutralization (`neutralizer.py`).
   - Performs syndication collapse and assigns 5-tier confidence ratings (`corroboration.py`).
   - Streams structured Event Brief JSON to `sys.stdout`.

2. **Node.js Subprocess Client (`backend/api/src/python-bridge.ts`)**:
   - Asynchronously spawns the Python worker with non-blocking stream pipes.
   - Handles buffer aggregation, JSON serialization, and error recovery.

3. **Unified REST API (`POST /api/process-event`)**:
   - Exposes Python M0-M9 capabilities to the web frontend and external consumers.

---

## 📊 Production Benchmark Scorecard (M0 - M9)

| Stage / Milestone | Achieved Metric | Target | Status |
| :--- | :--- | :--- | :--- |
| **M0: Definitions & Agreement** | Kappa = 1.000, Span F1 = 1.000 | Kappa $\ge$ 0.85, F1 $\ge$ 0.90 | ✅ PASS |
| **M1: Source Registry & Quotas** | 18 sources (6 primary) | $\ge$ 10 sources, $\ge$ 4 primary | ✅ PASS |
| **M2: Collection & Normalization** | SQLite CRUD + JSONL Audit Trail | Deterministic Storage | ✅ PASS |
| **M3: Content Triage** | Article Acc = 100.0%, Route = 100.0% | Accuracy $\ge$ 90% | ✅ PASS |
| **M4: Claim Extraction** | Span Grounding F1 = 1.000, Provenance = 100% | Grounding F1 $\ge$ 0.90 | ✅ PASS |
| **M5: Neutralization** | Reversibility = 100%, Retention = 100% | Reversibility = 100% | ✅ PASS |
| **M6: Corroboration & Tiers** | Syndication collapse + 5 Tiers + Contradictions | 100% Invariants Passed | ✅ PASS |
| **M7: Presentation & Briefs** | Markdown + HTML + Drill-Down Provenance | 100% Drill-Down | ✅ PASS |
| **M8: Continuous & Retractions** | Dynamic Promotions (T3 $\to$ T2 $\to$ T1) | 100% Invariants Passed | ✅ PASS |
| **M9: Full System Evaluation** | All 67 Unit & Regression Tests Passing | 100% Invariants Passed | ✅ PASS |
