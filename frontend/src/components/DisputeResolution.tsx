import React from 'react';
import { Scale } from 'lucide-react';

export const DisputeResolution: React.FC = () => {
  const disputes = [
    {
      eventId: 'event-south-china-sea-01',
      title: 'South China Sea: Maritime Encounter Near Second Thomas Shoal',
      category: 'Geopolitics & Maritime Security',
      disputeTopic: 'Account of Vessel Contact and Boarding Actions',
      date: 'June 17, 2024',
      parties: [
        {
          entity: 'Armed Forces of the Philippines (AFP)',
          source: 'Reuters / Armed Forces Briefing',
          position: 'Asserted that China Coast Guard vessels collided with and boarded Philippine naval supply boats during a scheduled resupply mission, injuring eight personnel.',
          quote: 'The Philippine military stated that Chinese coast guard vessels rammed and boarded Philippine naval boats, injuring eight personnel.'
        },
        {
          entity: "China's Coast Guard (CCG)",
          source: 'Reuters / CCG Official Statement',
          position: 'Disputed the account, stating that the Philippine transport craft entered Chinese territorial waters without authorization and ignored verbal warnings prior to contact.',
          quote: 'China\'s Coast Guard disputed the account, asserting that the Philippine transport craft entered Chinese waters and ignored warnings.'
        }
      ],
      factualContext: 'Both governments issued conflicting formal statements regarding vessel right-of-way and territorial jurisdiction in the area surrounding Second Thomas Shoal.'
    },
    {
      eventId: 'event-us-port-strike-01',
      title: 'United States East & Gulf Coast Dockworkers Contract Negotiations',
      category: 'Labor & Economic Affairs',
      disputeTopic: 'Proposed Wage Increases and Automation Provisions',
      date: 'October 1, 2024',
      parties: [
        {
          entity: 'International Longshoremen\'s Association (ILA)',
          source: 'Associated Press / Union Release',
          position: 'Sought a 61.5% wage increase over a six-year master contract along with explicit contractual bans on automated and semi-automated terminal equipment.',
          quote: 'Union leadership requested a 61.5% wage increase over six years and clear restrictions on automated cargo-handling machinery.'
        },
        {
          entity: 'United States Maritime Alliance (USMX)',
          source: 'Associated Press / Employer Alliance Statement',
          position: 'Reported offering a wage increase of nearly 50% along with contractual commitments to maintain existing automation protections.',
          quote: 'The United States Maritime Alliance stated that its proposal included a wage increase near 50% and continued protections against full automation.'
        }
      ],
      factualContext: 'Negotiations centered on the gap between the union\'s 61.5% request and the maritime alliance\'s ~50% offer, alongside automated crane language.'
    },
    {
      eventId: 'event-georgia-protests-01',
      title: 'Tbilisi Demonstrations Over Foreign Influence Legislation',
      category: 'Civil Legislation & Law Enforcement',
      disputeTopic: 'Accounts of Crowd Engagement and Police Deployment',
      date: 'May 14, 2024',
      parties: [
        {
          entity: 'Ministry of Internal Affairs (Georgia)',
          source: 'Deutsche Welle / Official Police Dispatch',
          position: 'Reported that 13 police officers sustained injuries and 20 demonstrators were taken into custody after protestors attempted to breach the parliament perimeter.',
          quote: 'The interior ministry said 13 police officers were injured and 20 protesters were detained for public order offenses.'
        },
        {
          entity: 'Civic Demonstration Organizers',
          source: 'Deutsche Welle / Organizer Coalition',
          position: 'Stated that police deployed water cannons, chemical irritants, and physical containment against peaceful assemblies exercising constitutional assembly rights.',
          quote: 'Opposition organizers stated that security forces deployed water cannons and chemical irritants against peaceful gatherings.'
        }
      ],
      factualContext: 'Conflicting official and civic accounts emerged regarding the sequence of force deployment outside the parliament building in Tbilisi.'
    }
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-stone-300 gap-3">
        <div>
          <div className="text-[11px] font-mono uppercase tracking-widest text-stone-500 font-semibold">
            The Veracity Archive · Objective Perspectives
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif-editorial font-bold text-stone-900">
            Contested Events & Divergent Accounts
          </h1>
        </div>
        <div className="text-xs font-serif text-stone-600">
          Independent, Side-by-Side Presentation of Conflicting Official Statements
        </div>
      </div>

      <div className="p-4 bg-[#f8f6f0] border border-stone-300 rounded text-xs font-serif text-stone-700 leading-relaxed">
        <p>
          When reporting parties or governments issue contradictory accounts of an event, TrueNews delivers both perspectives with exact source attribution rather than imposing an artificial consensus.
        </p>
      </div>

      {/* Disputes Cards */}
      <div className="space-y-6">
        {disputes.map((d, idx) => (
          <article key={idx} className="bg-white border border-stone-300 rounded-lg shadow-xs overflow-hidden p-6 space-y-4">
            <div className="pb-3 border-b border-stone-200 space-y-1">
              <div className="text-xs font-serif text-stone-500 flex items-center space-x-2">
                <span className="font-semibold uppercase text-stone-700 tracking-wider text-[11px]">{d.category}</span>
                <span>·</span>
                <span>{d.date}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-serif-editorial font-bold text-stone-900">
                {d.title}
              </h2>
              <div className="text-xs font-serif text-stone-700 pt-1">
                <span className="font-semibold text-stone-900">Contested Subject:</span> {d.disputeTopic}
              </div>
            </div>

            {/* Side-by-Side Comparison Columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {d.parties.map((party, pIdx) => (
                <div key={pIdx} className="p-4 bg-[#fdfcf9] border border-stone-300 rounded space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between border-b border-stone-200 pb-2">
                      <span className="font-serif-editorial font-bold text-stone-900 text-sm">
                        {party.entity}
                      </span>
                      <span className="font-serif text-[11px] text-stone-500">
                        {party.source}
                      </span>
                    </div>

                    <p className="font-serif-prose text-stone-900 text-xs sm:text-sm leading-relaxed">
                      {party.position}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-stone-200 text-xs font-serif text-stone-600 space-y-1">
                    <span className="text-stone-500 block text-[11px] font-semibold">Direct Statement:</span>
                    <p className="italic font-serif-prose">"{party.quote}"</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-stone-100 text-xs font-serif text-stone-600">
              <span className="font-semibold text-stone-900">Factual Context:</span> {d.factualContext}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
