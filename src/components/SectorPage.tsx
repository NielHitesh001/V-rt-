import React from 'react';
import { SectorId, SECTORS, EVENT_SECTOR_MAP } from '../data/categories';
import { EVENTS, RAW_ITEMS } from '../data/goldData';
import { ArrowRight, CheckCircle2, ShieldCheck, Newspaper } from 'lucide-react';

interface SectorPageProps {
  section: SectorId;
  onSelectEvent: (eventId: string) => void;
}

export const SectorPage: React.FC<SectorPageProps> = ({ section, onSelectEvent }) => {
  const meta = SECTORS[section];

  // Filter events belonging to this sector
  const sectorEvents = EVENTS.filter((e) => EVENT_SECTOR_MAP[e.id] === section);

  // Designate the first story as the lead story of the section
  const leadEvent = sectorEvents[0];
  const secondaryEvents = sectorEvents.slice(1);

  const getEventText = (eventId: string, fallback: string) => {
    const raw = RAW_ITEMS.find((it) => it.event_id === eventId);
    if (!raw) return fallback;
    // Return first 2 paragraphs or sentences
    return raw.text.split('\n').slice(0, 2).join(' ');
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto font-sans">
      {/* 1. Dignified Section Header */}
      <div className="border-b-2 border-stone-900 pb-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="text-[11px] font-mono uppercase tracking-widest text-stone-500 font-bold mb-1">
              THE VERACITY ARCHIVE · SECTION DESK
            </div>
            <h1 className="text-4xl sm:text-5xl font-serif-editorial font-black text-stone-900 tracking-tight">
              {meta.label}
            </h1>
            <p className="text-sm font-serif italic text-stone-700 mt-1 max-w-2xl">
              {meta.tagline}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono uppercase text-stone-400 font-semibold">Subtopics:</span>
            {meta.subtopics.map((st) => (
              <span
                key={st}
                className="px-2.5 py-0.5 bg-stone-100 border border-stone-200 rounded text-xs font-serif text-stone-700"
              >
                {st}
              </span>
            ))}
          </div>
        </div>

        {/* Section Scope Banner */}
        <div className="mt-4 pt-3 border-t border-stone-200 text-xs text-stone-600 font-serif flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <p className="leading-relaxed">
            {meta.description}
          </p>
          <span className="font-mono text-[11px] text-stone-500 shrink-0">
            {sectorEvents.length} Verified Stories in this Section
          </span>
        </div>
      </div>

      {/* 2. Top Lead Story of the Section (Broadsheet Spotlight) */}
      {leadEvent && (
        <div className="bg-[#fbf9f5] border border-stone-300 rounded-lg p-6 sm:p-8 shadow-xs hover:border-stone-400 transition">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center space-x-2 text-xs font-mono text-stone-500">
                <span className="px-2 py-0.5 bg-stone-900 text-stone-100 rounded text-[10px] font-bold uppercase tracking-wider">
                  Section Lead
                </span>
                <span>·</span>
                <span className="capitalize">{leadEvent.kind.replace('-', ' ')}</span>
                <span>·</span>
                <span>{leadEvent.sources.length} Verified Sources</span>
              </div>

              <h2
                onClick={() => onSelectEvent(leadEvent.id)}
                className="text-2xl sm:text-3xl lg:text-4xl font-serif-editorial font-bold text-stone-900 hover:text-stone-700 transition cursor-pointer leading-tight"
              >
                {leadEvent.neutral_headline}
              </h2>

              <p className="font-serif-prose text-stone-700 text-sm sm:text-base leading-relaxed">
                {getEventText(leadEvent.id, leadEvent.label)}
              </p>

              <div className="pt-2 flex flex-wrap items-center justify-between gap-4 border-t border-stone-200 text-xs">
                <div className="flex items-center space-x-2 text-stone-600 font-serif">
                  <ShieldCheck className="w-4 h-4 text-[#475e3c]" />
                  <span>Cross-grounded in primary agency & wire records ({leadEvent.sources.join(', ')})</span>
                </div>

                <button
                  onClick={() => onSelectEvent(leadEvent.id)}
                  className="inline-flex items-center space-x-1.5 px-4 py-2 bg-stone-900 text-stone-100 rounded font-serif text-xs font-bold hover:bg-stone-800 transition cursor-pointer"
                >
                  <span>Examine Full Verified Dossier</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Right side summary column for the lead */}
            <div className="lg:col-span-4 bg-[#f5f2eb] border border-stone-300 rounded p-5 space-y-3">
              <div className="text-[10px] font-mono uppercase tracking-widest text-stone-600 font-bold">
                Editorial Dossier Overview
              </div>
              <div className="text-xl font-serif font-black text-stone-900">
                {leadEvent.claims_count} Verified Claims
              </div>
              <p className="text-xs font-serif text-stone-700 leading-snug">
                Every claim in this report has been verified with neutral phrasing and dual-layer attribution.
              </p>
              <div className="pt-2 border-t border-stone-300 text-xs font-serif space-y-1.5 text-stone-600">
                <div className="flex items-center justify-between">
                  <span>Primary Records Present:</span>
                  <span className="font-bold text-stone-900">
                    {leadEvent.primary_source_present ? 'Yes (Verified)' : 'Multi-Wire Press'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Disputed Elements:</span>
                  <span className="font-bold text-stone-900">
                    {leadEvent.has_disputes ? 'Documented in Ledger' : 'Zero Disputes'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. Secondary Stories Grid */}
      <div className="space-y-4">
        <h3 className="font-serif-editorial font-bold text-xl text-stone-900 pb-2 border-b border-stone-200">
          More {meta.label} Reports & Coverage
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {secondaryEvents.map((evt) => (
            <div
              key={evt.id}
              onClick={() => onSelectEvent(evt.id)}
              className="bg-white border border-stone-300 rounded-lg p-5 shadow-2xs hover:border-stone-400 hover:shadow-xs transition flex flex-col justify-between space-y-4 group cursor-pointer"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-mono text-stone-500">
                  <span className="uppercase text-[10px] font-bold text-stone-700 tracking-wider">
                    {evt.kind.replace('-', ' ')}
                  </span>
                  <span>{evt.sources.length} Sources</span>
                </div>

                <h4 className="font-serif-editorial font-bold text-stone-900 text-lg group-hover:text-stone-700 transition leading-snug">
                  {evt.neutral_headline}
                </h4>

                <p className="font-serif-prose text-stone-600 text-xs sm:text-sm line-clamp-3 leading-relaxed">
                  {getEventText(evt.id, evt.label)}
                </p>
              </div>

              <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-serif">
                <span className="text-stone-500 truncate max-w-[160px]">
                  {evt.sources.join(', ')}
                </span>
                <span className="text-stone-900 font-bold group-hover:underline flex items-center space-x-1 shrink-0">
                  <span>Read Report</span>
                  <ArrowRight className="w-3 h-3 text-stone-400" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SectorPage;
