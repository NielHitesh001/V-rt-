# TrueNews Core - Unified Monorepo

[![Live App Demo](https://img.shields.io/badge/Live_Demo-Open_TrueNews_App-blue?style=for-the-badge&logo=google-cloud)](https://ais-pre-bynfxgz4rp3gfdciflfodh-617495493521.asia-southeast1.run.app)
[![Development URL](https://img.shields.io/badge/Dev_Preview-Active_Server-green?style=for-the-badge)](https://ais-dev-bynfxgz4rp3gfdciflfodh-617495493521.asia-southeast1.run.app)
[![Python Engine](https://img.shields.io/badge/Python-M0--M9_Passed-brightgreen?style=for-the-badge&logo=python)](backend/python)
[![Node.js API](https://img.shields.io/badge/Express_API-30_Endpoints-orange?style=for-the-badge&logo=nodedotjs)](backend/api)
[![React Frontend](https://img.shields.io/badge/React_18-Vite_SPA-purple?style=for-the-badge&logo=react)](frontend)

> **TrueNews** is a forensic news intelligence and epistemic verification engine. It autonomously neutralizes sensationalized language with 100% reversibility, tracks claim provenance across competing wire feeds, and computes 5-tier corroboration hierarchies.

---

## 📸 Interface Showcase

![TrueNews Intelligence Dashboard](src/assets/truenews_portfolio_showcase_1790969090030.jpg)

### Key Capabilities
- ⚖️ **100% Reversible Neutralization**: Strips loaded adjectives and bias without losing factual grounding or attribution.
- 🔍 **Epistemic Mission Control**: Multi-source dispute matrices, cross-wire conflict detection, and forensic audit trails.
- 📰 **The Daily Veracity**: Automated neutral newspaper edition generated directly from corroborated event clusters.
- ⚡ **Sub-Second IPC Pipeline**: High-throughput Node.js Express API coupled with Python M0–M9 natural language processing engine.

---

## 🏛️ Monorepo Architecture

```text
Varta/
├── frontend/                       # React 18 + Vite SPA Frontend
│   ├── src/
│   │   ├── components/             # 25+ Interactive Verification & Reader Components
│   │   ├── data/                   # Corroboration, Neutralizer, Sources, and Gold Datasets
│   │   ├── assets/                 # High-resolution media and editorial photography
│   │   ├── App.tsx                 # Main application view container
│   │   └── types.ts                # TypeScript epistemic schemas
├── src/                            # Mirrored root frontend for AI Studio dev runtime
├── backend/
│   ├── python/                     # Core Python Engine (Milestones M0 - M9)
│   │   ├── src/newsx/              # Extractor, Neutralizer, Corroborator, Triage, Storage
│   │   ├── scripts/                # Evaluation & benchmark harnesses (evaluate_all.py)
│   │   └── tests/                  # Pytest / Unittest test suite
│   ├── api/                        # Node.js API Service
│   │   ├── src/
│   │   │   ├── server.ts           # Express REST API (30 endpoints)
│   │   │   └── python-bridge.ts    # Node.js spawn() IPC wrapper
│   │   └── package.json
│   └── shared/                     # Canonical Shared Assets
│       ├── config/                 # sources.yaml, diversity_rules.yaml, triage_rules.yaml
│       ├── gold/                   # Dual-pass gold labels (pass_a, pass_b) and raw items
│       └── schemas/                # Shared TypeScript types
├── docs/
│   ├── design_system/              # UI specifications, visual design systems & screens
│   ├── specs/                      # Requirements and extracted reference docs
│   ├── taxonomy.md                 # Bias classification & claim taxonomy
│   └── walkthrough_m0.md ... m9.md # Milestone implementation guides
├── docker-compose.yml              # Container orchestration for frontend + API + Python
└── server.ts                       # Root full-stack dev server entry point
```

---

## 🚀 Quickstart

### 1. Run the Full-Stack Application (Local Dev)

```bash
# Clone the repository
git clone https://github.com/NielHitesh001/Varta.git
cd Varta

# Install dependencies
npm install

# Start the full-stack server (Vite + Express)
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### 2. Run with Docker Compose

```bash
docker-compose up --build
```
- **Frontend**: [http://localhost:80](http://localhost:80)
- **API**: [http://localhost:3001](http://localhost:3001)

### 3. Run Python Engine Tests (M0–M9)

```bash
cd backend/python
python3 -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
python3 -m pytest tests/
python3 scripts/evaluate_all.py
```

---

## 🌐 Live Deployments

- **Live Application**: [https://ais-pre-bynfxgz4rp3gfdciflfodh-617495493521.asia-southeast1.run.app](https://ais-pre-bynfxgz4rp3gfdciflfodh-617495493521.asia-southeast1.run.app)
- **Interactive Dev Server**: [https://ais-dev-bynfxgz4rp3gfdciflfodh-617495493521.asia-southeast1.run.app](https://ais-dev-bynfxgz4rp3gfdciflfodh-617495493521.asia-southeast1.run.app)
