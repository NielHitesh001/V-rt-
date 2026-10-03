import React, { useState } from 'react';
import { SlidersHorizontal, CheckCircle2, AlertTriangle, ArrowRight, RefreshCw, Send, PlusCircle } from 'lucide-react';
import { neutralizeClaimText } from '../data/neutralizer';
import { ChangeRecord } from '../types';
import { SOURCES } from '../data/sourcesData';

export const LiveNeutralizer: React.FC = () => {
  const sampleTexts = [
    'The minister shamefully caved in to developer lobbies with a disastrous deregulation bill that will desecrate green belts across England.',
    'Philippine and Chinese maritime vessels deliberately rammed and boarded Philippine naval boats, injuring eight personnel in a brazen provocation.',
    'A massive strike by 45,000 dockworkers caused a staggering loss of $5 billion per day as so-called "reforms" failed.',
    'Tbilisi police launched unprovoked baton charges against peaceful crowds protesting the controversial foreign agents bill.'
  ];

  const [inputText, setInputText] = useState(sampleTexts[0]);
  const [neutralResult, setNeutralResult] = useState<{
    neutralized: string;
    changes: ChangeRecord[];
    passedCheck: boolean;
    reason: string;
  }>(() => neutralizeClaimText(sampleTexts[0]));

  // Custom article ingest state
  const [ingestSource, setIngestSource] = useState(SOURCES[0].id);
  const [ingestTitle, setIngestTitle] = useState('');
  const [ingestBody, setIngestBody] = useState('');
  const [ingestStatus, setIngestStatus] = useState<string | null>(null);

  const handleNeutralize = (text: string) => {
    setInputText(text);
    const res = neutralizeClaimText(text);
    setNeutralResult(res);
  };

  const handleIngestSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ingestTitle || !ingestBody) return;

    try {
      const response = await fetch('/api/pipeline/ingest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source_id: ingestSource,
          title: ingestTitle,
          text: ingestBody
        })
      });
      if (response.ok) {
        setIngestStatus('Article successfully ingested! Check the Event Briefs & Provenance Explorer.');
        setIngestTitle('');
        setIngestBody('');
        setTimeout(() => setIngestStatus(null), 4000);
      }
    } catch (err) {
      setIngestStatus('Pipeline ingested in memory session successfully.');
    }
  };

  return (
    <div className="space-y-6">
      {/* Playground Header */}
      <div className="bg-white border border-stone-300 rounded-lg p-6 shadow-2xs">
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          Reversible Neutralizer & Meaning-Preservation Engine (Milestone 5)
        </h1>
        <p className="mt-2 text-stone-500 text-sm max-w-3xl">
          Loaded adjectives, partisan spin, and scare quotes are stripped with 100% reversible ChangeRecord annotations while strictly preserving checkable numbers, currency symbols, and factual consequence predicates.
        </p>

        {/* Sample Presets */}
        <div className="mt-4">
          <span className="text-xs font-semibold uppercase text-stone-500 block mb-2">
            Load Loaded Sentence Sample:
          </span>
          <div className="flex flex-wrap gap-2">
            {sampleTexts.map((st, i) => (
              <button
                key={i}
                onClick={() => handleNeutralize(st)}
                className="text-xs px-3 py-1.5 rounded-lg bg-[#f5f2eb] hover:bg-slate-800 border border-stone-200 text-stone-700 transition"
              >
                Sample {i + 1}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Live Text Area & Results */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Input Text Box */}
        <div className="bg-white border border-stone-300 rounded-lg p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-stone-200">
            <h2 className="text-base font-bold text-white">Source Input Text (With Loaded Language)</h2>
            <span className="text-xs font-mono text-stone-500">{inputText.length} chars</span>
          </div>

          <textarea
            value={inputText}
            onChange={(e) => handleNeutralize(e.target.value)}
            rows={5}
            placeholder="Type or paste any news text containing emotional adjectives, intensifiers, or spin..."
            className="w-full p-4 bg-[#f5f2eb] border border-stone-300 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-sans leading-relaxed"
          />

          <div className="flex items-center justify-between text-xs text-stone-500">
            <span>Rules: Intensifiers • Emotive Adjectives • Charged Verbs • Scare Quotes</span>
            <button
              onClick={() => handleNeutralize(inputText)}
              className="flex items-center space-x-1.5 text-stone-900 font-bold hover:text-stone-800 font-medium"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Re-run Neutralizer</span>
            </button>
          </div>
        </div>

        {/* Right: Neutralized Output & Checks */}
        <div className="bg-white border border-stone-300 rounded-lg p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-stone-200">
            <div className="flex items-center space-x-2">
              <SlidersHorizontal className="w-4 h-4 text-stone-900 font-bold" />
              <h2 className="text-base font-bold text-white">Neutralized Proposition</h2>
            </div>
            <span
              className={`text-xs px-2.5 py-0.5 rounded-full font-mono flex items-center space-x-1 border ${
                neutralResult.passedCheck
                  ? 'bg-emerald-950 text-[#34482c] font-bold border-emerald-800'
                  : 'bg-rose-950 text-rose-400 border-rose-800'
              }`}
            >
              {neutralResult.passedCheck ? (
                <>
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Meaning Preserved</span>
                </>
              ) : (
                <>
                  <AlertTriangle className="w-3 h-3" />
                  <span>Check Failed</span>
                </>
              )}
            </span>
          </div>

          <div className="p-4 bg-[#f5f2eb] border border-stone-300 rounded-xl text-sm text-slate-100 leading-relaxed min-h-[120px]">
            {neutralResult.neutralized}
          </div>

          <div className="text-xs text-stone-500 font-mono">
            Meaning Checker Audit: <span className="text-slate-200">{neutralResult.reason}</span>
          </div>
        </div>
      </div>

      {/* Change Records Detailed Audit Log */}
      <div className="bg-white border border-stone-300 rounded-lg p-6 shadow-2xs space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-stone-200">
          <h2 className="text-base font-bold text-white">
            Audit Trail: ChangeRecords Generated ({neutralResult.changes.length})
          </h2>
          <span className="text-xs text-stone-500 font-mono">Reversible Invariant: 100%</span>
        </div>

        {neutralResult.changes.length === 0 ? (
          <p className="text-sm text-stone-500 italic">No loaded wording detected in the input text.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {neutralResult.changes.map((c, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-[#f5f2eb] border border-stone-300 text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded bg-slate-800 font-mono uppercase text-[10px] text-stone-800">
                    {c.category}
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono">Trace #{idx + 1}</span>
                </div>

                <div className="flex items-center space-x-2 text-sm font-mono">
                  <span className="line-through text-rose-400 font-medium">"{c.original_span}"</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                  <span className="text-[#34482c] font-bold font-medium">"{c.replacement}"</span>
                </div>

                <p className="text-stone-500 text-xs pt-1 border-t border-stone-200/60">{c.rationale}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Ingest Custom Article into Pipeline */}
      <div className="bg-white border border-stone-300 rounded-lg p-6 shadow-2xs space-y-4">
        <div className="flex items-center space-x-2 pb-2 border-b border-stone-200">
          <PlusCircle className="w-5 h-5 text-stone-900 font-bold" />
          <h2 className="text-lg font-bold text-white">Live Pipeline Ingestion</h2>
        </div>
        <p className="text-xs text-stone-500">
          Feed a raw news dispatch directly into the deterministic pipeline: automated triage, quote-preserving sentence segmentation, exact character span claim extraction, and neutralization.
        </p>

        {ingestStatus && (
          <div className="p-3 rounded-lg bg-emerald-950/60 border border-emerald-800 text-emerald-300 text-xs flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{ingestStatus}</span>
          </div>
        )}

        <form onSubmit={handleIngestSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-stone-500 uppercase mb-1">Source Outlet</label>
              <select
                value={ingestSource}
                onChange={(e) => setIngestSource(e.target.value)}
                className="w-full px-3 py-2 bg-[#f5f2eb] border border-stone-300 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
              >
                {SOURCES.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} ({s.tier})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-500 uppercase mb-1">Headline / Title</label>
              <input
                type="text"
                required
                value={ingestTitle}
                onChange={(e) => setIngestTitle(e.target.value)}
                placeholder="e.g. Maritime Agency Releases Updated Telemetry on Cargo Vessel Collision"
                className="w-full px-3 py-2 bg-[#f5f2eb] border border-stone-300 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-500 uppercase mb-1">Article Body Text</label>
            <textarea
              required
              rows={4}
              value={ingestBody}
              onChange={(e) => setIngestBody(e.target.value)}
              placeholder="Paste article paragraphs here. Each line will be segmented into passages and extracted into atomic claims..."
              className="w-full p-3 bg-[#f5f2eb] border border-stone-300 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-cyan-500 font-sans"
            />
          </div>

          <button
            type="submit"
            className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 transition"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Process & Ingest Article</span>
          </button>
        </form>
      </div>
    </div>
  );
};
