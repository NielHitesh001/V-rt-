import { Brief, BriefFact, DisputedPoint, ConfidenceTier } from '../types';
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
