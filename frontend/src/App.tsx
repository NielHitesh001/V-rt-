import React, { useState } from 'react';
import { Header } from './components/Header';
import { DailyVeracity } from './components/DailyVeracity';
import { EngineBrief } from './components/EngineBrief';
import { CanonicalLedger } from './components/CanonicalLedger';
import { DisputeResolution } from './components/DisputeResolution';
import { TransparencyRegistry } from './components/TransparencyRegistry';
import { FactChecksAndVelocity } from './components/FactChecksAndVelocity';
import { CredibilityAndInsights } from './components/CredibilityAndInsights';
import { ReaderDeskAndFeeds } from './components/ReaderDeskAndFeeds';
import { SearchResultsModal, SearchResultsData } from './components/SearchResultsModal';
import { AccountabilityAndWatermarks } from './components/AccountabilityAndWatermarks';
import { ScaleAndResilience } from './components/ScaleAndResilience';
import { InstitutionalTrust } from './components/InstitutionalTrust';
import { JournalistToolsAndAdoption } from './components/JournalistToolsAndAdoption';
import { ForensicsAndDisinfo } from './components/ForensicsAndDisinfo';
import { AccessibleNarrative } from './components/AccessibleNarrative';
import { PipelineOperations } from './components/PipelineOperations';

export function App() {
  const [activeTab, setActiveTab] = useState<string>('veracity');
  const [selectedEventId, setSelectedEventId] = useState<string>('event-key-bridge-01');

  // Search modal state
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResultsData | null>(null);

  const handleNavigateToBrief = (eventId: string) => {
    setSelectedEventId(eventId);
    setActiveTab('engine');
  };

  const handleNavigateToLedger = () => {
    setActiveTab('ledger');
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

  return (
    <div className="min-h-screen bg-[#fbf9f5] text-[#1c1917] flex flex-col font-sans">
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onSearch={handleSearch}
        onSelectEvent={(eventId) => {
          setSelectedEventId(eventId);
          setActiveTab('engine');
        }}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'veracity' && (
          <DailyVeracity
            onNavigateToBrief={handleNavigateToBrief}
            onNavigateToLedger={handleNavigateToLedger}
          />
        )}
        {activeTab === 'engine' && (
          <EngineBrief
            initialEventId={selectedEventId}
          />
        )}
        {activeTab === 'ledger' && (
          <CanonicalLedger
            onSelectEvent={(eventId) => {
              setSelectedEventId(eventId);
              setActiveTab('engine');
            }}
          />
        )}
        {activeTab === 'pipeline' && <PipelineOperations />}
        {activeTab === 'accountability' && <AccountabilityAndWatermarks />}
        {activeTab === 'resilience' && <ScaleAndResilience />}
        {activeTab === 'trust' && <InstitutionalTrust />}
        {activeTab === 'journalism' && <JournalistToolsAndAdoption />}
        {activeTab === 'forensics' && <ForensicsAndDisinfo />}
        {activeTab === 'accessible' && <AccessibleNarrative />}
        {activeTab === 'factchecks' && <FactChecksAndVelocity />}
        {activeTab === 'credibility' && <CredibilityAndInsights />}
        {activeTab === 'disputes' && <DisputeResolution />}
        {activeTab === 'readerdesk' && <ReaderDeskAndFeeds />}
        {activeTab === 'transparency' && <TransparencyRegistry />}
      </main>

      {/* Global Clean Archival Search Modal */}
      <SearchResultsModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        isLoading={isSearching}
        results={searchResults}
        onSelectEvent={(eventId) => {
          setSelectedEventId(eventId);
          setActiveTab('engine');
          setIsSearchOpen(false);
        }}
        onSearchQuery={handleSearch}
      />

      <footer className="border-t border-stone-300 bg-[#f5f2eb] py-8 text-xs text-stone-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <div className="font-serif-masthead font-bold text-stone-900 text-sm">
              THE DAILY VERACITY · TrueNews Archive
            </div>
            <div className="font-serif text-stone-500">
              Clean, Objective News Delivery · All Neutralization & Corroboration Performed in Background
            </div>
          </div>
          <div className="font-serif text-xs text-stone-500 text-center sm:text-right">
            Verified Global News Service · Est. 2024
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
