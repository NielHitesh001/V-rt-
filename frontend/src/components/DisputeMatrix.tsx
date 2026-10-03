import React from 'react';
import { Scale, AlertTriangle, ShieldAlert, ArrowLeftRight, MessageSquare, ExternalLink } from 'lucide-react';

export const DisputeMatrix: React.FC = () => {
  const disputes = [
    {
      eventId: 'event-south-china-sea-01',
      eventTitle: 'Second Thomas Shoal Maritime Incident',
      category: 'Geopolitical / Military Maritime Conflict',
      topic: 'Collision Responsibility & Tactical Actions',
      sides: [
        {
          entity: 'Philippine Military (AFP)',
          source: 'reuters (via AFP official briefing)',
          position: 'Asserted that Chinese coast guard vessels deliberately rammed and boarded Philippine naval boats, injuring eight personnel during a lawful resupply mission.',
          originalQuote: 'Philippine military stated that Chinese coast guard vessels deliberately rammed and boarded Philippine naval boats, injuring eight personnel.',
          neutralizedQuote: 'Philippine military stated that Chinese coast guard vessels collided with and boarded Philippine naval boats, injuring eight personnel.',
          attributionType: 'Attributed Official Military Assertion (Layer 1)'
        },
        {
          entity: "China's Coast Guard (CCG)",
          source: 'reuters (via CCG spokesperson statement)',
          position: 'Disputed the Philippine account, asserting that the Philippine transport craft illegally intruded into Chinese territorial waters and ignored verbal warnings.',
          originalQuote: 'China\'s Coast Guard disputed the account, asserting that the Philippine transport craft illegally intruded into Chinese territorial waters and ignored verbal warnings.',
          neutralizedQuote: 'China\'s Coast Guard stated that the Philippine transport craft entered claimed waters without permit.',
          attributionType: 'Attributed Official Coast Guard Assertion (Layer 1)'
        }
      ],
      resolutionStatus: 'Unresolved / Opposing Assertions Maintained',
      divergenceReason: 'Direct sovereign territorial dispute where neither party consents to third-party factual verification.'
    },
    {
      eventId: 'event-us-port-strike-01',
      eventTitle: 'US East Coast Dockworkers Labor Walkout',
      category: 'Labor & Economic Contract Negotiation',
      topic: 'Wage Growth Percentage & Automation Prohibitions',
      sides: [
        {
          entity: 'International Longshoremen\'s Association (ILA)',
          source: 'al-jazeera',
          position: 'Demanded a 61.5% wage increase over six years and strict prohibitions on automated cargo-handling machinery.',
          originalQuote: 'Union leadership demanded a 61.5% wage increase over six years and strict prohibitions on automated cargo-handling machinery.',
          neutralizedQuote: 'Union leadership sought a 61.5% wage adjustment over six years and contractual limits on automated equipment.',
          attributionType: 'Attributed Union Bargaining Position'
        },
        {
          entity: 'United States Maritime Alliance (USMX)',
          source: 'al-jazeera',
          position: 'Stated that its latest contract offer included a wage increase of nearly 50% and protections against full automation.',
          originalQuote: 'The United States Maritime Alliance said in a statement that its latest offer included a wage increase of nearly 50% and protections against full automation.',
          neutralizedQuote: 'The United States Maritime Alliance stated its offer provided an approximately 50% wage increase.',
          attributionType: 'Attributed Employer Association Offer'
        }
      ],
      resolutionStatus: 'Active Collective Bargaining Dispute',
      divergenceReason: 'Numeric gap of ~11.5% in base wage increases plus distinct legal definitions of automated vs semi-automated cranes.'
    },
    {
      eventId: 'event-georgia-protests-01',
      eventTitle: 'Tbilisi Foreign Influence Bill Protests',
      category: 'Civil Unrest & Police Demonstrations',
      topic: 'Protest Crowd Dynamics & Police Escalation',
      sides: [
        {
          entity: 'Georgian Ministry of Internal Affairs',
          source: 'deutsche-welle',
          position: 'Reported that 13 police officers were injured and 20 protesters were detained for public order offenses during attempts to breach parliamentary cordons.',
          originalQuote: 'The interior ministry said 13 police officers were injured and 20 protesters were detained for public order offenses.',
          neutralizedQuote: 'The interior ministry stated 13 officers sustained injuries and 20 individuals were detained.',
          attributionType: 'Attributed Law Enforcement Casualty Count'
        },
        {
          entity: 'Opposition Demonstration Organizers',
          source: 'deutsche-welle',
          position: 'Alleged that riot police launched unprovoked baton charges and chemical irritants against peaceful crowds exercising constitutional assembly rights.',
          originalQuote: 'Opposition organizers alleged that riot police launched unprovoked baton charges against peaceful crowds.',
          neutralizedQuote: 'Opposition organizers stated that police deployed batons against crowd gatherings.',
          attributionType: 'Attributed Civil Demonstration Statement'
        }
      ],
      resolutionStatus: 'Partisan Conflict with Divergent Casualty Accounts',
      divergenceReason: 'Contradictory framing of initial physical force initiation between state security services and civic organizers.'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white border border-stone-300 rounded-lg p-6 shadow-2xs">
        <div className="flex items-center space-x-3 mb-2">
          <div className="w-9 h-9 rounded-lg bg-[#94784e]/20 text-[#5c4a2c] font-bold flex items-center justify-center">
            <Scale className="w-5 h-5" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Visible Uncertainty & Side-by-Side Disputes (Milestone 6)
          </h1>
        </div>
        <p className="mt-2 text-stone-500 text-sm max-w-3xl">
          Normative Guarantee #5: When newsrooms or official authorities publish contradictory reporting, Vārtā refuses to synthesize an artificial consensus. Opposing claims are assigned Tier 4 (Disputed) and presented side-by-side with full attribution provenance.
        </p>
      </div>

      <div className="space-y-6">
        {disputes.map((d, idx) => (
          <div key={idx} className="bg-white border border-stone-300 rounded-lg p-6 shadow-2xs space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-stone-200">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs px-2 py-0.5 rounded bg-amber-950 text-[#5c4a2c] font-bold border border-amber-800 font-mono">
                    Tier 4: Disputed
                  </span>
                  <span className="text-xs font-mono text-stone-500">{d.eventId}</span>
                </div>
                <h2 className="text-xl font-bold text-white mt-1">{d.eventTitle}</h2>
              </div>
              <span className="text-xs font-semibold text-stone-500 bg-[#f5f2eb] px-3 py-1.5 rounded-lg border border-stone-200">
                {d.category}
              </span>
            </div>

            <div className="flex items-center space-x-2 text-amber-300 font-semibold text-sm">
              <AlertTriangle className="w-4 h-4 text-[#5c4a2c] font-bold shrink-0" />
              <span>Contradiction Core: {d.topic}</span>
            </div>

            {/* Side-by-Side Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {d.sides.map((side, sIdx) => (
                <div
                  key={sIdx}
                  className="bg-[#f5f2eb] border border-stone-300 rounded-xl p-4 flex flex-col justify-between space-y-3"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-stone-900 font-bold text-sm">{side.entity}</span>
                      <span className="font-mono text-[10px] text-stone-500 px-2 py-0.5 rounded bg-[#fdfcf9] border border-stone-300">
                        {side.source}
                      </span>
                    </div>

                    <div className="text-xs font-mono text-stone-900 font-bold bg-purple-950/30 px-2 py-1 rounded border border-purple-900/40">
                      {side.attributionType}
                    </div>

                    <p className="text-slate-200 text-sm leading-relaxed">{side.position}</p>
                  </div>

                  <div className="border-t border-stone-200 pt-2 space-y-1">
                    <div className="text-[11px] text-slate-500 font-mono">Original Source Text:</div>
                    <div className="text-xs text-stone-500 italic">"{side.originalQuote}"</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Analysis & Divergence Diagnosis */}
            <div className="p-3.5 rounded-xl bg-[#f5f2eb] border border-stone-200/80 text-xs space-y-1 text-stone-500">
              <div>
                <strong className="text-stone-700">Divergence Diagnosis:</strong> {d.divergenceReason}
              </div>
              <div>
                <strong className="text-stone-700">Corroborator Classification:</strong> Assigned Tier 4 (Disputed). Retained in separate dispute comparison table; excluded from Tier 1/2 consensus ledger.
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
