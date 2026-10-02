import React, { useState } from 'react';
import { RAW_ITEMS, PASSAGES, CLAIMS } from '../data/goldData';
import { Item, Passage, Claim } from '../types';
import { Layers, Terminal, SlidersHorizontal, UserCheck, Calendar, Globe, MapPin, Hash } from 'lucide-react';

export const ProvenanceInspector: React.FC = () => {
  const [selectedItemId, setSelectedItemId] = useState<string>(RAW_ITEMS[0].id);

  const selectedItem = RAW_ITEMS.find((it) => it.id === selectedItemId) || RAW_ITEMS[0];
  const itemPassages = PASSAGES.filter((p) => p.item_id === selectedItem.id);
  const itemClaims = CLAIMS.filter((c) => c.item_id === selectedItem.id);

  const getPassageBadge = (type: string) => {
    switch (type) {
      case 'observed event':
        return 'bg-blue-950 text-blue-400 border-blue-800';
      case 'quantitative':
        return 'bg-emerald-950 text-emerald-400 border-emerald-800';
      case 'attributed statement':
        return 'bg-purple-950 text-purple-400 border-purple-800';
      case 'interpretation':
        return 'bg-amber-950 text-amber-400 border-amber-800';
      case 'rhetoric':
        return 'bg-rose-950 text-rose-400 border-rose-800';
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          Claim Extraction & Exact Span Grounding Inspector
        </h1>
        <p className="mt-2 text-slate-400 text-sm max-w-3xl">
          Demonstrates Normative Principle #1 & #2: Every factual assertion anchors directly to an exact character span in the source text. Dual-layer attribution strictly isolates speaker assertions (Layer 1) from proposition content (Layer 2).
        </p>

        {/* Article selector */}
        <div className="mt-5">
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
            Select Source Item to Inspect:
          </label>
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {RAW_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => setSelectedItemId(item.id)}
                className={`px-3 py-2 rounded-xl text-xs font-mono font-medium whitespace-nowrap transition flex items-center space-x-2 ${
                  selectedItemId === item.id
                    ? 'bg-cyan-500 text-slate-950 font-bold'
                    : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                <span>{item.id}</span>
                <span className="text-[10px] opacity-75">({item.source_id})</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Selected Item Overview */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2 text-xs">
            <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800 font-mono">
              Source: {selectedItem.source_id}
            </span>
            <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
              Event: {selectedItem.event_id}
            </span>
            <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 uppercase font-mono">
              {selectedItem.article_type}
            </span>
          </div>

          <h2 className="text-xl font-bold text-white mb-2">{selectedItem.title}</h2>
          <div className="text-xs text-slate-400 flex flex-wrap gap-4">
            {selectedItem.byline && <span>Byline: {selectedItem.byline}</span>}
            {selectedItem.dateline && <span>Dateline: {selectedItem.dateline}</span>}
            <span>Captured: {new Date(selectedItem.captured_time).toLocaleString()}</span>
          </div>
        </div>

        {/* Grid: Passages and Extracted Claims */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: Raw Text with Passage Segmentation */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 pb-2 border-b border-slate-800">
              <Layers className="w-4 h-4 text-cyan-400" />
              <h3 className="font-bold text-white text-sm">Passage Segmentation ({itemPassages.length})</h3>
            </div>

            <div className="space-y-3">
              {itemPassages.map((p) => (
                <div
                  key={p.id}
                  className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-2 hover:border-slate-700 transition"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[11px] text-slate-400">{p.id}</span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] uppercase font-mono font-semibold border ${getPassageBadge(
                        p.passage_type
                      )}`}
                    >
                      {p.passage_type}
                    </span>
                  </div>

                  <p className="text-slate-200 text-sm leading-relaxed">{p.text}</p>

                  <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                    <span>Feeds Fact Base: {p.feedsFactBase ? '✅ YES' : '❌ NO (Filtered)'}</span>
                    <span>Length: {p.text.length} chars</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Extracted Atomic Claims with Exact Span Anchoring */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 pb-2 border-b border-slate-800">
              <Terminal className="w-4 h-4 text-emerald-400" />
              <h3 className="font-bold text-white text-sm">Extracted Atomic Claims ({itemClaims.length})</h3>
            </div>

            <div className="space-y-3">
              {itemClaims.map((claim) => (
                <div
                  key={claim.id}
                  className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-2 hover:border-slate-700 transition"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-cyan-400 font-semibold">{claim.id}</span>
                    <div className="flex items-center space-x-1">
                      <span className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px] font-mono">
                        Span: [{claim.span_start}:{claim.span_end}]
                      </span>
                      <span className="px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-400 text-[10px] font-mono border border-emerald-800">
                        {claim.claim_type}
                      </span>
                    </div>
                  </div>

                  {/* Dual attribution layer */}
                  {claim.attribution_speaker && (
                    <div className="p-2 rounded bg-purple-950/40 border border-purple-800/60 text-purple-300 flex items-center space-x-2">
                      <UserCheck className="w-3.5 h-3.5 shrink-0" />
                      <span>
                        <strong>Layer 1 Attribution:</strong> {claim.attribution_speaker}
                        {claim.attribution_anonymous ? ' (Anonymous)' : ''}
                      </span>
                    </div>
                  )}

                  {/* Claim Text */}
                  <div className="space-y-1">
                    <div className="text-slate-400 text-[11px] font-mono">Layer 2 Proposition:</div>
                    <p className="text-slate-100 text-sm font-medium">{claim.neutralized_wording || claim.original_wording}</p>
                  </div>

                  {/* Change Records if any */}
                  {claim.changes.length > 0 && (
                    <div className="pt-2 border-t border-slate-800/80">
                      <div className="flex items-center space-x-1 text-stone-400 text-[11px] font-medium mb-1">
                        <SlidersHorizontal className="w-3 h-3" />
                        <span>Neutralization Adjustments:</span>
                      </div>
                      {claim.changes.map((c, idx) => (
                        <div key={idx} className="text-[11px] text-slate-400">
                          Replaced <span className="line-through text-rose-400">"{c.original_span}"</span> with{' '}
                          <span className="text-emerald-400">"{c.replacement}"</span> ({c.rationale})
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Provenance chain */}
                  <div className="pt-2 border-t border-slate-800/60 font-mono text-[10px] text-slate-500">
                    Provenance: {claim.provenance_chain.join(' → ')}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
