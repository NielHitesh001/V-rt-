import React, { useState, useRef, useEffect } from 'react';
import {
  Newspaper,
  ShieldCheck,
  BookOpen,
  Scale,
  Database,
  Search,
  X,
  ArrowRight,
  Tag,
  Zap,
  Users,
  Fingerprint,
  Radio,
  Building,
  History,
  ShieldAlert,
  Volume2,
  Terminal
} from 'lucide-react';
import { EVENTS } from '../data/goldData';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onSearch: (query: string) => void;
  onSelectEvent?: (eventId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, onSearch, onSelectEvent }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  const navItems = [
    { id: 'veracity', label: 'Front Page', icon: Newspaper },
    { id: 'engine', label: 'Verified Reports & Dossiers', icon: ShieldCheck },
    { id: 'ledger', label: 'All Stories', icon: BookOpen },
    { id: 'pipeline', label: 'Python M0–M9 Bridge', icon: Terminal },
    { id: 'accountability', label: 'T1: Accountability & Watermarks', icon: Fingerprint },
    { id: 'resilience', label: 'T2: Detection & Scale', icon: Radio },
    { id: 'trust', label: 'T3: Newsroom Trust & Pledges', icon: Building },
    { id: 'journalism', label: 'T4: Journalist Tools & Embeds', icon: History },
    { id: 'forensics', label: 'T5: Disinfo & Forensics', icon: ShieldAlert },
    { id: 'accessible', label: 'T6: Accessible & Audio', icon: Volume2 },
    { id: 'factchecks', label: 'Fact-Checks & Velocity', icon: Zap },
    { id: 'credibility', label: 'Credibility & Insights', icon: Database },
    { id: 'disputes', label: 'Perspectives', icon: Scale },
    { id: 'readerdesk', label: 'Reader Desk & API', icon: Users },
  ];

  // Live quick match results as user types
  const trimmed = searchQuery.trim().toLowerCase();
  const liveMatches = trimmed.length > 0
    ? EVENTS.filter(
        (e) =>
          e.label.toLowerCase().includes(trimmed) ||
          e.neutral_headline.toLowerCase().includes(trimmed) ||
          e.sources.some((s) => s.toLowerCase().includes(trimmed))
      ).slice(0, 5)
    : [];

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setIsFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsFocused(false);
      onSearch(searchQuery.trim());
    }
  };

  const handleSelectQuickMatch = (eventId: string) => {
    setIsFocused(false);
    setSearchQuery('');
    if (onSelectEvent) {
      onSelectEvent(eventId);
    } else {
      onSearch(eventId);
    }
  };

  return (
    <header className="border-b border-stone-300 bg-[#fbf9f5]/95 backdrop-blur sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top utility row with Search Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between py-2.5 sm:h-16 border-b border-stone-200 gap-3">
          {/* Brand Wordmark */}
          <div className="flex items-center space-x-3 shrink-0">
            <button
              onClick={() => setActiveTab('veracity')}
              className="font-serif-masthead text-2xl font-black tracking-tight text-stone-900 hover:text-stone-700 transition text-left cursor-pointer"
            >
              TrueNews
            </button>
            <span className="text-stone-300">|</span>
            <span className="text-xs font-serif italic text-stone-600 hidden md:inline">
              The Veracity Archive
            </span>
          </div>

          {/* Clean Newspaper Search Bar Component */}
          <div ref={searchContainerRef} className="relative flex-1 max-w-lg mx-auto sm:mx-6 w-full">
            <form onSubmit={handleSubmit} className="relative flex items-center">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setIsFocused(true);
                }}
                onFocus={() => setIsFocused(true)}
                placeholder="Search topics, events, keywords (e.g. Key Bridge, Port Strike, ECB)..."
                className="w-full pl-9 pr-20 py-1.5 text-xs font-serif bg-white border border-stone-300 rounded shadow-2xs placeholder-stone-400 text-stone-900 focus:outline-none focus:border-stone-500 focus:ring-1 focus:ring-stone-400 transition"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-14 text-stone-400 hover:text-stone-600 p-0.5"
                  title="Clear query"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
              <button
                type="submit"
                className="absolute right-1 px-2.5 py-1 bg-stone-900 text-stone-100 hover:bg-stone-800 rounded text-[11px] font-sans font-medium transition cursor-pointer"
              >
                Search
              </button>
            </form>

            {/* Instant Suggestions & Live Match Dropdown */}
            {isFocused && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-stone-300 rounded-md shadow-lg z-50 overflow-hidden font-sans text-xs">
                {liveMatches.length > 0 ? (
                  <div className="py-1 divide-y divide-stone-100">
                    <div className="px-3 py-1.5 bg-stone-50 text-[10px] font-serif uppercase tracking-wider text-stone-500 flex items-center justify-between">
                      <span>Matching News Stories</span>
                      <span>Press Enter for full search</span>
                    </div>
                    {liveMatches.map((evt) => (
                      <button
                        key={evt.id}
                        type="button"
                        onClick={() => handleSelectQuickMatch(evt.id)}
                        className="w-full px-3 py-2 text-left hover:bg-stone-50 transition flex items-start justify-between gap-2 cursor-pointer"
                      >
                        <div className="space-y-0.5 truncate">
                          <div className="text-[11px] font-serif text-stone-500 flex items-center space-x-1.5">
                            <span className="uppercase text-stone-700 font-semibold">{evt.kind.replace('-', ' ')}</span>
                            <span>·</span>
                            <span>{evt.sources.length} Sources</span>
                          </div>
                          <div className="font-serif font-bold text-stone-900 text-xs truncate">
                            {evt.neutral_headline}
                          </div>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-stone-400 shrink-0 mt-1" />
                      </button>
                    ))}
                    <button
                      type="button"
                      onClick={() => {
                        setIsFocused(false);
                        onSearch(searchQuery.trim());
                      }}
                      className="w-full px-3 py-2 text-center text-xs font-semibold text-stone-800 bg-stone-50 hover:bg-stone-100 transition flex items-center justify-center space-x-1.5 cursor-pointer"
                    >
                      <Search className="w-3 h-3 text-stone-600" />
                      <span>Search full archive for "{searchQuery}"</span>
                    </button>
                  </div>
                ) : trimmed.length > 0 ? (
                  <div className="p-3 text-center space-y-2">
                    <p className="text-stone-600 font-serif">
                      No direct title match for "{searchQuery}".
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setIsFocused(false);
                        onSearch(searchQuery.trim());
                      }}
                      className="inline-flex items-center space-x-1 px-3 py-1 bg-stone-900 text-stone-100 rounded text-xs font-sans font-medium cursor-pointer"
                    >
                      <span>Search All News Reports</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                ) : (
                  <div className="p-3 space-y-2 bg-stone-50/70">
                    <div className="text-[11px] font-serif text-stone-600 font-semibold flex items-center space-x-1">
                      <Tag className="w-3 h-3 text-stone-400" />
                      <span>Popular News Topics</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {[
                        'Key Bridge',
                        'Port Strike',
                        'ECB Rate Cut',
                        'Taiwan Quake',
                        'Google Antitrust',
                        'Boeing Starliner',
                        'TikTok Ban'
                      ].map((topic) => (
                        <button
                          key={topic}
                          type="button"
                          onClick={() => {
                            setSearchQuery(topic);
                            setIsFocused(false);
                            onSearch(topic);
                          }}
                          className="px-2.5 py-0.5 bg-white border border-stone-200 hover:border-stone-400 rounded text-xs font-serif text-stone-700 transition cursor-pointer"
                        >
                          {topic}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Quick Date Stamp */}
          <div className="hidden lg:flex items-center space-x-2 text-xs font-serif text-stone-600 shrink-0">
            <span>Friday, October 2, 2026</span>
            <span>·</span>
            <span>Est. 2024</span>
          </div>
        </div>

        {/* Clean Typographic Navigation Links */}
        <div className="flex space-x-1 sm:space-x-2 overflow-x-auto py-2 scrollbar-none text-xs">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded font-sans transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-stone-900 text-stone-100 font-semibold shadow-xs'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/50'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-stone-100' : 'text-stone-500'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
