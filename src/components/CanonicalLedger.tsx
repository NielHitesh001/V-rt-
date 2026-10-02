import React, { useState } from 'react';
import { EVENTS, RAW_ITEMS } from '../data/goldData';
import { Search, ArrowRight, Calendar, Newspaper } from 'lucide-react';

interface CanonicalLedgerProps {
  onSelectEvent: (eventId: string) => void;
}

export const CanonicalLedger: React.FC<CanonicalLedgerProps> = ({ onSelectEvent }) => {
  const [filter, setFilter] = useState<string>('all');
  const [search, setSearch] = useState<string>('');

  const filteredEvents = EVENTS.filter((e) => {
    const matchesFilter = filter === 'all' || e.kind === filter;
    const matchesSearch =
      e.label.toLowerCase().includes(search.toLowerCase()) ||
      e.neutral_headline.toLowerCase().includes(search.toLowerCase()) ||
      e.sources.some((s) => s.toLowerCase().includes(search.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6 max-w-6xl mx-auto font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-stone-300 gap-3">
        <div>
          <div className="text-[11px] font-mono uppercase tracking-widest text-stone-500 font-semibold">
            The Veracity Archive · Curated Topics & News Wire
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif-editorial font-bold text-stone-900">
            Top World News Stories Ledger
          </h1>
        </div>
        <div className="text-xs font-serif text-stone-600">
          {EVENTS.length} Verified Global Stories Available
        </div>
      </div>

      {/* Filter and Search */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="flex items-center space-x-1 p-1 bg-stone-200/70 rounded border border-stone-300 w-full sm:w-auto overflow-x-auto text-xs font-sans">
          {[
            { id: 'all', label: 'All Stories' },
            { id: 'hard-fact', label: 'Infrastructure & Safety' },
            { id: 'numeric', label: 'Economy & Markets' },
            { id: 'contested', label: 'Labor & Geopolitics' }
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`px-3 py-1.5 rounded transition cursor-pointer whitespace-nowrap ${
                filter === f.id
                  ? 'bg-white text-stone-900 shadow-2xs font-semibold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-2.5 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search news stories..."
            className="w-full pl-9 pr-3 py-1.5 text-xs font-serif bg-white border border-stone-300 rounded shadow-2xs text-stone-900 focus:outline-none focus:border-stone-500"
          />
        </div>
      </div>

      {/* Story Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredEvents.map((evt) => {
          const sampleItem = RAW_ITEMS.find((it) => it.event_id === evt.id);

          return (
            <div
              key={evt.id}
              className="bg-white border border-stone-300 rounded-lg p-5 shadow-xs hover:border-stone-400 transition flex flex-col justify-between space-y-4 group cursor-pointer"
              onClick={() => onSelectEvent(evt.id)}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-serif text-stone-500">
                  <span className="font-semibold uppercase tracking-wider text-[11px] text-stone-700">
                    {evt.kind.replace('-', ' ')} News
                  </span>
                  <span>{evt.sources.length} Reporting Outlets</span>
                </div>

                <h3 className="font-serif-editorial font-bold text-stone-900 text-lg group-hover:text-stone-700 transition leading-snug">
                  {evt.neutral_headline}
                </h3>

                <p className="font-serif-prose text-stone-600 text-xs sm:text-sm line-clamp-3 leading-relaxed">
                  {sampleItem?.text || evt.label}
                </p>
              </div>

              <div className="pt-3 border-t border-stone-200 flex items-center justify-between text-xs">
                <span className="font-serif text-stone-500">
                  Sources: {evt.sources.join(', ')}
                </span>
                <span className="font-sans font-semibold text-stone-900 group-hover:underline flex items-center space-x-1">
                  <span>Read Story</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
