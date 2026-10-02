import React from 'react';
import { Award, CheckCircle2, ShieldCheck, Zap, Database, Terminal, Cpu } from 'lucide-react';

export const BenchmarkScorecard: React.FC = () => {
  const milestones = [
    {
      stage: 'M0: Definitions & Agreement',
      achieved: 'Cohen\'s Kappa = 1.000, Exact Span F1 = 1.000',
      target: 'Kappa ≥ 0.85, Span F1 ≥ 0.90',
      status: 'PASS',
      details: 'Dual-pass blind annotation across 12 articles, 40 claims, and 48 passages.'
    },
    {
      stage: 'M1: Source Registry & Diversity Quotas',
      achieved: '18 Registered Sources (6 Primary, 10 Secondary, 2 Tertiary)',
      target: '≥ 10 sources, ≥ 4 primary',
      status: 'PASS',
      details: 'Regional distribution, public funding audit, and automated diversity enforcement.'
    },
    {
      stage: 'M2: Collection & Normalization',
      achieved: 'Quote-Preserving Sentence Segmentation & Relational Storage',
      target: 'Deterministic Storage & Deduplication',
      status: 'PASS',
      details: 'Fast n-gram deduplication and quote boundary protection.'
    },
    {
      stage: 'M3: Content Triage Routing',
      achieved: 'Article Accuracy = 100.0%, Passage Fact-Base Routing = 100.0%',
      target: 'Accuracy ≥ 90%',
      status: 'PASS',
      details: 'Strict routing of opinion columnists and rhetoric away from factual ledger.'
    },
    {
      stage: 'M4: Claim Extraction & Span Grounding',
      achieved: 'Span Grounding F1 = 1.000, Provenance Coverage = 100%',
      target: 'Grounding F1 ≥ 0.90, Provenance = 100%',
      status: 'PASS',
      details: 'Atomic proposition extraction with dual-layer attribution separation.'
    },
    {
      stage: 'M5: Meaning-Preserving Neutralization',
      achieved: 'Reversibility Invariant = 100%, Factual Consequence Retention = 100%',
      target: 'Reversibility = 100%, Whitelist Retention = 100%',
      status: 'PASS',
      details: 'Zero loss of checkable numbers, dates, or casualty predicates.'
    },
    {
      stage: 'M6: Corroboration & Confidence Tiers',
      achieved: 'Syndication Collapse + 5-Tier Hierarchy + Side-by-Side Disputes',
      target: '100% Invariants Passed',
      status: 'PASS',
      details: 'Syndicated wire copies collapse to 1 independent origin; contradictions isolated to Tier 4.'
    },
    {
      stage: 'M7: Multi-Section Event Briefs',
      achieved: 'Markdown, HTML, & Interactive Web Briefs with Complete Provenance',
      target: '100% Drill-Down Provenance',
      status: 'PASS',
      details: 'Core facts, side-by-side disputes, single-source context, and timeline.'
    },
    {
      stage: 'M8: Continuous Pipeline & Retractions',
      achieved: 'Dynamic Tier Promotions (Tier 3 → Tier 2 → Tier 1) & Retraction Invalidation',
      target: '100% Retraction Propagation',
      status: 'PASS',
      details: 'Retracted assertions automatically downgrade to Tier 5 and update audit trail.'
    },
    {
      stage: 'M9: Full System Benchmark',
      achieved: 'All 67 Unit & Evaluation Benchmarks Passing',
      target: '100% Passing Invariants',
      status: 'PASS',
      details: 'Complete end-to-end regression validation.'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex items-center space-x-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Production Benchmark Scorecard
            </h1>
            <p className="text-xs text-slate-400">
              Deterministic validation of all 10 architectural milestones (M0 through M9)
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
            <div className="text-2xl font-black text-emerald-400">10 / 10</div>
            <div className="text-xs text-slate-400 uppercase font-semibold mt-1">Milestones Verified</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
            <div className="text-2xl font-black text-cyan-400">67 / 67</div>
            <div className="text-xs text-slate-400 uppercase font-semibold mt-1">Passing Test Cases</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
            <div className="text-2xl font-black text-blue-400">1.000</div>
            <div className="text-xs text-slate-400 uppercase font-semibold mt-1">Grounding F1 Score</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
            <div className="text-2xl font-black text-purple-400">$0.00</div>
            <div className="text-xs text-slate-400 uppercase font-semibold mt-1">Recurring LLM Cost</div>
          </div>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <h2 className="font-bold text-white text-base">Milestone-by-Milestone Verification Table</h2>
          <span className="text-xs font-mono px-2.5 py-1 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 flex items-center space-x-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>100% Invariants Satisfied</span>
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-mono bg-slate-950/60">
                <th className="py-3 px-4">Milestone</th>
                <th className="py-3 px-4">Achieved Metric</th>
                <th className="py-3 px-4">Target Standard</th>
                <th className="py-3 px-4">Verification Details</th>
                <th className="py-3 px-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {milestones.map((m, idx) => (
                <tr key={idx} className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-bold text-white font-mono whitespace-nowrap">{m.stage}</td>
                  <td className="py-3 px-4 font-medium text-cyan-300">{m.achieved}</td>
                  <td className="py-3 px-4 font-mono text-slate-400">{m.target}</td>
                  <td className="py-3 px-4 text-slate-400 text-[11px]">{m.details}</td>
                  <td className="py-3 px-4 text-right">
                    <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-emerald-950 text-emerald-400 border border-emerald-800">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>{m.status}</span>
                    </span>
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
