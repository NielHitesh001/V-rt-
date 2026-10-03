export type SectorId = 'world' | 'finance' | 'politics' | 'technology';

export interface SectorMeta {
  id: SectorId;
  label: string;
  tagline: string;
  description: string;
  subtopics: string[];
}

export const SECTORS: Record<SectorId, SectorMeta> = {
  world: {
    id: 'world',
    label: 'World',
    tagline: 'International Affairs, Diplomacy & Global Events',
    description: 'Verified reporting on cross-border diplomacy, geopolitical developments, infrastructure disasters, and natural phenomena grounded in official primary records.',
    subtopics: ['Maritime & Logistics', 'Natural Disasters', 'Geopolitical Affairs', 'Diplomatic Missions']
  },
  finance: {
    id: 'finance',
    label: 'Finance',
    tagline: 'Central Banks, Markets & Economic Policy',
    description: 'Primary-source financial intelligence covering monetary policy decisions, employment statistics, global trade, and labor negotiations.',
    subtopics: ['Monetary Policy', 'Labor & Employment', 'Supply Chains', 'Macroeconomic Indicators']
  },
  politics: {
    id: 'politics',
    label: 'Politics',
    tagline: 'Elections, Governance & Legislation',
    description: 'Impartial coverage of parliamentary votes, municipal elections, housing policy mandates, and constitutional governance.',
    subtopics: ['Elections & Voting', 'Legislative Acts', 'Public Policy', 'Civic Assembly']
  },
  technology: {
    id: 'technology',
    label: 'Technology',
    tagline: 'Tech Regulation, Antitrust & Digital Policy',
    description: 'Grounded coverage of landmark court decisions, antitrust jurisprudence, intellectual property rulings, and digital platform regulation.',
    subtopics: ['Antitrust Enforcement', 'Digital Competition', 'Platform Governance', 'Copyright & AI']
  }
};

export const EVENT_SECTOR_MAP: Record<string, SectorId> = {
  'event-key-bridge-01': 'world',
  'event-taiwan-quake-01': 'world',
  'event-iceland-volcano-01': 'world',
  'event-south-china-sea-01': 'world',
  'event-ecb-ratecut-01': 'finance',
  'event-us-jobs-01': 'finance',
  'event-us-port-strike-01': 'finance',
  'event-fed-ratecut-01': 'finance',
  'event-london-mayor-01': 'politics',
  'event-uk-housing-reform-01': 'politics',
  'event-georgia-protests-01': 'politics',
  'event-french-election-01': 'politics',
  'event-google-eu-fine-01': 'technology',
  'event-tiktok-divest-01': 'technology',
  'event-ai-copyright-01': 'technology'
};

export const getSectorForEvent = (eventId: string): SectorId => {
  return EVENT_SECTOR_MAP[eventId] || 'world';
};
