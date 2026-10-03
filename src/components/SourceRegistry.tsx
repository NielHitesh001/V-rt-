import React, { useState } from 'react';
import { Search, Shield, Building, Globe, CheckCircle2, AlertCircle, FileText } from 'lucide-react';
import { SOURCES, DIVERSITY_RULES } from '../data/sourcesData';
import { SourceTier } from '../types';

export const SourceRegistry: React.FC = () => {
  const [search, setSearch] = useState('');
  const [selectedTier, setSelectedTier] = useState<string>('all');

  const filteredSources = SOURCES.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.id.toLowerCase().includes(search.toLowerCase()) ||
      s.ownership.toLowerCase().includes(search.toLowerCase()) ||
      s.region.toLowerCase().includes(search.toLowerCase());

    const matchesTier = selectedTier === 'all' || s.tier === selectedTier;
    return matchesSearch && matchesTier;
  });

  const primaryCount = SOURCES.filter((s) => s.tier === 'primary').length;
  const secondaryCount = SOURCES.filter((s) => s.tier === 'secondary').length;
  const tertiaryCount = SOURCES.filter((s) => s.tier === 'tertiary').length;

  const getTierBadge = (tier: SourceTier) => {
    switch (tier) {
      case 'primary':
        return (
          <span className="px-2 py-0.5 rounded-full text-xs font-mono font-semibold uppercase bg-blue-950 text-stone-800 font-bold border border-blue-800">
            Primary (Official / Filing)
          </span>
        );
      case 'secondary':
        return (
          <span className="px-2 py-0.5 rounded-full text-xs font-mono font-semibold uppercase bg-emerald-950 text-[#34482c] font-bold border border-emerald-800">
            Secondary (Wire / Reporter)
          </span>
        );
      case 'tertiary':
        return (
          <span className="px-2 py-0.5 rounded-full text-xs font-mono font-semibold uppercase bg-amber-950 text-[#5c4a2c] font-bold border border-amber-800">
            Tertiary (Excluded / Aggregator)
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Registry Title & Stats Grid */}
      <div className="bg-white border border-stone-300 rounded-lg p-6 shadow-2xs">
        <div className="max-w-3xl">
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Source Transparency Registry
          </h1>
          <p className="mt-2 text-stone-500 text-sm">
            Public, auditable registry of 18 sources, tiers, ownership structures, funding models, and event diversity quotas. Tertiary sources (aggregators) are strictly isolated from the core fact base.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
          <div className="p-4 rounded-xl bg-[#f5f2eb] border border-stone-300">
            <div className="text-2xl font-black text-stone-900 font-bold">{SOURCES.length}</div>
            <div className="text-xs text-stone-500 uppercase tracking-wider font-semibold mt-1">
              Registered Sources
            </div>
          </div>
          <div className="p-4 rounded-xl bg-[#f5f2eb] border border-stone-300">
            <div className="text-2xl font-black text-stone-800 font-bold">{primaryCount}</div>
            <div className="text-xs text-stone-500 uppercase tracking-wider font-semibold mt-1">
              Primary (Official)
            </div>
          </div>
          <div className="p-4 rounded-xl bg-[#f5f2eb] border border-stone-300">
            <div className="text-2xl font-black text-[#34482c] font-bold">{secondaryCount}</div>
            <div className="text-xs text-stone-500 uppercase tracking-wider font-semibold mt-1">
              Secondary (Wires)
            </div>
          </div>
          <div className="p-4 rounded-xl bg-[#f5f2eb] border border-stone-300">
            <div className="text-2xl font-black text-[#5c4a2c] font-bold">{tertiaryCount}</div>
            <div className="text-xs text-stone-500 uppercase tracking-wider font-semibold mt-1">
              Tertiary (Aggregators)
            </div>
          </div>
        </div>
      </div>

      {/* Diversity Rules Table */}
      <div className="bg-white border border-stone-300 rounded-lg p-6 shadow-2xs">
        <h2 className="text-lg font-bold text-white mb-3">Event Diversity Quotas (Section 6 & Milestone 1)</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-stone-200 text-stone-500 font-mono">
                <th className="py-2.5 px-3">Event Type</th>
                <th className="py-2.5 px-3">Min Primary</th>
                <th className="py-2.5 px-3">Min Secondary</th>
                <th className="py-2.5 px-3">Independent Origins</th>
                <th className="py-2.5 px-3">Min Ownerships</th>
                <th className="py-2.5 px-3">Min Regions</th>
                <th className="py-2.5 px-3">Tertiary Allowance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-stone-700">
              {Object.entries(DIVERSITY_RULES).map(([key, rule]) => (
                <tr key={key} className="hover:bg-slate-800/30">
                  <td className="py-3 px-3 font-semibold text-white uppercase font-mono">{key}</td>
                  <td className="py-3 px-3 font-mono text-stone-900 font-bold">≥ {rule.min_primary_sources}</td>
                  <td className="py-3 px-3 font-mono text-stone-900 font-bold">≥ {rule.min_secondary_sources}</td>
                  <td className="py-3 px-3 font-mono text-[#34482c] font-bold">≥ {rule.min_independent_origins}</td>
                  <td className="py-3 px-3 font-mono">≥ {rule.min_distinct_ownerships}</td>
                  <td className="py-3 px-3 font-mono">≥ {rule.min_distinct_regions}</td>
                  <td className="py-3 px-3 font-mono text-rose-400">
                    {rule.max_tertiary_ratio === 0 ? '0% (Strictly Excluded)' : `${rule.max_tertiary_ratio * 100}%`}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-stone-500 absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by source name, ID, ownership, or region..."
            className="w-full pl-10 pr-4 py-2.5 bg-[#fdfcf9] border border-stone-300 border border-stone-200 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          />
        </div>

        <div className="flex space-x-1.5 overflow-x-auto pb-1">
          {['all', 'primary', 'secondary', 'tertiary'].map((tier) => (
            <button
              key={tier}
              onClick={() => setSelectedTier(tier)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold capitalize transition ${
                selectedTier === tier
                  ? 'bg-cyan-500 text-slate-950 shadow-sm shadow-cyan-500/20'
                  : 'bg-[#fdfcf9] border border-stone-300 text-stone-500 hover:text-white border border-stone-200'
              }`}
            >
              {tier} {tier !== 'all' && `(${SOURCES.filter((s) => s.tier === tier).length})`}
            </button>
          ))}
        </div>
      </div>

      {/* Sources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSources.map((s) => (
          <div
            key={s.id}
            className="bg-[#fdfcf9] border border-stone-300 border border-stone-200 rounded-xl p-5 hover:border-slate-700 transition flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-3">
                <span className="font-mono text-xs text-stone-500 bg-[#f5f2eb] px-2 py-0.5 rounded border border-stone-200">
                  {s.id}
                </span>
                {getTierBadge(s.tier)}
              </div>

              <h3 className="font-bold text-white text-base leading-snug mb-2">{s.name}</h3>

              <div className="space-y-1.5 text-xs text-stone-700">
                <div className="flex items-center space-x-2">
                  <Building className="w-3.5 h-3.5 text-stone-500 shrink-0" />
                  <span className="text-stone-500">Ownership:</span>
                  <span className="truncate">{s.ownership}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Globe className="w-3.5 h-3.5 text-stone-500 shrink-0" />
                  <span className="text-stone-500">Region:</span>
                  <span>{s.region}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FileText className="w-3.5 h-3.5 text-stone-500 shrink-0" />
                  <span className="text-stone-500">Medium:</span>
                  <span className="capitalize">{s.medium}</span>
                </div>
              </div>

              {s.leaning_notes && (
                <div className="mt-3 p-2 rounded bg-[#f5f2eb] border border-stone-300/80 text-[11px] text-stone-500">
                  <span className="text-stone-700 font-medium">Profile:</span> {s.leaning_notes}
                </div>
              )}
            </div>

            <div className="mt-4 pt-3 border-t border-stone-200/60 flex items-center justify-between text-[11px] text-stone-500">
              <span>Full-text retrievable:</span>
              <span className="text-[#34482c] font-bold font-semibold flex items-center space-x-1">
                <CheckCircle2 className="w-3 h-3" />
                <span>Verified</span>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
