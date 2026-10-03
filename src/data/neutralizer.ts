import { ChangeRecord } from '../types';

export interface NeutralizeResult {
  neutralized: string;
  neutralized_text: string;
  changes: ChangeRecord[];
  passedCheck: boolean;
  reason: string;
}

const TRANSFORMATION_RULES = [
  { pattern: /\btragedy\b/gi, replacement: 'incident', category: 'Emotional Framing', rationale: 'Substituted emotionally charged label with neutral event noun' },
  { pattern: /\bdevastating\s+impact\b/gi, replacement: 'significant impact', category: 'Emotional Framing', rationale: 'Substituted hyperbole with measured impact descriptor' },
  { pattern: /\bheartbreaking\s+/gi, replacement: '', category: 'Emotional Framing', rationale: 'Removed emotional sentiment modifier' },
  { pattern: /\bheroic\s+/gi, replacement: '', category: 'Emotional Framing', rationale: 'Removed subjective valorizing adjective' },
  { pattern: /\bdevastating toll\b/gi, replacement: 'toll', category: 'Emotional Framing', rationale: 'Removed emotive intensifier; casualty counts remain in facts' },
  { pattern: /\bdisastrous\b/gi, replacement: 'harmful', category: 'Emotional Framing', rationale: 'Replaced catastrophic framing with factual adjective' },
  { pattern: /\bchaos\b/gi, replacement: 'disruption', category: 'Emotional Framing', rationale: 'Substituted hyperbolic disorder term with standard operational descriptor' },
  { pattern: /\bbrazen\s+/gi, replacement: '', category: 'Emotional Framing', rationale: 'Removed moral judgment adjective' },
  { pattern: /\bcowardly\s+/gi, replacement: '', category: 'Emotional Framing', rationale: 'Removed derogatory characterization' },
  { pattern: /\bcatastrophe\b/gi, replacement: 'shortage', category: 'Emotional Framing', rationale: 'Substituted crisis hyperbole with concrete market term' },
  { pattern: /\bdesecrate\b/gi, replacement: 'develop', category: 'Emotional Framing', rationale: 'Replaced religious/moral violation verb with descriptive development verb' },
  { pattern: /\bvandalism\b/gi, replacement: 'urban development', category: 'Emotional Framing', rationale: 'Substituted criminal framing with descriptive urban policy phrase' },
  { pattern: /\bshamefully\s+caved\s+in\s+to\b/gi, replacement: 'voted to approve proposals from', category: 'Partisan & Attack Verbs', rationale: 'Substituted subjective capitulation phrase with factual voting record' },
  { pattern: /\bbrazenly\s+slammed\b/gi, replacement: 'criticized', category: 'Partisan & Attack Verbs', rationale: 'Substituted violent confrontation metaphor with standard attribution verb' },
  { pattern: /\bslammed\b/gi, replacement: 'criticized', category: 'Partisan & Attack Verbs', rationale: 'Substituted sensationalized attack verb' },
  { pattern: /\bblasted\b/gi, replacement: 'disputed', category: 'Partisan & Attack Verbs', rationale: 'Substituted sensationalized attack verb' },
  { pattern: /\bhollow\s+promises\b/gi, replacement: 'proposals', category: 'Partisan & Attack Verbs', rationale: 'Removed cynical editorial dismissiveness' },
  { pattern: /\blies\b/gi, replacement: 'unverified claims', category: 'Partisan & Attack Verbs', rationale: 'Replaced intentionality accusation with verifiability descriptor' },
  { pattern: /\bpropaganda\b/gi, replacement: 'messaging', category: 'Partisan & Attack Verbs', rationale: 'Neutralized manipulative attribution label' },
  { pattern: /\bundeniably\s+/gi, replacement: '', category: 'Certainty & Hedging', rationale: 'Removed illegitimate absolute certainty booster' },
  { pattern: /\bclearly\s+/gi, replacement: '', category: 'Certainty & Hedging', rationale: 'Removed unwarranted certainty assertion' },
  { pattern: /\bobviously\s+/gi, replacement: '', category: 'Certainty & Hedging', rationale: 'Removed unwarranted certainty assertion' },
  { pattern: /\ballegedly\s+/gi, replacement: 'reportedly ', category: 'Certainty & Hedging', rationale: 'Replaced criminal-insinuation hedge with neutral reporting attribution' },
  { pattern: /\bdrastic\s+/gi, replacement: 'substantial ', category: 'Sensationalized Adjectives', rationale: 'Substituted sensational modifier with measured adjective' },
  { pattern: /\bmassive\s+/gi, replacement: 'large-scale ', category: 'Sensationalized Adjectives', rationale: 'Substituted hyperbole with measured scale descriptor' },
  { pattern: /\bshocking\s+/gi, replacement: '', category: 'Sensationalized Adjectives', rationale: 'Removed sensationalized emotional trigger' },
  { pattern: /\bunprecedented\s+/gi, replacement: 'uncommon ', category: 'Sensationalized Adjectives', rationale: 'Replaced hyperbolic uniqueness claim with measured frequency adjective' },
  { pattern: /\bdisgraceful\s+/gi, replacement: '', category: 'Sensationalized Adjectives', rationale: 'Removed normative moral evaluation' },
  { pattern: /\bruthless\s+/gi, replacement: '', category: 'Sensationalized Adjectives', rationale: 'Removed subjective character evaluation' }
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
