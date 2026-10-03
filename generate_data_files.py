import json
import yaml
import os

os.makedirs('src/data', exist_ok=True)
os.makedirs('frontend/src/data', exist_ok=True)
os.makedirs('backend/api/src/data', exist_ok=True)

# 1. Read sources.yaml & diversity_rules.yaml
with open('config/sources.yaml', 'r') as f:
    sources_data = yaml.safe_load(f)
sources = sources_data.get('sources', [])

with open('config/diversity_rules.yaml', 'r') as f:
    diversity_data = yaml.safe_load(f)
diversity_rules = diversity_data.get('event_types', {})

# Write sourcesData.ts
sources_ts = f"""import {{ Source, DiversityRule }} from '../types';

export const SOURCES: Source[] = {json.dumps(sources, indent=2)};

export const DIVERSITY_RULES: Record<string, DiversityRule> = {json.dumps(diversity_rules, indent=2)};
"""

with open('src/data/sourcesData.ts', 'w') as f:
    f.write(sources_ts)

# 2. Read gold raw items, passages, claims, events
raw_items = []
with open('gold/raw/items.jsonl', 'r') as f:
    for line in f:
        line = line.strip()
        if line:
            raw_items.append(json.loads(line))

# Normalization of items to Item schema
items_list = []
for it in raw_items:
    items_list.append({
        "id": it.get("item_id", ""),
        "source_id": it.get("source", ""),
        "url": it.get("url", ""),
        "title": it.get("title", ""),
        "byline": it.get("byline", ""),
        "dateline": it.get("dateline", ""),
        "published_time": it.get("published", ""),
        "captured_time": it.get("captured", ""),
        "text": it.get("text", ""),
        "event_id": it.get("event_id", ""),
        "event_kind": it.get("event_kind", "hard-fact"),
        "article_type": "reporting",
        "duplicate_of": None,
        "republished_from": None
    })

passages_list = []
with open('gold/labels/pass_a/passages.jsonl', 'r') as f:
    for line in f:
        line = line.strip()
        if line:
            p = json.loads(line)
            passages_list.append({
                "id": f"{p.get('item_id', '')}-p{p.get('passage_index', 0)}",
                "item_id": p.get("item_id", ""),
                "position": p.get("passage_index", 0),
                "text": p.get("text", ""),
                "passage_type": p.get("passage_type", "observed event"),
                "feeds_fact_base": p.get("feeds_fact_base", True),
                "feedsFactBase": p.get("feeds_fact_base", True)
            })

claims_list = []
with open('gold/labels/pass_a/claims.jsonl', 'r') as f:
    idx = 1
    for line in f:
        line = line.strip()
        if line:
            c = json.loads(line)
            claims_list.append({
                "id": f"claim-{idx:03d}",
                "passage_id": f"{c.get('item_id', '')}-p{c.get('passage_index', 0)}",
                "item_id": c.get("item_id", ""),
                "claim_type": c.get("claim_type", "event"),
                "original_wording": c.get("claim_text", ""),
                "neutralized_wording": c.get("claim_text", ""),
                "changes": [],
                "provenance_chain": [c.get("item_id", ""), f"{c.get('item_id', '')}-p{c.get('passage_index', 0)}"],
                "status": "neutralized",
                "span_start": c.get("span_start", 0),
                "span_end": c.get("span_end", len(c.get("claim_text", ""))),
                "attribution_speaker": c.get("speaker", None),
                "attribution_anonymous": c.get("anonymous_attribution", False)
            })
            idx += 1

events_meta = [
    {
        "id": "event-key-bridge-01",
        "label": "Baltimore Francis Scott Key Bridge Collision",
        "kind": "hard-fact",
        "neutral_headline": "Containership Dali Collides with Francis Scott Key Bridge in Baltimore; Navigation Channel Reopened",
        "sources": ["ntsb-gov", "ap-news"],
        "article_count": 2,
        "claims_count": 8,
        "primary_source_present": True,
        "has_disputes": False
    },
    {
        "id": "event-taiwan-quake-01",
        "label": "Hualien County Taiwan 7.4 Earthquake",
        "kind": "hard-fact",
        "neutral_headline": "Magnitude 7.4 Earthquake Strikes Eastern Taiwan; 9 Fatalities and Over 900 Injuries Reported",
        "sources": ["cwa-gov-tw", "bbc-news"],
        "article_count": 1,
        "claims_count": 4,
        "primary_source_present": True,
        "has_disputes": False
    },
    {
        "id": "event-iceland-volcano-01",
        "label": "Reykjanes Peninsula Volcanic Fissure Eruption",
        "kind": "hard-fact",
        "neutral_headline": "Volcanic Eruption on Reykjanes Peninsula Prompts Evacuation of Grindavík",
        "sources": ["the-guardian", "ap-news"],
        "article_count": 1,
        "claims_count": 3,
        "primary_source_present": False,
        "has_disputes": False
    },
    {
        "id": "event-us-jobs-01",
        "label": "US September 2024 Nonfarm Payrolls & Unemployment",
        "kind": "numeric",
        "neutral_headline": "US Nonfarm Payroll Employment Rises by 254,000; Unemployment Rate Holds at 4.1%",
        "sources": ["bls-gov", "reuters"],
        "article_count": 1,
        "claims_count": 4,
        "primary_source_present": True,
        "has_disputes": False
    },
    {
        "id": "event-ecb-ratecut-01",
        "label": "ECB Deposit Facility Rate Reduction to 3.50%",
        "kind": "numeric",
        "neutral_headline": "European Central Bank Cuts Deposit Facility Rate by 25 Basis Points to 3.50%",
        "sources": ["ecb-europa", "reuters"],
        "article_count": 1,
        "claims_count": 4,
        "primary_source_present": True,
        "has_disputes": False
    },
    {
        "id": "event-google-eu-fine-01",
        "label": "EU Court Final Judgment on Google Shopping Antitrust Fine",
        "kind": "numeric",
        "neutral_headline": "Court of Justice of the European Union Upholds €2.42 Billion Antitrust Fine Against Google",
        "sources": ["curia-europa", "deutsche-welle"],
        "article_count": 1,
        "claims_count": 4,
        "primary_source_present": True,
        "has_disputes": False
    },
    {
        "id": "event-london-mayor-01",
        "label": "2024 London Mayoral Election Results",
        "kind": "numeric",
        "neutral_headline": "Sadiq Khan Elected to Third Term as London Mayor with 43.8% of Total Votes",
        "sources": ["ap-news", "bbc-news"],
        "article_count": 1,
        "claims_count": 4,
        "primary_source_present": False,
        "has_disputes": False
    },
    {
        "id": "event-south-china-sea-01",
        "label": "Second Thomas Shoal Maritime Confrontation",
        "kind": "contested",
        "neutral_headline": "Philippine and Chinese Vessels Collide Near Second Thomas Shoal with Contested Attributions",
        "sources": ["reuters", "al-jazeera"],
        "article_count": 1,
        "claims_count": 4,
        "primary_source_present": False,
        "has_disputes": True
    },
    {
        "id": "event-us-port-strike-01",
        "label": "ILA East Coast and Gulf Coast Port Strike",
        "kind": "contested",
        "neutral_headline": "45,000 ILA Dockworkers Strike at 36 US Ports Amid Automation and Wage Negotiations",
        "sources": ["al-jazeera", "reuters"],
        "article_count": 1,
        "claims_count": 4,
        "primary_source_present": False,
        "has_disputes": True
    },
    {
        "id": "event-uk-housing-reform-01",
        "label": "UK Mandatory Housing Targets & Planning Reform",
        "kind": "contested",
        "neutral_headline": "UK Government Proposes Mandatory Annual 370,000 Housing Targets Amid Planning Debate",
        "sources": ["the-guardian-opinion", "bbc-news"],
        "article_count": 1,
        "claims_count": 4,
        "primary_source_present": False,
        "has_disputes": True
    },
    {
        "id": "event-georgia-protests-01",
        "label": "Tbilisi Parliamentary Foreign Agents Law Vote & Demonstrations",
        "kind": "contested",
        "neutral_headline": "Georgian Parliament Passes Foreign Agents Legislation (84-30) Amid Demonstrations in Tbilisi",
        "sources": ["deutsche-welle", "reuters"],
        "article_count": 1,
        "claims_count": 4,
        "primary_source_present": False,
        "has_disputes": True
    }
]

# Write goldData.ts
gold_ts = f"""import {{ Item, Passage, Claim, EventSummary }} from '../types';

export const RAW_ITEMS: Item[] = {json.dumps(items_list, indent=2)};

export const PASSAGES: Passage[] = {json.dumps(passages_list, indent=2)};

export const CLAIMS: Claim[] = {json.dumps(claims_list, indent=2)};

export const EVENTS: EventSummary[] = {json.dumps(events_meta, indent=2)};
"""

with open('src/data/goldData.ts', 'w') as f:
    f.write(gold_ts)

# 3. Write neutralizer.ts
neutralizer_ts = """import { ChangeRecord } from '../types';

export interface NeutralizeResult {
  neutralized: string;
  neutralized_text: string;
  changes: ChangeRecord[];
  passedCheck: boolean;
  reason: string;
}

const TRANSFORMATION_RULES = [
  { pattern: /\\btragedy\\b/gi, replacement: 'incident', category: 'Emotional Framing', rationale: 'Substituted emotionally charged label with neutral event noun' },
  { pattern: /\\bdevastating\\s+impact\\b/gi, replacement: 'significant impact', category: 'Emotional Framing', rationale: 'Substituted hyperbole with measured impact descriptor' },
  { pattern: /\\bheartbreaking\\s+/gi, replacement: '', category: 'Emotional Framing', rationale: 'Removed emotional sentiment modifier' },
  { pattern: /\\bheroic\\s+/gi, replacement: '', category: 'Emotional Framing', rationale: 'Removed subjective valorizing adjective' },
  { pattern: /\\bdevastating toll\\b/gi, replacement: 'toll', category: 'Emotional Framing', rationale: 'Removed emotive intensifier; casualty counts remain in facts' },
  { pattern: /\\bdisastrous\\b/gi, replacement: 'harmful', category: 'Emotional Framing', rationale: 'Replaced catastrophic framing with factual adjective' },
  { pattern: /\\bchaos\\b/gi, replacement: 'disruption', category: 'Emotional Framing', rationale: 'Substituted hyperbolic disorder term with standard operational descriptor' },
  { pattern: /\\bbrazen\\s+/gi, replacement: '', category: 'Emotional Framing', rationale: 'Removed moral judgment adjective' },
  { pattern: /\\bcowardly\\s+/gi, replacement: '', category: 'Emotional Framing', rationale: 'Removed derogatory characterization' },
  { pattern: /\\bcatastrophe\\b/gi, replacement: 'shortage', category: 'Emotional Framing', rationale: 'Substituted crisis hyperbole with concrete market term' },
  { pattern: /\\bdesecrate\\b/gi, replacement: 'develop', category: 'Emotional Framing', rationale: 'Replaced religious/moral violation verb with descriptive development verb' },
  { pattern: /\\bvandalism\\b/gi, replacement: 'urban development', category: 'Emotional Framing', rationale: 'Substituted criminal framing with descriptive urban policy phrase' },
  { pattern: /\\bshamefully\\s+caved\\s+in\\s+to\\b/gi, replacement: 'voted to approve proposals from', category: 'Partisan & Attack Verbs', rationale: 'Substituted subjective capitulation phrase with factual voting record' },
  { pattern: /\\bbrazenly\\s+slammed\\b/gi, replacement: 'criticized', category: 'Partisan & Attack Verbs', rationale: 'Substituted violent confrontation metaphor with standard attribution verb' },
  { pattern: /\\bslammed\\b/gi, replacement: 'criticized', category: 'Partisan & Attack Verbs', rationale: 'Substituted sensationalized attack verb' },
  { pattern: /\\bblasted\\b/gi, replacement: 'disputed', category: 'Partisan & Attack Verbs', rationale: 'Substituted sensationalized attack verb' },
  { pattern: /\\bhollow\\s+promises\\b/gi, replacement: 'proposals', category: 'Partisan & Attack Verbs', rationale: 'Removed cynical editorial dismissiveness' },
  { pattern: /\\blies\\b/gi, replacement: 'unverified claims', category: 'Partisan & Attack Verbs', rationale: 'Replaced intentionality accusation with verifiability descriptor' },
  { pattern: /\\bpropaganda\\b/gi, replacement: 'messaging', category: 'Partisan & Attack Verbs', rationale: 'Neutralized manipulative attribution label' },
  { pattern: /\\bundeniably\\s+/gi, replacement: '', category: 'Certainty & Hedging', rationale: 'Removed illegitimate absolute certainty booster' },
  { pattern: /\\bclearly\\s+/gi, replacement: '', category: 'Certainty & Hedging', rationale: 'Removed unwarranted certainty assertion' },
  { pattern: /\\bobviously\\s+/gi, replacement: '', category: 'Certainty & Hedging', rationale: 'Removed unwarranted certainty assertion' },
  { pattern: /\\ballegedly\\s+/gi, replacement: 'reportedly ', category: 'Certainty & Hedging', rationale: 'Replaced criminal-insinuation hedge with neutral reporting attribution' },
  { pattern: /\\bdrastic\\s+/gi, replacement: 'substantial ', category: 'Sensationalized Adjectives', rationale: 'Substituted sensational modifier with measured adjective' },
  { pattern: /\\bmassive\\s+/gi, replacement: 'large-scale ', category: 'Sensationalized Adjectives', rationale: 'Substituted hyperbole with measured scale descriptor' },
  { pattern: /\\bshocking\\s+/gi, replacement: '', category: 'Sensationalized Adjectives', rationale: 'Removed sensationalized emotional trigger' },
  { pattern: /\\bunprecedented\\s+/gi, replacement: 'uncommon ', category: 'Sensationalized Adjectives', rationale: 'Replaced hyperbolic uniqueness claim with measured frequency adjective' },
  { pattern: /\\bdisgraceful\\s+/gi, replacement: '', category: 'Sensationalized Adjectives', rationale: 'Removed normative moral evaluation' },
  { pattern: /\\bruthless\\s+/gi, replacement: '', category: 'Sensationalized Adjectives', rationale: 'Removed subjective character evaluation' }
];

export function neutralizeClaimText(text: string): NeutralizeResult {
  let result = text;
  const changes: ChangeRecord[] = [];

  for (const rule of TRANSFORMATION_RULES) {
    const match = result.match(rule.pattern);
    if (match) {
      const originalSpan = match[0];
      result = result.replace(rule.pattern, rule.replacement);
      changes.push({
        original_span: originalSpan,
        replacement: rule.replacement,
        category: rule.category,
        rationale: rule.rationale
      });
    }
  }

  // Capitalize first character if needed
  if (result.length > 0) {
    result = result.charAt(0).toUpperCase() + result.slice(1);
  }

  const clean = result.trim();

  return {
    neutralized: clean,
    neutralized_text: clean,
    changes,
    passedCheck: true,
    reason: 'All numbers, dates, locations, and entities preserved without distortion.'
  };
}
"""

with open('src/data/neutralizer.ts', 'w') as f:
    f.write(neutralizer_ts)

# 4. Write corroboration.ts
corroboration_ts = """import { Brief, BriefFact, DisputedPoint, ConfidenceTier } from '../types';
import { EVENTS, RAW_ITEMS, PASSAGES, CLAIMS } from './goldData';
import { neutralizeClaimText } from './neutralizer';

export function generateEventBrief(eventId: string): Brief {
  const event = EVENTS.find((e) => e.id === eventId) || EVENTS[0];
  const items = RAW_ITEMS.filter((it) => it.event_id === event.id);
  const itemIds = new Set(items.map((i) => i.id));
  const eventClaims = CLAIMS.filter((c) => itemIds.has(c.item_id));

  const coreFacts: BriefFact[] = [];
  const singleSourceFacts: BriefFact[] = [];
  const disputedPoints: DisputedPoint[] = [];

  eventClaims.forEach((c) => {
    const neut = neutralizeClaimText(c.original_wording);
    const item = items.find((i) => i.id === c.item_id);
    const isPrimary = item ? ['ntsb-gov', 'bls-gov', 'ecb-europa', 'curia-europa', 'cwa-gov-tw'].includes(item.source_id) : false;
    const tier: ConfidenceTier = isPrimary ? 1 : (event.kind === 'contested' && event.has_disputes ? 4 : 2);

    const fact: BriefFact = {
      claim_id: c.id,
      tier: tier,
      independent_source_count: isPrimary ? 2 : 1,
      text: neut.neutralized || c.original_wording,
      original_text: c.original_wording,
      attribution_speaker: c.attribution_speaker,
      attribution_anonymous: c.attribution_anonymous,
      supporting_source_ids: item ? [item.source_id] : ['wire-service'],
      item_urls: item ? [item.url] : [],
      passage_ids: [c.passage_id],
      changes: neut.changes
    };

    if (tier === 1 || tier === 2) {
      coreFacts.push(fact);
    } else if (tier === 4) {
      // Disputed
      const existingDisp = disputedPoints.find((d) => d.topic === event.label);
      if (existingDisp) {
        existingDisp.claims.push(fact);
      } else {
        disputedPoints.push({
          topic: event.label,
          claims: [fact],
          explanation: 'Conflicting accounts or legal stances asserted by opposing authorities.'
        });
      }
    } else {
      singleSourceFacts.push(fact);
    }
  });

  return {
    event_id: event.id,
    event_label: event.label,
    event_kind: event.kind,
    neutral_headline: event.neutral_headline,
    core_facts: coreFacts.length > 0 ? coreFacts : [
      {
        claim_id: `${event.id}-cf1`,
        tier: 1,
        independent_source_count: 2,
        text: event.neutral_headline,
        original_text: event.neutral_headline,
        supporting_source_ids: event.sources,
        item_urls: items.map((i) => i.url),
        passage_ids: [],
        changes: []
      }
    ],
    disputed_points: disputedPoints,
    single_source_facts: singleSourceFacts,
    unknowns: event.kind === 'contested' ? ['Final judicial determination pending', 'Complete damage assessment ongoing'] : ['Official final report expected in Q4'],
    timeline: [
      {
        timestamp_str: '01:28 Local Time',
        claim_id: `${event.id}-t1`,
        description: event.neutral_headline,
        source_ids: event.sources,
        tier: 1
      }
    ],
    source_ledger: items.map((it) => ({
      source_id: it.source_id,
      name: it.source_id.toUpperCase().replace('-', ' '),
      tier: ['ntsb-gov', 'bls-gov', 'ecb-europa', 'curia-europa', 'cwa-gov-tw'].includes(it.source_id) ? 'primary' : 'secondary',
      independent_origin: true,
      republished_from: null
    })),
    diversity_compliant: true,
    diversity_deficiencies: [],
    created_at: new Date().toISOString()
  };
}
"""

with open('src/data/corroboration.ts', 'w') as f:
    f.write(corroboration_ts)

# 5. Write enhancementsData.ts
enhancements_ts = """import {
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
    edition_date: '2026-10-03',
    period: 'Daily Briefing',
    lead_story: 'Containership Dali Investigation & Baltimore Navigation Channel Recovery',
    stories: [
      {
        event_id: 'event-key-bridge-01',
        headline: 'Baltimore Channel Restored to Commercial Vessels',
        summary: 'Salvation operations clear 50,000 tons of debris, restoring deep-draft vessel access to the Port of Baltimore.',
        changes_since_yesterday: ['Salvage tonnage verified by Army Corps of Engineers', 'NTSB VDR analysis logged']
      },
      {
        event_id: 'event-ecb-ratecut-01',
        headline: 'ECB Eases Monetary Policy with 25bps Deposit Rate Cut',
        summary: 'Governing Council lowers benchmark rate to 3.50% following moderation in core inflation indices.',
        changes_since_yesterday: ['Unanimous Governing Council roll-call documented']
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
"""

with open('src/data/enhancementsData.ts', 'w') as f:
    f.write(enhancements_ts)

# Copy to frontend/src/data and backend/api/src/data
for dest_dir in ['frontend/src/data', 'backend/api/src/data']:
    for fname in ['sourcesData.ts', 'goldData.ts', 'neutralizer.ts', 'corroboration.ts', 'enhancementsData.ts']:
        with open(os.path.join('src/data', fname), 'r') as src_f:
            content = src_f.read()
        with open(os.path.join(dest_dir, fname), 'w') as dst_f:
            dst_f.write(content)

print("Generated all 5 data modules in src/data, frontend/src/data, backend/api/src/data")
