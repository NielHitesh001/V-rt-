import {
  SourceCredibility,
  FactCheckRecord,
  BreakingVelocity,
  ClaimEvolution,
  ReaderAnnotation,
  BiasGlossaryEntry,
  RetractionRecord,
  SyndicationTrace,
  MultilingualClaim,
  NarrativeEventNode,
  StakeholderRecord,
  GeographicLocationData,
  NewsDigest,
  SourceQualityReport,
  PublisherAccountabilityRecord,
  AIWatermarkRecord,
  AutoDetectedEvent,
  SourceHealthRecord,
  CollaborativeDossierVersion,
  NewsroomPledgeRecord,
  StructuralBiasAudit,
  PrimarySourceDoc,
  HistoricalClaimRecord,
  FactBriefEmbedConfig,
  DatasetExportConfig,
  DisinformationCampaignRecord,
  PaywallAuditRecord,
  MediaVerificationRecord,
  AccessibleNarrativeBrief
} from '../types';

export const SOURCE_CREDIBILITIES: SourceCredibility[] = [
  {
    source_id: 'ntsb-gov',
    name: 'National Transportation Safety Board',
    accuracy_score: 99.8,
    evaluated_claims_count: 320,
    confirmed_count: 319,
    retraction_count: 0,
    serial_error_flags: [],
    reliability_weight: 1.0,
    tier: 'primary',
    last_audit_date: '2026-10-01'
  },
  {
    source_id: 'reuters',
    name: 'Reuters',
    accuracy_score: 98.6,
    evaluated_claims_count: 1450,
    confirmed_count: 1430,
    retraction_count: 2,
    serial_error_flags: [],
    reliability_weight: 0.98,
    tier: 'secondary',
    last_audit_date: '2026-10-02'
  },
  {
    source_id: 'ap-news',
    name: 'Associated Press',
    accuracy_score: 98.4,
    evaluated_claims_count: 1620,
    confirmed_count: 1594,
    retraction_count: 3,
    serial_error_flags: [],
    reliability_weight: 0.98,
    tier: 'secondary',
    last_audit_date: '2026-10-02'
  },
  {
    source_id: 'bbc-news',
    name: 'BBC News',
    accuracy_score: 97.9,
    evaluated_claims_count: 1200,
    confirmed_count: 1175,
    retraction_count: 4,
    serial_error_flags: [],
    reliability_weight: 0.97,
    tier: 'secondary',
    last_audit_date: '2026-10-01'
  },
  {
    source_id: 'deutsche-welle',
    name: 'Deutsche Welle',
    accuracy_score: 97.5,
    evaluated_claims_count: 840,
    confirmed_count: 819,
    retraction_count: 1,
    serial_error_flags: [],
    reliability_weight: 0.96,
    tier: 'secondary',
    last_audit_date: '2026-09-28'
  },
  {
    source_id: 'al-jazeera',
    name: 'Al Jazeera English',
    accuracy_score: 96.8,
    evaluated_claims_count: 910,
    confirmed_count: 881,
    retraction_count: 5,
    serial_error_flags: [],
    reliability_weight: 0.95,
    tier: 'secondary',
    last_audit_date: '2026-09-30'
  }
];

export const FACT_CHECK_RECORDS: FactCheckRecord[] = [
  {
    id: 'fc-001',
    claim_id: 'claim-002',
    event_id: 'event-key-bridge-01',
    target_claim: 'The vessel lost power completely prior to striking the bridge structure.',
    organization: 'Snopes',
    verdict: 'True',
    check_date: '2026-10-01',
    review_summary: 'Confirmed via NTSB preliminary electrical telemetry logs showing two distinct blackouts.',
    url: 'https://www.snopes.com/fact-check/baltimore-key-bridge-blackout'
  },
  {
    id: 'fc-002',
    claim_id: 'claim-006',
    event_id: 'event-ecb-ratecut-01',
    target_claim: 'The ECB deposit rate was reduced to zero percent.',
    organization: 'PolitiFact',
    verdict: 'False',
    check_date: '2026-09-14',
    review_summary: 'ECB lowered rates by 25 basis points to 3.50%, not 0.00%.',
    url: 'https://www.politifact.com/factchecks/2024/sep/14/ecb-rate-cut'
  }
];

export const BREAKING_VELOCITIES: BreakingVelocity[] = [
  {
    event_id: 'event-key-bridge-01',
    headline: 'Francis Scott Key Bridge Collision & Salvage',
    velocity_rate: 42.5,
    spike_detected: false,
    consensus_stage: 'consensus',
    speculative_claims_ratio: 0.04,
    sources_count: 14,
    time_to_first_primary_hours: 1.2
  },
  {
    event_id: 'event-us-port-strike-01',
    headline: 'ILA Port Strike at 36 US Ports',
    velocity_rate: 68.2,
    spike_detected: true,
    consensus_stage: 'accelerating',
    speculative_claims_ratio: 0.28,
    sources_count: 22,
    time_to_first_primary_hours: 4.8
  }
];

export const CLAIM_EVOLUTIONS: ClaimEvolution[] = [
  {
    claim_id: 'claim-002',
    topic: 'Vessel Power Failure Timeline',
    origin_source_id: 'ap-news',
    origin_time: '2024-03-26T06:30:00Z',
    milestones: [
      {
        timestamp: '2024-03-26T06:30:00Z',
        source_id: 'ap-news',
        wording: 'Cargo ship catastrophic power failure led to bridge strike',
        framing_type: 'original break',
        is_breaking_origin: true
      },
      {
        timestamp: '2024-05-14T14:00:00Z',
        source_id: 'ntsb-gov',
        wording: 'The vessel experienced two electrical blackouts in port and two prior to impact',
        framing_type: 'neutralization consensus',
        is_breaking_origin: false
      }
    ]
  }
];

export const INITIAL_READER_ANNOTATIONS: ReaderAnnotation[] = [
  {
    id: 'ann-001',
    claim_id: 'claim-002',
    event_id: 'event-key-bridge-01',
    user_handle: 'MaritimeSpecialist',
    confidence: 'high',
    stance: 'corroborating',
    note: 'NTSB Marine Accident Preliminary DCA24MM031 Section 4 confirms engine telemetry voltage dips.',
    reference_link: 'https://www.ntsb.gov/investigations/Pages/DCA24MM031.aspx',
    created_at: '2026-10-02T18:00:00Z',
    agreement_count: 14
  }
];

export const BIAS_GLOSSARY_ENTRIES: BiasGlossaryEntry[] = [
  {
    loaded_term: 'shamefully caved in',
    neutral_equivalent: 'voted to approve proposals from',
    category: 'Charged Verb',
    semantic_shift_explanation: 'Removes editorial moral indignation and grounds statement in voting actions.',
    example_original: 'Ministers have once again shamefully caved in to developer lobbies.',
    example_neutralized: 'Ministers voted to approve proposals from developer organizations.'
  },
  {
    loaded_term: 'brazenly slammed',
    neutral_equivalent: 'criticized',
    category: 'Charged Verb',
    semantic_shift_explanation: 'Removes conflict hyperbole and provides standard objective attribution.',
    example_original: 'Lawmakers brazenly slammed the opposition proposal.',
    example_neutralized: 'Lawmakers criticized the opposition proposal.'
  },
  {
    loaded_term: 'devastating impact',
    neutral_equivalent: 'significant impact',
    category: 'Intensifier',
    semantic_shift_explanation: 'Retains measured scale without subjective catastrophizing.',
    example_original: 'The tariff will have a devastating impact on local manufacturers.',
    example_neutralized: 'The tariff will have a significant impact on local manufacturers.'
  }
];

export const RETRACTION_RECORDS: RetractionRecord[] = [
  {
    id: 'ret-001',
    source_id: 'the-guardian-opinion',
    article_id: 'gold-art-011',
    event_id: 'event-uk-housing-reform-01',
    notice_date: '2024-07-20',
    reason: 'Clarified target figure definition as annual statutory guideline rather than unamendable decree.',
    original_claim_text: 'Mandatory local building targets of 370,000 homes were irrevocably enacted.',
    corrected_claim_text: 'Mandatory local consultation targets of 370,000 homes were proposed for review.',
    deprecated_dependent_claims: [],
    wayback_archive_url: 'https://web.archive.org/web/20240718/guardian.co.uk',
    cascade_status: 'resolved'
  }
];

export const SYNDICATION_TRACES: SyndicationTrace[] = [
  {
    claim_id: 'claim-005',
    event_id: 'event-key-bridge-01',
    first_reporting_newsroom: 'Associated Press (Baltimore Bureau)',
    first_published_time: '2024-06-10T22:15:00Z',
    syndication_path: [
      {
        step: 1,
        source_id: 'ap-news',
        role: 'original reporting',
        timestamp: '2024-06-10T22:15:00Z',
        headline_used: 'Full navigation channel reopens in Baltimore after salvage crews remove Key Bridge wreckage'
      },
      {
        step: 2,
        source_id: 'washington-post',
        role: 'regional republisher',
        timestamp: '2024-06-10T23:00:00Z',
        headline_used: 'Baltimore Port 700-Foot Channel Restored to Commercial Ships'
      }
    ]
  }
];

export const MULTILINGUAL_CLAIMS: MultilingualClaim[] = [
  {
    id: 'ml-001',
    original_language: 'zh-TW',
    original_script: '花蓮外海發生芮氏規模7.4強烈地震，造成9人罹難。',
    english_neutralized: 'A magnitude 7.4 earthquake struck off Hualien, causing 9 fatalities.',
    meaning_preservation_score: 1.0,
    framing_shift_detected: false,
    translation_notes: 'Direct official terminology alignment with CWA seismic report.'
  },
  {
    id: 'ml-002',
    original_language: 'es-ES',
    original_script: 'El Congreso tumba el decreto de vivienda de Sánchez en una tensa votación.',
    english_neutralized: 'The Spanish Parliament rejected the government housing decree.',
    meaning_preservation_score: 0.98,
    framing_shift_detected: true,
    translation_notes: 'Neutralized colloquial verb "tumba" (topple) to parliamentary "rejected".'
  }
];

export const NARRATIVE_NODES: NarrativeEventNode[] = [
  {
    id: 'node-001',
    event_id: 'event-key-bridge-01',
    chronological_order: 1,
    datetime_iso: '2024-03-26T01:28:00Z',
    verified_statement: 'Container ship Dali strikes Francis Scott Key Bridge support pier.',
    corroborated_sources: ['ntsb-gov', 'ap-news']
  },
  {
    id: 'node-002',
    event_id: 'event-key-bridge-01',
    chronological_order: 2,
    datetime_iso: '2024-06-10T22:00:00Z',
    verified_statement: 'Main 700-foot commercial shipping channel fully reopened.',
    corroborated_sources: ['ap-news', 'reuters']
  }
];

export const STAKEHOLDER_RECORDS: StakeholderRecord[] = [
  {
    id: 'stk-001',
    person_or_org: 'National Transportation Safety Board (NTSB)',
    role_title: 'Independent Federal Investigator',
    event_id: 'event-key-bridge-01',
    total_statements: 6,
    consistency_rating: 'Consistent',
    statement_history: [
      {
        date: '2024-05-14',
        statement: 'Preliminary report issued documenting electrical system power interruptions.',
        context: 'Preliminary factual release',
        source_id: 'ntsb-gov'
      }
    ]
  },
  {
    id: 'stk-002',
    person_or_org: 'International Longshoremen Association (ILA)',
    role_title: 'Labor Union Representative Body',
    event_id: 'event-us-port-strike-01',
    total_statements: 8,
    consistency_rating: 'Consistent',
    statement_history: [
      {
        date: '2024-10-01',
        statement: 'Demanding wage increases and total prohibitions on automated port cranes.',
        context: 'Strike commencement manifesto',
        source_id: 'al-jazeera'
      }
    ]
  }
];

export const GEOGRAPHIC_LOCATIONS: GeographicLocationData[] = [
  {
    event_id: 'event-key-bridge-01',
    event_name: 'Francis Scott Key Bridge',
    latitude: 39.2178,
    longitude: -76.5292,
    location_name: 'Baltimore, Maryland, USA',
    local_sources: ['Baltimore Sun', 'WBAL'],
    international_sources: ['Reuters', 'BBC', 'AP'],
    regional_coverage_bias_notes: 'Extensive local operational coverage with minimal ideological divergence.'
  },
  {
    event_id: 'event-taiwan-quake-01',
    event_name: 'Taiwan Hualien Seismic Zone',
    latitude: 23.9871,
    longitude: 121.6015,
    location_name: 'Hualien County, Taiwan',
    local_sources: ['Central News Agency', 'PTS Taiwan'],
    international_sources: ['BBC', 'NHK', 'Reuters'],
    regional_coverage_bias_notes: 'Fast factual synchronization between domestic meteorological bureau and international wires.'
  }
];

export const INITIAL_DIGESTS: NewsDigest[] = [
  {
    id: 'digest-2026-10-03',
    edition_date: 'Saturday, October 3, 2026',
    period: 'Daily Briefing',
    lead_story: 'Containership Dali Investigation & Baltimore Navigation Channel Recovery',
    stories: [
      {
        event_id: 'event-key-bridge-01',
        headline: 'Baltimore Commercial Shipping Channel Fully Restored',
        summary: 'Salvation operations clear 50,000 tons of debris, restoring deep-draft vessel access to the Port of Baltimore.',
        changes_since_yesterday: [
          'Salvage tonnage verified at 50,000 tons by US Army Corps of Engineers',
          'NTSB voyage data recorder logs confirm 4 total electrical failures prior to impact'
        ]
      },
      {
        event_id: 'event-ecb-ratecut-01',
        headline: 'ECB Eases Monetary Policy with 25bps Deposit Rate Cut',
        summary: 'Governing Council lowers benchmark rate to 3.50% following moderation in headline inflation to 2.2%.',
        changes_since_yesterday: [
          'Unanimous Governing Council roll-call documented in Frankfurt',
          'Eurozone wage growth moderation confirmed in second quarter statistics'
        ]
      },
      {
        event_id: 'event-google-eu-fine-01',
        headline: 'EU Top Court Upholds €2.42B Google Antitrust Judgment',
        summary: 'European Court of Justice delivers final unappealable ruling cementing penalty for search comparison dominance.',
        changes_since_yesterday: [
          'Case C-48/22 P formally concluded after 7 years of proceedings',
          'Fine confirmed deposited into European Union general budget'
        ]
      }
    ]
  },
  {
    id: 'digest-2026-10-01',
    edition_date: 'Week of September 27 – October 3, 2026',
    period: 'Weekly Ledger',
    lead_story: 'Global Maritime Infrastructure, Central Bank Easing Cycles & Antitrust Precedents',
    stories: [
      {
        event_id: 'event-taiwan-quake-01',
        headline: 'Magnitude 7.4 Offshore Earthquake Strikes Hualien County',
        summary: 'Central Weather Administration confirms seismic event off eastern coast with emergency response mobilized.',
        changes_since_yesterday: [
          '34.8 km focal depth verified by global seismic monitoring networks',
          'Over 900 injuries treated across eastern regional clinics'
        ]
      },
      {
        event_id: 'event-us-jobs-01',
        headline: 'Bureau of Labor Statistics Releases Annual Payrolls Revision',
        summary: 'Preliminary benchmark revisions adjust total employment baseline downwards following annual state unemployment data review.',
        changes_since_yesterday: [
          '818,000 annual benchmark adjustment documented across establishment survey',
          'State unemployment insurance tax records cross-correlated'
        ]
      }
    ]
  }
];

export const SOURCE_QUALITY_REPORTS: SourceQualityReport[] = [
  {
    source_id: 'ntsb-gov',
    name: 'NTSB Official Releases',
    overall_factuality_score: 99.9,
    correction_rate: 0.01,
    average_resolution_hours: 1.0,
    primary_source_ratio: 1.0,
    reliability_ranking: 1,
    verdict: 'Highest Reliability'
  },
  {
    source_id: 'reuters',
    name: 'Reuters World News',
    overall_factuality_score: 98.6,
    correction_rate: 0.12,
    average_resolution_hours: 2.4,
    primary_source_ratio: 0.65,
    reliability_ranking: 2,
    verdict: 'High Wire Reliability'
  },
  {
    source_id: 'ap-news',
    name: 'Associated Press Wire',
    overall_factuality_score: 98.4,
    correction_rate: 0.15,
    average_resolution_hours: 2.8,
    primary_source_ratio: 0.62,
    reliability_ranking: 3,
    verdict: 'High Wire Reliability'
  }
];

export const PUBLISHER_ACCOUNTABILITY_RECORDS: PublisherAccountabilityRecord[] = [
  {
    outlet_id: 'reuters',
    outlet_name: 'Reuters',
    correction_frequency_ratio: '1 per 820 stories',
    stories_evaluated: 4100,
    total_corrections: 5,
    total_retractions: 0,
    avg_error_to_correction_hours: 2.1,
    correction_velocity_rating: 'Rapid (<4h)',
    systematic_bias_flag: false,
    repeat_mistakes_categories: ['Numerical precision in rapid market snaps'],
    rigor_score: 96,
    editorial_audit_note: 'Maintains transparent correction box at the foot of all syndicated pieces.',
    recent_correction_log: [
      {
        date: '2026-09-12',
        original_error: 'Stated rate cut took effect on Wednesday instead of Thursday',
        corrected_statement: 'Amended effective date to Thursday following Governing Council publication',
        hours_to_remedy: 1.2,
        story_headline: 'ECB cuts interest rates again as euro zone growth falters'
      }
    ]
  }
];

export const AI_WATERMARK_RECORDS: AIWatermarkRecord[] = [
  {
    claim_id: 'claim-001',
    claim_text: 'NTSB issued its preliminary report on the Dali collision with Key Bridge.',
    event_id: 'event-key-bridge-01',
    extraction_method: 'Deterministic Rule',
    model_id: 'rule-engine-v2.4',
    model_version: '2.4.0',
    extraction_timestamp: '2026-10-02T15:22:00Z',
    temperature: 0.0,
    prompt_hash: 'sha256:e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    confidence_decay: {
      initial_confidence: 1.0,
      half_life_days: 365,
      decayed_confidence: 1.0,
      last_revalidated_at: '2026-10-02T15:22:00Z',
      human_signed_by: 'annotator_1'
    },
    verifier_consensus_ratio: '2/2 annotators',
    watermark_signature: '7d5a9b2c8f1e4a3d6c0b9e8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b'
  }
];

export const AUTO_DETECTED_EVENTS: AutoDetectedEvent[] = [
  {
    id: 'auto-evt-101',
    detected_at: '2026-10-03T01:15:00Z',
    cluster_name: 'Key Bridge Navigation Recovery Phase 3',
    urgency_tier: 'Standard Developing',
    triggering_entities: ['Baltimore Channel', 'Coast Guard', 'Salvage Operations'],
    matched_existing_event_id: 'event-key-bridge-01',
    route_decision: 'Merge into Active Event',
    confidence_score: 0.96,
    first_reporting_sources: ['ap-news', 'reuters'],
    article_stream_count: 8,
    auto_extracted_neutral_headline: 'Coast Guard Confirms 700-Foot Channel Maintenance Schedule in Baltimore'
  }
];

export const SOURCE_HEALTH_RECORDS: SourceHealthRecord[] = [
  {
    source_id: 'ntsb-gov',
    source_name: 'National Transportation Safety Board',
    current_status: 'operational',
    uptime_pct_30d: 99.98,
    average_latency_ms: 120,
    last_dispatch_time: '2026-10-02T22:30:00Z',
    consecutive_silent_hours: 0,
    paywall_barrier_level: 'Free & Open',
    deliberate_suppression_alert: false,
    incident_log: []
  },
  {
    source_id: 'reuters',
    source_name: 'Reuters World News Wire',
    current_status: 'operational',
    uptime_pct_30d: 99.95,
    average_latency_ms: 85,
    last_dispatch_time: '2026-10-03T02:45:00Z',
    consecutive_silent_hours: 0,
    paywall_barrier_level: 'Metered Paywall',
    deliberate_suppression_alert: false,
    incident_log: []
  }
];

export const COLLABORATIVE_DOSSIER_VERSIONS: CollaborativeDossierVersion[] = [
  {
    version_id: 'dos-ver-003',
    event_id: 'event-key-bridge-01',
    commit_hash: 'fc65f20480f1',
    author: 'Chief Epistemic Auditor',
    role: 'Senior Fact Auditor',
    timestamp: '2026-10-02T21:30:00Z',
    commit_message: 'Corroborated 50,000 ton salvage figure across Maryland Port Authority filings',
    diff: {
      added_claims: 2,
      modified_claims: 1,
      removed_claims: 0,
      tier_promotions: ['claim-005 promoted to Tier 1']
    },
    consensus_votes: {
      approvals: 3,
      rejections: 0,
      required_threshold: 2,
      gate_status: 'Approved & Merged',
      reviewers: ['auditor_alpha', 'auditor_beta', 'domain_specialist']
    },
    revert_possible: true
  }
];

export const NEWSROOM_PLEDGE_RECORDS: NewsroomPledgeRecord[] = [
  {
    outlet_id: 'reuters',
    outlet_name: 'Reuters',
    tier_1_verified_badge: true,
    pledge_signed_date: '2026-01-15',
    compliance_score: 98,
    verifiability_tier: 'Tier 1 Certified (Gold Standard)',
    pledge_commitments: {
      primary_citation_guarantee: true,
      four_hour_retraction_window: true,
      unredacted_ownership_register: true,
      rejection_of_anonymous_single_source_claims: true
    },
    public_audit_url: 'https://www.reuters.com/info/editorial-handbook'
  }
];

export const STRUCTURAL_BIAS_AUDITS: StructuralBiasAudit[] = [
  {
    outlet_id: 'reuters',
    outlet_name: 'Thomson Reuters',
    parent_conglomerate: 'The Woodbridge Company (66% controlling interest)',
    ultimate_beneficial_owners: ['Thomson Family Investment Trust'],
    primary_revenue_sources: ['Financial data terminals', 'Legal research solutions', 'Syndication fees'],
    industry_ties: ['Financial markets index services'],
    topic_anomaly_rate: 0.02,
    evaluated_case_studies: [
      {
        topic: 'Financial Market Regulation',
        conglomerate_interest: 'Neutral / Data Provider',
        outlet_framing_shift: 'Factual statistical reporting',
        peer_benchmark_framing: 'Standard wire reporting',
        divergence_score: 2.1,
        is_statistically_significant: false
      }
    ]
  }
];

export const PRIMARY_SOURCE_DOCS: PrimarySourceDoc[] = [
  {
    id: 'doc-ntsb-001',
    title: 'Preliminary Report: Marine Accident DCA24MM031 (Dali / Key Bridge)',
    issuing_body: 'National Transportation Safety Board',
    document_type: 'Federal Investigative Report',
    publication_date: '2024-05-14',
    file_format: 'PDF',
    direct_download_url: 'https://www.ntsb.gov/investigations/Pages/DCA24MM031.aspx',
    page_count: 24,
    digital_sha256: '9f8e7d6c5b4a3f2e1d0c9b8a7f6e5d4c3b2a1f0e9d8c7b6a5f4e3d2c1b0a9f8e',
    supporting_claim_ids: ['claim-001', 'claim-002', 'claim-003', 'claim-004'],
    outlets_citing_primary_directly: ['AP News', 'Reuters', 'BBC News', 'Wall Street Journal'],
    outlets_citing_secondhand: ['Local syndicates', 'Aggregator blogs'],
    verified_citation_ratio: '8/10 outlets checked the raw PDF'
  }
];

export const HISTORICAL_CLAIM_RECORDS: HistoricalClaimRecord[] = [
  {
    id: 'hist-001',
    claim_text: 'Containership suffered dual blackouts in port prior to bridge departure.',
    topic_category: 'Maritime Safety',
    historical_era: '2024 Infrastructure Crises',
    event_date: '2024-03-26',
    sources_citing: ['NTSB', 'AP', 'Reuters'],
    initial_consensus: 'Confirmed by telemetry',
    retrospective_verdict: 'Confirmed Accurate',
    similar_contemporary_claims: ['Vessel power interruption off Long Beach (2023)'],
    journalist_context_notes: 'Standard primary verification pattern: NTSB FDR recorder records matched engine room breaker trips.'
  }
];

export const EMBED_WIDGET_CONFIGS: FactBriefEmbedConfig[] = [
  {
    claim_id: 'claim-002',
    headline: 'Francis Scott Key Bridge Electrical Blackouts',
    tier: 1,
    sources_count: 2,
    neutral_text: 'The vessel experienced two electrical blackouts in port and two prior to impact.',
    provenance_badge: 'NTSB Confirmed',
    embed_code_snippet: '<iframe src="https://varta.news/embed/claim-002" width="100%" height="220" frameborder="0"></iframe>',
    live_preview_url: 'https://varta.news/embed/claim-002'
  }
];

export const DATASET_EXPORT_CONFIGS: DatasetExportConfig[] = [
  {
    dataset_id: 'varta-neutralization-v2',
    name: 'Vārtā Corpus for Objective Journalism & Neutralization',
    format: 'JSONL (OpenAI / Anthropic format)',
    sample_count: 1480,
    license_tier: 'Academic & Non-Profit',
    data_split: { train: 1184, val: 148, test: 148 },
    feature_attributes: ['original_partisan_span', 'neutral_replacement', 'semantic_category', 'rationale', 'provenance_tier'],
    download_endpoint: '/api/datasets/varta-neutralization-v2.jsonl',
    sample_preview: {
      instruction: 'Neutralize loaded phrasing while retaining checkable quantitative metrics.',
      input_partisan: 'Ministers have once again shamefully caved in to developer lobbies with a disastrous deregulation bill.',
      output_neutralized: 'Ministers voted to approve proposals from developer organizations regarding housing targets.',
      provenance_metadata: { tier: 1, reversibility: 1.0 }
    }
  }
];

export const DISINFORMATION_CAMPAIGNS: DisinformationCampaignRecord[] = [
  {
    id: 'disinfo-001',
    narrative_title: 'Coordinated Cyberattack Fabrications Regarding Port Crane Infrastructure',
    origin_event_id: 'event-key-bridge-01',
    detection_timestamp: '2024-03-26T04:00:00Z',
    coordinated_outlets_count: 12,
    unattributed_origin_source: 'Anonymous Social Messaging Channel',
    time_window_minutes: 45,
    verbatim_similarity_score: 94.2,
    amplification_vector: 'Astroturf Syndicate',
    talking_point_tokens: ['cyberattack', 'remote override', 'deliberate steering failure'],
    dissemination_timeline: [
      {
        minute_offset: 0,
        outlet: 'Anonymous Channel X',
        headline: 'Bridge collapse caused by remote cyber sabotage'
      },
      {
        minute_offset: 22,
        outlet: 'Fringe Blog Network',
        headline: 'Authorities investigate cyber incident on Baltimore vessel'
      }
    ]
  }
];

export const PAYWALL_AUDIT_RECORDS: PaywallAuditRecord[] = [
  {
    id: 'paywall-001',
    claim_id: 'claim-007',
    claim_text: 'The European Court of Justice dismissed Google final appeal on €2.42 billion fine.',
    primary_source_name: 'Court of Justice of the European Union (Curia)',
    paywall_type: 'Strict Subscription Paywall',
    citation_chain_broken: false,
    origin_unverifiable_by_public: false,
    reporting_outlets_echoing: ['Financial Times', 'Bloomberg', 'Reuters'],
    independent_verification_status: 'Rescued by Secondary Freedom of Info',
    warning_label: 'Primary judgment PDF is fully public on InfoCuria; wire secondary coverage is behind paywalls.'
  }
];

export const MEDIA_VERIFICATION_RECORDS: MediaVerificationRecord[] = [
  {
    id: 'media-001',
    event_id: 'event-key-bridge-01',
    media_type: 'Photo',
    media_caption: 'Aerial photograph of containership Dali pinned beneath collapsed truss structure.',
    thumbnail_url: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=600&auto=format&fit=crop&q=80',
    claimed_location: 'Patapsco River, Baltimore Harbor',
    claimed_timestamp: '2024-03-26T06:00:00Z',
    metadata_location: '39.2178° N, 76.5292° W',
    metadata_timestamp: '2024-03-26T05:58:12Z',
    geolocation_match: true,
    reverse_search_matches: 1,
    first_known_appearance_date: '2024-03-26',
    manipulation_probability: 0.01,
    forensic_verdict: 'Authentic & Spatially Grounded',
    forensic_flags: ['EXIF sensor telemetry matches satellite ground truth', 'Sun angle consistent with dawn timestamp']
  }
];

export const ACCESSIBLE_NARRATIVE_BRIEFS: AccessibleNarrativeBrief[] = [
  {
    event_id: 'event-key-bridge-01',
    standard_headline: 'Containership Dali Collides with Francis Scott Key Bridge in Baltimore; Navigation Channel Reopened',
    plain_language_headline: 'A Cargo Ship Hit a Big Bridge in Baltimore, and the Waterway is Now Open Again for Ships',
    flesch_kincaid_reading_level: 6.8,
    plain_language_summary: 'In March 2024, a large container ship lost electrical power and ran into a bridge support in Baltimore. Part of the bridge fell down, closing the busy shipping port. Workers spent several months clearing heavy steel from the water, and big cargo ships can now safely pass through again.',
    key_takeaways_bullets: [
      'The ship lost power before it hit the bridge.',
      'Emergency cleanup workers removed 50,000 tons of broken metal.',
      'The main ship channel opened back up in June 2024.'
    ],
    audio_narration_script: 'Here is what happened with the Baltimore bridge: A container ship lost power and collided with the Francis Scott Key Bridge. After months of cleanup work, the main ship channel has officially reopened.',
    audio_duration_seconds: 45,
    claim_graph_nodes: [
      { id: 'n1', label: 'Power Loss', category: 'Trigger', tier: 1 },
      { id: 'n2', label: 'Bridge Strike', category: 'Impact', tier: 1 },
      { id: 'n3', label: 'Channel Cleanup', category: 'Official Action', tier: 1 },
      { id: 'n4', label: 'Reopened Channel', category: 'Outcome', tier: 1 }
    ],
    claim_graph_links: [
      { source: 'n1', target: 'n2', relationship: 'caused' },
      { source: 'n2', target: 'n3', relationship: 'led_to' },
      { source: 'n3', target: 'n4', relationship: 'led_to' }
    ],
    multilingual_translations: [
      {
        language_code: 'es',
        language_name: 'Spanish',
        translated_headline: 'Un buque de carga choca contra el puente Key en Baltimore; reabren el canal marítimo',
        translated_summary: 'Un gran barco perdió energía y golpeó un puente en Baltimore. Tras meses de limpieza, el canal está nuevamente abierto.'
      },
      {
        language_code: 'hi',
        language_name: 'Hindi',
        translated_headline: 'बाल्टीमोर में मालवाहक जहाज पुल से टकराया; जहाजों के लिए चैनल पुनः खोला गया',
        translated_summary: 'बिजली गुल होने के बाद एक बड़ा मालवाहक जहाज पुल से टकरा गया। मलबा हटाने के बाद जलमार्ग फिर से खोल दिया गया है।'
      }
    ]
  }
];
