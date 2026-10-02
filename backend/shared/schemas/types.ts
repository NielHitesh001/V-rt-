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

// ==========================================
// TIER 1: CLOSURE & ACCOUNTABILITY
// ==========================================

// 16. Correction Velocity & Publisher Accountability
export interface PublisherAccountabilityRecord {
  outlet_id: string;
  outlet_name: string;
  correction_frequency_ratio: string; // e.g. "1 per 480 stories"
  stories_evaluated: number;
  total_corrections: number;
  total_retractions: number;
  avg_error_to_correction_hours: number;
  correction_velocity_rating: 'Rapid (<4h)' | 'Moderate (4-24h)' | 'Delayed (>24h)' | 'Sluggish / Reluctant';
  systematic_bias_flag: boolean;
  repeat_mistakes_categories: string[];
  rigor_score: number; // 0 - 100
  editorial_audit_note: string;
  recent_correction_log: {
    date: string;
    original_error: string;
    corrected_statement: string;
    hours_to_remedy: number;
    story_headline: string;
  }[];
}

// 17. AI Verifiability Watermark & Model Attribution
export interface AIWatermarkRecord {
  claim_id: string;
  claim_text: string;
  event_id: string;
  extraction_method: 'LLM Inferred' | 'Deterministic Rule' | 'Human Verified Hybrid';
  model_id: string; // e.g. "gemini-1.5-pro-preview" | "claude-3-5-sonnet" | "rule-engine-v2.1"
  model_version: string;
  extraction_timestamp: string;
  temperature: number;
  prompt_hash: string;
  confidence_decay: {
    initial_confidence: number; // 0.0 - 1.0
    half_life_days: number;
    decayed_confidence: number;
    last_revalidated_at: string;
    human_signed_by?: string;
  };
  verifier_consensus_ratio: string; // e.g. "4/4 annotators"
  watermark_signature: string; // cryptographically verifiable SHA-256 hash
}

// ==========================================
// TIER 2: SCALE & RESILIENCE
// ==========================================

// 18. Real-Time Event Detection & Auto-Routing
export interface AutoDetectedEvent {
  id: string;
  detected_at: string;
  cluster_name: string;
  urgency_tier: 'Breaking Crisis' | 'Rapid Development' | 'Standard Developing';
  triggering_entities: string[];
  matched_existing_event_id?: string;
  route_decision: 'Merge into Active Event' | 'Spin Up New Dossier';
  confidence_score: number;
  first_reporting_sources: string[];
  article_stream_count: number;
  auto_extracted_neutral_headline: string;
}

// 19. Source Health Monitoring & Downtime Tracking
export interface SourceHealthRecord {
  source_id: string;
  source_name: string;
  current_status: 'operational' | 'degraded' | 'feed_silent' | 'geo_blocked' | 'paywall_hardening';
  uptime_pct_30d: number;
  average_latency_ms: number;
  last_dispatch_time: string;
  consecutive_silent_hours: number;
  paywall_barrier_level: 'Free & Open' | 'Metered Paywall' | 'Hard Wall' | 'Suppression Anomaly';
  deliberate_suppression_alert: boolean;
  incomplete_picture_warning?: string;
  incident_log: {
    timestamp: string;
    type: 'downtime' | 'paywall_change' | 'geo_anomaly';
    details: string;
  }[];
}

// 20. Collaborative Dossier Editing & Version Control
export interface CollaborativeDossierVersion {
  version_id: string;
  event_id: string;
  commit_hash: string;
  author: string;
  role: 'Senior Fact Auditor' | 'Community Peer Reviewer' | 'Domain Specialist';
  timestamp: string;
  commit_message: string;
  diff: {
    added_claims: number;
    modified_claims: number;
    removed_claims: number;
    tier_promotions: string[];
  };
  consensus_votes: {
    approvals: number;
    rejections: number;
    required_threshold: number;
    gate_status: 'Approved & Merged' | 'Pending Review' | 'Rejected';
    reviewers: string[];
  };
  revert_possible: boolean;
}

// ==========================================
// TIER 3: INSTITUTIONAL TRUST
// ==========================================

// 21. Newsroom Transparency Pledge & Badge System
export interface NewsroomPledgeRecord {
  outlet_id: string;
  outlet_name: string;
  tier_1_verified_badge: boolean;
  pledge_signed_date: string;
  compliance_score: number; // 0 - 100
  verifiability_tier: 'Tier 1 Certified (Gold Standard)' | 'Tier 2 Compliant' | 'Pending Audit' | 'Not Pledged';
  pledge_commitments: {
    primary_citation_guarantee: boolean;
    four_hour_retraction_window: boolean;
    unredacted_ownership_register: boolean;
    rejection_of_anonymous_single_source_claims: boolean;
  };
  public_audit_url: string;
}

// 22. Structural Bias Detector (Ownership & Editorial Lines)
export interface StructuralBiasAudit {
  outlet_id: string;
  outlet_name: string;
  parent_conglomerate: string;
  ultimate_beneficial_owners: string[];
  primary_revenue_sources: string[];
  industry_ties: string[];
  topic_anomaly_rate: number; // percentage divergence on owner-tied topics
  evaluated_case_studies: {
    topic: string;
    conglomerate_interest: string;
    outlet_framing_shift: string;
    peer_benchmark_framing: string;
    divergence_score: number; // e.g. 42%
    is_statistically_significant: boolean;
  }[];
}

// 23. Primary Source Attribution Bank
export interface PrimarySourceDoc {
  id: string;
  title: string;
  issuing_body: string;
  document_type: 'Federal Investigative Report' | 'Court Ruling' | 'Official Statistical Release' | 'Treaty / Protocol' | 'Legislative Text';
  publication_date: string;
  file_format: 'PDF' | 'Official Filing' | 'CSV / Dataset';
  direct_download_url: string;
  page_count: number;
  digital_sha256: string;
  supporting_claim_ids: string[];
  outlets_citing_primary_directly: string[];
  outlets_citing_secondhand: string[];
  verified_citation_ratio: string; // e.g. "8/10 outlets checked the raw PDF"
}

// ==========================================
// TIER 4: IMPACT & ADOPTION
// ==========================================

// 24. "Claim Finder" Search Engine for Journalists
export interface HistoricalClaimRecord {
  id: string;
  claim_text: string;
  topic_category: string;
  historical_era: string;
  event_date: string;
  sources_citing: string[];
  initial_consensus: string;
  retrospective_verdict: 'Confirmed Accurate' | 'Overturned by Investigation' | 'Nuanced Resolution';
  similar_contemporary_claims: string[];
  journalist_context_notes: string;
}

// 25. Embed-able Fact Brief Widget Config
export interface FactBriefEmbedConfig {
  claim_id: string;
  headline: string;
  tier: ConfidenceTier;
  sources_count: number;
  neutral_text: string;
  provenance_badge: string;
  embed_code_snippet: string;
  live_preview_url: string;
}

// 26. LLM Fine-Tuning Dataset Export
export interface DatasetExportConfig {
  dataset_id: string;
  name: string;
  format: 'JSONL (OpenAI / Anthropic format)' | 'Alpaca Instruction JSON' | 'HuggingFace Parquet';
  sample_count: number;
  license_tier: 'Academic & Non-Profit' | 'Commercial Enterprise';
  data_split: { train: number; val: number; test: number };
  feature_attributes: string[];
  download_endpoint: string;
  sample_preview: {
    instruction: string;
    input_partisan: string;
    output_neutralized: string;
    provenance_metadata: any;
  };
}

// ==========================================
// TIER 5: DETECTION & PREVENTION
// ==========================================

// 27. Coordinated Disinformation Campaign Detector
export interface DisinformationCampaignRecord {
  id: string;
  narrative_title: string;
  origin_event_id: string;
  detection_timestamp: string;
  coordinated_outlets_count: number;
  unattributed_origin_source: string;
  time_window_minutes: number;
  verbatim_similarity_score: number; // e.g. 98.4%
  amplification_vector: 'Press Release Copypasta' | 'Foreign State Media Ring' | 'Astroturf Syndicate';
  talking_point_tokens: string[];
  dissemination_timeline: {
    minute_offset: number;
    outlet: string;
    headline: string;
  }[];
}

// 28. Paywalled Claim Auditing
export interface PaywallAuditRecord {
  id: string;
  claim_id: string;
  claim_text: string;
  primary_source_name: string;
  paywall_type: 'Strict Subscription Paywall' | 'Institutional Terminal' | 'Hard Gated';
  citation_chain_broken: boolean;
  origin_unverifiable_by_public: boolean;
  reporting_outlets_echoing: string[];
  independent_verification_status: 'Failed (Loopback Citation Only)' | 'Rescued by Secondary Freedom of Info' | 'Partially Corroborated';
  warning_label: string;
}

// 29. Image & Video Verification Integration
export interface MediaVerificationRecord {
  id: string;
  event_id: string;
  media_type: 'Photo' | 'Video' | 'Infographic';
  media_caption: string;
  thumbnail_url: string;
  claimed_location: string;
  claimed_timestamp: string;
  metadata_location: string;
  metadata_timestamp: string;
  geolocation_match: boolean;
  reverse_search_matches: number;
  first_known_appearance_date: string;
  manipulation_probability: number; // 0.0 - 1.0
  forensic_verdict: 'Authentic & Spatially Grounded' | 'Recycled Out-of-Context Footage' | 'AI-Manipulated Synthetic Artifact';
  forensic_flags: string[];
}

// ==========================================
// TIER 6: ACCESSIBILITY & INCLUSIVITY
// ==========================================

// 30. Accessible Narrative Reconstruction
export interface AccessibleNarrativeBrief {
  event_id: string;
  standard_headline: string;
  plain_language_headline: string;
  flesch_kincaid_reading_level: number; // e.g. 7.4 (Grade 7)
  plain_language_summary: string;
  key_takeaways_bullets: string[];
  audio_narration_script: string;
  audio_duration_seconds: number;
  claim_graph_nodes: {
    id: string;
    label: string;
    category: 'Trigger' | 'Impact' | 'Official Action' | 'Outcome';
    tier: number;
  }[];
  claim_graph_links: {
    source: string;
    target: string;
    relationship: 'caused' | 'confirmed' | 'led_to' | 'mitigated';
  }[];
  multilingual_translations: {
    language_code: string;
    language_name: string;
    translated_headline: string;
    translated_summary: string;
  }[];
}

