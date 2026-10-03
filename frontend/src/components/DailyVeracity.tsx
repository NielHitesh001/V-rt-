import React, { useState } from 'react';
import {
  ArrowRight,
  RefreshCw,
  Calendar,
  CheckCircle2,
  Bookmark,
  Share2
} from 'lucide-react';

interface DailyVeracityProps {
  onNavigateToBrief: (eventId: string) => void;
  onNavigateToLedger: () => void;
}

interface LeadStoryConfig {
  id: string;
  kicker: string;
  headline: string;
  subdeck: string;
  image: string;
  imageCaption: string;
  dropCapPara: string;
  para2: string;
  para3: string;
  statsNumber: string;
  statsLabel: string;
  statsDesc: string;
  atAGlanceFacts: { label: string; value: string; desc: string }[];
}

const LEAD_STORIES: Record<string, LeadStoryConfig> = {
  'event-key-bridge-01': {
    id: 'event-key-bridge-01',
    kicker: 'MARITIME INFRASTRUCTURE & RECOVERY DISPATCH',
    headline: 'Baltimore Shipping Channel Reopens to Full Commercial Capacity Following Key Bridge Salvage',
    subdeck: 'Federal investigators recover voyage data recorder logs as main 700-foot channel into the Port of Baltimore fully reopens following clearance of 50,000 tons of wreckage.',
    image: '/src/assets/images/baltimore_shipping_channel_1791005010664.jpg',
    imageCaption: 'The container vessel Dali in the Patapsco River near the site of the Francis Scott Key Bridge during recovery operations. (Photo: Associated Press / Maritime Archive).',
    dropCapPara: 'The National Transportation Safety Board issued its preliminary report on the collision of the cargo vessel Dali with the Francis Scott Key Bridge in Baltimore. According to official technical logs, the vessel experienced two electrical blackouts while in port prior to departure, and two additional blackouts shortly before striking the bridge pier on March 26.',
    para2: 'Six road maintenance personnel died in the structural collapse, while one crew member sustained minor injuries. Federal and state unified command officials announced that the main 700-foot-wide commercial channel into the Port of Baltimore has now fully reopened after salvage crews cleared approximately 50,000 tons of steel and concrete wreckage.',
    para3: '"This milestone restores commercial maritime traffic to one of America\'s vital ports," Maryland Governor Wes Moore stated. Commercial container vessels resumed scheduled transit through the dredged channel Tuesday morning.',
    statsNumber: '42.8M',
    statsLabel: 'Port Annual Volume',
    statsDesc: 'Tons of international maritime cargo processed annually through the Patapsco estuary channel.',
    atAGlanceFacts: [
      { label: 'Power Sequence', value: '4 Total Electrical Failures', desc: 'Two while moored in port; two while underway prior to impact.' },
      { label: 'Clearance Volume', value: '50,000 Tons Debris', desc: 'Structural steel and reinforced concrete safely removed from Patapsco River.' },
      { label: 'Operational Channel', value: '700 Feet Wide', desc: 'Full authorized width and depth restored for container traffic.' },
      { label: 'Annual Volume', value: '42.8 Million Tons', desc: 'Cargo capacity restored for container operations.' }
    ]
  },
  'event-ecb-ratecut-01': {
    id: 'event-ecb-ratecut-01',
    kicker: 'GLOBAL MONETARY POLICY & CENTRAL BANKING',
    headline: 'European Central Bank Reduces Key Deposit Facility Rate by 25 Basis Points to 3.50%',
    subdeck: 'Governing Council in Frankfurt lowers borrowing benchmark as headline Eurozone consumer inflation retreats to 2.2%, approaching target range.',
    image: '/src/assets/images/ecb_frankfurt_headquarters_1791005074649.jpg',
    imageCaption: 'The European Central Bank headquarters in Frankfurt, Germany. (Photo: Reuters / Financial Archive).',
    dropCapPara: 'The European Central Bank announced a quarter-percentage-point cut to its benchmark deposit facility rate on Thursday, bringing borrowing costs down to 3.50%. The move represents the second reduction this year following an initial easing in June.',
    para2: 'ECB President Christine Lagarde confirmed the Governing Council acted unanimously based on incoming macroeconomic data. Wage growth across the 20-nation currency bloc moderated to 3.6% in the second quarter, providing policymaker confidence.',
    para3: '"We are determined to ensure that inflation returns to our two percent medium-term target in a timely manner," the policy statement noted, maintaining data-dependent meeting-by-meeting rate guidance.',
    statsNumber: '3.50%',
    statsLabel: 'Deposit Facility Benchmark',
    statsDesc: 'Key policy rate down from cycle peak of 4.00% established in September 2023.',
    atAGlanceFacts: [
      { label: 'Policy Move', value: '25 Basis Points Cut', desc: 'Deposit rate lowered from 3.75% to 3.50%.' },
      { label: 'Inflation Trend', value: '2.2% August Eurozone CPI', desc: 'Down significantly from 2.6% recorded in July.' },
      { label: 'Transmission', value: 'Unanimous Council Vote', desc: 'Refinancing rate adjusted to 3.65% under operational review.' },
      { label: 'Next Meeting', value: 'Data-Dependent Outlook', desc: 'Governing Council maintains meeting-by-meeting stance.' }
    ]
  },
  'event-google-eu-fine-01': {
    id: 'event-google-eu-fine-01',
    kicker: 'EUROPEAN JUDICIARY & ANTITRUST REGULATION',
    headline: 'EU Court of Justice Upholds Landmark €2.42 Billion Antitrust Penalty Against Google',
    subdeck: 'Final appeal dismissed in Luxembourg, confirming regulatory findings of self-preferencing search comparison services.',
    image: '/src/assets/images/ecb_frankfurt_headquarters_1791005074649.jpg',
    imageCaption: 'The European Court of Justice complex in Luxembourg. (Photo: European Commission / Judicial Record).',
    dropCapPara: 'The Court of Justice of the European Union delivered its final ruling Tuesday, upholding the European Commission\'s landmark 2017 decision and confirming the €2.42 billion antitrust fine levied against Google for abusing market dominance.',
    para2: 'Judges determined that Google gave illegal competitive advantage to its own proprietary shopping comparison tool across search engine results pages, systematically demoting competing price-comparison platforms.',
    para3: '"We are disappointed with the decision of the Court," a spokesperson for the technology company commented, noting changes implemented since 2017 to comply with European regulatory frameworks.',
    statsNumber: '€2.42B',
    statsLabel: 'Affirmed Antitrust Fine',
    statsDesc: 'Final unappealable financial penalty deposited into the European Union general budget.',
    atAGlanceFacts: [
      { label: 'Legal Status', value: 'Final Appeal Dismissed', desc: 'Case C-48/22 P concluded after seven years of judicial proceedings.' },
      { label: 'Market Finding', value: 'Systematic Demotion', desc: 'Algorithm favored in-house comparison service over independent rivals.' },
      { label: 'Regulatory Precedent', value: 'Digital Markets Blueprint', desc: 'Sets binding case law for subsequent Digital Markets Act enforcement.' },
      { label: 'Remedy Status', value: 'Auction Framework', desc: 'Compliance mechanism in place since 2017 across EEA countries.' }
    ]
  }
};

export const DailyVeracity: React.FC<DailyVeracityProps> = ({ onNavigateToBrief, onNavigateToLedger }) => {
  const [selectedDate, setSelectedDate] = useState<'oct-3' | 'oct-2'>('oct-3');
  const [selectedLeadId, setSelectedLeadId] = useState<string>('event-key-bridge-01');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [refreshNotice, setRefreshNotice] = useState<string | null>(null);

  const handleRefreshNewspaper = () => {
    setIsRefreshing(true);
    setRefreshNotice(null);
    setTimeout(() => {
      setIsRefreshing(false);
      setRefreshNotice('Newspaper edition synchronized with the latest news record.');
      setTimeout(() => setRefreshNotice(null), 5000);
    }, 600);
  };

  const lead = LEAD_STORIES[selectedLeadId] || LEAD_STORIES['event-key-bridge-01'];

  const formattedDateString =
    selectedDate === 'oct-2'
      ? 'FRIDAY, OCTOBER 2, 2026'
      : 'SATURDAY, OCTOBER 3, 2026';

  const volumeString =
    selectedDate === 'oct-2'
      ? 'Vol. XLIV No. 14,892 · Verified News Record'
      : 'Vol. XLIV No. 14,893 · Verified News Record';

  return (
    <div className="space-y-8 max-w-6xl mx-auto font-sans">
      {/* 1. Edition Selector */}
      <div className="bg-[#f5f2eb] border border-stone-300 rounded-lg p-3 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-serif font-bold text-stone-700 uppercase tracking-wider flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-stone-500" /> Edition:
          </span>
          <button
            onClick={() => setSelectedDate('oct-3')}
            className={`px-3 py-1.5 rounded font-serif transition-colors cursor-pointer ${
              selectedDate === 'oct-3'
                ? 'bg-stone-900 text-stone-100 font-bold shadow-2xs'
                : 'bg-white text-stone-700 border border-stone-300 hover:bg-stone-100'
            }`}
          >
            Today: Saturday, Oct 3, 2026 (Live)
          </button>
          <button
            onClick={() => setSelectedDate('oct-2')}
            className={`px-3 py-1.5 rounded font-serif transition-colors cursor-pointer ${
              selectedDate === 'oct-2'
                ? 'bg-stone-900 text-stone-100 font-bold shadow-2xs'
                : 'bg-white text-stone-700 border border-stone-300 hover:bg-stone-100'
            }`}
          >
            Yesterday: Friday, Oct 2, 2026
          </button>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleRefreshNewspaper}
            disabled={isRefreshing}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-stone-900 hover:bg-stone-800 text-white rounded font-sans font-medium transition cursor-pointer shadow-xs disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-amber-300' : ''}`} />
            <span>{isRefreshing ? 'Refreshing...' : 'Refresh Edition'}</span>
          </button>
        </div>
      </div>

      {refreshNotice && (
        <div className="p-3 bg-stone-100 border border-stone-300 rounded-lg text-stone-800 text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#475e3c] shrink-0" />
            <span className="font-serif">{refreshNotice}</span>
          </div>
          <button
            onClick={() => setRefreshNotice(null)}
            className="text-stone-600 hover:text-stone-900 font-bold text-xs"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* 2. Top Masthead & Edition Rule */}
      <div className="border-b border-stone-300 pb-2 text-[11px] font-mono tracking-wider text-stone-600 flex flex-wrap items-center justify-between gap-2 uppercase">
        <div>{volumeString}</div>
        <div className="hidden sm:block">Baltimore, London & Global Editions</div>
        <div>Objective Factual Reporting · Verified Press</div>
      </div>

      {/* 2. Masthead (“THE DAILY VERACITY”) */}
      <div className="text-center pt-2 pb-4 border-double-editorial">
        <div className="text-xs uppercase tracking-[0.25em] font-serif text-stone-600 mb-1">
          The Non-Partisan Factual Record of World Affairs
        </div>
        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-serif-masthead font-black tracking-tight text-stone-900 leading-none">
          THE DAILY VERACITY
        </h1>
        <div className="flex items-center justify-center space-x-4 sm:space-x-6 text-xs font-serif text-stone-700 mt-3 pt-2 border-t border-stone-300 flex-wrap">
          <span>BALTIMORE & GLOBAL ARCHIVE</span>
          <span>·</span>
          <span className="font-bold text-stone-900">{formattedDateString}</span>
          <span>·</span>
          <span>VERIFIED FACTUAL EDITION</span>
        </div>
      </div>

      {/* Lead Story Selectors */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs border-b border-stone-200">
        <span className="font-serif font-bold text-stone-500 uppercase tracking-wider shrink-0 mr-1">
          Front Page Lead:
        </span>
        {[
          { id: 'event-key-bridge-01', label: 'Key Bridge Salvage & Channel' },
          { id: 'event-ecb-ratecut-01', label: 'ECB 25-Bps Rate Reduction' },
          { id: 'event-google-eu-fine-01', label: 'EU Court €2.42B Google Penalty' }
        ].map((story) => (
          <button
            key={story.id}
            onClick={() => setSelectedLeadId(story.id)}
            className={`px-2.5 py-1 rounded whitespace-nowrap cursor-pointer transition-colors ${
              selectedLeadId === story.id
                ? 'bg-stone-900 text-white font-semibold'
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
            }`}
          >
            {story.label}
          </button>
        ))}
      </div>

      {/* Main Newspaper Layout: 3 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* 3. Left Column: Side Stories (3 cols) */}
        <div className="lg:col-span-3 space-y-6 divide-y divide-stone-200">
          <div className="space-y-2.5 cursor-pointer group" onClick={() => onNavigateToBrief('event-ecb-ratecut-01')}>
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

          <div className="pt-6 space-y-2.5 cursor-pointer group" onClick={() => onNavigateToBrief('event-google-eu-fine-01')}>
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

          <div className="pt-6 space-y-2.5 cursor-pointer group" onClick={() => onNavigateToBrief('event-taiwan-quake-01')}>
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

        {/* 4. Center Column: Lead Story with Clean Newspaper Layout (6 cols) */}
        <div className="lg:col-span-6 space-y-5 border-x-0 lg:border-x border-stone-200 lg:px-6">
          <div className="space-y-2">
            <div className="text-xs uppercase tracking-widest font-mono text-stone-600 font-bold">
              {lead.kicker}
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif-editorial font-black text-stone-900 tracking-tight leading-tight">
              {lead.headline}
            </h2>
            <p className="font-serif text-base italic text-stone-700 leading-normal pt-1">
              {lead.subdeck}
            </p>
          </div>

          {/* Documentary Photojournalism Image */}
          <div className="space-y-2">
            <div className="relative overflow-hidden rounded border border-stone-300 bg-stone-100 shadow-xs">
              <img
                src={lead.image}
                alt={lead.headline}
                className="w-full h-auto object-cover aspect-[16/9]"
                referrerPolicy="no-referrer"
              />
            </div>
            <p className="text-[11px] font-serif italic text-stone-600 leading-snug border-b border-stone-200 pb-2">
              {lead.imageCaption}
            </p>
          </div>

          {/* Lead Article Prose with Drop-Cap */}
          <div className="space-y-3 font-serif-prose text-stone-900 text-sm leading-relaxed text-justify">
            <p className="newspaper-dropcap">
              {lead.dropCapPara}
            </p>
            <p>{lead.para2}</p>
            <p>{lead.para3}</p>
          </div>

          <div className="pt-3 flex items-center justify-between border-t border-stone-200 text-xs">
            <button
              onClick={() => onNavigateToBrief(lead.id)}
              className="font-sans font-bold text-stone-900 hover:text-stone-700 underline flex items-center space-x-1 cursor-pointer"
            >
              <span>Read Full Report</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <div className="flex items-center space-x-3 text-stone-500">
              <button className="hover:text-stone-900 flex items-center space-x-1" title="Save story">
                <Bookmark className="w-3.5 h-3.5" />
                <span className="hidden sm:inline text-[11px]">Save</span>
              </button>
              <button className="hover:text-stone-900 flex items-center space-x-1" title="Share story">
                <Share2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline text-[11px]">Share</span>
              </button>
            </div>
          </div>
        </div>

        {/* 5. Right Column: “At a glance” Fact Box & “More news” Links (3 cols) */}
        <div className="lg:col-span-3 space-y-6">
          {/* “At a glance” Fact Box */}
          <div className="border border-stone-300 rounded p-4 space-y-3 bg-[#fdfcf9]">
            <div className="border-b border-stone-200 pb-2">
              <div className="text-[10px] font-mono uppercase tracking-widest text-stone-500 font-bold">
                Executive Summary
              </div>
              <h4 className="font-serif-editorial font-bold text-stone-900 text-base">
                At a Glance
              </h4>
            </div>

            <div className="space-y-3 text-xs font-serif-prose">
              {lead.atAGlanceFacts.map((fact, idx) => (
                <div key={idx} className={idx < lead.atAGlanceFacts.length - 1 ? 'pb-2.5 border-b border-stone-100' : ''}>
                  <span className="font-mono text-[10px] text-stone-500 block uppercase font-medium">
                    {fact.label}
                  </span>
                  <span className="font-semibold text-stone-900 block mt-0.5">
                    {fact.value}
                  </span>
                  <p className="text-stone-600 text-[11px] mt-0.5 leading-snug">
                    {fact.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Key Metric Callout */}
          <div className="p-4 bg-stone-100/80 border border-stone-300 rounded space-y-1.5">
            <div className="text-[10px] font-mono uppercase tracking-widest text-stone-600 font-semibold">
              {lead.statsLabel}
            </div>
            <div className="text-3xl font-serif font-black text-stone-900">
              {lead.statsNumber}
            </div>
            <div className="text-xs font-serif text-stone-700 leading-snug">
              {lead.statsDesc}
            </div>
          </div>

          {/* “More news” links */}
          <div className="border border-stone-300 rounded p-4 space-y-3 bg-[#fdfcf9]">
            <h4 className="font-serif-editorial font-bold text-stone-900 text-sm border-b border-stone-200 pb-2">
              More News
            </h4>
            <ul className="text-xs font-sans space-y-2.5 text-stone-700">
              <li>
                <button
                  onClick={onNavigateToLedger}
                  className="hover:text-stone-900 underline flex items-center justify-between w-full text-left cursor-pointer group"
                >
                  <span className="group-hover:text-stone-900">Explore All World News Stories</span>
                  <ArrowRight className="w-3 h-3 text-stone-400 group-hover:text-stone-700" />
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateToBrief('event-south-china-sea-01')}
                  className="hover:text-stone-900 underline flex items-center justify-between w-full text-left cursor-pointer group"
                >
                  <span className="group-hover:text-stone-900">South China Sea Maritime Encounter</span>
                  <ArrowRight className="w-3 h-3 text-stone-400 group-hover:text-stone-700" />
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateToBrief('event-us-jobs-01')}
                  className="hover:text-stone-900 underline flex items-center justify-between w-full text-left cursor-pointer group"
                >
                  <span className="group-hover:text-stone-900">US Bureau of Labor Employment Report</span>
                  <ArrowRight className="w-3 h-3 text-stone-400 group-hover:text-stone-700" />
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateToBrief('event-fed-rates-01')}
                  className="hover:text-stone-900 underline flex items-center justify-between w-full text-left cursor-pointer group"
                >
                  <span className="group-hover:text-stone-900">Federal Reserve Policy Framework</span>
                  <ArrowRight className="w-3 h-3 text-stone-400 group-hover:text-stone-700" />
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyVeracity;
