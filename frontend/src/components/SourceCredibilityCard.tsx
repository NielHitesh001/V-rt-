import React, { useState } from 'react';
import {
  ShieldCheck,
  Building,
  Globe,
  Award,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  PieChart,
  Filter,
  Search,
  Scale
} from 'lucide-react';
import { SOURCES } from '../data/sourcesData';
import { Source } from '../types';

export const SourceCredibilityCard: React.FC = () => {
  const [selectedSourceId, setSelectedSourceId] = useState<string>('ntsb-gov');
  const [tierFilter, setTierFilter] = useState<'all' | 'primary' | 'secondary' | 'tertiary'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const primaryCount = SOURCES.filter((s) => s.tier === 'primary').length;
  const secondaryCount = SOURCES.filter((s) => s.tier === 'secondary').length;
  const tertiaryCount = SOURCES.filter((s) => s.tier === 'tertiary').length;

  const filteredSources = SOURCES.filter((s) => {
    if (tierFilter !== 'all' && s.tier !== tierFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        s.name.toLowerCase().includes(q) ||
        s.id.toLowerCase().includes(q) ||
        s.ownership.toLowerCase().includes(q) ||
        s.region.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const activeSource = SOURCES.find((s) => s.id === selectedSourceId) || filteredSources[0] || SOURCES[0];

  return (
    <div className="space-y-6 font-sans">
      {/* Top Overview Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white border border-stone-200 rounded-lg p-4 shadow-sm">
          <div className="text-xs font-semibold uppercase tracking-wider text-stone-500">Registered Sources</div>
          <div className="text-2xl font-bold font-serif text-stone-900 mt-1">{SOURCES.length}</div>
          <div className="text-[11px] text-stone-500 mt-0.5">Strict registry quotas</div>
        </div>
        <div className="bg-white border border-stone-200 rounded-lg p-4 shadow-sm">
          <div className="text-xs font-semibold uppercase tracking-wider text-emerald-700">Tier 1 Primary</div>
          <div className="text-2xl font-bold font-serif text-emerald-800 mt-1">{primaryCount}</div>
          <div className="text-[11px] text-emerald-600 mt-0.5">Official investigative logs</div>
        </div>
        <div className="bg-white border border-stone-200 rounded-lg p-4 shadow-sm">
          <div className="text-xs font-semibold uppercase tracking-wider text-blue-700">Tier 2 Secondary</div>
          <div className="text-2xl font-bold font-serif text-blue-800 mt-1">{secondaryCount}</div>
          <div className="text-[11px] text-blue-600 mt-0.5">Global major newsrooms</div>
        </div>
        <div className="bg-white border border-stone-200 rounded-lg p-4 shadow-sm">
          <div className="text-xs font-semibold uppercase tracking-wider text-amber-700">Tier 3 Tertiary</div>
          <div className="text-2xl font-bold font-serif text-amber-800 mt-1">{tertiaryCount}</div>
          <div className="text-[11px] text-amber-600 mt-0.5">Specialized & independent</div>
        </div>
      </div>

      {/* Main Container */}
      <div className="bg-white border border-stone-200 rounded-lg shadow-sm overflow-hidden">
        {/* Controls */}
        <div className="p-4 border-b border-stone-200 bg-[#f9f8f4] flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Search className="w-4 h-4 text-stone-400" />
            <input
              type="text"
              placeholder="Search sources by name, ownership, region..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-3 py-1.5 text-xs bg-white border border-stone-300 rounded w-full sm:w-72 focus:outline-none focus:ring-1 focus:ring-stone-500"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end flex-wrap">
            <span className="text-xs text-stone-500 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" /> Filter:
            </span>
            {(['all', 'primary', 'secondary', 'tertiary'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTierFilter(t)}
                className={`px-2.5 py-1 text-xs rounded border transition-colors cursor-pointer capitalize ${
                  tierFilter === t
                    ? 'bg-stone-900 text-white border-stone-900 font-semibold'
                    : 'bg-white text-stone-600 border-stone-300 hover:bg-stone-50'
                }`}
              >
                {t === 'all' ? 'All Tiers' : t}
              </button>
            ))}
          </div>
        </div>

        {/* Active Source Inspector Spotlight */}
        {activeSource && (
          <div className="p-6 border-b border-stone-200 bg-stone-50/60">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span
                    className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border uppercase ${
                      activeSource.tier === 'primary'
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                        : activeSource.tier === 'secondary'
                        ? 'bg-blue-50 text-blue-800 border-blue-300'
                        : 'bg-amber-50 text-amber-800 border-amber-300'
                    }`}
                  >
                    {activeSource.tier} Source
                  </span>
                  <span className="text-xs font-mono text-stone-400">ID: {activeSource.id}</span>
                </div>
                <h3 className="text-xl font-serif font-bold text-stone-900">{activeSource.name}</h3>
                <div className="flex items-center gap-4 text-xs text-stone-600 mt-1.5">
                  <span className="flex items-center gap-1">
                    <Building className="w-3.5 h-3.5 text-stone-400" /> {activeSource.ownership}
                  </span>
                  <span className="flex items-center gap-1">
                    <Globe className="w-3.5 h-3.5 text-stone-400" /> {activeSource.region}
                  </span>
                </div>
              </div>

              {/* Credibility Metric Gauges */}
              <div className="grid grid-cols-3 gap-3 shrink-0">
                <div className="bg-white p-3 rounded border border-stone-200 text-center">
                  <div className="text-[10px] uppercase font-semibold text-stone-500">Reliability Score</div>
                  <div className="text-lg font-bold text-emerald-700 font-mono">
                    {activeSource.tier === 'primary' ? '99.4%' : activeSource.tier === 'secondary' ? '96.8%' : '91.2%'}
                  </div>
                </div>
                <div className="bg-white p-3 rounded border border-stone-200 text-center">
                  <div className="text-[10px] uppercase font-semibold text-stone-500">Bias Rating</div>
                  <div className="text-xs font-semibold text-stone-800 mt-1 font-mono">
                    {activeSource.tier === 'primary' ? 'OFFICIAL / 0.0' : 'CENTER / 0.1'}
                  </div>
                </div>
                <div className="bg-white p-3 rounded border border-stone-200 text-center">
                  <div className="text-[10px] uppercase font-semibold text-stone-500">Syndication</div>
                  <div className="text-xs font-semibold text-blue-700 mt-1 font-mono">ORIGINAL FEED</div>
                </div>
              </div>
            </div>

            {/* Diversity and Compliance Details */}
            <div className="mt-4 pt-4 border-t border-stone-200 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-stone-600">
              <div className="bg-white p-3 rounded border border-stone-200">
                <div className="font-semibold text-stone-800 mb-1 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" /> Anti-Concentration Quota
                </div>
                <p className="text-stone-500 leading-relaxed">
                  Ownership group is capped at a maximum of 35% of event claims to prevent wire monopolization or single-conglomerate bias.
                </p>
              </div>
              <div className="bg-white p-3 rounded border border-stone-200">
                <div className="font-semibold text-stone-800 mb-1 flex items-center gap-1.5">
                  <Scale className="w-4 h-4 text-blue-600" /> Cross-Border Corroboration Requirement
                </div>
                <p className="text-stone-500 leading-relaxed">
                  Claims must be confirmed across distinct geographic jurisdictions ({activeSource.region}) before tier promotion to Tier 2.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Source Directory List */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead className="bg-[#f2efe9] text-stone-700 font-semibold border-b border-stone-300">
              <tr>
                <th className="py-2.5 px-4 w-32">Tier</th>
                <th className="py-2.5 px-4">Source Organization</th>
                <th className="py-2.5 px-4">Ownership Model</th>
                <th className="py-2.5 px-4 w-28">Region</th>
                <th className="py-2.5 px-4 w-28 text-center">Reliability</th>
                <th className="py-2.5 px-4 w-20 text-center">Select</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200">
              {filteredSources.map((source) => {
                const isSelected = source.id === activeSource.id;
                return (
                  <tr
                    key={source.id}
                    onClick={() => setSelectedSourceId(source.id)}
                    className={`cursor-pointer transition-colors ${
                      isSelected ? 'bg-amber-50/80 font-medium' : 'hover:bg-stone-50'
                    }`}
                  >
                    <td className="py-2.5 px-4">
                      <span
                        className={`inline-block text-[11px] font-semibold px-2 py-0.5 rounded-full border uppercase ${
                          source.tier === 'primary'
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                            : source.tier === 'secondary'
                            ? 'bg-blue-50 text-blue-800 border-blue-300'
                            : 'bg-amber-50 text-amber-800 border-amber-300'
                        }`}
                      >
                        {source.tier}
                      </span>
                    </td>
                    <td className="py-2.5 px-4 font-serif text-stone-900">
                      {source.name}
                    </td>
                    <td className="py-2.5 px-4 text-stone-600">
                      {source.ownership}
                    </td>
                    <td className="py-2.5 px-4 text-stone-500 font-mono text-[11px]">
                      {source.region}
                    </td>
                    <td className="py-2.5 px-4 text-center font-mono font-bold text-emerald-700">
                      {source.tier === 'primary' ? '99.4%' : source.tier === 'secondary' ? '96.8%' : '91.2%'}
                    </td>
                    <td className="py-2.5 px-4 text-center">
                      <button
                        type="button"
                        className={`px-2 py-1 rounded text-[11px] font-semibold cursor-pointer ${
                          isSelected
                            ? 'bg-stone-900 text-white'
                            : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                        }`}
                      >
                        {isSelected ? 'Active' : 'View'}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SourceCredibilityCard;
