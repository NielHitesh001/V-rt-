import React, { useState } from 'react';
import { Header } from './components/Header';
import { DailyVeracity } from './components/DailyVeracity';
import { SectorPage } from './components/SectorPage';
import { CanonicalLedger } from './components/CanonicalLedger';
import { ReaderDeskAndFeeds } from './components/ReaderDeskAndFeeds';
import { EngineBrief } from './components/EngineBrief';
import { SearchResultsModal, SearchResultsData } from './components/SearchResultsModal';

export function App() {
  const [activeTab, setActiveTab] = useState<string>('front-page');
  const [previousTab, setPreviousTab] = useState<string>('front-page');
  const [selectedEventId, setSelectedEventId] = useState<string>('event-key-bridge-01');

  // Search modal state
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResultsData | null>(null);

  const handleSelectStory = (eventId: string, fromTab?: string) => {
    setSelectedEventId(eventId);
    setPreviousTab(fromTab || activeTab);
    setActiveTab('verified-report');
  };

  const handleBackFromReport = () => {
    setActiveTab(previousTab || 'front-page');
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const handleSearch = async (query: string) => {
    if (!query.trim()) return;
    setIsSearchOpen(true);
    setIsSearching(true);
    try {
      const res = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: query.trim() })
      });
      if (res.ok) {
        const data = await res.json();
        setSearchResults(data);
      }
    } catch (err) {
      console.error('Search request failed:', err);
    } finally {
      setIsSearching(false);
    }
  };

  const getSectionLabel = (tab: string) => {
    switch (tab) {
      case 'front-page': return 'Front Page';
      case 'world': return 'World';
      case 'finance': return 'Finance';
      case 'politics': return 'Politics';
      case 'technology': return 'Technology';
      case 'all-stories': return 'All Stories';
      case 'reader-desk': return 'Reader Desk';
      default: return 'Stories';
    }
  };

  return (
    <div className="min-h-screen bg-[#fbf9f5] text-[#1c1917] flex flex-col font-sans">
      <Header
        activeTab={activeTab === 'verified-report' ? previousTab : activeTab}
        setActiveTab={handleTabChange}
        onSearch={handleSearch}
        onSelectEvent={(eventId) => handleSelectStory(eventId, activeTab)}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'front-page' && (
          <DailyVeracity
            onNavigateToBrief={(eventId) => handleSelectStory(eventId, 'front-page')}
            onNavigateToLedger={() => setActiveTab('all-stories')}
            onNavigateToSection={(section) => setActiveTab(section)}
          />
        )}
        {activeTab === 'world' && (
          <SectorPage
            section="world"
            onSelectEvent={(eventId) => handleSelectStory(eventId, 'world')}
          />
        )}
        {activeTab === 'finance' && (
          <SectorPage
            section="finance"
            onSelectEvent={(eventId) => handleSelectStory(eventId, 'finance')}
          />
        )}
        {activeTab === 'politics' && (
          <SectorPage
            section="politics"
            onSelectEvent={(eventId) => handleSelectStory(eventId, 'politics')}
          />
        )}
        {activeTab === 'technology' && (
          <SectorPage
            section="technology"
            onSelectEvent={(eventId) => handleSelectStory(eventId, 'technology')}
          />
        )}
        {activeTab === 'all-stories' && (
          <CanonicalLedger
            onSelectEvent={(eventId) => handleSelectStory(eventId, 'all-stories')}
          />
        )}
        {activeTab === 'reader-desk' && <ReaderDeskAndFeeds />}
        {activeTab === 'verified-report' && (
          <EngineBrief
            initialEventId={selectedEventId}
            onBack={handleBackFromReport}
            backLabel={getSectionLabel(previousTab)}
          />
        )}
      </main>

      {/* Clean Archival Search Modal */}
      <SearchResultsModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        isLoading={isSearching}
        results={searchResults}
        onSelectEvent={(eventId) => {
          handleSelectStory(eventId, activeTab);
          setIsSearchOpen(false);
        }}
        onSearchQuery={handleSearch}
      />

      <footer className="border-t border-stone-300 bg-[#f5f2eb] py-8 text-xs text-stone-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <div className="font-serif-masthead font-bold text-stone-900 text-sm">
              THE DAILY VERACITY · VĀRTĀ Archive
            </div>
            <div className="font-serif text-stone-500">
              The Non-Partisan Factual Record of World Affairs · Independent Global Press
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs font-serif text-stone-600">
            <button onClick={() => setActiveTab('front-page')} className="hover:text-stone-900 cursor-pointer">Front Page</button>
            <span>·</span>
            <button onClick={() => setActiveTab('world')} className="hover:text-stone-900 cursor-pointer">World</button>
            <span>·</span>
            <button onClick={() => setActiveTab('finance')} className="hover:text-stone-900 cursor-pointer">Finance</button>
            <span>·</span>
            <button onClick={() => setActiveTab('politics')} className="hover:text-stone-900 cursor-pointer">Politics</button>
            <span>·</span>
            <button onClick={() => setActiveTab('technology')} className="hover:text-stone-900 cursor-pointer">Technology</button>
            <span>·</span>
            <button onClick={() => setActiveTab('all-stories')} className="hover:text-stone-900 cursor-pointer">All Stories</button>
            <span>·</span>
            <button onClick={() => setActiveTab('reader-desk')} className="hover:text-stone-900 cursor-pointer">Reader Desk</button>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
