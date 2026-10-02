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

// 1. Source Credibility Scoring
export interface SourceCredibility {
  source_id: string;
  name: string;
  accuracy_score: number; // e.g. 99.4%
  evaluated_claims_count: number;
  confirmed_count: number;
  retraction_count: number;
  serial_error_flags: string[];
  reliability_weight: number; // e.g. 1.0 down to 0.4
  tier: SourceTier;
  last_audit_date: string;
}

// 2. Fact-Check Integration
export interface FactCheckRecord {
  id: string;
  claim_id?: string;
  event_id?: string;
  target_claim: string;
  organization: 'PolitiFact' | 'FactCheck.org' | 'Snopes' | 'AFP Fact Check';
  verdict: 'True' | 'Mostly True' | 'Half True' | 'Misleading' | 'False' | 'Pants on Fire';
  check_date: string;
  review_summary: string;
  url: string;
}

// 3. Breaking News Velocity Detection
export interface BreakingVelocity {
  event_id: string;
  headline: string;
  velocity_rate: number; // articles/hour
  spike_detected: boolean;
  consensus_stage: 'emerging' | 'accelerating' | 'consensus' | 'stabilized';
  speculative_claims_ratio: number;
  sources_count: number;
  time_to_first_primary_hours?: number;
}

// 4. Interactive Claim Evolution
export interface ClaimEvolution {
  claim_id: string;
  topic: string;
  origin_source_id: string;
  origin_time: string;
  milestones: {
    timestamp: string;
    source_id: string;
    wording: string;
    framing_type: 'original break' | 'wire syndication' | 'framing shift' | 'neutralization consensus';
    is_breaking_origin: boolean;
  }[];
}

// 5. Reader Annotations & Crowdsourced Verification
export interface ReaderAnnotation {
  id: string;
  claim_id: string;
  event_id: string;
  user_handle: string;
  confidence: 'high' | 'moderate' | 'low';
  stance: 'corroborating' | 'questioning' | 'contextualizing';
  note: string;
  reference_link?: string;
  created_at: string;
  agreement_count: number;
}

// 6. Bias Marker Glossary
export interface BiasGlossaryEntry {
  loaded_term: string;
  neutral_equivalent: string;
  category: 'Loaded Adjective' | 'Charged Verb' | 'Intensifier' | 'Speculative Framing';
  semantic_shift_explanation: string;
  example_original: string;
  example_neutralized: string;
}

// 7. Retraction Tracking & Cascading Updates
export interface RetractionRecord {
  id: string;
  source_id: string;
  article_id: string;
  event_id: string;
  notice_date: string;
  reason: string;
  original_claim_text: string;
  corrected_claim_text: string;
  deprecated_dependent_claims: string[];
  wayback_archive_url: string;
  cascade_status: 'resolved' | 'propagated';
}

// 8. Syndication Source Tracing
export interface SyndicationTrace {
  claim_id: string;
  event_id: string;
  first_reporting_newsroom: string;
  first_published_time: string;
  syndication_path: {
    step: number;
    source_id: string;
    role: 'original reporting' | 'primary wire distribution' | 'regional republisher';
    timestamp: string;
    headline_used: string;
  }[];
}

// 9. Multilingual Support
export interface MultilingualClaim {
  id: string;
  original_language: string;
  original_script: string;
  english_neutralized: string;
  meaning_preservation_score: number;
  framing_shift_detected: boolean;
  translation_notes: string;
}

// 10. Event Narrative Reconstruction
export interface NarrativeEventNode {
  id: string;
  event_id: string;
  chronological_order: number;
  datetime_iso: string;
  verified_statement: string;
  corroborated_sources: string[];
  uncertainty_gap_warning?: string;
}

// 11. Stakeholder Claim Tracking
export interface StakeholderRecord {
  id: string;
  person_or_org: string;
  role_title: string;
  event_id: string;
  total_statements: number;
  consistency_rating: 'Consistent' | 'Revised Over Time' | 'Direct Contradiction';
  statement_history: {
    date: string;
    statement: string;
    context: string;
    source_id: string;
  }[];
}

// 12. Geographic Claim Mapping
export interface GeographicLocationData {
  event_id: string;
  event_name: string;
  latitude: number;
  longitude: number;
  location_name: string;
  local_sources: string[];
  international_sources: string[];
  regional_coverage_bias_notes: string;
}

// 13. Digest / Newsletter Generation
export interface NewsDigest {
  id: string;
  edition_date: string;
  period: 'Daily Briefing' | 'Weekly Ledger';
  lead_story: string;
  stories: {
    event_id: string;
    headline: string;
    summary: string;
    changes_since_yesterday: string[];
  }[];
}

// 15. Source Quality Report
export interface SourceQualityReport {
  source_id: string;
  name: string;
  overall_factuality_score: number;
  correction_rate: number;
  average_resolution_hours: number;
  primary_source_ratio: number;
  reliability_ranking: number;
  verdict: 'Highest Reliability' | 'High Wire Reliability' | 'Secondary Reference';
}

