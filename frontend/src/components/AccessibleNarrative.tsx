import React, { useState, useEffect } from 'react';
import { ACCESSIBLE_NARRATIVE_BRIEFS } from '../data/enhancementsData';
import { AccessibleNarrativeBrief } from '../types';
import {
  Volume2,
  VolumeX,
  Languages,
  BookOpen,
  Network,
  CheckCircle2,
  Play,
  Square,
  Sparkles,
  ArrowRight,
  Layers,
  Award
} from 'lucide-react';

export const AccessibleNarrative: React.FC = () => {
  const [selectedEventId, setSelectedEventId] = useState<string>(ACCESSIBLE_NARRATIVE_BRIEFS[0].event_id);
  const currentBrief = ACCESSIBLE_NARRATIVE_BRIEFS.find((b) => b.event_id === selectedEventId) || ACCESSIBLE_NARRATIVE_BRIEFS[0];

  // Reading Level toggle
  const [usePlainLanguage, setUsePlainLanguage] = useState(true);

  // Audio Text-to-Speech state
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // Multilingual translation state
  const [selectedLanguage, setSelectedLanguage] = useState<string>('en');

  // Handle Text-To-Speech with browser Web Speech API
  const handleToggleAudio = () => {
    if (!('speechSynthesis' in window)) {
      alert('Speech synthesis is not supported in this browser environment.');
      return;
    }

    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
    } else {
      window.speechSynthesis.cancel();
      const textToSpeak = currentBrief.audio_narration_script;
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);
      window.speechSynthesis.speak(utterance);
      setIsPlayingAudio(true);
    }
  };

  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const activeTranslation = currentBrief.multilingual_translations.find((t) => t.language_code === selectedLanguage);

  return (
    <div className="space-y-8 max-w-6xl mx-auto font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-stone-300 gap-3">
        <div>
          <div className="text-[11px] font-mono uppercase tracking-widest text-stone-500 font-semibold">
            Tier 6: Accessibility & Inclusivity · System 30
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif-editorial font-bold text-stone-900">
            Accessible Narrative Reconstruction & Audio Brief
          </h1>
        </div>
        <div className="flex items-center space-x-2">
          {ACCESSIBLE_NARRATIVE_BRIEFS.map((b) => (
            <button
              key={b.event_id}
              onClick={() => {
                if (isPlayingAudio && 'speechSynthesis' in window) {
                  window.speechSynthesis.cancel();
                  setIsPlayingAudio(false);
                }
                setSelectedEventId(b.event_id);
              }}
              className={`px-3 py-1.5 rounded text-xs font-mono transition border cursor-pointer ${
                selectedEventId === b.event_id
                  ? 'bg-stone-900 text-stone-100 border-stone-900 font-bold'
                  : 'bg-white text-stone-700 border-stone-300 hover:border-stone-400'
              }`}
            >
              {b.event_id === 'event-key-bridge-01' ? 'Key Bridge' : 'US Port Strike'}
            </button>
          ))}
        </div>
      </div>

      {/* Main Accessible Brief Card */}
      <div className="bg-white border border-stone-300 p-6 sm:p-8 rounded shadow-xs space-y-6">
        {/* Controls Toolbar: Reading level toggle + Audio player + Language dropdown */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-stone-200">
          <div className="flex items-center space-x-2 bg-stone-100 p-1 rounded border border-stone-200 text-xs">
            <button
              type="button"
              onClick={() => setUsePlainLanguage(true)}
              className={`px-3 py-1 rounded font-medium transition cursor-pointer ${
                usePlainLanguage ? 'bg-white shadow-2xs font-bold text-stone-900' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Plain English (Grade {currentBrief.flesch_kincaid_reading_level})
            </button>
            <button
              type="button"
              onClick={() => setUsePlainLanguage(false)}
              className={`px-3 py-1 rounded font-medium transition cursor-pointer ${
                !usePlainLanguage ? 'bg-white shadow-2xs font-bold text-stone-900' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Technical Broadsheet
            </button>
          </div>

          <div className="flex items-center space-x-3">
            {/* Audio narrator button */}
            <button
              type="button"
              onClick={handleToggleAudio}
              className={`inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded text-xs font-sans font-medium transition cursor-pointer ${
                isPlayingAudio
                  ? 'bg-rose-700 text-white hover:bg-rose-800'
                  : 'bg-stone-900 text-stone-100 hover:bg-stone-800'
              }`}
            >
              {isPlayingAudio ? (
                <>
                  <Square className="w-3.5 h-3.5 fill-current" />
                  <span>Stop Audio</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Listen ({currentBrief.audio_duration_seconds}s)</span>
                </>
              )}
            </button>

            {/* Language selector */}
            <div className="flex items-center space-x-1 text-xs font-sans">
              <Languages className="w-3.5 h-3.5 text-stone-500" />
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="px-2 py-1 bg-white border border-stone-300 rounded text-xs font-serif text-stone-800 focus:outline-none focus:border-stone-500"
              >
                <option value="en">English (US)</option>
                {currentBrief.multilingual_translations.map((t) => (
                  <option key={t.language_code} value={t.language_code}>
                    {t.language_name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Narrative Presentation */}
        {selectedLanguage === 'en' ? (
          <div className="space-y-4">
            <h2 className="font-serif-editorial font-bold text-2xl sm:text-3xl text-stone-900 leading-tight">
              {usePlainLanguage ? currentBrief.plain_language_headline : currentBrief.standard_headline}
            </h2>

            <div className="p-4 bg-stone-50/70 border border-stone-200 rounded font-serif text-sm text-stone-800 leading-relaxed">
              {currentBrief.plain_language_summary}
            </div>

            {/* Key takeaways bulleted brief */}
            <div className="space-y-2 pt-2">
              <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-stone-600">
                Key Takeaways in Plain Language:
              </h3>
              <div className="space-y-1.5">
                {currentBrief.key_takeaways_bullets.map((bullet, idx) => (
                  <div key={idx} className="flex items-start space-x-2 text-xs font-serif text-stone-800">
                    <CheckCircle2 className="w-4 h-4 text-[#34482c] shrink-0 mt-0.5" />
                    <span>{bullet}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-xs font-mono text-stone-500 uppercase">
              <Languages className="w-4 h-4" />
              <span>Translated Edition: {activeTranslation?.language_name}</span>
            </div>
            <h2 className="font-serif-editorial font-bold text-2xl text-stone-900 leading-tight">
              {activeTranslation?.translated_headline}
            </h2>
            <div className="p-4 bg-stone-50/70 border border-stone-200 rounded font-serif text-sm text-stone-800 leading-relaxed">
              {activeTranslation?.translated_summary}
            </div>
          </div>
        )}

        {/* Visual Claim Relationship Flow Diagram */}
        <div className="space-y-3 pt-6 border-t border-stone-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 font-mono text-xs font-bold uppercase tracking-wider text-stone-700">
              <Network className="w-4 h-4 text-stone-600" />
              <span>Visual Claim Relationship Graph (Causal Flow & Tier Anchors)</span>
            </div>
            <span className="text-[11px] font-serif text-stone-500">
              Interactive structural map connecting causal propositions
            </span>
          </div>

          <div className="p-5 bg-[#f5f2eb] border border-stone-300 rounded overflow-x-auto">
            <div className="flex items-center space-x-3 min-w-[650px] justify-between">
              {currentBrief.claim_graph_nodes.map((node, idx) => (
                <React.Fragment key={node.id}>
                  <div className="p-3 bg-white border border-stone-300 rounded shadow-xs text-xs space-y-1 max-w-[150px] shrink-0">
                    <div className="flex items-center justify-between text-[10px] font-mono">
                      <span className="uppercase text-stone-500 font-semibold">{node.category}</span>
                      <span className="bg-stone-900 text-stone-100 px-1 rounded font-bold">T{node.tier}</span>
                    </div>
                    <div className="font-serif font-bold text-stone-900 text-xs leading-snug">
                      {node.label}
                    </div>
                  </div>
                  {idx < currentBrief.claim_graph_nodes.length - 1 && (
                    <div className="flex flex-col items-center justify-center shrink-0 px-1 text-stone-400">
                      <span className="text-[10px] font-mono text-stone-500 mb-0.5">
                        {currentBrief.claim_graph_links[idx]?.relationship || 'causes'}
                      </span>
                      <ArrowRight className="w-4 h-4 text-stone-600" />
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
