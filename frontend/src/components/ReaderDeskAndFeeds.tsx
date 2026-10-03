import React, { useState } from 'react';
import {
  INITIAL_DIGESTS,
  INITIAL_READER_ANNOTATIONS
} from '../data/enhancementsData';
import { ReaderAnnotation } from '../types';
import { Mail, Users, Send, Check, MessageSquare, BookOpen, Clock } from 'lucide-react';

export const ReaderDeskAndFeeds: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'digest' | 'community'>('digest');

  // Reader letter submission state
  const [annotations, setAnnotations] = useState<ReaderAnnotation[]>(INITIAL_READER_ANNOTATIONS);
  const [userHandle, setUserHandle] = useState('');
  const [noteText, setNoteText] = useState('');
  const [stance, setStance] = useState<'corroborating' | 'questioning' | 'contextualizing'>('corroborating');
  const [filterStance, setFilterStance] = useState<string>('all');
  const [submitted, setSubmitted] = useState(false);

  // Newsletter subscription state
  const [subscribedCategory, setSubscribedCategory] = useState<string>('all');
  const [subscribedEmail, setSubscribedEmail] = useState('');
  const [subscribedNotice, setSubscribedNotice] = useState(false);

  const handleAddAnnotation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteText.trim()) return;

    const newNote: ReaderAnnotation = {
      id: `ra-${Date.now()}`,
      claim_id: 'claim-gold-art-001-0',
      event_id: 'event-key-bridge-01',
      user_handle: userHandle.trim() || 'Reader Correspondent',
      confidence: 'high',
      stance,
      note: noteText.trim(),
      created_at: new Date().toISOString(),
      agreement_count: 1
    };

    setAnnotations([newNote, ...annotations]);
    setNoteText('');
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subscribedEmail.trim()) return;
    setSubscribedNotice(true);
    setTimeout(() => {
      setSubscribedEmail('');
      setSubscribedNotice(false);
    }, 4000);
  };

  const filteredAnnotations = annotations.filter(
    (a) => filterStance === 'all' || a.stance === filterStance
  );

  return (
    <div className="space-y-8 max-w-6xl mx-auto font-sans">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-stone-300 gap-3">
        <div>
          <div className="text-[11px] font-mono uppercase tracking-widest text-stone-500 font-semibold">
            Public Correspondence & Editions
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif-editorial font-bold text-stone-900">
            Reader Desk & Subscriptions
          </h1>
        </div>
        <div className="flex items-center space-x-2 text-xs font-serif text-stone-600">
          <span>Letters to the Editor · Daily Morning Edition</span>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center space-x-2 border-b border-stone-200">
        <button
          onClick={() => setActiveTab('digest')}
          className={`flex items-center space-x-2 px-4 py-2 border-b-2 font-serif text-sm transition cursor-pointer ${
            activeTab === 'digest'
              ? 'border-stone-900 text-stone-900 font-bold'
              : 'border-transparent text-stone-500 hover:text-stone-800'
          }`}
        >
          <Mail className="w-4 h-4" />
          <span>Morning & Evening Editions</span>
        </button>
        <button
          onClick={() => setActiveTab('community')}
          className={`flex items-center space-x-2 px-4 py-2 border-b-2 font-serif text-sm transition cursor-pointer ${
            activeTab === 'community'
              ? 'border-stone-900 text-stone-900 font-bold'
              : 'border-transparent text-stone-500 hover:text-stone-800'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Letters to the Editor ({annotations.length})</span>
        </button>
      </div>

      {/* Sub-Tab 1: Newspaper Digests & Subscriptions */}
      {activeTab === 'digest' && (
        <div className="space-y-6">
          <div className="bg-[#f5f2eb] border border-stone-300 rounded-lg p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-1 max-w-xl">
              <h2 className="font-serif-editorial font-bold text-xl text-stone-900">
                Receive The Daily Veracity Morning Dispatch
              </h2>
              <p className="text-xs text-stone-700 leading-relaxed font-serif-prose">
                Direct, objective news delivery delivered at 06:00 UTC. Every claim is cross-grounded in primary records before publication.
              </p>
            </div>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
              <input
                type="email"
                placeholder="reader@newspaper.org"
                value={subscribedEmail}
                onChange={(e) => setSubscribedEmail(e.target.value)}
                className="px-3 py-2 bg-white border border-stone-300 rounded text-xs focus:outline-hidden focus:ring-1 focus:ring-stone-400 w-full sm:w-64"
                required
              />
              <button
                type="submit"
                className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded text-xs font-serif font-semibold cursor-pointer whitespace-nowrap transition"
              >
                Subscribe Free
              </button>
            </form>
          </div>

          {subscribedNotice && (
            <div className="p-3 bg-stone-100 border border-stone-300 rounded text-stone-800 text-xs font-serif flex items-center space-x-2">
              <Check className="w-4 h-4 text-[#475e3c]" />
              <span>Subscription confirmed. Tomorrow morning&apos;s edition will be delivered to your inbox.</span>
            </div>
          )}

          {/* Published Editions Archive */}
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 border-b border-stone-200 gap-2">
              <div>
                <h3 className="font-serif-editorial font-bold text-lg text-stone-900">
                  Daily & Weekly Editorial Briefings
                </h3>
                <p className="text-xs text-stone-600 font-serif">
                  Curated factual summaries with verified updates since previous editions
                </p>
              </div>
              <div className="flex items-center space-x-1 text-xs">
                {['all', 'Daily Briefing', 'Weekly Ledger'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSubscribedCategory(cat)}
                    className={`px-3 py-1 rounded font-serif transition cursor-pointer ${
                      subscribedCategory === cat
                        ? 'bg-stone-900 text-white font-semibold'
                        : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                    }`}
                  >
                    {cat === 'all' ? 'All Editions' : cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              {INITIAL_DIGESTS.filter(
                (d) => subscribedCategory === 'all' || d.period === subscribedCategory
              ).map((digest) => (
                <div key={digest.id} className="bg-white border border-stone-300 rounded-lg p-6 sm:p-8 space-y-6 shadow-2xs">
                  <div className="flex flex-wrap items-center justify-between pb-3 border-b border-stone-200 text-xs font-serif text-stone-500 gap-2">
                    <span className="font-bold text-stone-900">{digest.edition_date}</span>
                    <span className="uppercase tracking-wider px-2 py-0.5 rounded bg-stone-100 text-stone-700 font-mono text-[10px]">
                      {digest.period}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <div className="text-[10px] font-mono uppercase text-stone-500 font-bold tracking-wider">
                      Lead Editorial Overview
                    </div>
                    <h3 className="font-serif-editorial font-bold text-stone-900 text-2xl leading-tight">
                      {digest.lead_story}
                    </h3>
                  </div>

                  <div className="space-y-6 pt-2 divide-y divide-stone-200">
                    {digest.stories.map((story) => (
                      <div key={story.event_id} className="pt-5 first:pt-0 space-y-3">
                        <h4 className="font-serif-editorial font-bold text-stone-900 text-lg leading-snug">
                          {story.headline}
                        </h4>
                        <p className="font-serif-prose text-stone-700 text-sm leading-relaxed">
                          {story.summary}
                        </p>
                        {story.changes_since_yesterday && story.changes_since_yesterday.length > 0 && (
                          <div className="p-3 bg-[#fdfcf9] border border-stone-200 rounded space-y-1.5 text-xs font-serif">
                            <span className="font-semibold text-stone-900 block text-[11px] uppercase tracking-wider font-mono">
                              Verified Updates Since Yesterday:
                            </span>
                            <ul className="list-disc list-inside space-y-1 text-stone-700 font-serif-prose">
                              {story.changes_since_yesterday.map((ch, i) => (
                                <li key={i}>{ch}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Sub-Tab 2: Letters to the Editor */}
      {activeTab === 'community' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Submit a Letter (5 cols) */}
          <div className="lg:col-span-5 bg-white border border-stone-300 rounded-lg p-5 shadow-2xs space-y-4">
            <div>
              <h3 className="font-serif-editorial font-bold text-stone-900 text-base">
                Submit a Letter to the Editor
              </h3>
              <p className="text-xs text-stone-600 font-serif-prose mt-1">
                Share verified factual context, regional perspectives, or official corroboration regarding current reports.
              </p>
            </div>

            <form onSubmit={handleAddAnnotation} className="space-y-3 text-xs">
              <div>
                <label className="block text-stone-700 font-serif font-medium mb-1">
                  Your Name or Attribution
                </label>
                <input
                  type="text"
                  placeholder="e.g. Elena Rostova, Marine Engineer"
                  value={userHandle}
                  onChange={(e) => setUserHandle(e.target.value)}
                  className="w-full p-2 bg-[#fdfcf9] border border-stone-300 rounded text-xs"
                />
              </div>

              <div>
                <label className="block text-stone-700 font-serif font-medium mb-1">
                  Perspective or Context Type
                </label>
                <select
                  value={stance}
                  onChange={(e) => setStance(e.target.value as any)}
                  className="w-full p-2 bg-[#fdfcf9] border border-stone-300 rounded text-xs"
                >
                  <option value="corroborating">Corroborating Primary Evidence</option>
                  <option value="contextualizing">Additional Context & Background</option>
                  <option value="questioning">Factual Question or Clarification</option>
                </select>
              </div>

              <div>
                <label className="block text-stone-700 font-serif font-medium mb-1">
                  Commentary or Letter Body
                </label>
                <textarea
                  rows={4}
                  placeholder="State the verifiable facts, public records, or documentation..."
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  className="w-full p-2 bg-[#fdfcf9] border border-stone-300 rounded text-xs font-serif-prose"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-stone-900 hover:bg-stone-800 text-white rounded font-serif font-semibold transition cursor-pointer flex items-center justify-center space-x-1"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Letter</span>
              </button>

              {submitted && (
                <div className="p-2 bg-stone-100 border border-stone-300 rounded text-stone-800 text-xs font-serif text-center">
                  Your letter has been recorded for editorial review.
                </div>
              )}
            </form>
          </div>

          {/* Right: Published Reader Letters (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-stone-200">
              <h3 className="font-serif-editorial font-bold text-stone-900 text-base">
                Published Correspondence
              </h3>
              <div className="flex items-center space-x-1 text-xs">
                {['all', 'corroborating', 'contextualizing'].map((s) => (
                  <button
                    key={s}
                    onClick={() => setFilterStance(s)}
                    className={`px-2.5 py-1 rounded capitalize font-serif transition ${
                      filterStance === s
                        ? 'bg-stone-900 text-white font-semibold'
                        : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              {filteredAnnotations.map((item) => (
                <div key={item.id} className="p-4 bg-white border border-stone-300 rounded-lg shadow-2xs space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-serif font-bold text-stone-900 flex items-center gap-1.5">
                      <MessageSquare className="w-3.5 h-3.5 text-stone-400" />
                      {item.user_handle}
                    </span>
                    <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-stone-100 text-stone-600 border border-stone-200">
                      {item.stance}
                    </span>
                  </div>
                  <p className="text-xs text-stone-700 leading-relaxed font-serif-prose">
                    &ldquo;{item.note}&rdquo;
                  </p>
                  <div className="text-[11px] text-stone-400 font-serif pt-1 flex items-center justify-between border-t border-stone-100">
                    <span>{new Date(item.created_at).toLocaleDateString()}</span>
                    <span className="text-stone-500">Verified Submission</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReaderDeskAndFeeds;
