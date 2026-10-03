import React, { useState } from 'react';
import {
  INITIAL_DIGESTS,
  INITIAL_READER_ANNOTATIONS
} from '../data/enhancementsData';
import { EVENTS } from '../data/goldData';
import { ReaderAnnotation } from '../types';
import { Mail, Code2, Users, Send, Check, Copy, ExternalLink, Rss, Layers, Filter, Download } from 'lucide-react';

export const ReaderDeskAndFeeds: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'digest' | 'api' | 'community'>('digest');

  // Reader annotation form & filter state
  const [annotations, setAnnotations] = useState<ReaderAnnotation[]>(INITIAL_READER_ANNOTATIONS);
  const [userHandle, setUserHandle] = useState('');
  const [noteText, setNoteText] = useState('');
  const [stance, setStance] = useState<'corroborating' | 'questioning' | 'contextualizing'>('corroborating');
  const [confidence, setConfidence] = useState<'high' | 'moderate' | 'low'>('high');
  const [refLink, setRefLink] = useState('');
  const [filterStance, setFilterStance] = useState<string>('all');
  const [submitted, setSubmitted] = useState(false);

  // Digest category state
  const [subscribedCategory, setSubscribedCategory] = useState<string>('all');
  const [subscribedEmail, setSubscribedEmail] = useState('');
  const [subscribedNotice, setSubscribedNotice] = useState(false);

  // API Tester & Export Generator state
  const [selectedExportEventId, setSelectedExportEventId] = useState<string>('event-key-bridge-01');
  const [apiEndpoint, setApiEndpoint] = useState('/api/v1/claims');
  const [apiResponse, setApiResponse] = useState<string>('Click "Execute Query" to inspect live response payload');
  const [copiedCurl, setCopiedCurl] = useState(false);

  const handleAddAnnotation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteText.trim()) return;

    const newNote: ReaderAnnotation = {
      id: `ra-${Date.now()}`,
      claim_id: 'claim-gold-art-001-0',
      event_id: 'event-key-bridge-01',
      user_handle: userHandle.trim() || 'VerifiedReader',
      confidence,
      stance,
      note: noteText.trim(),
      reference_link: refLink.trim() || undefined,
      created_at: new Date().toISOString(),
      agreement_count: 1
    };

    setAnnotations([newNote, ...annotations]);
    setNoteText('');
    setRefLink('');
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const handleUpvote = (id: string) => {
    setAnnotations(
      annotations.map((a) =>
        a.id === id ? { ...a, agreement_count: a.agreement_count + 1 } : a
      )
    );
  };

  const handleRunApi = async (endpoint: string) => {
    setApiEndpoint(endpoint);
    try {
      const res = await fetch(endpoint);
      const data = await res.json();
      setApiResponse(JSON.stringify(data, null, 2));
    } catch {
      setApiResponse('Error fetching endpoint');
    }
  };

  const handleCopyCurl = (cmd: string) => {
    navigator.clipboard.writeText(cmd);
    setCopiedCurl(true);
    setTimeout(() => setCopiedCurl(false), 2000);
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subscribedEmail.trim()) return;
    setSubscribedNotice(true);
    setTimeout(() => setSubscribedNotice(false), 3500);
    setSubscribedEmail('');
  };

  const filteredAnnotations = annotations.filter(
    (a) => filterStance === 'all' || a.stance === filterStance
  );

  return (
    <div className="space-y-8 max-w-6xl mx-auto font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-stone-300 gap-3">
        <div>
          <div className="text-[11px] font-mono uppercase tracking-widest text-stone-500 font-semibold">
            The Veracity Archive · Reader Operations & Syndication
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif-editorial font-bold text-stone-900">
            News Digests, API Feeds & Reader Verification Desk
          </h1>
        </div>

        {/* Section Tabs */}
        <div className="flex items-center space-x-1 p-1 bg-stone-200/70 rounded border border-stone-300 text-xs">
          {[
            { id: 'digest', label: 'News Digest & Briefs' },
            { id: 'api', label: 'API & Export Feeds' },
            { id: 'community', label: 'Reader Annotations' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-1.5 rounded transition cursor-pointer text-xs ${
                activeTab === tab.id
                  ? 'bg-white text-stone-900 shadow-2xs font-semibold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 1. News Digest & What Changed Since Yesterday (Item 13) */}
      {activeTab === 'digest' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-stone-200 pb-2 gap-3">
            <div>
              <h2 className="font-serif-editorial font-bold text-stone-900 text-xl flex items-center space-x-2">
                <Mail className="w-5 h-5 text-stone-700" />
                <span>Automated Daily & Weekly Veracity Digest</span>
              </h2>
              <p className="text-xs font-serif text-stone-600">
                Curated factual summaries with explicit "What changed in this story since yesterday?" diffs
              </p>
            </div>

            {/* Category Filter */}
            <div className="flex items-center space-x-1 p-1 bg-stone-200/70 rounded border border-stone-300 text-xs overflow-x-auto">
              {[
                { id: 'all', label: 'All Topics' },
                { id: 'infrastructure', label: 'Infrastructure' },
                { id: 'economy', label: 'Economy' },
                { id: 'labor', label: 'Labor Relations' }
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSubscribedCategory(cat.id)}
                  className={`px-2.5 py-1 rounded transition cursor-pointer text-xs whitespace-nowrap ${
                    subscribedCategory === cat.id
                      ? 'bg-white text-stone-900 shadow-2xs font-semibold'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Subscription Banner */}
          <div className="p-4 bg-white border border-stone-300 rounded-lg shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-0.5">
              <span className="font-serif font-bold text-stone-900 text-sm block">
                Subscribe to Daily Verified Diff Ledger
              </span>
              <p className="text-xs font-serif text-stone-600">
                Receive the morning broadsheet dispatch with zero spin and checkable provenance.
              </p>
            </div>

            <form onSubmit={handleSubscribe} className="flex gap-2 w-full sm:w-auto">
              <input
                type="email"
                value={subscribedEmail}
                onChange={(e) => setSubscribedEmail(e.target.value)}
                placeholder="your.email@organization.org"
                className="px-3 py-1.5 text-xs font-serif bg-[#fdfcf9] border border-stone-300 rounded focus:outline-none focus:border-stone-500 w-full sm:w-64"
                required
              />
              <button
                type="submit"
                className="px-4 py-1.5 bg-stone-900 hover:bg-stone-800 text-stone-100 rounded text-xs font-semibold transition cursor-pointer shrink-0"
              >
                Subscribe
              </button>
            </form>
          </div>

          {subscribedNotice && (
            <div className="p-3 bg-stone-100 border border-stone-300 rounded text-xs font-serif text-stone-800 text-center">
              Verification subscription confirmed. Daily digests will be delivered at 06:00 UTC.
            </div>
          )}

          <div className="bg-white border border-stone-300 rounded-lg shadow-xs overflow-hidden">
            {INITIAL_DIGESTS.map((digest) => (
              <div key={digest.id} className="p-6 sm:p-8 space-y-6">
                <div className="flex flex-wrap items-center justify-between pb-3 border-b border-stone-200 text-xs font-serif text-stone-500 gap-2">
                  <span className="font-bold text-stone-900">{digest.edition_date}</span>
                  <span className="uppercase tracking-wider">{digest.period}</span>
                </div>

                <div className="space-y-2">
                  <div className="text-[10px] font-mono uppercase text-stone-500 font-semibold tracking-wider">
                    Lead Editorial Overview
                  </div>
                  <h3 className="font-serif-editorial font-bold text-stone-900 text-2xl leading-tight">
                    {digest.lead_story}
                  </h3>
                </div>

                <div className="space-y-6 pt-2 divide-y divide-stone-200">
                  {digest.stories.map((story) => (
                    <div key={story.event_id} className="pt-4 first:pt-0 space-y-3">
                      <h4 className="font-serif-editorial font-bold text-stone-900 text-lg leading-snug">
                        {story.headline}
                      </h4>
                      <p className="font-serif-prose text-stone-700 text-sm leading-relaxed">
                        {story.summary}
                      </p>

                      <div className="p-3 bg-[#fdfcf9] border border-stone-200 rounded space-y-1.5 text-xs font-serif">
                        <span className="font-semibold text-stone-900 block">
                          Verified Updates Since Yesterday:
                        </span>
                        <ul className="list-disc list-inside space-y-1 text-stone-700">
                          {story.changes_since_yesterday.map((ch, i) => (
                            <li key={i}>{ch}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 2. API & Export Options (Item 14) */}
      {activeTab === 'api' && (
        <div className="space-y-6">
          <div className="border-b border-stone-200 pb-2">
            <h2 className="font-serif-editorial font-bold text-stone-900 text-xl flex items-center space-x-2">
              <Code2 className="w-5 h-5 text-stone-700" />
              <span>Developer API, JSON Export & RSS Syndication</span>
            </h2>
            <p className="text-xs font-serif text-stone-600">
              Clean programmatic access to verified factual claims, machine-readable brief exports, and RSS feeds
            </p>
          </div>

          {/* Export Generator Selector */}
          <div className="p-4 bg-white border border-stone-300 rounded-lg shadow-xs space-y-3 text-xs font-sans">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="font-bold text-stone-900 block">Standalone Machine-Readable Event Brief</span>
                <span className="font-serif text-stone-500">Select any event to download JSON dossier or subscribe via RSS:</span>
              </div>

              <div className="flex items-center space-x-2">
                <select
                  value={selectedExportEventId}
                  onChange={(e) => setSelectedExportEventId(e.target.value)}
                  className="px-3 py-1.5 text-xs font-serif bg-[#fdfcf9] border border-stone-300 rounded"
                >
                  {EVENTS.map((e) => (
                    <option key={e.id} value={e.id}>
                      {e.label}
                    </option>
                  ))}
                </select>

                <a
                  href={`/api/v1/events/${selectedExportEventId}/export.json`}
                  download={`${selectedExportEventId}-export.json`}
                  className="px-3 py-1.5 bg-stone-900 text-stone-100 hover:bg-stone-800 rounded font-semibold transition flex items-center space-x-1"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download JSON</span>
                </a>

                <a
                  href={`/api/v1/events/${selectedExportEventId}/feed.xml`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 bg-stone-100 border border-stone-300 hover:bg-stone-200 text-stone-800 rounded font-semibold transition flex items-center space-x-1"
                >
                  <Rss className="w-3.5 h-3.5 text-[#5c4a2c]" />
                  <span>RSS</span>
                </a>
              </div>
            </div>
          </div>

          {/* Quick Endpoints Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-sans">
            <div className="p-4 bg-white border border-stone-300 rounded-lg shadow-xs space-y-3 flex flex-col justify-between">
              <div className="space-y-1">
                <span className="font-mono text-stone-500 font-bold block">GET /api/v1/claims</span>
                <p className="font-serif text-stone-700">
                  Query all atomic verified propositions with attribution metadata.
                </p>
              </div>
              <button
                onClick={() => handleRunApi('/api/v1/claims')}
                className="px-3 py-1.5 bg-stone-900 text-stone-100 hover:bg-stone-800 rounded font-semibold transition cursor-pointer"
              >
                Inspect Claims API
              </button>
            </div>

            <div className="p-4 bg-white border border-stone-300 rounded-lg shadow-xs space-y-3 flex flex-col justify-between">
              <div className="space-y-1">
                <span className="font-mono text-stone-500 font-bold block">GET /api/credibility</span>
                <p className="font-serif text-stone-700">
                  Historical accuracy ratings and error flags for all newsrooms.
                </p>
              </div>
              <button
                onClick={() => handleRunApi('/api/credibility')}
                className="px-3 py-1.5 bg-stone-900 text-stone-100 hover:bg-stone-800 rounded font-semibold transition cursor-pointer"
              >
                Inspect Credibility API
              </button>
            </div>

            <div className="p-4 bg-white border border-stone-300 rounded-lg shadow-xs space-y-3 flex flex-col justify-between">
              <div className="space-y-1">
                <span className="font-mono text-stone-500 font-bold block">GET /api/velocity</span>
                <p className="font-serif text-stone-700">
                  Real-time breaking volume spikes and consensus progression.
                </p>
              </div>
              <button
                onClick={() => handleRunApi('/api/velocity')}
                className="px-3 py-1.5 bg-stone-900 text-stone-100 hover:bg-stone-800 rounded font-semibold transition cursor-pointer"
              >
                Inspect Velocity API
              </button>
            </div>
          </div>

          {/* Interactive Console */}
          <div className="bg-stone-900 text-stone-100 rounded-lg p-5 shadow-md font-mono text-xs space-y-3">
            <div className="flex items-center justify-between border-b border-stone-700 pb-2 text-[11px] text-stone-400">
              <span>ENDPOINT: {apiEndpoint}</span>
              <button
                onClick={() => handleCopyCurl(`curl -s http://localhost:3000${apiEndpoint}`)}
                className="hover:text-stone-200 flex items-center space-x-1 cursor-pointer"
              >
                {copiedCurl ? <Check className="w-3 h-3 text-[#34482c] font-bold" /> : <Copy className="w-3 h-3" />}
                <span>{copiedCurl ? 'Copied cURL' : 'Copy cURL'}</span>
              </button>
            </div>
            <pre className="overflow-x-auto p-2 bg-stone-950 rounded text-stone-300 max-h-72 leading-relaxed text-[11px]">
              {apiResponse}
            </pre>
          </div>
        </div>
      )}

      {/* 3. Reader Annotations & Crowdsourced Verification (Item 5) */}
      {activeTab === 'community' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-stone-200 pb-2 gap-3">
            <div>
              <h2 className="font-serif-editorial font-bold text-stone-900 text-xl flex items-center space-x-2">
                <Users className="w-5 h-5 text-stone-700" />
                <span>Reader Annotations & Informed Community Verification</span>
              </h2>
              <p className="text-xs font-serif text-stone-600">
                Allows readers and domain experts to submit factual notes, reference documentation, and flag nuance on claims
              </p>
            </div>

            {/* Filter by Stance */}
            <div className="flex items-center space-x-1 p-1 bg-stone-200/70 rounded border border-stone-300 text-xs">
              {['all', 'corroborating', 'questioning', 'contextualizing'].map((st) => (
                <button
                  key={st}
                  onClick={() => setFilterStance(st)}
                  className={`px-2.5 py-1 rounded transition cursor-pointer text-xs capitalize whitespace-nowrap ${
                    filterStance === st
                      ? 'bg-white text-stone-900 shadow-2xs font-semibold'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Form Column */}
            <div className="lg:col-span-5 bg-white border border-stone-300 rounded-lg p-5 shadow-xs space-y-4">
              <h3 className="font-serif-editorial font-bold text-stone-900 text-base">
                Contribute Reader Context or Flag
              </h3>

              <form onSubmit={handleAddAnnotation} className="space-y-3 text-xs font-sans">
                <div>
                  <label className="font-serif text-stone-700 block mb-1">Your Handle / Affiliation</label>
                  <input
                    type="text"
                    value={userHandle}
                    onChange={(e) => setUserHandle(e.target.value)}
                    placeholder="e.g. MaritimeSpecialist, LegalAnalyst"
                    className="w-full p-2 bg-[#fdfcf9] border border-stone-300 rounded focus:outline-none focus:border-stone-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="font-serif text-stone-700 block mb-1">Stance</label>
                    <select
                      value={stance}
                      onChange={(e) => setStance(e.target.value as any)}
                      className="w-full p-2 bg-[#fdfcf9] border border-stone-300 rounded focus:outline-none focus:border-stone-500"
                    >
                      <option value="corroborating">Corroborating Evidence</option>
                      <option value="questioning">Questioning Nuance</option>
                      <option value="contextualizing">Additional Context</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-serif text-stone-700 block mb-1">Confidence</label>
                    <select
                      value={confidence}
                      onChange={(e) => setConfidence(e.target.value as any)}
                      className="w-full p-2 bg-[#fdfcf9] border border-stone-300 rounded focus:outline-none focus:border-stone-500"
                    >
                      <option value="high">High (Direct Document)</option>
                      <option value="moderate">Moderate</option>
                      <option value="low">Low (Anecdotal)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="font-serif text-stone-700 block mb-1">Factual Note / Observation</label>
                  <textarea
                    value={noteText}
                    onChange={(e) => setNoteText(e.target.value)}
                    rows={4}
                    placeholder="Provide specific document reference, regulatory filing, or clarification..."
                    className="w-full p-2.5 bg-[#fdfcf9] border border-stone-300 rounded focus:outline-none focus:border-stone-500 font-serif-prose text-xs"
                    required
                  />
                </div>

                <div>
                  <label className="font-serif text-stone-700 block mb-1">Primary Reference Link (Optional)</label>
                  <input
                    type="url"
                    value={refLink}
                    onChange={(e) => setRefLink(e.target.value)}
                    placeholder="https://..."
                    className="w-full p-2 bg-[#fdfcf9] border border-stone-300 rounded focus:outline-none focus:border-stone-500 font-mono text-[11px]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2 bg-stone-900 hover:bg-stone-800 text-stone-100 rounded font-semibold transition cursor-pointer flex items-center justify-center space-x-1"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Reader Annotation</span>
                </button>

                {submitted && (
                  <div className="p-2 bg-stone-100 border border-stone-300 rounded text-center text-stone-800 font-serif text-xs">
                    Thank you. Annotation recorded into verified community ledger.
                  </div>
                )}
              </form>
            </div>

            {/* List Column */}
            <div className="lg:col-span-7 space-y-3">
              <h3 className="font-serif-editorial font-bold text-stone-900 text-base border-b border-stone-200 pb-2">
                Audited Community Contributions ({filteredAnnotations.length})
              </h3>

              <div className="space-y-3">
                {filteredAnnotations.map((ann) => (
                  <div
                    key={ann.id}
                    className="bg-white border border-stone-300 rounded-lg p-4 shadow-xs space-y-2 text-xs font-serif"
                  >
                    <div className="flex items-center justify-between text-stone-500 border-b border-stone-200 pb-1.5">
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-stone-900">{ann.user_handle}</span>
                        <span>·</span>
                        <span className="capitalize">{ann.stance}</span>
                        <span>({ann.confidence} confidence)</span>
                      </div>
                      <span className="text-[11px] font-mono">{new Date(ann.created_at).toLocaleDateString()}</span>
                    </div>

                    <p className="font-serif-prose text-stone-800 leading-relaxed text-sm">
                      {ann.note}
                    </p>

                    <div className="flex items-center justify-between pt-1 text-[11px] text-stone-500">
                      {ann.reference_link ? (
                        <a
                          href={ann.reference_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-stone-800 hover:underline flex items-center space-x-1"
                        >
                          <span>Verified Source Link</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      ) : (
                        <span>Verified Community Reviewer</span>
                      )}

                      <button
                        onClick={() => handleUpvote(ann.id)}
                        className="px-2 py-0.5 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded border border-stone-200 transition cursor-pointer font-sans"
                      >
                        Agreed ({ann.agreement_count})
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
