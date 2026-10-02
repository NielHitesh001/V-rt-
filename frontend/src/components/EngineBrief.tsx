import React, { useState, useEffect } from 'react';
import {
  ExternalLink,
  Copy,
  Check,
  Calendar,
  GitBranch,
  UserCheck,
  Clock,
  ChevronRight,
  Network
} from 'lucide-react';
import { Brief } from '../types';
import { EVENTS } from '../data/goldData';
import { generateEventBrief } from '../data/corroboration';
import {
  CLAIM_EVOLUTIONS,
  SYNDICATION_TRACES,
  NARRATIVE_NODES,
  STAKEHOLDER_RECORDS
} from '../data/enhancementsData';

interface EngineBriefProps {
  initialEventId?: string;
  onNavigateToWorkspace?: () => void;
}

export const EngineBrief: React.FC<EngineBriefProps> = ({ initialEventId = 'event-key-bridge-01' }) => {
  const [selectedEventId, setSelectedEventId] = useState<string>(initialEventId);
  const [brief, setBrief] = useState<Brief | null>(null);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'report' | 'evolution' | 'syndication' | 'narrative' | 'stakeholders'>('report');

  useEffect(() => {
    try {
      const generated = generateEventBrief(selectedEventId);
      setBrief(generated);
    } catch (err) {
      console.error(err);
    }
  }, [selectedEventId]);

  if (!brief) {
    return <div className="p-8 text-center text-stone-500 font-serif">Loading news dossier...</div>;
  }

  const handleCopyText = () => {
    const sourcesList = brief.source_ledger.map((s) => s.name || s.source_id).join(', ');
    const textLines = [
      brief.neutral_headline,
      '='.repeat(brief.neutral_headline.length),
      `Published: ${new Date(brief.created_at).toLocaleDateString()}`,
      `Reporting Sources: ${sourcesList}`,
      '',
      'KEY VERIFIED FACTS:',
      ...brief.core_facts.map((f, i) => `${i + 1}. ${f.text}`),
      '',
      ...(brief.timeline.length > 0
        ? [
            'CHRONOLOGY OF EVENTS:',
            ...brief.timeline.map((t) => `- ${t.timestamp_str}: ${t.description}`),
            ''
          ]
        : [])
    ];
    navigator.clipboard.writeText(textLines.join('\n'));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const currentEvent = EVENTS.find((e) => e.id === selectedEventId) || EVENTS[0];
  const matchingEvolutions = CLAIM_EVOLUTIONS;
  const matchingSyndications = SYNDICATION_TRACES.filter((s) => s.event_id === selectedEventId);
  const matchingNarratives = NARRATIVE_NODES.filter((n) => n.event_id === selectedEventId);
  const matchingStakeholders = STAKEHOLDER_RECORDS.filter((s) => s.event_id === selectedEventId);

  return (
    <div className="space-y-6 max-w-5xl mx-auto font-sans">
      {/* Top Story Selector & Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-stone-300 gap-3">
        <div>
          <div className="text-[11px] font-mono uppercase tracking-widest text-stone-500 font-semibold">
            The Veracity Archive · Verified News Dossier
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif-editorial font-bold text-stone-900">
            Verified Event Dossier & In-Depth Report
          </h1>
        </div>

        <div className="flex items-center space-x-2">
          <label className="text-xs font-serif text-stone-600 font-medium">Select Story:</label>
          <select
            value={selectedEventId}
            onChange={(e) => setSelectedEventId(e.target.value)}
            className="px-3 py-1.5 text-xs font-serif bg-white border border-stone-300 rounded shadow-2xs text-stone-900 focus:outline-none focus:border-stone-500 cursor-pointer max-w-xs sm:max-w-sm truncate"
          >
            {EVENTS.map((e) => (
              <option key={e.id} value={e.id}>
                {e.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main News Article Container */}
      <article className="bg-white border border-stone-300 rounded-lg shadow-sm overflow-hidden">
        {/* Story Masthead Banner */}
        <header className="p-6 sm:p-8 border-b border-stone-200 bg-[#faf8f5] space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-serif text-stone-600">
            <div className="flex items-center space-x-2">
              <Calendar className="w-3.5 h-3.5 text-stone-500" />
              <span>{new Date(brief.created_at).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
              <span>·</span>
              <span className="capitalize">{currentEvent.kind.replace('-', ' ')} News</span>
            </div>

            <button
              onClick={handleCopyText}
              className="flex items-center space-x-1.5 px-3 py-1 bg-white border border-stone-300 rounded text-stone-700 hover:text-stone-900 shadow-2xs text-xs font-sans font-medium transition cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-stone-800" /> : <Copy className="w-3.5 h-3.5 text-stone-500" />}
              <span>{copied ? 'Story Copied' : 'Copy Clean News Report'}</span>
            </button>
          </div>

          <h2 className="text-3xl sm:text-4xl font-serif-editorial font-bold text-stone-900 leading-tight">
            {brief.neutral_headline}
          </h2>

          <div className="pt-2 border-t border-stone-200 text-xs font-serif text-stone-600 flex flex-wrap items-center gap-x-4 gap-y-1">
            <span className="font-semibold text-stone-900">Reporting Sources:</span>
            <span>{brief.source_ledger.map((s) => s.name || s.source_id).join(', ')}</span>
            <span className="text-stone-300">|</span>
            <span>Corroborated across independent records</span>
          </div>

          {/* Dossier Tabs (Items 4, 8, 10, 11) */}
          <div className="pt-2 flex items-center space-x-1 border-t border-stone-200 text-xs font-sans overflow-x-auto">
            {[
              { id: 'report', label: 'News Report' },
              { id: 'evolution', label: 'Claim Evolution Timeline' },
              { id: 'syndication', label: 'Syndication Origin' },
              { id: 'narrative', label: 'Narrative Reconstruction' },
              { id: 'stakeholders', label: 'Stakeholder Statements' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3 py-1.5 rounded transition cursor-pointer whitespace-nowrap text-xs ${
                  activeTab === tab.id
                    ? 'bg-stone-900 text-stone-100 font-semibold shadow-2xs'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </header>

        {/* Tab 1: Standard Clean News Report */}
        {activeTab === 'report' && (
          <div className="p-6 sm:p-8 space-y-8">
            <section className="space-y-3">
              <h3 className="font-serif-editorial font-bold text-stone-900 text-xl border-b border-stone-200 pb-2">
                Executive News Summary
              </h3>
              <div className="font-serif-prose text-stone-900 text-base leading-relaxed space-y-3 text-justify">
                <p>{brief.core_facts.length > 0 && brief.core_facts[0].text}</p>
                {brief.core_facts.length > 1 && (
                  <p>{brief.core_facts.slice(1, 3).map((f) => f.text).join(' ')}</p>
                )}
              </div>
            </section>

            <section className="space-y-4">
              <div className="flex items-center justify-between border-b border-stone-200 pb-2">
                <h3 className="font-serif-editorial font-bold text-stone-900 text-xl">
                  Verified Factual Developments
                </h3>
                <span className="text-xs font-serif text-stone-500">
                  {brief.core_facts.length} Verified Propositions
                </span>
              </div>

              <div className="space-y-3">
                {brief.core_facts.map((fact, idx) => (
                  <div
                    key={fact.claim_id}
                    className="p-4 rounded border border-stone-200 bg-[#fdfcf9] space-y-2"
                  >
                    <div className="flex items-start space-x-3">
                      <span className="font-serif font-bold text-stone-400 text-sm mt-0.5">
                        {idx + 1}.
                      </span>
                      <div className="space-y-1.5 flex-1">
                        <p className="font-serif-prose text-sm text-stone-900 leading-relaxed font-medium">
                          {fact.text}
                        </p>

                        <div className="text-xs font-serif text-stone-500 flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-stone-100">
                          <div className="flex items-center space-x-2">
                            {fact.attribution_speaker && (
                              <span>Attributed by <strong>{fact.attribution_speaker}</strong></span>
                            )}
                            {fact.attribution_speaker && <span>·</span>}
                            <span>Source: {fact.supporting_source_ids.join(', ')}</span>
                          </div>

                          {fact.item_urls.length > 0 && (
                            <a
                              href={fact.item_urls[0]}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:text-stone-900 underline flex items-center space-x-1"
                            >
                              <span>Read Original Dispatch</span>
                              <ExternalLink className="w-3 h-3 text-stone-400" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* Tab 2: Interactive Claim Evolution (Item 4) */}
        {activeTab === 'evolution' && (
          <div className="p-6 sm:p-8 space-y-6">
            <div className="border-b border-stone-200 pb-2">
              <h3 className="font-serif-editorial font-bold text-stone-900 text-xl flex items-center space-x-2">
                <GitBranch className="w-5 h-5 text-stone-700" />
                <span>Interactive Claim Evolution & Framing Shift Timeline</span>
              </h3>
              <p className="text-xs font-serif text-stone-600">
                Visual timeline tracking when claims first broke, wire syndication variants, and eventual factual consensus
              </p>
            </div>

            <div className="space-y-6">
              {matchingEvolutions.map((evo) => (
                <div key={evo.claim_id} className="p-5 bg-[#fdfcf9] border border-stone-300 rounded-lg space-y-4">
                  <div className="flex items-center justify-between text-xs font-serif text-stone-500 border-b border-stone-200 pb-2">
                    <span className="font-bold text-stone-900 text-sm">{evo.topic}</span>
                    <span>First Reported: {new Date(evo.origin_time).toLocaleString()}</span>
                  </div>

                  <div className="relative pl-6 space-y-4 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-stone-300">
                    {evo.milestones.map((m, mIdx) => (
                      <div key={mIdx} className="relative text-xs">
                        <div className="absolute -left-6 top-1 w-2.5 h-2.5 rounded-full bg-stone-900 border-2 border-white"></div>
                        <div className="p-3 bg-white border border-stone-200 rounded space-y-1">
                          <div className="flex items-center justify-between font-serif text-stone-500 text-[11px]">
                            <span className="font-semibold text-stone-800 uppercase">{m.framing_type}</span>
                            <span>{new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} · {m.source_id}</span>
                          </div>
                          <p className="font-serif-prose text-stone-900 text-xs sm:text-sm">
                            "{m.wording}"
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Syndication Source Tracing (Item 8) */}
        {activeTab === 'syndication' && (
          <div className="p-6 sm:p-8 space-y-6">
            <div className="border-b border-stone-200 pb-2">
              <h3 className="font-serif-editorial font-bold text-stone-900 text-xl flex items-center space-x-2">
                <Network className="w-5 h-5 text-stone-700" />
                <span>Syndication Chain & Newsroom Attribution</span>
              </h3>
              <p className="text-xs font-serif text-stone-600">
                Explicitly distinguishes original investigative reporting from wire redistribution and regional republication
              </p>
            </div>

            <div className="space-y-4">
              {(matchingSyndications.length > 0 ? matchingSyndications : SYNDICATION_TRACES).map((syn) => (
                <div key={syn.claim_id} className="p-5 bg-[#fdfcf9] border border-stone-300 rounded-lg space-y-4">
                  <div className="flex items-center justify-between text-xs font-serif text-stone-700 border-b border-stone-200 pb-2">
                    <span>
                      Original Breaking Newsroom: <strong>{syn.first_reporting_newsroom}</strong>
                    </span>
                    <span>First Published: {new Date(syn.first_published_time).toLocaleDateString()}</span>
                  </div>

                  <div className="space-y-2">
                    {syn.syndication_path.map((pathItem) => (
                      <div
                        key={pathItem.step}
                        className="p-3 bg-white border border-stone-200 rounded flex items-start space-x-3 text-xs font-serif"
                      >
                        <span className="px-2 py-0.5 bg-stone-100 border border-stone-200 rounded font-mono font-bold text-stone-800">
                          Step {pathItem.step}
                        </span>
                        <div className="space-y-0.5 flex-1">
                          <div className="flex items-center justify-between text-stone-500">
                            <span className="font-bold text-stone-900 uppercase">{pathItem.role}</span>
                            <span>{pathItem.source_id} · {new Date(pathItem.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                          </div>
                          <p className="text-stone-800 font-serif-prose">
                            Headline: "{pathItem.headline_used}"
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Event Narrative Reconstruction (Item 10) */}
        {activeTab === 'narrative' && (
          <div className="p-6 sm:p-8 space-y-6">
            <div className="border-b border-stone-200 pb-2">
              <h3 className="font-serif-editorial font-bold text-stone-900 text-xl flex items-center space-x-2">
                <Clock className="w-5 h-5 text-stone-700" />
                <span>Canonical Narrative Reconstruction</span>
              </h3>
              <p className="text-xs font-serif text-stone-600">
                Chronological master narrative anchoring verified physical milestones with explicit uncertainty gaps flagged
              </p>
            </div>

            <div className="relative pl-6 space-y-4 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-stone-300">
              {(matchingNarratives.length > 0 ? matchingNarratives : NARRATIVE_NODES).map((node) => (
                <div key={node.id} className="relative text-xs">
                  <div className="absolute -left-6 top-1.5 w-2.5 h-2.5 rounded-full bg-stone-900 border-2 border-white"></div>
                  <div className="p-4 bg-[#fdfcf9] border border-stone-200 rounded-lg space-y-2">
                    <div className="flex items-center justify-between font-serif text-stone-500">
                      <span className="font-bold text-stone-900">{new Date(node.datetime_iso).toLocaleString()}</span>
                      <span>Verified by {node.corroborated_sources.join(', ')}</span>
                    </div>

                    <p className="font-serif-prose text-stone-900 text-sm leading-relaxed">
                      {node.verified_statement}
                    </p>

                    {node.uncertainty_gap_warning && (
                      <div className="p-2.5 bg-stone-50 border border-stone-300 rounded text-stone-700 text-xs font-serif">
                        <strong className="text-stone-900">Uncertainty Gap:</strong> {node.uncertainty_gap_warning}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 5: Stakeholder Claim Tracking (Item 11) */}
        {activeTab === 'stakeholders' && (
          <div className="p-6 sm:p-8 space-y-6">
            <div className="border-b border-stone-200 pb-2">
              <h3 className="font-serif-editorial font-bold text-stone-900 text-xl flex items-center space-x-2">
                <UserCheck className="w-5 h-5 text-stone-700" />
                <span>Stakeholder Statement Consistency Tracker</span>
              </h3>
              <p className="text-xs font-serif text-stone-600">
                Audits public assertions by key officials, political leaders, and institutional spokespersons across time
              </p>
            </div>

            <div className="space-y-4">
              {(matchingStakeholders.length > 0 ? matchingStakeholders : STAKEHOLDER_RECORDS).map((sh) => (
                <div key={sh.id} className="p-5 bg-[#fdfcf9] border border-stone-300 rounded-lg space-y-4">
                  <div className="flex flex-wrap items-center justify-between text-xs font-serif border-b border-stone-200 pb-2 gap-2">
                    <div>
                      <h4 className="font-serif-editorial font-bold text-stone-900 text-base">{sh.person_or_org}</h4>
                      <p className="text-stone-500">{sh.role_title}</p>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-stone-800">{sh.consistency_rating}</span>
                      <p className="text-[11px] text-stone-500">{sh.total_statements} Public Statements Recorded</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {sh.statement_history.map((stmt, sIdx) => (
                      <div key={sIdx} className="p-3 bg-white border border-stone-200 rounded text-xs space-y-1">
                        <div className="flex items-center justify-between text-stone-500 font-serif">
                          <span>{stmt.date} · {stmt.context}</span>
                          <span className="font-mono text-[10px]">{stmt.source_id}</span>
                        </div>
                        <p className="font-serif-prose text-stone-900 text-xs sm:text-sm italic">
                          "{stmt.statement}"
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer info */}
        <footer className="px-6 sm:px-8 py-4 bg-[#f5f2eb] border-t border-stone-200 text-xs font-serif text-stone-600 flex flex-wrap items-center justify-between gap-2">
          <span>Objective News Synthesis · Free from editorial bias or partisan spin</span>
          <span>TrueNews Epistemic Archive</span>
        </footer>
      </article>
    </div>
  );
};
