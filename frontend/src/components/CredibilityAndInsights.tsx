import React, { useState } from 'react';
import {
  SOURCE_CREDIBILITIES,
  SOURCE_QUALITY_REPORTS,
  BIAS_GLOSSARY_ENTRIES,
  MULTILINGUAL_CLAIMS,
  GEOGRAPHIC_LOCATIONS
} from '../data/enhancementsData';
import { Award, BookOpen, Globe, MapPin, Languages, Check, Search, ArrowRight, Play, Sparkles } from 'lucide-react';
import { neutralizeClaimText } from '../data/neutralizer';

export const CredibilityAndInsights: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'credibility' | 'glossary' | 'multilingual' | 'geomap'>('credibility');
  const [searchGlossary, setSearchGlossary] = useState('');
  const [selectedGeoEventId, setSelectedGeoEventId] = useState<string>(GEOGRAPHIC_LOCATIONS[0].event_id);

  // Bias Glossary Sandbox state
  const [sandboxInput, setSandboxInput] = useState('Officials shamefully caved in to corporate demands after a disastrous deregulation decree.');
  const [sandboxResult, setSandboxResult] = useState(() => neutralizeClaimText(sandboxInput));

  const handleTestSandbox = () => {
    setSandboxResult(neutralizeClaimText(sandboxInput));
  };

  const filteredGlossary = BIAS_GLOSSARY_ENTRIES.filter(
    (b) =>
      b.loaded_term.toLowerCase().includes(searchGlossary.toLowerCase()) ||
      b.neutral_equivalent.toLowerCase().includes(searchGlossary.toLowerCase()) ||
      b.category.toLowerCase().includes(searchGlossary.toLowerCase())
  );

  const selectedGeo = GEOGRAPHIC_LOCATIONS.find((g) => g.event_id === selectedGeoEventId) || GEOGRAPHIC_LOCATIONS[0];

  return (
    <div className="space-y-8 max-w-6xl mx-auto font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-stone-300 gap-3">
        <div>
          <div className="text-[11px] font-mono uppercase tracking-widest text-stone-500 font-semibold">
            The Veracity Archive · Reliability & Linguistic Analysis
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif-editorial font-bold text-stone-900">
            Credibility Scoring, Bias Glossary & Geographic Analysis
          </h1>
        </div>

        {/* Section Tabs */}
        <div className="flex items-center space-x-1 p-1 bg-stone-200/70 rounded border border-stone-300 text-xs overflow-x-auto">
          {[
            { id: 'credibility', label: 'Source Credibility & Scorecards' },
            { id: 'glossary', label: 'Bias Marker Glossary' },
            { id: 'multilingual', label: 'Multilingual Verification' },
            { id: 'geomap', label: 'Geographic Mapping' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveSection(tab.id as any)}
              className={`px-3 py-1.5 rounded transition cursor-pointer whitespace-nowrap text-xs ${
                activeSection === tab.id
                  ? 'bg-white text-stone-900 shadow-2xs font-semibold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 1. Source Credibility Scoring & Monthly Quality Reports (Items 1 & 15) */}
      {activeSection === 'credibility' && (
        <div className="space-y-6">
          <div className="border-b border-stone-200 pb-2">
            <h2 className="font-serif-editorial font-bold text-stone-900 text-xl flex items-center space-x-2">
              <Award className="w-5 h-5 text-stone-700" />
              <span>Historical Source Credibility & Monthly Scorecards</span>
            </h2>
            <p className="text-xs font-serif text-stone-600">
              Continuous algorithmic tracking of historical accuracy, retraction rates, and dynamic reliability weighting
            </p>
          </div>

          <div className="bg-white border border-stone-300 rounded-lg shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-stone-300 bg-[#f7f5f0] text-stone-700 font-serif text-xs">
                    <th className="py-3 px-4 font-semibold">Newsroom / Official Body</th>
                    <th className="py-3 px-4 font-semibold">Classification</th>
                    <th className="py-3 px-4 font-semibold">Historical Accuracy</th>
                    <th className="py-3 px-4 font-semibold">Audited Claims</th>
                    <th className="py-3 px-4 font-semibold">Retractions</th>
                    <th className="py-3 px-4 font-semibold">Reliability Weight</th>
                    <th className="py-3 px-4 font-semibold">Audited Flags</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200 text-stone-800">
                  {SOURCE_CREDIBILITIES.map((sc) => (
                    <tr key={sc.source_id} className="hover:bg-stone-50 transition">
                      <td className="py-3 px-4 font-serif font-bold text-stone-900">
                        {sc.name}
                      </td>
                      <td className="py-3 px-4 font-serif text-stone-600 capitalize">
                        {sc.tier === 'primary' ? 'Primary Authority' : 'Wire Service'}
                      </td>
                      <td className="py-3 px-4 font-mono font-bold text-stone-900">
                        {sc.accuracy_score.toFixed(1)}%
                      </td>
                      <td className="py-3 px-4 font-mono text-stone-600">
                        {sc.evaluated_claims_count}
                      </td>
                      <td className="py-3 px-4 font-mono text-stone-600">
                        {sc.retraction_count}
                      </td>
                      <td className="py-3 px-4 font-mono font-semibold text-stone-900">
                        {(sc.reliability_weight * 100).toFixed(0)}%
                      </td>
                      <td className="py-3 px-4 text-xs font-serif text-stone-600">
                        {sc.serial_error_flags.length > 0
                          ? sc.serial_error_flags.join('; ')
                          : 'Zero serial errors detected'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Monthly Scorecards */}
          <div className="space-y-3 pt-2">
            <h3 className="font-serif-editorial font-bold text-stone-900 text-lg">
              Monthly Newsroom Quality Rankings
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {SOURCE_QUALITY_REPORTS.map((qr) => (
                <div
                  key={qr.source_id}
                  className="bg-white border border-stone-300 rounded-lg p-4 shadow-xs space-y-2"
                >
                  <div className="flex items-center justify-between text-xs font-serif text-stone-500">
                    <span className="font-bold text-stone-900">Rank #{qr.reliability_ranking}</span>
                    <span>{qr.verdict}</span>
                  </div>
                  <h4 className="font-serif-editorial font-bold text-stone-900 text-base leading-snug">
                    {qr.name}
                  </h4>
                  <div className="pt-2 border-t border-stone-200 grid grid-cols-2 gap-2 text-xs font-serif">
                    <div>
                      <span className="text-stone-500 text-[11px] block">Factuality Score</span>
                      <span className="font-mono font-bold text-stone-900">{qr.overall_factuality_score}%</span>
                    </div>
                    <div>
                      <span className="text-stone-500 text-[11px] block">Correction Rate</span>
                      <span className="font-mono font-bold text-stone-900">{qr.correction_rate}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 2. Bias Marker Glossary & Interactive Tester (Item 6) */}
      {activeSection === 'glossary' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-stone-200 pb-2 gap-3">
            <div>
              <h2 className="font-serif-editorial font-bold text-stone-900 text-xl flex items-center space-x-2">
                <BookOpen className="w-5 h-5 text-stone-700" />
                <span>Bias Marker & Neutralization Glossary</span>
              </h2>
              <p className="text-xs font-serif text-stone-600">
                Companion reference explaining which loaded words are neutralized in the background and the semantic shift applied
              </p>
            </div>

            <div className="relative w-full sm:w-64">
              <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-2.5 pointer-events-none" />
              <input
                type="text"
                value={searchGlossary}
                onChange={(e) => setSearchGlossary(e.target.value)}
                placeholder="Search glossary terms..."
                className="w-full pl-9 pr-3 py-1.5 text-xs font-serif bg-white border border-stone-300 rounded shadow-2xs text-stone-900 focus:outline-none focus:border-stone-500"
              />
            </div>
          </div>

          {/* Interactive Semantic Shift Sandbox */}
          <div className="p-5 bg-white border border-stone-300 rounded-lg shadow-xs space-y-4">
            <div className="border-b border-stone-200 pb-2 flex items-center justify-between">
              <h3 className="font-serif-editorial font-bold text-stone-900 text-base">
                Interactive Neutralization Sandbox
              </h3>
              <span className="text-xs font-serif text-stone-500">
                Inspect how rule-based semantic transformation works
              </span>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-serif text-stone-700 font-semibold block mb-1">
                  Type or Paste Loaded Journalism Text:
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={sandboxInput}
                    onChange={(e) => setSandboxInput(e.target.value)}
                    className="flex-1 p-2 text-xs font-serif bg-[#fdfcf9] border border-stone-300 rounded focus:outline-none focus:border-stone-500"
                  />
                  <button
                    onClick={handleTestSandbox}
                    className="px-4 py-2 bg-stone-900 text-stone-100 rounded text-xs font-sans font-semibold hover:bg-stone-800 transition cursor-pointer flex items-center space-x-1"
                  >
                    <Play className="w-3.5 h-3.5" />
                    <span>Transform</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-serif pt-1">
                <div className="p-3 bg-stone-50 border border-stone-200 rounded space-y-1">
                  <span className="font-mono text-[10px] text-stone-500 uppercase block font-semibold">
                    Original Loaded Input
                  </span>
                  <p className="text-stone-800 line-through">
                    "{sandboxInput}"
                  </p>
                </div>

                <div className="p-3 bg-[#fdfcf9] border border-stone-200 rounded space-y-1">
                  <span className="font-mono text-[10px] text-stone-500 uppercase block font-semibold">
                    Clean Neutralized Output
                  </span>
                  <p className="text-stone-900 font-bold">
                    "{sandboxResult.neutralized}"
                  </p>
                </div>
              </div>

              {sandboxResult.changes.length > 0 && (
                <div className="p-2.5 bg-stone-50 border border-stone-200 rounded text-xs space-y-1 font-serif">
                  <span className="font-semibold text-stone-900 block">Applied Neutralization Rules:</span>
                  {sandboxResult.changes.map((c, i) => (
                    <div key={i} className="text-stone-700">
                      • Replaced <span className="line-through">"{c.original_span}"</span> with <strong>"{c.replacement}"</strong> ({c.category} — {c.rationale})
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredGlossary.map((entry, idx) => (
              <div
                key={idx}
                className="bg-white border border-stone-300 rounded-lg p-5 shadow-xs space-y-3"
              >
                <div className="flex items-center justify-between border-b border-stone-200 pb-2 text-xs font-serif">
                  <span className="font-semibold text-stone-800">{entry.category}</span>
                  <span className="text-stone-500 font-mono text-[11px]">Rule Match</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-serif">
                  <div className="p-2.5 bg-stone-50 border border-stone-200 rounded">
                    <span className="text-stone-500 text-[10px] uppercase font-mono block">Loaded Wording (Input)</span>
                    <span className="line-through text-stone-700 font-semibold text-sm">
                      "{entry.loaded_term}"
                    </span>
                  </div>

                  <div className="p-2.5 bg-[#fcfbf9] border border-stone-200 rounded">
                    <span className="text-stone-500 text-[10px] uppercase font-mono block">Objective Equivalent</span>
                    <span className="text-stone-900 font-bold text-sm">
                      "{entry.neutral_equivalent}"
                    </span>
                  </div>
                </div>

                <p className="text-xs font-serif-prose text-stone-600 leading-relaxed">
                  <strong className="text-stone-900">Semantic Shift:</strong> {entry.semantic_shift_explanation}
                </p>

                <div className="p-2.5 bg-stone-50/70 border border-stone-200 rounded text-xs space-y-1">
                  <div className="text-[11px] text-stone-500 font-serif">Example:</div>
                  <div className="line-through text-stone-500 font-serif italic text-xs">
                    "{entry.example_original}"
                  </div>
                  <div className="text-stone-900 font-serif font-medium text-xs pt-0.5">
                    "{entry.example_neutralized}"
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. Multilingual Support (Item 9) */}
      {activeSection === 'multilingual' && (
        <div className="space-y-6">
          <div className="border-b border-stone-200 pb-2">
            <h2 className="font-serif-editorial font-bold text-stone-900 text-xl flex items-center space-x-2">
              <Languages className="w-5 h-5 text-stone-700" />
              <span>Multilingual Claim Extraction & Translation Auditing</span>
            </h2>
            <p className="text-xs font-serif text-stone-600">
              Extracts claims across origin languages, detecting whether translations shift meaning or introduce framing changes
            </p>
          </div>

          <div className="space-y-4">
            {MULTILINGUAL_CLAIMS.map((mc) => (
              <div
                key={mc.id}
                className="bg-white border border-stone-300 rounded-lg p-5 shadow-xs space-y-3"
              >
                <div className="flex items-center justify-between text-xs font-serif border-b border-stone-200 pb-2 text-stone-500">
                  <span className="font-semibold text-stone-900">{mc.original_language}</span>
                  <span>Meaning Preservation: {(mc.meaning_preservation_score * 100).toFixed(0)}%</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-serif">
                  <div className="p-3 bg-stone-50 border border-stone-200 rounded space-y-1">
                    <span className="text-[10px] font-mono uppercase text-stone-500 font-semibold block">
                      Original Native Script
                    </span>
                    <p className="text-stone-900 font-medium text-sm leading-relaxed">
                      {mc.original_script}
                    </p>
                  </div>

                  <div className="p-3 bg-[#fdfcf9] border border-stone-200 rounded space-y-1">
                    <span className="text-[10px] font-mono uppercase text-stone-500 font-semibold block">
                      Neutralized English Translation
                    </span>
                    <p className="text-stone-900 font-medium text-sm leading-relaxed font-serif-prose">
                      {mc.english_neutralized}
                    </p>
                  </div>
                </div>

                <div className="text-xs font-serif text-stone-600 pt-1">
                  <span className="font-semibold text-stone-900">Translation Audit:</span> {mc.translation_notes}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. Geographic Claim Mapping (Item 12) */}
      {activeSection === 'geomap' && (
        <div className="space-y-6">
          <div className="border-b border-stone-200 pb-2">
            <h2 className="font-serif-editorial font-bold text-stone-900 text-xl flex items-center space-x-2">
              <MapPin className="w-5 h-5 text-stone-700" />
              <span>Geographic Location & Regional Bias Matrix</span>
            </h2>
            <p className="text-xs font-serif text-stone-600">
              Interactive spatial tracking of physical events vs reporting newsroom origins, highlighting regional reporting divergences
            </p>
          </div>

          {/* Interactive World Map SVG Visualization */}
          <div className="bg-[#1f2421] text-stone-100 rounded-lg p-6 shadow-md space-y-4">
            <div className="flex flex-wrap items-center justify-between text-xs font-serif text-stone-300 border-b border-stone-700 pb-3 gap-2">
              <div className="flex items-center space-x-2">
                <Globe className="w-4 h-4 text-emerald-400" />
                <span className="font-semibold text-white">Global Event Mapping Projection</span>
              </div>
              <span>Click any marker to inspect regional divergence</span>
            </div>

            {/* Stylized Mercator projection canvas */}
            <div className="relative w-full aspect-[21/9] bg-[#141816] rounded border border-stone-800 overflow-hidden flex items-center justify-center p-4">
              <svg viewBox="0 0 1000 450" className="w-full h-full opacity-80">
                {/* Continents outline path */}
                <path
                  d="M150,120 Q220,100 280,140 Q250,220 200,260 Q160,200 150,120 Z M220,280 Q260,290 280,360 Q240,420 200,380 Z M460,110 Q540,90 580,140 Q550,200 480,210 Z M480,230 Q560,220 580,320 Q520,380 470,300 Z M640,100 Q850,70 880,180 Q820,240 700,220 Z M760,300 Q860,310 840,390 Q760,390 760,300 Z"
                  fill="#2b322e"
                />
                {/* Lat/Long Grid lines */}
                <line x1="0" y1="225" x2="1000" y2="225" stroke="#37413c" strokeDasharray="4 4" strokeWidth="0.8" />
                <line x1="500" y1="0" x2="500" y2="450" stroke="#37413c" strokeDasharray="4 4" strokeWidth="0.8" />

                {/* Event Markers */}
                {/* 1. Baltimore (lat 39.2, lon -76.5) -> x ~ 280, y ~ 160 */}
                <g
                  className="cursor-pointer"
                  onClick={() => setSelectedGeoEventId('event-key-bridge-01')}
                >
                  <circle cx="285" cy="165" r="9" fill={selectedGeoEventId === 'event-key-bridge-01' ? '#34d399' : '#e5e7eb'} opacity="0.3" className="animate-ping" />
                  <circle cx="285" cy="165" r="5" fill={selectedGeoEventId === 'event-key-bridge-01' ? '#10b981' : '#d1d5db'} stroke="#111827" strokeWidth="1.5" />
                  <text x="295" y="169" fill="#f3f4f6" fontSize="11" fontFamily="Newsreader, serif">Baltimore</text>
                </g>

                {/* 2. Frankfurt (lat 50.1, lon 8.6) -> x ~ 515, y ~ 135 */}
                <g
                  className="cursor-pointer"
                  onClick={() => setSelectedGeoEventId('event-ecb-ratecut-01')}
                >
                  <circle cx="515" cy="135" r="9" fill={selectedGeoEventId === 'event-ecb-ratecut-01' ? '#34d399' : '#e5e7eb'} opacity="0.3" className="animate-ping" />
                  <circle cx="515" cy="135" r="5" fill={selectedGeoEventId === 'event-ecb-ratecut-01' ? '#10b981' : '#d1d5db'} stroke="#111827" strokeWidth="1.5" />
                  <text x="525" y="139" fill="#f3f4f6" fontSize="11" fontFamily="Newsreader, serif">Frankfurt (ECB)</text>
                </g>

                {/* 3. Taiwan Hualien (lat 23.7, lon 121.6) -> x ~ 820, y ~ 205 */}
                <g
                  className="cursor-pointer"
                  onClick={() => setSelectedGeoEventId('event-taiwan-earthquake-01')}
                >
                  <circle cx="820" cy="205" r="9" fill={selectedGeoEventId === 'event-taiwan-earthquake-01' ? '#34d399' : '#e5e7eb'} opacity="0.3" className="animate-ping" />
                  <circle cx="820" cy="205" r="5" fill={selectedGeoEventId === 'event-taiwan-earthquake-01' ? '#10b981' : '#d1d5db'} stroke="#111827" strokeWidth="1.5" />
                  <text x="830" y="209" fill="#f3f4f6" fontSize="11" fontFamily="Newsreader, serif">Hualien, Taiwan</text>
                </g>

                {/* 4. Second Thomas Shoal (lat 9.7, lon 115.8) -> x ~ 805, y ~ 245 */}
                <g
                  className="cursor-pointer"
                  onClick={() => setSelectedGeoEventId('event-south-china-sea-01')}
                >
                  <circle cx="805" cy="245" r="9" fill={selectedGeoEventId === 'event-south-china-sea-01' ? '#34d399' : '#e5e7eb'} opacity="0.3" className="animate-ping" />
                  <circle cx="805" cy="245" r="5" fill={selectedGeoEventId === 'event-south-china-sea-01' ? '#10b981' : '#d1d5db'} stroke="#111827" strokeWidth="1.5" />
                  <text x="815" y="249" fill="#f3f4f6" fontSize="11" fontFamily="Newsreader, serif">Second Thomas Shoal</text>
                </g>
              </svg>
            </div>

            {/* Selected Location Card Display */}
            <div className="p-4 bg-[#262c28] border border-stone-700 rounded-lg space-y-3 text-xs">
              <div className="flex flex-wrap items-center justify-between text-stone-300 border-b border-stone-700 pb-2 gap-2">
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-white text-sm">{selectedGeo.location_name}</span>
                  <span className="text-stone-400">({selectedGeo.latitude.toFixed(2)}°N, {selectedGeo.longitude.toFixed(2)}°W)</span>
                </div>
                <span className="text-emerald-400 font-semibold uppercase text-[11px]">Selected Inspection Node</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-stone-200">
                <div className="p-3 bg-[#1d221f] rounded border border-stone-800 space-y-1">
                  <span className="text-[10px] font-mono uppercase text-stone-400 font-semibold block">Local Reporting Outlets</span>
                  <p className="font-medium">{selectedGeo.local_sources.join(', ')}</p>
                </div>

                <div className="p-3 bg-[#1d221f] rounded border border-stone-800 space-y-1">
                  <span className="text-[10px] font-mono uppercase text-stone-400 font-semibold block">External Wire Outlets</span>
                  <p className="font-medium">{selectedGeo.international_sources.join(', ')}</p>
                </div>
              </div>

              <div className="p-3 bg-[#1b201d] rounded border border-stone-800 text-stone-300 font-serif-prose leading-relaxed">
                <strong className="text-white">Regional Coverage Divergence:</strong> {selectedGeo.regional_coverage_bias_notes}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {GEOGRAPHIC_LOCATIONS.map((geo) => (
              <div
                key={geo.event_id}
                onClick={() => setSelectedGeoEventId(geo.event_id)}
                className={`p-5 rounded-lg border transition cursor-pointer space-y-3 ${
                  selectedGeoEventId === geo.event_id
                    ? 'bg-white border-stone-800 shadow-md ring-1 ring-stone-800'
                    : 'bg-white border-stone-300 hover:border-stone-400 shadow-xs'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-serif border-b border-stone-200 pb-2 text-stone-500">
                  <span className="font-semibold text-stone-900">{geo.location_name}</span>
                  <span className="font-mono text-[11px]">{geo.latitude.toFixed(2)}°N, {geo.longitude.toFixed(2)}°W</span>
                </div>

                <h3 className="font-serif-editorial font-bold text-stone-900 text-lg leading-snug">
                  {geo.event_name}
                </h3>

                <div className="grid grid-cols-2 gap-2 text-xs font-serif pt-1">
                  <div className="p-2.5 bg-stone-50 border border-stone-200 rounded">
                    <span className="text-[10px] font-mono uppercase text-stone-500 font-semibold block">Local Reporting Outlets</span>
                    <p className="text-stone-800 pt-1 font-medium">{geo.local_sources.join(', ')}</p>
                  </div>

                  <div className="p-2.5 bg-stone-50 border border-stone-200 rounded">
                    <span className="text-[10px] font-mono uppercase text-stone-500 font-semibold block">External / Global Wires</span>
                    <p className="text-stone-800 pt-1 font-medium">{geo.international_sources.join(', ')}</p>
                  </div>
                </div>

                <div className="p-2.5 bg-[#fdfcf9] border border-stone-200 rounded text-xs font-serif text-stone-700">
                  <span className="font-semibold text-stone-900">Regional Framing Analysis:</span> {geo.regional_coverage_bias_notes}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
