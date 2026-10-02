import React, { useState } from 'react';
import { SOURCES } from '../data/sourcesData';
import { Search } from 'lucide-react';

export const TransparencyRegistry: React.FC = () => {
  const [filter, setFilter] = useState<string>('all');
  const [search, setSearch] = useState<string>('');

  const filtered = SOURCES.filter((s) => {
    const matchesFilter = filter === 'all' || s.tier === filter;
    const matchesSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.id.toLowerCase().includes(search.toLowerCase()) ||
      s.ownership.toLowerCase().includes(search.toLowerCase()) ||
      s.region.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6 max-w-6xl mx-auto font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-stone-300 gap-3">
        <div>
          <div className="text-[11px] font-mono uppercase tracking-widest text-stone-500 font-semibold">
            The Veracity Archive · Standards & Sources
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif-editorial font-bold text-stone-900">
            Source Directory & Editorial Standards
          </h1>
        </div>
        <div className="text-xs font-serif text-stone-600">
          Audited News Agencies & Primary Organizations
        </div>
      </div>

      {/* Editorial Standards Overview */}
      <div className="p-5 bg-white border border-stone-300 rounded-lg shadow-xs space-y-2">
        <h3 className="font-serif-editorial font-bold text-stone-900 text-base">
          Corroboration Standards
        </h3>
        <p className="text-xs sm:text-sm font-serif-prose text-stone-700 leading-relaxed">
          TrueNews only publishes facts verified across primary official bodies (such as investigative boards, courts, and central banks) and vetted global news wire agencies. Partisan spin and loaded adjectives are stripped automatically in the background to present clean, objective reporting.
        </p>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="flex items-center space-x-1 p-1 bg-stone-200/70 rounded border border-stone-300 w-full sm:w-auto text-xs font-sans">
          {[
            { id: 'all', label: 'All Organizations' },
            { id: 'primary', label: 'Primary Authorities' },
            { id: 'secondary', label: 'Wire Services' }
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setFilter(t.id)}
              className={`px-3 py-1.5 rounded transition cursor-pointer ${
                filter === t.id
                  ? 'bg-white text-stone-900 shadow-2xs font-semibold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-2.5 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search news organizations..."
            className="w-full pl-9 pr-3 py-1.5 text-xs font-serif bg-white border border-stone-300 rounded shadow-2xs text-stone-900 focus:outline-none focus:border-stone-500"
          />
        </div>
      </div>

      {/* Directory Table */}
      <div className="bg-white border border-stone-300 rounded-lg shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-stone-300 bg-[#f7f5f0] text-stone-700 font-serif text-xs">
                <th className="py-3 px-4 font-semibold">News Organization</th>
                <th className="py-3 px-4 font-semibold">Type</th>
                <th className="py-3 px-4 font-semibold">Region / Origin</th>
                <th className="py-3 px-4 font-semibold">Ownership & Governance</th>
                <th className="py-3 px-4 font-semibold">Editorial Role</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200 text-stone-800">
              {filtered.map((s) => (
                <tr key={s.id} className="hover:bg-stone-50 transition">
                  <td className="py-3 px-4 font-serif font-bold text-stone-900">
                    <div>{s.name}</div>
                    <div className="text-[11px] font-mono font-normal text-stone-500">{s.id}</div>
                  </td>
                  <td className="py-3 px-4 font-serif text-stone-600 capitalize">
                    {s.tier === 'primary' ? 'Primary Official Body' : 'Independent News Agency'}
                  </td>
                  <td className="py-3 px-4 font-serif text-stone-600">
                    {s.region}
                  </td>
                  <td className="py-3 px-4 font-serif text-stone-600">
                    {s.ownership}
                  </td>
                  <td className="py-3 px-4 font-serif text-stone-600">
                    {s.tier === 'primary' ? 'Direct Evidence & Official Findings' : 'Independent Reporting & Corroboration'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
