import React, { useState } from 'react';
import {
  HISTORICAL_CLAIM_RECORDS,
  EMBED_WIDGET_CONFIGS,
  DATASET_EXPORT_CONFIGS
} from '../data/enhancementsData';
import { HistoricalClaimRecord, FactBriefEmbedConfig, DatasetExportConfig } from '../types';
import {
  Search,
  Code2,
  Database,
  History,
  Copy,
  Check,
  Download,
  Share2,
  ExternalLink,
  BookOpen,
  ArrowRight,
  Sparkles
} from 'lucide-react';

export const JournalistToolsAndAdoption: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'finder' | 'widget' | 'export'>('finder');

  // 24. Claim Finder state
  const [claimSearch, setClaimSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const filteredHistorical = HISTORICAL_CLAIM_RECORDS.filter((rec) => {
    const matchesCat = selectedCategory === 'all' || rec.topic_category.toLowerCase().includes(selectedCategory.toLowerCase());
    const matchesSearch =
      rec.claim_text.toLowerCase().includes(claimSearch.toLowerCase()) ||
      rec.journalist_context_notes.toLowerCase().includes(claimSearch.toLowerCase()) ||
      rec.historical_era.toLowerCase().includes(claimSearch.toLowerCase());
    return matchesCat && matchesSearch;
  });

  // 25. Embed Widget state
  const [selectedEmbedClaimId, setSelectedEmbedClaimId] = useState<string>(EMBED_WIDGET_CONFIGS[0].claim_id);
  const currentEmbed = EMBED_WIDGET_CONFIGS.find((w) => w.claim_id === selectedEmbedClaimId) || EMBED_WIDGET_CONFIGS[0];
  const [copiedEmbed, setCopiedEmbed] = useState(false);

  // 26. Dataset Export state
  const [selectedDatasetId, setSelectedDatasetId] = useState<string>(DATASET_EXPORT_CONFIGS[0].dataset_id);
  const currentDataset = DATASET_EXPORT_CONFIGS.find((d) => d.dataset_id === selectedDatasetId) || DATASET_EXPORT_CONFIGS[0];
  const [copiedDatasetSample, setCopiedDatasetSample] = useState(false);

  return (
    <div className="space-y-8 max-w-6xl mx-auto font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-stone-300 gap-3">
        <div>
          <div className="text-[11px] font-mono uppercase tracking-widest text-stone-500 font-semibold">
            Tier 4: Impact & Adoption · Systems 24, 25 & 26
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif-editorial font-bold text-stone-900">
            Journalist Claim Finder, Embed Widget & Dataset Export
          </h1>
        </div>
        <div className="flex items-center space-x-1.5 bg-stone-200/70 p-1 rounded border border-stone-300 text-xs font-sans">
          <button
            onClick={() => setActiveSubTab('finder')}
            className={`px-3 py-1 rounded transition font-medium cursor-pointer ${
              activeSubTab === 'finder'
                ? 'bg-stone-900 text-stone-100 shadow-xs'
                : 'text-stone-700 hover:text-stone-900'
            }`}
          >
            24. Claim Finder
          </button>
          <button
            onClick={() => setActiveSubTab('widget')}
            className={`px-3 py-1 rounded transition font-medium cursor-pointer ${
              activeSubTab === 'widget'
                ? 'bg-stone-900 text-stone-100 shadow-xs'
                : 'text-stone-700 hover:text-stone-900'
            }`}
          >
            25. Embeddable Widget
          </button>
          <button
            onClick={() => setActiveSubTab('export')}
            className={`px-3 py-1 rounded transition font-medium cursor-pointer ${
              activeSubTab === 'export'
                ? 'bg-stone-900 text-stone-100 shadow-xs'
                : 'text-stone-700 hover:text-stone-900'
            }`}
          >
            26. Research & Dataset Export
          </button>
        </div>
      </div>

      {/* 24. Claim Finder */}
      {activeSubTab === 'finder' && (
        <div className="space-y-6">
          <div className="bg-[#fdfcf9] border border-stone-300 text-stone-900 p-5 rounded-lg shadow-2xs space-y-2">
            <div className="flex items-center space-x-2 text-xs font-mono uppercase text-[#5c4a2c]">
              <History className="w-4 h-4" />
              <span>Historical Precedent & Fact Retrieval Memory for Journalists</span>
            </div>
            <p className="text-xs font-serif text-stone-600 leading-relaxed max-w-3xl">
              Reporting on modern economic sanctions, maritime accidents, or labor disputes? Query historical claims made in prior crises, inspect how predictions resolved retrospectively, and avoid repeating debunked narratives.
            </p>
          </div>

          {/* Search bar & filter pills */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={claimSearch}
                onChange={(e) => setClaimSearch(e.target.value)}
                placeholder="Search historical claims (e.g. 2014 Ukraine sanctions, port crane automation)..."
                className="w-full pl-9 pr-4 py-2 text-xs font-serif bg-white border border-stone-300 rounded shadow-2xs text-stone-900 focus:outline-none focus:border-stone-500"
              />
            </div>
            <div className="flex items-center space-x-1.5 overflow-x-auto text-xs font-sans">
              {['all', 'Sanctions', 'Automation', 'Maritime'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded transition border cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-stone-900 text-stone-100 border-stone-900'
                      : 'bg-white text-stone-700 border-stone-300 hover:border-stone-400'
                  }`}
                >
                  {cat === 'all' ? 'All Eras' : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Results Grid */}
          <div className="space-y-4">
            {filteredHistorical.map((rec) => (
              <div
                key={rec.id}
                className="bg-white border border-stone-300 p-5 rounded shadow-xs space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2.5 border-b border-stone-200">
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-stone-100 text-stone-700">
                      {rec.historical_era}
                    </span>
                    <span className="text-xs font-mono text-stone-500">Event Date: {rec.event_date}</span>
                    <span className="text-stone-300">·</span>
                    <span className="text-xs font-serif text-stone-600">{rec.topic_category}</span>
                  </div>
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-mono font-bold uppercase ${
                      rec.retrospective_verdict === 'Confirmed Accurate'
                        ? 'bg-[#e8ede4] text-[#34482c]'
                        : rec.retrospective_verdict === 'Overturned by Investigation'
                        ? 'bg-[#ecdfdf] text-[#5e3838]'
                        : 'bg-[#f3edd9] text-[#5c4a2c]'
                    }`}
                  >
                    {rec.retrospective_verdict}
                  </span>
                </div>

                <div>
                  <h3 className="font-serif font-bold text-base text-stone-900">
                    "{rec.claim_text}"
                  </h3>
                  <div className="text-xs font-serif text-stone-500 mt-1">
                    Citing Newsrooms at Time of Event: {rec.sources_citing.join(', ')}
                  </div>
                </div>

                <div className="p-3 bg-stone-50 rounded border border-stone-200 text-xs font-serif space-y-1.5">
                  <div className="text-stone-600">
                    <strong>Initial Reporting Consensus:</strong> {rec.initial_consensus}
                  </div>
                  <div className="text-stone-800">
                    <strong>Retrospective Investigation Outcome:</strong> {rec.journalist_context_notes}
                  </div>
                </div>

                <div className="pt-1 text-xs font-mono text-stone-600">
                  <span className="font-bold text-stone-700">Related Contemporary Inquiries: </span>
                  {rec.similar_contemporary_claims.join(' · ')}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 25. Embed-able Fact Brief Widget */}
      {activeSubTab === 'widget' && (
        <div className="space-y-6">
          <div className="bg-[#fdfcf9] border border-stone-300 text-stone-900 p-5 rounded-lg shadow-2xs space-y-2">
            <div className="flex items-center space-x-2 text-xs font-mono uppercase text-[#5c4a2c]">
              <Code2 className="w-4 h-4" />
              <span>Embeddable Verified Claim Widget for External Publishers</span>
            </div>
            <p className="text-xs font-serif text-stone-600 leading-relaxed max-w-3xl">
              Embed verifiable claims directly on independent blogs, news articles, and research portals with complete provenance audit chains and live veracity indicators.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Widget Configuration & Code */}
            <div className="bg-white border border-stone-300 p-5 rounded shadow-xs space-y-4">
              <h3 className="font-serif font-bold text-base text-stone-900">
                1. Select Claim to Embed
              </h3>
              <div className="space-y-2">
                {EMBED_WIDGET_CONFIGS.map((cfg) => (
                  <button
                    key={cfg.claim_id}
                    onClick={() => setSelectedEmbedClaimId(cfg.claim_id)}
                    className={`w-full p-3 text-left rounded border transition text-xs space-y-1 cursor-pointer ${
                      selectedEmbedClaimId === cfg.claim_id
                        ? 'bg-amber-50/70 border-stone-900 font-semibold'
                        : 'bg-white border-stone-200 hover:border-stone-300'
                    }`}
                  >
                    <div className="flex items-center justify-between font-mono text-[11px]">
                      <span>{cfg.claim_id}</span>
                      <span className="bg-stone-900 text-stone-100 px-1.5 py-0.5 rounded">Tier {cfg.tier}</span>
                    </div>
                    <div className="font-serif text-stone-900">{cfg.headline}</div>
                  </button>
                ))}
              </div>

              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="font-bold text-stone-700 uppercase">Embed Snippet (iFrame):</span>
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(currentEmbed.embed_code_snippet);
                      setCopiedEmbed(true);
                      setTimeout(() => setCopiedEmbed(false), 2000);
                    }}
                    className="text-stone-700 hover:text-stone-900 flex items-center space-x-1 cursor-pointer font-sans"
                  >
                    {copiedEmbed ? <Check className="w-3 h-3 text-[#475e3c]" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedEmbed ? 'Copied' : 'Copy Code'}</span>
                  </button>
                </div>
                <div className="p-3 bg-stone-900 text-stone-200 rounded font-mono text-xs select-all break-all">
                  {currentEmbed.embed_code_snippet}
                </div>
              </div>
            </div>

            {/* Live Interactive Preview Box */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="font-bold uppercase text-stone-600">Live Widget Preview:</span>
                <span className="text-stone-400">Target size: 100% × 220px</span>
              </div>
              <div className="bg-white border border-stone-300 rounded-lg p-5 shadow-sm space-y-3">
                <div className="flex items-center justify-between border-b border-stone-200 pb-2 text-[11px] font-mono uppercase text-stone-500">
                  <span className="font-bold text-stone-900">VĀRTĀ · VERIFIED CLAIM LEDGER</span>
                  <span className="bg-stone-900 text-stone-100 px-2 py-0.5 rounded text-[10px] font-bold">
                    TIER {currentEmbed.tier} PRIMARY CONFIRMED
                  </span>
                </div>
                <h4 className="font-serif font-bold text-base text-stone-900 leading-snug">
                  {currentEmbed.headline}
                </h4>
                <p className="font-serif text-xs text-stone-700 leading-relaxed">
                  "{currentEmbed.neutral_text}"
                </p>
                <div className="flex items-center justify-between border-t border-stone-100 pt-2 text-[11px] font-serif text-stone-500">
                  <span>{currentEmbed.provenance_badge}</span>
                  <span className="text-stone-900 font-bold underline">Inspect Provenance →</span>
                </div>
              </div>

              <div className="p-3 bg-stone-100 rounded border border-stone-200 text-xs font-serif text-stone-600">
                <strong>Host Site Integration:</strong> Any external CMS (WordPress, Ghost, Substack) can paste this embed iframe. The widget automatically stays synchronized with downstream retractions.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 26. Research & Dataset Exportset Export */}
      {activeSubTab === 'export' && (
        <div className="space-y-6">
          <div className="bg-[#fdfcf9] border border-stone-300 text-stone-900 p-5 rounded-lg shadow-2xs space-y-2">
            <div className="flex items-center space-x-2 text-xs font-mono uppercase text-[#5c4a2c]">
              <Database className="w-4 h-4" />
              <span>Research & Evaluation Corpus: Grounded Neutralization & Corroboration</span>
            </div>
            <p className="text-xs font-serif text-stone-600 leading-relaxed max-w-3xl">
              Export high-quality atomic claim extraction benchmarks and reversible neutralization datasets for non-partisan reporting without hallucinations.
            </p>
          </div>

          {/* Dataset Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {DATASET_EXPORT_CONFIGS.map((ds) => (
              <div
                key={ds.dataset_id}
                className={`bg-white border p-5 rounded shadow-xs space-y-4 transition cursor-pointer ${
                  selectedDatasetId === ds.dataset_id ? 'border-stone-900 ring-1 ring-stone-900' : 'border-stone-300'
                }`}
                onClick={() => setSelectedDatasetId(ds.dataset_id)}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-mono uppercase bg-stone-100 text-stone-700 px-2 py-0.5 rounded">
                      {ds.format}
                    </span>
                    <h3 className="font-serif font-bold text-sm text-stone-900 mt-1">
                      {ds.name}
                    </h3>
                  </div>
                  <span className="text-xs font-mono font-bold text-stone-800">
                    {ds.sample_count} pairs
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-xs font-mono py-2 bg-stone-50 rounded px-3 border border-stone-200">
                  <div>
                    <span className="text-stone-500 text-[10px] block">Train</span>
                    <strong className="text-stone-900">{ds.data_split.train}</strong>
                  </div>
                  <div>
                    <span className="text-stone-500 text-[10px] block">Val</span>
                    <strong className="text-stone-900">{ds.data_split.val}</strong>
                  </div>
                  <div>
                    <span className="text-stone-500 text-[10px] block">Test</span>
                    <strong className="text-stone-900">{ds.data_split.test}</strong>
                  </div>
                </div>

                <div className="text-xs font-serif text-stone-600">
                  License: <strong className="text-stone-900">{ds.license_tier}</strong>
                </div>

                <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
                  <span className="text-xs font-mono text-stone-500">ID: {ds.dataset_id}</span>
                  <a
                    href={ds.download_endpoint}
                    className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-stone-900 hover:bg-stone-800 text-stone-100 rounded text-xs font-sans font-medium transition cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Corpus</span>
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Sample JSON / Instruction Preview */}
          <div className="bg-white border border-stone-300 p-6 rounded shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200">
              <h3 className="font-serif font-bold text-base text-stone-900">
                Instruction Sample Preview ({currentDataset.dataset_id})
              </h3>
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(JSON.stringify(currentDataset.sample_preview, null, 2));
                  setCopiedDatasetSample(true);
                  setTimeout(() => setCopiedDatasetSample(false), 2000);
                }}
                className="text-xs font-sans font-medium text-stone-700 hover:text-stone-900 flex items-center space-x-1 cursor-pointer"
              >
                {copiedDatasetSample ? <Check className="w-3.5 h-3.5 text-[#475e3c]" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedDatasetSample ? 'Copied' : 'Copy JSON'}</span>
              </button>
            </div>

            <pre className="p-4 bg-stone-900 text-stone-100 rounded font-mono text-xs overflow-x-auto leading-relaxed">
              {JSON.stringify(currentDataset.sample_preview, null, 2)}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};
