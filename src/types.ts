export type SourceTier = 'primary' | 'secondary' | 'tertiary';

export type ArticleType = 'reporting' | 'analysis' | 'opinion' | 'sponsored' | 'satire';

export type PassageType =
  | 'observed event'
  | 'quantitative'
  | 'attributed statement'
  | 'interpretation'
  | 'prediction'
  | 'rhetoric';

export type ClaimType = 'event' | 'quantity' | 'statement' | 'causal';

export type ClaimStatus = 'extracted' | 'neutralized' | 'flagged' | 'rejected';

export type ConfidenceTier = 1 | 2 | 3 | 4 | 5;

export interface Source {
  id: string;
  name: string;
  tier: SourceTier;
  ownership: string;
  funding: string;
  region: string;
  language: string;
  medium: string;
  leaning_notes: string;
  correction_history: string[];
  status: 'active' | 'paused' | 'retired';
  full_text_retrievable: boolean;
  access_notes: string;
}

export interface DiversityRule {
  description: string;
  min_primary_sources: number;
  min_secondary_sources: number;
  min_independent_origins: number;
  min_distinct_ownerships: number;
  min_distinct_regions: number;
  max_tertiary_ratio: number;
  require_primary_if_available: boolean;
  require_multi_perspective?: boolean;
}

export interface ChangeRecord {
  original_span: string;
  replacement: string;
  category: string;
  rationale: string;
}

export interface Item {
  id: string;
  source_id: string;
  url: string;
  title: string;
  byline?: string;
  dateline?: string;
  published_time?: string;
  captured_time: string;
  text: string;
  event_id: string;
  event_kind: 'hard-fact' | 'numeric' | 'contested';
  article_type: ArticleType;
  duplicate_of?: string | null;
  republished_from?: string | null;
}

export interface Passage {
  id: string;
  item_id: string;
  position: number;
  text: string;
  passage_type: PassageType;
  feeds_fact_base: boolean;
  feedsFactBase?: boolean;
}

export interface Claim {
  id: string;
  passage_id: string;
  item_id: string;
  claim_type: ClaimType;
  who?: string;
  what?: string;
  when?: string;
  where?: string;
  how_much?: string;
  attribution_speaker?: string | null;
  attribution_anonymous?: boolean;
  original_wording: string;
  neutralized_wording?: string;
  changes: ChangeRecord[];
  provenance_chain: string[];
  status: ClaimStatus;
  span_start: number;
  span_end: number;
}

export interface BriefFact {
  claim_id: string;
  tier: ConfidenceTier;
  independent_source_count: number;
  text: string;
  original_text: string;
  attribution_speaker?: string | null;
  attribution_anonymous?: boolean;
  supporting_source_ids: string[];
  item_urls: string[];
  passage_ids: string[];
  changes: ChangeRecord[];
}

export interface DisputedPoint {
  topic: string;
  claims: BriefFact[];
  explanation: string;
}

export interface TimelineEntry {
  timestamp_str: string;
  claim_id: string;
  description: string;
  source_ids: string[];
  tier: ConfidenceTier;
}

export interface SourceLedgerItem {
  source_id: string;
  name: string;
  tier: SourceTier;
  independent_origin: boolean;
  republished_from?: string | null;
}

export interface Brief {
  event_id: string;
  event_label: string;
  event_kind: 'hard-fact' | 'numeric' | 'contested';
  neutral_headline: string;
  core_facts: BriefFact[];
  disputed_points: DisputedPoint[];
  single_source_facts: BriefFact[];
  unknowns: string[];
  timeline: TimelineEntry[];
  source_ledger: SourceLedgerItem[];
  diversity_compliant: boolean;
  diversity_deficiencies: string[];
  created_at: string;
}

export interface EventSummary {
  id: string;
  label: string;
  kind: 'hard-fact' | 'numeric' | 'contested';
  article_count: number;
  claims_count: number;
  sources: string[];
  primary_source_present: boolean;
  has_disputes: boolean;
  neutral_headline: string;
}
