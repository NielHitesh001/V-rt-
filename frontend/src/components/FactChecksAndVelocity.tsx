import React, { useState } from 'react';
import {
  FACT_CHECK_RECORDS,
  BREAKING_VELOCITIES,
  RETRACTION_RECORDS
} from '../data/enhancementsData';
import { ShieldCheck, Zap, AlertTriangle, ExternalLink, RefreshCw, Clock, ArrowRight, Search, TrendingUp, Radio } from 'lucide-react';

export const FactChecksAndVelocity: React.FC = () => {
  const [filterFactChecker, setFilterFactChecker] = useState<string>('all');
  const [searchFactCheck, setSearchFactCheck] = useState('');
  const [timeWindow, setTimeWindow] = useState<'24h' | '7d' | '30d'>('24h');
  const [selectedVelocityEventId, setSelectedVelocityEventId] = useState<string>(BREAKING_VELOCITIES[0].event_id);

  const filteredFactChecks = FACT_CHECK_RECORDS.filter((fc) => {
    const matchesOrg = filterFactChecker === 'all' || fc.organization === filterFactChecker;
    const matchesSearch =
      fc.target_claim.toLowerCase().includes(searchFactCheck.toLowerCase()) ||
      fc.review_summary.toLowerCase().includes(searchFactCheck.toLowerCase()) ||
      fc.verdict.toLowerCase().includes(searchFactCheck.toLowerCase());
    return matchesOrg && matchesSearch;
  });

  const selectedVelocity = BREAKING_VELOCITIES.find((v) => v.event_id === selectedVelocityEventId) || BREAKING_VELOCITIES[0];

  return (
    <div className="space-y-8 max-w-6xl mx-auto font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-stone-300 gap-3">
        <div>
          <div className="text-[11px] font-mono uppercase tracking-widest text-stone-500 font-semibold">
            The Veracity Archive · Verification Systems
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif-editorial font-bold text-stone-900">
            Fact-Checking, Breaking Velocity & Retraction Audit
          </h1>
        </div>
        <div className="text-xs font-serif text-stone-600">
          Live Cross-Referencing & Cascading Corrections
        </div>
      </div>

      {/* 1. Breaking News Velocity Detection (Item 3) */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-stone-200 pb-2 gap-2">
          <div>
            <h2 className="font-serif-editorial font-bold text-stone-900 text-xl flex items-center space-x-2">
              <Zap className="w-5 h-5 text-stone-700" />
              <span>Breaking News Velocity & Narrative Consensus Tracker</span>
            </h2>
            <p className="text-xs font-serif text-stone-600">
              Detects claim surges, identifies speculative ungrounded reporting, and monitors stabilization into factual consensus
            </p>
          </div>

          <div className="flex items-center space-x-1 p-1 bg-stone-200/70 rounded border border-stone-300 text-xs">
            {(['24h', '7d', '30d'] as const).map((win) => (
              <button
                key={win}
                onClick={() => setTimeWindow(win)}
                className={`px-3 py-1 rounded transition cursor-pointer uppercase text-[11px] font-mono ${
                  timeWindow === win
                    ? 'bg-white text-stone-900 shadow-2xs font-bold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {win}
              </button>
            ))}
          </div>
        </div>

        {/* Live Velocity Sparkline / Visual Dashboard */}
        <div className="bg-[#1c221e] text-stone-100 rounded-lg p-6 shadow-md space-y-4">
          <div className="flex flex-wrap items-center justify-between border-b border-stone-700 pb-3 gap-2 text-xs font-serif">
            <div className="flex items-center space-x-2">
              <Radio className="w-4 h-4 text-[#34482c] font-bold animate-pulse" />
              <span className="font-bold text-white text-sm">{selectedVelocity.headline}</span>
            </div>
            <div className="flex items-center space-x-2 font-mono text-[11px] text-stone-400">
              <span>RATE: {selectedVelocity.velocity_rate} articles/hr</span>
              <span>·</span>
              <span className="uppercase text-[#34482c] font-bold">{selectedVelocity.consensus_stage} stage</span>
            </div>
          </div>

          {/* SVG Velocity Curve / Sparkline */}
          <div className="relative w-full aspect-[24/7] bg-[#141815] rounded border border-stone-800 p-4 flex flex-col justify-between">
            <div className="flex items-center justify-between text-[11px] font-mono text-stone-500">
              <span>Velocity Curve (Spike Peak: {(selectedVelocity.velocity_rate * 1.4).toFixed(1)} art/hr)</span>
              <span>Primary Source Anchored: {selectedVelocity.time_to_first_primary_hours}h</span>
            </div>

            <svg viewBox="0 0 600 120" className="w-full h-24 overflow-visible">
              <defs>
                <linearGradient id="velocityGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              {/* Curve area */}
              <path
                d="M 20 100 Q 80 95, 140 30 T 260 45 T 380 75 T 500 85 T 580 90 L 580 110 L 20 110 Z"
                fill="url(#velocityGrad)"
              />
              {/* Stroke */}
              <path
                d="M 20 100 Q 80 95, 140 30 T 260 45 T 380 75 T 500 85 T 580 90"
                fill="none"
                stroke="#34d399"
                strokeWidth="2.5"
              />
              {/* Peak marker */}
              <circle cx="140" cy="30" r="4" fill="#34d399" stroke="#064e3b" strokeWidth="2" />
              <text x="145" y="24" fill="#6ee7b7" fontSize="10" fontFamily="monospace">Initial Spike</text>

              {/* Consensus anchor marker */}
              <circle cx="380" cy="75" r="4" fill="#fbbf24" stroke="#78350f" strokeWidth="2" />
              <text x="385" y="70" fill="#fde68a" fontSize="10" fontFamily="monospace">Primary Verified</text>
            </svg>

            <div className="flex items-center justify-between text-[11px] font-serif text-stone-400 border-t border-stone-800 pt-2">
              <span>0h (Incident)</span>
              <span>+2h (Wire Wave)</span>
              <span>+6h (Agency Findings)</span>
              <span>+12h (Consensus Settled)</span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs">
            <div className="p-3 bg-[#242b26] rounded border border-stone-800">
              <span className="text-[10px] font-mono text-stone-400 uppercase block">Outlets Audited</span>
              <span className="font-serif font-black text-white text-lg">{selectedVelocity.sources_count}</span>
            </div>
            <div className="p-3 bg-[#242b26] rounded border border-stone-800">
              <span className="text-[10px] font-mono text-stone-400 uppercase block">Velocity Index</span>
              <span className="font-serif font-black text-white text-lg">{selectedVelocity.velocity_rate} /hr</span>
            </div>
            <div className="p-3 bg-[#242b26] rounded border border-stone-800">
              <span className="text-[10px] font-mono text-stone-400 uppercase block">Speculative Ratio</span>
              <span className="font-serif font-black text-white text-lg">{(selectedVelocity.speculative_claims_ratio * 100).toFixed(0)}%</span>
            </div>
            <div className="p-3 bg-[#242b26] rounded border border-stone-800">
              <span className="text-[10px] font-mono text-stone-400 uppercase block">Consensus State</span>
              <span className="font-serif font-bold text-[#34482c] font-bold text-sm capitalize">{selectedVelocity.consensus_stage}</span>
            </div>
          </div>
        </div>

        {/* Velocity Stories Selector Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {BREAKING_VELOCITIES.map((vel) => (
            <div
              key={vel.event_id}
              onClick={() => setSelectedVelocityEventId(vel.event_id)}
              className={`p-5 rounded-lg border transition cursor-pointer space-y-3 ${
                selectedVelocityEventId === vel.event_id
                  ? 'bg-white border-stone-800 shadow-md ring-1 ring-stone-800'
                  : 'bg-white border-stone-300 hover:border-stone-400 shadow-xs'
              }`}
            >
              <div className="flex items-center justify-between text-xs font-serif text-stone-500">
                <span className="font-semibold uppercase tracking-wider text-stone-700 text-[11px]">
                  {vel.consensus_stage}
                </span>
                <span>{vel.sources_count} Reporting Outlets</span>
              </div>

              <h3 className="font-serif-editorial font-bold text-stone-900 text-base leading-snug">
                {vel.headline}
              </h3>

              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-stone-200 text-center">
                <div className="p-2 bg-stone-50 rounded border border-stone-200">
                  <div className="text-[10px] font-mono text-stone-500 uppercase">Velocity</div>
                  <div className="font-serif font-black text-stone-900 text-base">{vel.velocity_rate}</div>
                  <div className="text-[10px] text-stone-500">articles/hr</div>
                </div>

                <div className="p-2 bg-stone-50 rounded border border-stone-200">
                  <div className="text-[10px] font-mono text-stone-500 uppercase">Speculative</div>
                  <div className="font-serif font-black text-stone-900 text-base">{(vel.speculative_claims_ratio * 100).toFixed(0)}%</div>
                  <div className="text-[10px] text-stone-500">unverified</div>
                </div>

                <div className="p-2 bg-stone-50 rounded border border-stone-200">
                  <div className="text-[10px] font-mono text-stone-500 uppercase">First Primary</div>
                  <div className="font-serif font-black text-stone-900 text-base">{vel.time_to_first_primary_hours}h</div>
                  <div className="text-[10px] text-stone-500">lag time</div>
                </div>
              </div>

              {vel.spike_detected && (
                <div className="p-2 bg-stone-100 border border-stone-300 rounded text-xs font-serif text-stone-700">
                  <strong>Velocity Alert:</strong> Rapid multi-source wave detected; factual consensus forming.
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 2. Fact-Check Integration (Item 2) */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-stone-200 pb-2 gap-3">
          <div>
            <h2 className="font-serif-editorial font-bold text-stone-900 text-xl flex items-center space-x-2">
              <ShieldCheck className="w-5 h-5 text-stone-700" />
              <span>Independent Fact-Checker Integrations</span>
            </h2>
            <p className="text-xs font-serif text-stone-600">
              Cross-referenced against verified databases (PolitiFact, FactCheck.org, Snopes, AFP Fact Check)
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative w-full sm:w-56">
              <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-2.5 pointer-events-none" />
              <input
                type="text"
                value={searchFactCheck}
                onChange={(e) => setSearchFactCheck(e.target.value)}
                placeholder="Search claims or verdicts..."
                className="w-full pl-9 pr-3 py-1.5 text-xs font-serif bg-white border border-stone-300 rounded shadow-2xs text-stone-900 focus:outline-none focus:border-stone-500"
              />
            </div>

            <div className="flex items-center space-x-1 p-1 bg-stone-200/70 rounded border border-stone-300 text-xs overflow-x-auto">
              {['all', 'PolitiFact', 'FactCheck.org', 'Snopes', 'AFP Fact Check'].map((org) => (
                <button
                  key={org}
                  onClick={() => setFilterFactChecker(org)}
                  className={`px-2.5 py-1 rounded transition cursor-pointer text-xs whitespace-nowrap ${
                    filterFactChecker === org
                      ? 'bg-white text-stone-900 shadow-2xs font-semibold'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  {org === 'all' ? 'All' : org}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredFactChecks.map((fc) => (
            <div
              key={fc.id}
              className="bg-white border border-stone-300 rounded-lg p-5 shadow-xs space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-serif text-stone-500">
                  <span className="font-semibold text-stone-800">{fc.organization}</span>
                  <span>Evaluated {fc.check_date}</span>
                </div>

                <div className="p-2.5 bg-[#fcfbf9] border border-stone-200 rounded text-xs font-serif text-stone-800 italic">
                  "{fc.target_claim}"
                </div>

                <div className="space-y-1">
                  <div className="text-xs font-serif text-stone-600">
                    <span className="font-semibold text-stone-900">Verdict:</span> {fc.verdict}
                  </div>
                  <p className="font-serif-prose text-stone-700 text-xs sm:text-sm leading-relaxed">
                    {fc.review_summary}
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t border-stone-200 flex items-center justify-between text-xs">
                <span className="font-serif text-stone-500">Known Narrative Evaluated</span>
                <a
                  href={fc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans font-semibold text-stone-900 hover:text-stone-700 flex items-center space-x-1 underline"
                >
                  <span>Read Full Audit</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Retraction Tracking & Cascading Deprecation (Item 7) */}
      <section className="space-y-4">
        <div className="border-b border-stone-200 pb-2">
          <h2 className="font-serif-editorial font-bold text-stone-900 text-xl flex items-center space-x-2">
            <RefreshCw className="w-5 h-5 text-stone-700" />
            <span>Retraction Tracking & Cascading Claim Deprecation</span>
          </h2>
          <p className="text-xs font-serif text-stone-600">
            Automatically deprecates downstream propositions when origin newsrooms issue official errata or retractions
          </p>
        </div>

        <div className="space-y-3">
          {RETRACTION_RECORDS.map((ret) => (
            <div
              key={ret.id}
              className="bg-white border border-stone-300 rounded-lg p-5 shadow-xs space-y-3"
            >
              <div className="flex flex-wrap items-center justify-between text-xs font-serif text-stone-500 gap-2 border-b border-stone-200 pb-2">
                <div className="flex items-center space-x-2">
                  <span className="font-semibold text-stone-900">Publisher Correction Record:</span>
                  <span className="uppercase font-mono text-stone-700">{ret.source_id}</span>
                </div>
                <span>Notice Issued: {new Date(ret.notice_date).toLocaleDateString()}</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-serif">
                <div className="p-3 bg-stone-50 border border-stone-200 rounded space-y-1">
                  <span className="font-mono text-[10px] text-stone-500 uppercase block font-semibold">
                    Original Erroneous Assertion (Deprecated)
                  </span>
                  <p className="line-through text-stone-600 font-serif-prose">
                    "{ret.original_claim_text}"
                  </p>
                </div>

                <div className="p-3 bg-[#fdfcf9] border border-stone-200 rounded space-y-1">
                  <span className="font-mono text-[10px] text-stone-500 uppercase block font-semibold">
                    Certified Correction
                  </span>
                  <p className="text-stone-900 font-semibold font-serif-prose">
                    "{ret.corrected_claim_text}"
                  </p>
                </div>
              </div>

              <div className="text-xs font-serif text-stone-700">
                <span className="font-semibold text-stone-900">Reason for Errata:</span> {ret.reason}
              </div>

              <div className="pt-2 border-t border-stone-100 flex flex-wrap items-center justify-between text-xs font-serif text-stone-500 gap-2">
                <span>
                  Cascading Effect: {ret.deprecated_dependent_claims.length} dependent propositions deprecated across knowledge graph.
                </span>
                <a
                  href={ret.wayback_archive_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans font-medium text-stone-800 hover:text-stone-900 underline flex items-center space-x-1"
                >
                  <span>Historical Snapshot (Wayback Machine)</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
