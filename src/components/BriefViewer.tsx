import React, { useState, useEffect } from 'react';
import {
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Copy,
  Check,
  Calendar,
  Layers,
  HelpCircle,
  Clock,
  SlidersHorizontal
} from 'lucide-react';
import { Brief, EventSummary } from '../types';
import { EVENTS } from '../data/goldData';
import { generateEventBrief } from '../data/corroboration';

export const BriefViewer: React.FC = () => {
  const [selectedEventId, setSelectedEventId] = useState<string>('event-key-bridge-01');
  const [brief, setBrief] = useState<Brief | null>(null);
  const [copied, setCopied] = useState(false);
  const [expandedFactId, setExpandedFactId] = useState<string | null>(null);

  useEffect(() => {
    try {
      const generated = generateEventBrief(selectedEventId);
      setBrief(generated);
    } catch (err) {
      console.error(err);
    }
  }, [selectedEventId]);

  if (!brief) {
    return <div className="p-8 text-center text-slate-400">Loading brief...</div>;
  }

  const handleCopyMarkdown = () => {
    const mdLines = [
      `# ${brief.neutral_headline}`,
      `> **Event ID**: \`${brief.event_id}\``,
      `> **Diversity Compliance**: ${brief.diversity_compliant ? '✅ COMPLIANT' : '⚠️ DEFICIENT'}`,
      brief.diversity_deficiencies.map((d) => `> - ⚠️ *${d}*`).join('\n'),
      '',
      '---',
      '',
      '## 1. Core Verified Facts',
      ...brief.core_facts.map(
        (f) =>
          `- [Tier ${f.tier}] ${f.text}\n  - Sources: ${f.supporting_source_ids.join(', ')}\n  - Attribution: ${
            f.attribution_speaker || 'Direct Reporting'
          }`
      ),
      '',
      '## 2. Disputed Points',
      ...brief.disputed_points.map(
        (dp) =>
          `### ⚡ ${dp.topic}\n*${dp.explanation}*\n` +
          dp.claims
            .map((c) => `- **${c.text}** (Source: ${c.supporting_source_ids.join(', ')}, Speaker: ${c.attribution_speaker})`)
            .join('\n')
      ),
      '',
      '## 3. Single-Source Context',
      ...brief.single_source_facts.map((f) => `- [Tier 3] ${f.text} (Source: ${f.supporting_source_ids.join(', ')})`),
      '',
      '## 4. Known Unknowns',
      ...brief.unknowns.map((u) => `- ❓ ${u}`),
      '',
      '## 5. Timeline',
      ...brief.timeline.map((t) => `- **${t.timestamp_str}**: ${t.description} [${t.source_ids.join(', ')}]`)
    ];

    navigator.clipboard.writeText(mdLines.join('\n'));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getEventKindBadge = (kind: string) => {
    switch (kind) {
      case 'hard-fact':
        return <span className="px-2.5 py-1 text-xs rounded-full bg-blue-900/40 text-blue-300 border border-blue-700/60 font-medium">Hard Fact</span>;
      case 'numeric':
        return <span className="px-2.5 py-1 text-xs rounded-full bg-emerald-900/40 text-emerald-300 border border-emerald-700/60 font-medium">Numeric Tally</span>;
      case 'contested':
        return <span className="px-2.5 py-1 text-xs rounded-full bg-amber-900/40 text-amber-300 border border-amber-700/60 font-medium">Contested / Disputed</span>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Event Selection Bar */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 shadow-sm">
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
          Select Event from Gold Corpus ({EVENTS.length} Benchmark Events):
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
          {EVENTS.map((e) => {
            const isSelected = e.id === selectedEventId;
            return (
              <button
                key={e.id}
                onClick={() => setSelectedEventId(e.id)}
                className={`text-left p-3 rounded-lg border text-sm transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'bg-cyan-950/60 border-cyan-500/80 text-cyan-200 shadow-sm shadow-cyan-500/10'
                    : 'bg-slate-800/40 border-slate-700/60 text-slate-300 hover:bg-slate-800 hover:border-slate-600'
                }`}
              >
                <div className="font-semibold line-clamp-1">{e.label}</div>
                <div className="flex items-center justify-between mt-2 text-xs">
                  <span className="font-mono text-slate-400">{e.id}</span>
                  <div className="flex items-center space-x-1.5">
                    {e.has_disputes && (
                      <span className="px-1.5 py-0.5 rounded bg-amber-950 text-amber-400 text-[10px] border border-amber-800 font-mono">
                        Disputes
                      </span>
                    )}
                    <span className="px-1.5 py-0.5 rounded bg-slate-700 text-slate-300 text-[10px] font-mono">
                      {e.article_count} item{e.article_count > 1 ? 's' : ''}
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Event Brief Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        {/* Brief Header */}
        <div className="p-6 border-b border-slate-800 bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-850">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
            <div className="flex items-center space-x-2">
              {getEventKindBadge(brief.event_kind)}
              <span className="font-mono text-xs text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                {brief.event_id}
              </span>
            </div>
            <button
              onClick={handleCopyMarkdown}
              className="flex items-center space-x-1.5 text-xs font-medium px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
              <span>{copied ? 'Copied Markdown' : 'Copy Brief (Markdown)'}</span>
            </button>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight">
            {brief.neutral_headline}
          </h1>

          {/* Diversity Compliance Notice */}
          <div className="mt-4 flex items-start space-x-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-xs">
            {brief.diversity_compliant ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            ) : (
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            )}
            <div>
              <div className="font-semibold text-slate-200 flex items-center space-x-2">
                <span>Source Diversity Audit:</span>
                <span
                  className={
                    brief.diversity_compliant ? 'text-emerald-400' : 'text-amber-400'
                  }
                >
                  {brief.diversity_compliant ? '✅ Fully Compliant with Quotas' : '⚠️ Deficiencies Flagged'}
                </span>
              </div>
              {brief.diversity_deficiencies.length > 0 ? (
                <ul className="mt-1 space-y-0.5 text-slate-400 list-disc list-inside">
                  {brief.diversity_deficiencies.map((d, i) => (
                    <li key={i}>{d}</li>
                  ))}
                </ul>
              ) : (
                <p className="mt-0.5 text-slate-400">
                  Meets mandatory primary source presence, independent reporting origin count, and regional distribution standards.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Sections */}
        <div className="p-6 space-y-8">
          {/* Section 1: Core Verified Facts */}
          <div>
            <div className="flex items-center space-x-2 pb-2 mb-4 border-b border-slate-800">
              <span className="w-6 h-6 rounded-md bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs">
                1
              </span>
              <h2 className="text-lg font-bold text-white tracking-tight">Core Verified Facts</h2>
              <span className="text-xs text-slate-400 font-mono">
                ({brief.core_facts.length} corroborated assertions)
              </span>
            </div>

            {brief.core_facts.length === 0 ? (
              <p className="text-sm text-slate-400 italic">No Tier 1 or Tier 2 corroborated facts established yet.</p>
            ) : (
              <div className="space-y-3">
                {brief.core_facts.map((fact) => {
                  const isExpanded = expandedFactId === fact.claim_id;
                  const isTier1 = fact.tier === 1;

                  return (
                    <div
                      key={fact.claim_id}
                      className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 hover:border-slate-700 transition"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="space-y-1.5 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span
                              className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                                isTier1
                                  ? 'bg-emerald-950 text-emerald-400 border-emerald-800'
                                  : 'bg-blue-950 text-blue-400 border-blue-800'
                              }`}
                            >
                              {isTier1 ? '🟢 Tier 1: Primary Confirmed' : '🔵 Tier 2: Corroborated'}
                            </span>

                            {fact.attribution_speaker && (
                              <span className="text-[11px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700 font-medium">
                                Attribution: {fact.attribution_speaker}
                              </span>
                            )}

                            <span className="text-[11px] font-mono text-slate-400">
                              {fact.independent_source_count} independent origin(s)
                            </span>
                          </div>

                          <p className="text-slate-100 text-sm sm:text-base font-normal leading-relaxed pt-1">
                            {fact.text}
                          </p>
                        </div>

                        {fact.changes.length > 0 && (
                          <button
                            onClick={() => setExpandedFactId(isExpanded ? null : fact.claim_id)}
                            className="text-xs text-stone-400 hover:text-stone-300 flex items-center space-x-1 shrink-0 p-1 rounded hover:bg-slate-800 transition"
                            title="View neutralization changes"
                          >
                            <SlidersHorizontal className="w-3.5 h-3.5" />
                            <span className="hidden sm:inline">
                              {fact.changes.length} neutral adjustment{fact.changes.length > 1 ? 's' : ''}
                            </span>
                            {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                          </button>
                        )}
                      </div>

                      {/* Expandable Neutralization Provenance Card */}
                      {isExpanded && fact.changes.length > 0 && (
                        <div className="mt-3 pt-3 border-t border-slate-800 space-y-2 text-xs bg-slate-900/90 p-3 rounded-lg">
                          <div className="font-semibold text-stone-300 flex items-center space-x-1.5">
                            <SlidersHorizontal className="w-3.5 h-3.5" />
                            <span>Reversible Neutralization Audit Trail (100% Meaning Preserved):</span>
                          </div>
                          <div className="text-slate-400 font-mono text-[11px]">
                            Original: <span className="text-slate-200">"{fact.original_text}"</span>
                          </div>
                          <div className="space-y-1 mt-1">
                            {fact.changes.map((change, cIdx) => (
                              <div key={cIdx} className="p-2 rounded bg-slate-950 border border-slate-800 flex flex-col gap-1">
                                <div className="flex items-center justify-between">
                                  <span className="font-mono text-rose-400 line-through">
                                    "{change.original_span}"
                                  </span>
                                  <span className="text-slate-400">→</span>
                                  <span className="font-mono text-emerald-400 font-medium">
                                    "{change.replacement}"
                                  </span>
                                  <span className="px-1.5 py-0.5 rounded bg-slate-800 text-[10px] text-slate-400 uppercase font-mono">
                                    {change.category}
                                  </span>
                                </div>
                                <div className="text-slate-400 italic text-[11px]">
                                  Rationale: {change.rationale}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Source Footnotes & Links */}
                      <div className="mt-2.5 flex flex-wrap items-center gap-2 text-xs text-slate-400">
                        <span className="font-medium text-slate-300">Sources:</span>
                        {fact.supporting_source_ids.map((srcId) => (
                          <span key={srcId} className="px-2 py-0.5 rounded bg-slate-800/80 text-cyan-300 font-mono text-[11px] border border-slate-700/60">
                            {srcId}
                          </span>
                        ))}
                        {fact.item_urls.map((url, uIdx) => (
                          <a
                            key={uIdx}
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center space-x-1 text-cyan-400 hover:text-cyan-300 hover:underline ml-1"
                          >
                            <span>Link</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Section 2: Disputed Points (Side-by-Side Comparison) */}
          {brief.disputed_points.length > 0 && (
            <div>
              <div className="flex items-center space-x-2 pb-2 mb-4 border-b border-amber-800/60">
                <span className="w-6 h-6 rounded-md bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xs">
                  2
                </span>
                <h2 className="text-lg font-bold text-white tracking-tight">
                  Disputed Points (Side-by-Side Comparison)
                </h2>
                <span className="text-xs text-amber-400 font-mono">
                  ({brief.disputed_points.length} direct conflict detected)
                </span>
              </div>

              <div className="space-y-4">
                {brief.disputed_points.map((dp, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-amber-950/20 border border-amber-800/40">
                    <div className="flex items-center space-x-2 text-amber-300 font-semibold mb-1">
                      <AlertTriangle className="w-4 h-4 text-amber-400" />
                      <span>⚡ {dp.topic}</span>
                    </div>
                    <p className="text-xs text-slate-400 mb-4">{dp.explanation}</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {dp.claims.map((claim, cIdx) => (
                        <div
                          key={cIdx}
                          className="p-3.5 rounded-lg bg-slate-900 border border-slate-800 flex flex-col justify-between"
                        >
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-xs font-semibold text-cyan-400">
                                {claim.attribution_speaker || 'Reported Position'}
                              </span>
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                                {claim.supporting_source_ids.join(', ')}
                              </span>
                            </div>
                            <p className="text-sm font-medium text-slate-100 mb-2">"{claim.text}"</p>
                          </div>
                          {claim.original_text && claim.original_text !== claim.text && (
                            <div className="text-[11px] text-slate-500 italic border-t border-slate-800/60 pt-2">
                              Original wording: "{claim.original_text}"
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section 3: Single-Source Context (Tier 3) */}
          {brief.single_source_facts.length > 0 && (
            <div>
              <div className="flex items-center space-x-2 pb-2 mb-4 border-b border-slate-800">
                <span className="w-6 h-6 rounded-md bg-yellow-500/20 text-yellow-400 flex items-center justify-center font-bold text-xs">
                  3
                </span>
                <h2 className="text-lg font-bold text-white tracking-tight">Single-Source Context (Tier 3)</h2>
                <span className="text-xs text-slate-400 font-mono">
                  ({brief.single_source_facts.length} uncorroborated report)
                </span>
              </div>

              <div className="space-y-2">
                {brief.single_source_facts.map((fact) => (
                  <div key={fact.claim_id} className="p-3 rounded-lg bg-slate-950/60 border border-slate-800 text-sm flex items-start space-x-3">
                    <span className="text-yellow-400 font-mono text-xs mt-0.5 font-bold">[Tier 3]</span>
                    <div className="flex-1">
                      <p className="text-slate-200">{fact.text}</p>
                      <div className="mt-1 flex items-center space-x-2 text-xs text-slate-400 font-mono">
                        <span>Source: {fact.supporting_source_ids.join(', ')}</span>
                        {fact.attribution_speaker && <span>• Speaker: {fact.attribution_speaker}</span>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section 4: Known Unknowns & Reporting Gaps */}
          <div>
            <div className="flex items-center space-x-2 pb-2 mb-4 border-b border-slate-800">
              <span className="w-6 h-6 rounded-md bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold text-xs">
                4
              </span>
              <h2 className="text-lg font-bold text-white tracking-tight">Known Unknowns & Reporting Gaps</h2>
            </div>

            {brief.unknowns.length === 0 ? (
              <p className="text-sm text-slate-400 italic">No outstanding reporting gaps flagged.</p>
            ) : (
              <ul className="space-y-2">
                {brief.unknowns.map((unk, i) => (
                  <li key={i} className="flex items-start space-x-2.5 text-sm text-slate-300 p-2.5 rounded-lg bg-slate-950/40 border border-slate-800">
                    <HelpCircle className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                    <span>{unk}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Section 5: Timeline of Verified Events */}
          <div>
            <div className="flex items-center space-x-2 pb-2 mb-4 border-b border-slate-800">
              <span className="w-6 h-6 rounded-md bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-xs">
                5
              </span>
              <h2 className="text-lg font-bold text-white tracking-tight">Timeline of Verified Events</h2>
            </div>

            <div className="relative pl-6 space-y-4 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-800">
              {brief.timeline.map((entry, idx) => (
                <div key={idx} className="relative">
                  <div className="absolute -left-6 top-1.5 w-3 h-3 rounded-full bg-cyan-500 border-2 border-slate-900 shadow"></div>
                  <div className="bg-slate-950/80 border border-slate-800 rounded-lg p-3">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="font-mono text-cyan-400 font-medium flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{entry.timestamp_str}</span>
                      </span>
                      <span className="font-mono text-slate-400">{entry.source_ids.join(', ')}</span>
                    </div>
                    <p className="text-sm text-slate-200">{entry.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 6: Source Diversity & Provenance Audit */}
          <div>
            <div className="flex items-center space-x-2 pb-2 mb-4 border-b border-slate-800">
              <span className="w-6 h-6 rounded-md bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-xs">
                6
              </span>
              <h2 className="text-lg font-bold text-white tracking-tight">Source Diversity & Provenance Ledger</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {brief.source_ledger.map((s) => (
                <div key={s.source_id} className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-mono font-semibold text-slate-300">{s.source_id}</span>
                      <span
                        className={`px-1.5 py-0.5 rounded uppercase font-mono text-[10px] font-bold ${
                          s.tier === 'primary'
                            ? 'bg-blue-950 text-blue-400 border border-blue-800'
                            : 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                        }`}
                      >
                        {s.tier}
                      </span>
                    </div>
                    <div className="text-slate-100 font-medium text-sm mb-2">{s.name}</div>
                  </div>
                  <div className="border-t border-slate-800/80 pt-2 flex items-center justify-between text-slate-400">
                    <span>Independent origin:</span>
                    <span className="text-emerald-400 font-medium">
                      {s.independent_origin ? 'Yes (Primary Root)' : 'No (Syndicated)'}
                    </span>
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
