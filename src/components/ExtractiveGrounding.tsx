import React, { useState } from 'react';
import { RAW_ITEMS, PASSAGES, CLAIMS } from '../data/goldData';
import { Terminal, Layers, SlidersHorizontal, UserCheck } from 'lucide-react';

export const ExtractiveGrounding: React.FC = () => {
  const [selectedItemId, setSelectedItemId] = useState<string>(RAW_ITEMS[0].id);

  const selectedItem = RAW_ITEMS.find((it) => it.id === selectedItemId) || RAW_ITEMS[0];
  const itemPassages = PASSAGES.filter((p) => p.item_id === selectedItem.id);
  const itemClaims = CLAIMS.filter((c) => c.item_id === selectedItem.id);

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-stone-300 gap-3">
        <div>
          <div className="text-[11px] font-mono uppercase tracking-widest text-stone-500 font-semibold">
            Milestone 4 & Milestone 5 · Extractive First & Meaning Preservation
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif-editorial font-bold text-stone-900">
            M4 Extractive Grounding Workspace
          </h1>
        </div>
        <div className="text-xs font-mono text-stone-600">
          Span F1 = 1.000 · Meaning Retention = 100%
        </div>
      </div>

      {/* Item Selector */}
      <div className="flex space-x-2 overflow-x-auto pb-2 border-b border-stone-200">
        {RAW_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => setSelectedItemId(item.id)}
            className={`px-3 py-1.5 text-xs font-mono rounded whitespace-nowrap transition border ${
              selectedItemId === item.id
                ? 'bg-stone-900 text-stone-100 border-stone-900 font-semibold shadow-xs'
                : 'bg-white text-stone-600 border-stone-300 hover:text-stone-900 hover:border-stone-400'
            }`}
          >
            <span>{item.id}</span>
            <span className="text-[10px] ml-1.5 opacity-75">({item.source_id})</span>
          </button>
        ))}
      </div>

      {/* Selected Article Meta */}
      <div className="p-4 bg-white border border-stone-300 rounded shadow-xs space-y-1">
        <div className="flex items-center space-x-2 text-xs font-mono text-stone-500">
          <span className="font-semibold text-stone-800 uppercase">SOURCE: {selectedItem.source_id}</span>
          <span>·</span>
          <span>ARTICLE TYPE: {selectedItem.article_type}</span>
          <span>·</span>
          <span>EVENT: {selectedItem.event_id}</span>
        </div>
        <h2 className="text-xl font-serif-editorial font-bold text-stone-900">{selectedItem.title}</h2>
        <div className="text-xs font-serif text-stone-600 italic">
          {selectedItem.dateline} {selectedItem.byline && `— By ${selectedItem.byline}`}
        </div>
      </div>

      {/* Dual Panel Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Passages List */}
        <div className="lg:col-span-6 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-stone-200">
            <h3 className="font-serif-editorial font-bold text-stone-900 text-base flex items-center space-x-2">
              <Layers className="w-4 h-4 text-stone-700" />
              <span>Passage Segmentation & Triage Routing</span>
            </h3>
            <span className="text-xs font-mono text-stone-500">{itemPassages.length} Passages</span>
          </div>

          <div className="space-y-3">
            {itemPassages.map((p) => (
              <div key={p.id} className="p-3.5 bg-white border border-stone-300 rounded shadow-xs space-y-2 text-xs">
                <div className="flex items-center justify-between font-mono text-[11px]">
                  <span className="font-semibold text-stone-700">{p.id}</span>
                  <span className="px-1.5 py-0.5 rounded bg-stone-100 text-stone-700 uppercase text-[10px]">
                    {p.passage_type}
                  </span>
                </div>
                <p className="font-serif-prose text-stone-900 text-sm leading-relaxed">{p.text}</p>
                <div className="flex items-center justify-between text-[11px] text-stone-500 pt-1 border-t border-stone-100">
                  <span>Routing: {p.feeds_fact_base ? '✅ Feeds Fact Base' : '❌ Filtered / Rhetoric'}</span>
                  <span className="font-mono">{p.text.length} chars</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Claims & Exact Spans */}
        <div className="lg:col-span-6 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-stone-200">
            <h3 className="font-serif-editorial font-bold text-stone-900 text-base flex items-center space-x-2">
              <Terminal className="w-4 h-4 text-stone-700" />
              <span>Grounded Atomic Claims (Dual Attribution)</span>
            </h3>
            <span className="text-xs font-mono text-stone-500">{itemClaims.length} Grounded</span>
          </div>

          <div className="space-y-3">
            {itemClaims.map((claim) => (
              <div key={claim.id} className="p-3.5 bg-white border border-stone-300 rounded shadow-xs space-y-2.5 text-xs">
                <div className="flex items-center justify-between font-mono text-[11px]">
                  <span className="font-bold text-stone-900">{claim.id}</span>
                  <span className="bg-stone-100 px-2 py-0.5 rounded text-stone-700 font-semibold">
                    Span [{claim.span_start}:{claim.span_end}]
                  </span>
                </div>

                {claim.attribution_speaker && (
                  <div className="p-2 bg-stone-100/80 border border-stone-200 rounded font-serif text-stone-800 flex items-center space-x-2">
                    <UserCheck className="w-3.5 h-3.5 text-stone-600 shrink-0" />
                    <span>
                      <strong>Layer 1 Attribution:</strong> {claim.attribution_speaker}
                    </span>
                  </div>
                )}

                <div className="font-serif-prose text-stone-900 text-sm leading-relaxed">
                  <div className="text-[10px] font-mono text-stone-400 uppercase">Layer 2 Proposition Content:</div>
                  <div className="font-medium pt-0.5">{claim.neutralized_wording || claim.original_wording}</div>
                </div>

                {claim.changes.length > 0 && (
                  <div className="p-2.5 bg-[#fcfbf7] border border-stone-200 rounded font-mono text-[11px] space-y-1">
                    <div className="font-semibold text-stone-600 flex items-center space-x-1">
                      <SlidersHorizontal className="w-3 h-3 text-stone-500" />
                      <span>M5 Reversible Neutralization Diff:</span>
                    </div>
                    {claim.changes.map((c, ci) => (
                      <div key={ci} className="pt-1">
                        <span className="line-through text-rose-700 bg-rose-50 px-1 py-0.2 rounded">"{c.original_span}"</span>
                        <span className="mx-1 text-stone-400">→</span>
                        <span className="text-emerald-800 bg-emerald-50 px-1 py-0.2 rounded font-bold">"{c.replacement}"</span>
                        <div className="text-stone-500 text-[10px] mt-0.5">Rationale: {c.rationale}</div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="font-mono text-[10px] text-stone-400 pt-1 border-t border-stone-100">
                  Provenance Chain: {claim.provenance_chain.join(' → ')}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
