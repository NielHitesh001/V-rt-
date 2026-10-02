import React, { useState } from 'react';
import { X, Search, ArrowRight, BookOpen, Layers, FileText, Tag } from 'lucide-react';
import { EventSummary, Item, Claim } from '../types';

export interface SearchResultsData {
  query: string;
  events: EventSummary[];
  claims: Claim[];
  items: Item[];
  totalMatches: number;
}

interface SearchResultsModalProps {
  isOpen: boolean;
  onClose: () => void;
  isLoading: boolean;
  results: SearchResultsData | null;
  onSelectEvent: (eventId: string) => void;
  onSearchQuery?: (query: string) => void;
}

const POPULAR_TOPICS = [
  'Key Bridge',
  'Port Strike',
  'ECB Rate Cut',
  'Taiwan Quake',
  'Google Antitrust',
  'Boeing Starliner',
  'TikTok Ban',
  'Grindavík Volcano',
  'CrowdStrike Outage'
];

export const SearchResultsModal: React.FC<SearchResultsModalProps> = ({
  isOpen,
  onClose,
  isLoading,
  results,
  onSelectEvent,
  onSearchQuery
}) => {
  const [internalQuery, setInternalQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'events' | 'claims' | 'items'>('all');

  if (!isOpen) return null;

  const handleRefineSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (internalQuery.trim() && onSearchQuery) {
      onSearchQuery(internalQuery.trim());
    }
  };

  const handleTopicClick = (topic: string) => {
    setInternalQuery(topic);
    if (onSearchQuery) {
      onSearchQuery(topic);
    }
  };

  const events = results?.events || [];
  const claims = results?.claims || [];
  const items = results?.items || [];
  const total = results?.totalMatches || (events.length + claims.length + items.length);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-3 sm:p-6 overflow-y-auto bg-stone-900/60 backdrop-blur-xs font-sans">
      <div className="relative w-full max-w-4xl my-6 bg-[#fbf9f5] border border-stone-400 rounded-lg shadow-2xl overflow-hidden">
        {/* Newspaper Top Header */}
        <div className="px-6 py-4 border-b border-stone-300 bg-[#f5f2eb] flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-stone-900 text-stone-100 rounded">
              <Search className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-stone-500 font-semibold">
                The Veracity Archive · News Query
              </div>
              <h2 className="font-serif-editorial font-bold text-stone-900 text-xl leading-snug">
                News Topics & Event Index
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded text-stone-500 hover:text-stone-900 hover:bg-stone-200 transition cursor-pointer"
            title="Close dialog (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Search Input & Query Chips */}
        <div className="p-4 sm:p-6 border-b border-stone-200 bg-white space-y-3">
          <form onSubmit={handleRefineSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3 pointer-events-none" />
              <input
                type="text"
                value={internalQuery}
                onChange={(e) => setInternalQuery(e.target.value)}
                placeholder={results?.query ? `Current query: "${results.query}" — search another topic...` : "Search topics, events, or keywords..."}
                className="w-full pl-9 pr-4 py-2 text-sm font-serif bg-[#fdfcf9] border border-stone-300 rounded shadow-2xs text-stone-900 focus:outline-none focus:border-stone-500 focus:ring-1 focus:ring-stone-400 transition"
                autoFocus
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-stone-100 rounded text-xs font-sans font-semibold transition cursor-pointer"
            >
              Search
            </button>
          </form>

          {/* Quick Keyword Suggestions */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            <span className="font-serif text-stone-500 text-xs flex items-center gap-1 mr-1">
              <span>Suggested topics:</span>
            </span>
            {POPULAR_TOPICS.map((topic) => (
              <button
                key={topic}
                type="button"
                onClick={() => handleTopicClick(topic)}
                className={`px-2.5 py-0.5 rounded text-xs font-serif border transition cursor-pointer ${
                  results?.query?.toLowerCase() === topic.toLowerCase()
                    ? 'bg-stone-900 text-stone-100 border-stone-900'
                    : 'bg-stone-100 hover:bg-stone-200 text-stone-700 border-stone-200'
                }`}
              >
                {topic}
              </button>
            ))}
          </div>
        </div>

        {/* Results Body */}
        <div className="p-6 max-h-[62vh] overflow-y-auto space-y-6">
          {isLoading ? (
            <div className="py-12 text-center space-y-3">
              <div className="w-6 h-6 border-2 border-stone-800 border-t-transparent rounded-full animate-spin mx-auto"></div>
              <p className="font-serif text-sm text-stone-600">
                Searching verified reports and news archive...
              </p>
            </div>
          ) : results ? (
            <div className="space-y-6">
              {/* Summary and Filter Tabs */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-stone-300 gap-3">
                <div className="text-xs font-serif text-stone-600">
                  <span className="font-bold text-stone-900">"{results.query}"</span>
                  <span className="mx-1.5">·</span>
                  <span>{total} matching report{total === 1 ? '' : 's'}</span>
                </div>

                {/* Filter Tabs */}
                <div className="flex space-x-1 text-xs">
                  <button
                    onClick={() => setActiveFilter('all')}
                    className={`px-2.5 py-1 rounded font-medium transition cursor-pointer ${
                      activeFilter === 'all'
                        ? 'bg-stone-900 text-stone-100'
                        : 'bg-stone-200/70 text-stone-700 hover:bg-stone-200'
                    }`}
                  >
                    All ({total})
                  </button>
                  <button
                    onClick={() => setActiveFilter('events')}
                    className={`px-2.5 py-1 rounded font-medium transition cursor-pointer ${
                      activeFilter === 'events'
                        ? 'bg-stone-900 text-stone-100'
                        : 'bg-stone-200/70 text-stone-700 hover:bg-stone-200'
                    }`}
                  >
                    Stories ({events.length})
                  </button>
                  <button
                    onClick={() => setActiveFilter('claims')}
                    className={`px-2.5 py-1 rounded font-medium transition cursor-pointer ${
                      activeFilter === 'claims'
                        ? 'bg-stone-900 text-stone-100'
                        : 'bg-stone-200/70 text-stone-700 hover:bg-stone-200'
                    }`}
                  >
                    Facts ({claims.length})
                  </button>
                  <button
                    onClick={() => setActiveFilter('items')}
                    className={`px-2.5 py-1 rounded font-medium transition cursor-pointer ${
                      activeFilter === 'items'
                        ? 'bg-stone-900 text-stone-100'
                        : 'bg-stone-200/70 text-stone-700 hover:bg-stone-200'
                    }`}
                  >
                    Dispatches ({items.length})
                  </button>
                </div>
              </div>

              {total === 0 ? (
                <div className="py-10 text-center space-y-3 bg-stone-100/60 border border-stone-200 rounded p-6">
                  <p className="font-serif text-stone-800 text-base font-semibold">
                    No reports matched "{results.query}"
                  </p>
                  <p className="text-xs text-stone-500 font-serif max-w-md mx-auto">
                    Try searching for topics such as "Bridge", "Taiwan", "Strike", "ECB", or click any of the suggested topics above.
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* 1. STORIES SECTION */}
                  {(activeFilter === 'all' || activeFilter === 'events') && events.length > 0 && (
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2 pb-1 border-b border-stone-200 text-xs font-serif uppercase text-stone-700 font-semibold tracking-wider">
                        <BookOpen className="w-3.5 h-3.5 text-stone-700" />
                        <span>Verified News Stories ({events.length})</span>
                      </div>
                      <div className="space-y-2.5">
                        {events.map((evt) => (
                          <div
                            key={evt.id}
                            className="p-4 bg-white border border-stone-300 rounded hover:border-stone-400 transition flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs"
                          >
                            <div className="space-y-1 max-w-xl">
                              <div className="flex items-center space-x-2 text-xs font-serif text-stone-500">
                                <span className="uppercase text-stone-700 font-semibold">{evt.kind.replace('-', ' ')} News</span>
                                <span>·</span>
                                <span>{evt.sources.length} Reporting Outlets</span>
                              </div>
                              <h3 className="font-serif-editorial font-bold text-stone-900 text-base leading-snug">
                                {evt.neutral_headline}
                              </h3>
                              <p className="text-xs text-stone-500 font-serif truncate">
                                Covered by: {evt.sources.join(', ')}
                              </p>
                            </div>

                            <button
                              onClick={() => {
                                onSelectEvent(evt.id);
                                onClose();
                              }}
                              className="shrink-0 px-3.5 py-1.5 rounded bg-stone-900 hover:bg-stone-800 text-stone-100 font-sans text-xs font-semibold flex items-center space-x-1.5 transition self-start sm:self-center cursor-pointer"
                            >
                              <span>Read News Report</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 2. VERIFIED FACTS & PROPOSITIONS */}
                  {(activeFilter === 'all' || activeFilter === 'claims') && claims.length > 0 && (
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2 pb-1 border-b border-stone-200 text-xs font-serif uppercase text-stone-700 font-semibold tracking-wider">
                        <Layers className="w-3.5 h-3.5 text-stone-700" />
                        <span>Verified Factual Points ({claims.length})</span>
                      </div>
                      <div className="space-y-2">
                        {claims.map((claim) => (
                          <div
                            key={claim.id}
                            className="p-3 bg-white border border-stone-200 rounded text-xs space-y-1.5"
                          >
                            <p className="font-serif-prose text-stone-900 text-sm leading-relaxed font-medium">
                              {claim.neutralized_wording || claim.original_wording}
                            </p>
                            {claim.attribution_speaker && (
                              <div className="text-[11px] font-serif text-stone-600">
                                <strong>Attributed by:</strong> {claim.attribution_speaker}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 3. INGESTED SOURCE DISPATCHES */}
                  {(activeFilter === 'all' || activeFilter === 'items') && items.length > 0 && (
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2 pb-1 border-b border-stone-200 text-xs font-serif uppercase text-stone-700 font-semibold tracking-wider">
                        <FileText className="w-3.5 h-3.5 text-stone-700" />
                        <span>News Agency Dispatches ({items.length})</span>
                      </div>
                      <div className="space-y-2">
                        {items.map((item) => (
                          <div
                            key={item.id}
                            className="p-3.5 bg-white border border-stone-200 rounded text-xs space-y-1"
                          >
                            <div className="flex items-center justify-between text-xs font-serif text-stone-500">
                              <span className="font-semibold text-stone-800 uppercase">{item.source_id}</span>
                              <span>{item.published_time ? new Date(item.published_time).toLocaleDateString() : 'Archive'}</span>
                            </div>
                            <h4 className="font-serif-editorial font-bold text-stone-900 text-sm">
                              {item.title}
                            </h4>
                            <p className="font-serif-prose text-stone-600 text-xs line-clamp-2">
                              {item.text}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : null}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-stone-300 bg-[#f5f2eb] flex items-center justify-between text-xs font-serif text-stone-500">
          <span>Objective News Delivery · Zero Editorial Bias</span>
          <button
            onClick={onClose}
            className="px-3.5 py-1 bg-white border border-stone-300 hover:border-stone-400 rounded text-stone-700 hover:text-stone-900 transition font-medium cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
