import React from 'react';
import { ArrowRight } from 'lucide-react';

interface DailyVeracityProps {
  onNavigateToBrief: (eventId: string) => void;
  onNavigateToLedger: () => void;
}

export const DailyVeracity: React.FC<DailyVeracityProps> = ({ onNavigateToBrief, onNavigateToLedger }) => {
  return (
    <div className="space-y-8 max-w-6xl mx-auto font-sans">
      {/* Newspaper Top Utility & Edition Line */}
      <div className="border-b border-stone-300 pb-2 text-[11px] font-mono tracking-wider text-stone-600 flex flex-wrap items-center justify-between gap-2 uppercase">
        <div>Vol. XLIV No. 14,892 · Verified News Record</div>
        <div className="hidden sm:block">Baltimore & Global Editions</div>
        <div>Objective Factual Reporting · Public Domain Archive</div>
      </div>

      {/* Broadsheet Masthead */}
      <div className="text-center pt-2 pb-4 border-double-editorial">
        <div className="text-xs uppercase tracking-[0.25em] font-serif text-stone-600 mb-1">
          The Non-Partisan Factual Record of World Affairs
        </div>
        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-serif-masthead font-black tracking-tight text-stone-900 leading-none">
          THE DAILY VERACITY
        </h1>
        <div className="flex items-center justify-center space-x-6 text-xs font-serif text-stone-700 mt-3 pt-2 border-t border-stone-300">
          <span>BALTIMORE & GLOBAL ARCHIVE</span>
          <span>·</span>
          <span>FRIDAY, OCTOBER 2, 2026</span>
          <span>·</span>
          <span>VERIFIED FACTUAL EDITION</span>
        </div>
      </div>

      {/* Lead Dispatch Kicker Banner */}
      <div className="bg-[#f2efe9] border-y border-stone-300 py-2.5 px-4 text-xs font-serif flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center space-x-2">
          <span className="font-sans font-bold text-[10px] tracking-widest uppercase bg-stone-900 text-stone-100 px-2 py-0.5 rounded">
            LEAD DISPATCH
          </span>
          <span className="font-semibold text-stone-900">
            NTSB Official Investigative Findings Released
          </span>
          <span className="text-stone-600 hidden md:inline">
            — Federal preliminary inquiry confirms sequence of electrical power losses prior to bridge collision.
          </span>
        </div>
        <button
          onClick={() => onNavigateToBrief('event-key-bridge-01')}
          className="text-stone-900 hover:text-stone-700 font-sans font-medium flex items-center space-x-1 cursor-pointer"
        >
          <span>Read Full Report</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Main Front Page Layout: 3 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Side Dispatches & Secondary Stories (3 cols) */}
        <div className="lg:col-span-3 space-y-6 divide-y divide-stone-200">
          <div className="space-y-3 cursor-pointer group" onClick={() => onNavigateToBrief('event-ecb-ratecut-01')}>
            <span className="text-[10px] uppercase tracking-widest font-mono text-stone-500 font-semibold block">
              Global Central Banking
            </span>
            <h3 className="font-serif-editorial text-lg font-bold text-stone-900 leading-snug group-hover:text-stone-700 transition">
              ECB Lowers Key Deposit Rate by 25 Basis Points to 3.50%
            </h3>
            <p className="text-xs text-stone-700 leading-relaxed font-serif-prose">
              The Governing Council voted unanimously in Frankfurt following initial reductions in June. Headline Eurozone inflation dropped to 2.2% in August.
            </p>
            <div className="pt-1 text-[11px] font-mono text-stone-500 flex items-center justify-between">
              <span>Reported by Reuters</span>
              <span className="text-stone-800 font-medium group-hover:underline">Read →</span>
            </div>
          </div>

          <div className="pt-6 space-y-3 cursor-pointer group" onClick={() => onNavigateToBrief('event-google-eu-fine-01')}>
            <span className="text-[10px] uppercase tracking-widest font-mono text-stone-500 font-semibold block">
              European Judiciary
            </span>
            <h3 className="font-serif-editorial text-lg font-bold text-stone-900 leading-snug group-hover:text-stone-700 transition">
              EU Top Court Upholds €2.42B Antitrust Penalty Against Google
            </h3>
            <p className="text-xs text-stone-700 leading-relaxed font-serif-prose">
              The European Court of Justice dismissed the final appeal, cementing a seven-year legal battle over comparison shopping search market dominance.
            </p>
            <div className="pt-1 text-[11px] font-mono text-stone-500 flex items-center justify-between">
              <span>Reported by Deutsche Welle</span>
              <span className="text-stone-800 font-medium group-hover:underline">Read →</span>
            </div>
          </div>

          <div className="pt-6 space-y-3 cursor-pointer group" onClick={() => onNavigateToBrief('event-taiwan-earthquake-01')}>
            <span className="text-[10px] uppercase tracking-widest font-mono text-stone-500 font-semibold block">
              Asia-Pacific News
            </span>
            <h3 className="font-serif-editorial text-lg font-bold text-stone-900 leading-snug group-hover:text-stone-700 transition">
              Magnitude 7.4 Earthquake Strikes Eastern Taiwan Off Coast of Hualien
            </h3>
            <p className="text-xs text-stone-700 leading-relaxed font-serif-prose">
              The seismic event occurred at 07:58 local time at a depth of 34.8 km. Nine casualties were confirmed with over 900 injured across Hualien County.
            </p>
            <div className="pt-1 text-[11px] font-mono text-stone-500 flex items-center justify-between">
              <span>Reported by BBC & CWA</span>
              <span className="text-stone-800 font-medium group-hover:underline">Read →</span>
            </div>
          </div>
        </div>

        {/* Center Column: Dominant Lead Broadsheet Story (6 cols) */}
        <div className="lg:col-span-6 space-y-5 border-x-0 lg:border-x border-stone-200 lg:px-6">
          <div className="space-y-2">
            <div className="text-xs uppercase tracking-widest font-mono text-stone-600 font-bold">
              MARITIME INFRASTRUCTURE & RECOVERY DISPATCH
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif-editorial font-black text-stone-900 tracking-tight leading-tight">
              Baltimore Shipping Channel Reopens to Full Commercial Capacity Following Key Bridge Salvage
            </h2>
            <p className="font-serif text-base italic text-stone-700 leading-normal pt-1">
              Federal investigators recover voyage data recorder logs as main 700-foot channel into the Port of Baltimore fully reopens following clearance of 50,000 tons of wreckage.
            </p>
          </div>

          {/* Documentary Photojournalism Image */}
          <div className="space-y-2">
            <div className="relative overflow-hidden rounded border border-stone-300 bg-stone-100 shadow-xs">
              <img
                src="/src/assets/images/daily_veracity_ship_1790954458180.jpg"
                alt="Container ship Dali in Baltimore navigation channel after Key Bridge collision"
                className="w-full h-auto object-cover aspect-[16/9]"
                referrerPolicy="no-referrer"
              />
            </div>
            <p className="text-[11px] font-serif italic text-stone-600 leading-snug border-b border-stone-200 pb-2">
              The container vessel Dali in the Patapsco River near the site of the Francis Scott Key Bridge during recovery operations. (Photo: Associated Press / Maritime Archive).
            </p>
          </div>

          {/* Lead Article Prose with Drop-Cap */}
          <div className="space-y-3 font-serif-prose text-stone-900 text-sm leading-relaxed text-justify">
            <p className="newspaper-dropcap">
              The National Transportation Safety Board issued its preliminary report on the collision of the cargo vessel Dali with the Francis Scott Key Bridge in Baltimore. According to official technical logs, the vessel experienced two electrical blackouts while in port prior to departure, and two additional blackouts shortly before striking the bridge pier on March 26.
            </p>
            <p>
              Six road maintenance personnel died in the structural collapse, while one crew member sustained minor injuries. Federal and state unified command officials announced Monday that the main 700-foot-wide commercial channel into the Port of Baltimore has now fully reopened after salvage crews cleared approximately 50,000 tons of steel and concrete wreckage.
            </p>
            <p>
              "This milestone restores commercial maritime traffic to one of America's vital ports," Maryland Governor Wes Moore stated. Commercial container vessels resumed scheduled transit through the dredged channel Tuesday morning.
            </p>
          </div>

          <div className="pt-3 flex items-center justify-between border-t border-stone-200 text-xs">
            <span className="font-serif text-stone-600">Cross-verified across NTSB, AP, and State Records</span>
            <button
              onClick={() => onNavigateToBrief('event-key-bridge-01')}
              className="font-sans font-bold text-stone-900 hover:text-stone-700 underline flex items-center space-x-1 cursor-pointer"
            >
              <span>Examine Comprehensive Report</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Right Column: Key Statistics & Facts Box (3 cols) */}
        <div className="lg:col-span-3 space-y-6">
          {/* Factual Metric Callout */}
          <div className="p-4 bg-stone-100/80 border border-stone-300 rounded space-y-2">
            <div className="text-[10px] font-mono uppercase tracking-widest text-stone-600 font-semibold">
              Port Annual Volume
            </div>
            <div className="text-4xl font-serif font-black text-stone-900">
              42.8M
            </div>
            <div className="text-xs font-serif text-stone-700 leading-snug">
              Tons of international maritime cargo processed annually through the Patapsco estuary channel.
            </div>
            <div className="pt-2 border-t border-stone-300/80 text-[10px] font-mono text-stone-500">
              US Department of Transportation Data
            </div>
          </div>

          {/* Key Facts Summary Box */}
          <div className="border border-stone-300 rounded p-4 space-y-3 bg-[#fdfcf9]">
            <h4 className="font-serif-editorial font-bold text-stone-900 text-sm border-b border-stone-200 pb-2">
              Key Factual Points
            </h4>
            <div className="space-y-3 text-xs font-serif-prose">
              <div className="pb-2 border-b border-stone-100">
                <span className="font-mono text-[10px] text-stone-500 block uppercase">1. Power Sequence</span>
                <span className="font-semibold text-stone-900">4 Total Electrical Failures</span>
                <p className="text-stone-600 text-[11px] mt-0.5">Two while moored in port; two while underway prior to impact.</p>
              </div>
              <div className="pb-2 border-b border-stone-100">
                <span className="font-mono text-[10px] text-stone-500 block uppercase">2. Clearance Volume</span>
                <span className="font-semibold text-stone-900">50,000 Tons Debris</span>
                <p className="text-stone-600 text-[11px] mt-0.5">Structural steel and reinforced concrete safely removed from Patapsco River.</p>
              </div>
              <div>
                <span className="font-mono text-[10px] text-stone-500 block uppercase">3. Operational Channel</span>
                <span className="font-semibold text-stone-900">700 Feet Wide</span>
                <p className="text-stone-600 text-[11px] mt-0.5">Full authorized width and depth restored for container traffic.</p>
              </div>
            </div>
          </div>

          {/* Quick Links to News Topics */}
          <div className="border border-stone-300 rounded p-4 space-y-2 bg-[#fdfcf9]">
            <h4 className="font-serif-editorial font-bold text-stone-900 text-sm">
              More Verified News
            </h4>
            <ul className="text-xs font-sans space-y-2 text-stone-700">
              <li>
                <button
                  onClick={onNavigateToLedger}
                  className="hover:text-stone-900 underline flex items-center justify-between w-full text-left cursor-pointer"
                >
                  <span>Explore All World News Stories</span>
                  <ArrowRight className="w-3 h-3 text-stone-400" />
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateToBrief('event-south-china-sea-01')}
                  className="hover:text-stone-900 underline flex items-center justify-between w-full text-left cursor-pointer"
                >
                  <span>South China Sea Maritime Encounter</span>
                  <ArrowRight className="w-3 h-3 text-stone-400" />
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateToBrief('event-us-jobs-01')}
                  className="hover:text-stone-900 underline flex items-center justify-between w-full text-left cursor-pointer"
                >
                  <span>US Bureau of Labor Employment Report</span>
                  <ArrowRight className="w-3 h-3 text-stone-400" />
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
