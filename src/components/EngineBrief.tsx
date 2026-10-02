import React, { useState, useEffect } from 'react';
import {
  Clock,
  ExternalLink,
  Copy,
  Check,
  Calendar,
  Building2,
  FileText
} from 'lucide-react';
import { Brief } from '../types';
import { EVENTS } from '../data/goldData';
import { generateEventBrief } from '../data/corroboration';

interface EngineBriefProps {
  initialEventId?: string;
  onNavigateToWorkspace?: () => void;
}

export const EngineBrief: React.FC<EngineBriefProps> = ({ initialEventId = 'event-key-bridge-01' }) => {
  const [selectedEventId, setSelectedEventId] = useState<string>(initialEventId);
  const [brief, setBrief] = useState<Brief | null>(null);
  const [copied, setCopied] = useState(false);

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
        : []),
      ...(brief.disputed_points.length > 0
        ? [
            'REPORTED PERSPECTIVES & CONFLICTING ACCOUNTS:',
            ...brief.disputed_points.map(
              (dp) => `${dp.topic}:\n` + dp.claims.map((c) => `  * ${c.attribution_speaker || 'Position'}: "${c.text}"`).join('\n')
            )
          ]
        : [])
    ];
    navigator.clipboard.writeText(textLines.join('\n'));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const currentEvent = EVENTS.find((e) => e.id === selectedEventId) || EVENTS[0];

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
        </header>

        {/* Article Body */}
        <div className="p-6 sm:p-8 space-y-8">
          {/* Synthesized Executive Summary */}
          <section className="space-y-3">
            <h3 className="font-serif-editorial font-bold text-stone-900 text-xl border-b border-stone-200 pb-2">
              Executive News Summary
            </h3>
            <div className="font-serif-prose text-stone-900 text-base leading-relaxed space-y-3 text-justify">
              <p>
                {brief.core_facts.length > 0 && brief.core_facts[0].text}
              </p>
              {brief.core_facts.length > 1 && (
                <p>
                  {brief.core_facts.slice(1, 3).map((f) => f.text).join(' ')}
                </p>
              )}
            </div>
          </section>

          {/* Key Verified Facts Section */}
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

          {/* Chronology Section */}
          {brief.timeline.length > 0 && (
            <section className="space-y-4">
              <h3 className="font-serif-editorial font-bold text-stone-900 text-xl border-b border-stone-200 pb-2">
                Chronology of Events
              </h3>

              <div className="relative pl-6 space-y-4 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-stone-300">
                {brief.timeline.map((entry, idx) => (
                  <div key={idx} className="relative text-xs">
                    <div className="absolute -left-6 top-1.5 w-2.5 h-2.5 rounded-full bg-stone-900 border-2 border-white"></div>
                    <div className="bg-[#fdfcf9] border border-stone-200 p-3.5 rounded space-y-1">
                      <div className="flex items-center justify-between font-serif text-stone-600">
                        <span className="font-bold text-stone-900">{entry.timestamp_str}</span>
                        <span className="text-[11px]">Reported by {entry.source_ids.join(', ')}</span>
                      </div>
                      <p className="font-serif-prose text-stone-900 text-sm leading-relaxed">{entry.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Reported Perspectives & Contested Accounts */}
          {brief.disputed_points.length > 0 && (
            <section className="space-y-4">
              <h3 className="font-serif-editorial font-bold text-stone-900 text-xl border-b border-stone-200 pb-2">
                Reported Perspectives & Conflicting Accounts
              </h3>

              <div className="space-y-4">
                {brief.disputed_points.map((dp, i) => (
                  <div key={i} className="p-4 bg-stone-50 border border-stone-300 rounded space-y-3">
                    <div>
                      <h4 className="font-serif-editorial font-bold text-stone-900 text-base">
                        {dp.topic}
                      </h4>
                      <p className="text-xs font-serif text-stone-600 mt-0.5">
                        {dp.explanation}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      {dp.claims.map((c, ci) => (
                        <div key={ci} className="p-3 bg-white border border-stone-200 rounded space-y-1.5">
                          <div className="font-serif font-bold text-stone-900 text-xs">
                            {c.attribution_speaker || 'Reported Position'}
                          </div>
                          <p className="font-serif-prose text-stone-800 text-xs sm:text-sm leading-relaxed">
                            "{c.text}"
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Footer info */}
        <footer className="px-6 sm:px-8 py-4 bg-[#f5f2eb] border-t border-stone-200 text-xs font-serif text-stone-600 flex flex-wrap items-center justify-between gap-2">
          <span>Objective News Synthesis · Free from editorial bias or partisan spin</span>
          <span>TrueNews Epistemic Archive</span>
        </footer>
      </article>
    </div>
  );
};
