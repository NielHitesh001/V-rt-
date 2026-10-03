---
name: TrueNews Editorial Provenance
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#45474c'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#75777c'
  outline-variant: '#c5c6cc'
  surface-tint: '#575f6e'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#141c29'
  on-primary-container: '#7c8495'
  inverse-primary: '#bfc6d9'
  secondary: '#006a61'
  on-secondary: '#ffffff'
  secondary-container: '#86f2e4'
  on-secondary-container: '#006f66'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#00174b'
  on-tertiary-container: '#497cff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dbe2f5'
  primary-fixed-dim: '#bfc6d9'
  on-primary-fixed: '#141c29'
  on-primary-fixed-variant: '#3f4756'
  secondary-fixed: '#89f5e7'
  secondary-fixed-dim: '#6bd8cb'
  on-secondary-fixed: '#00201d'
  on-secondary-fixed-variant: '#005049'
  tertiary-fixed: '#dbe1ff'
  tertiary-fixed-dim: '#b4c5ff'
  on-tertiary-fixed: '#00174b'
  on-tertiary-fixed-variant: '#003ea8'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  display-lg:
    fontFamily: Newsreader
    fontSize: 3.5rem
    fontWeight: '600'
    lineHeight: 4rem
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Newsreader
    fontSize: 2.25rem
    fontWeight: '600'
    lineHeight: 2.75rem
    letterSpacing: -0.015em
  headline-lg:
    fontFamily: Newsreader
    fontSize: 2.25rem
    fontWeight: '600'
    lineHeight: 2.75rem
    letterSpacing: -0.015em
  headline-lg-mobile:
    fontFamily: Newsreader
    fontSize: 1.75rem
    fontWeight: '600'
    lineHeight: 2.25rem
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Newsreader
    fontSize: 1.5rem
    fontWeight: '600'
    lineHeight: 2rem
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Newsreader
    fontSize: 1.25rem
    fontWeight: '500'
    lineHeight: 1.75rem
  body-lg:
    fontFamily: Inter
    fontSize: 1.125rem
    fontWeight: '400'
    lineHeight: 1.875rem
  body-md:
    fontFamily: Inter
    fontSize: 0.9375rem
    fontWeight: '400'
    lineHeight: 1.5rem
  body-sm:
    fontFamily: Inter
    fontSize: 0.8125rem
    fontWeight: '400'
    lineHeight: 1.25rem
  label-md:
    fontFamily: JetBrains Mono
    fontSize: 0.8125rem
    fontWeight: '500'
    lineHeight: 1rem
    letterSpacing: 0.02em
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 0.6875rem
    fontWeight: '500'
    lineHeight: 0.875rem
    letterSpacing: 0.04em
  code-inline:
    fontFamily: JetBrains Mono
    fontSize: 0.8125rem
    fontWeight: '400'
    lineHeight: 1.25rem
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-sm: 1rem
  gutter-lg: 2rem
  margin: 2rem
  margin-sm: 1rem
  margin-lg: 3rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system embodies high-stakes, intellectual investigative journalism merged with rigorous computational verification. The design aesthetic is **Analytical Editorial**: a disciplined synthesis of classic broadsheet gravitas and modern cryptographic data intelligence.

The emotional signature is unyielding credibility, forensic neutrality, and composure under pressure. Interfaces avoid hype, playful ornamentation, and deceptive gamification. Every surface communicates institutional permanence, evidential clarity, and epistemic modesty. White space serves as cognitive insulation against sensationalism, while high-density panels, inline citations, and metadata layers empower analysts, researchers, and discerning readers to inspect factual claims down to the exact span index and source document.

## Colors

The palette establishes an authoritative hierarchy built on stark contrast, cool slate foundations, and surgical status accents:

- **Primary (`#0B1320` - Editorial Ink Navy):** The bedrock tone for structural borders, authoritative headings, high-contrast actions, and structural anchors.
- **Secondary (`#0D9488` - Provenance Cyan / Truth Emerald):** Used strictly to demarcate verified assertions, primary source backing, and cryptographically signed provenance nodes.
- **Tertiary (`#2563EB` - Verification Blue):** Reserved for active analytical tools, comparative diff toggles, interactive span selections, and reference cross-links.
- **Neutral (`#64748B` - Slate Neutral):** Provides balanced intermediary support across labels, secondary metrics, structural hairpins, and muted canvas states.
- **Semantic Accents:**
  - *Dispute Amber (`#D97706`):* Surfaces unverified statements, conflicting primary sources, context omissions, and epistemic caveats.
  - *Refutation & Bias Crimson (`#E11D48`):* Flags retractions, verified falsehoods, adversarial bias injections, and debunked claims.
  - *Background & Surface Layers:* Pure editorial paper (`#FFFFFF`) layered atop cool canvas slate (`#F8FAFC`), bordered with subtle hairline dividers (`#E2E8F0`).

## Typography

Typography establishes an intentional dichotomy between narrative prose and technical forensic analysis:

- **Editorial Serifs (Newsreader):** Used for headlines, article titles, editorial extractions, and neutralized narrative rewrites. It brings the intellectual authority and visual rhythm of archival broadsheets. Optical sizes scale proportionally to maintain razor-sharp serifs on high-density displays.
- **Analytical Sans (Inter):** Employs uniform stroke widths and high x-heights for investigative reading, claim breakdowns, sidebars, and analytical reports. Ensures fatigue-free reading across prolonged extraction reviews.
- **Forensic Monospace (JetBrains Mono):** Demarcates character offsets (e.g., `span[142:189]`), provenance hashes, bias confidence scores, timestamping, and entity extraction keys. Tabular figures are enforced for numerical parity across claim comparison matrices.

## Layout & Spacing

The structural layout relies on an asymmetric, information-dense 12-column analytical grid modeled after modern intelligence desks:

- **Desktop (1200px+):** Configured with 12 fluid columns, `2rem` gutters, and `3rem` canvas margins. Common structural allocation features a 2-column provenance source tree, a 6-column central neutralized editorial reader, and a 4-column claim breakdown and diff panel.
- **Tablet (768px – 1199px):** Reflows to an 8-column layout with `1.5rem` gutters and `2rem` margins. The claim panel shifts to a slide-over drawer or stacks cleanly beneath active claims.
- **Mobile (< 768px):** Drops to a 4-column layout with `1rem` gutters and `1rem` margins. Prioritizes linear fact reading with collapsible provenance bottom sheets triggered by tap-to-inspect spans.
- **Rhythm & Alignment:** Spacing strictly adheres to an 8px base rhythm (`space-xs` through `space-xl`). All cards, inspector panels, and data tables align flush against column margins to preserve architectural symmetry.

## Elevation & Depth

Visual hierarchy rejects artificial three-dimensional trickery, skeumorphism, and blurry drop shadows. Depth is achieved via **Architectural Tonal Layering and Hairline Borders**:

- **Layer 0 (Canvas Base):** Background slate (`#F8FAFC`) providing calm contrast behind paper-white components.
- **Layer 1 (Card & Content Surfaces):** Pure white (`#FFFFFF`) framed with precise 1px solid slate hairlines (`#E2E8F0`).
- **Layer 2 (Active Inspection Panels & Menus):** Pure white backed with subtle ambient elevation: `0 4px 12px -2px rgba(11, 19, 32, 0.04), 0 1px 3px rgba(11, 19, 32, 0.06)`, bounded by a crisp `#CBD5E1` rule.
- **Layer 3 (Modals, Overlays, and Source Diffs):** Positioned against a subtle 40% ink scrim (`#0B1320`), floating with structural separation bounded by deep navy hairlines and balanced ambient grounding (`0 12px 28px -4px rgba(11, 19, 32, 0.12)`).

## Shapes

The design system enforces a **Soft Structural (Level 1)** geometry. Radii are intentionally restrained (0.25rem for core components, 0.5rem for elevated cards, 0.75rem for full modals) to avoid the casual informality of bubbly interfaces.

Corners are tight, calculated, and deliberate, reinforcing the perception of data precision, journalistic discipline, and cryptographic security. Interactive chips, code anchors, and input borders maintain crisp, near-square edges that mirror structured tabular indexes and printed newspaper galleys.

## Components

### Buttons
- **Primary:** High-density `#0B1320` ink background, `#FFFFFF` text, `0.25rem` radius, subtle 1px border (`#0F172A`). Hover transitions to pure deep navy with slight inset ring.
- **Secondary / Provenance:** Background transparent, border 1px solid `#CBD5E1`, text `#0F172A`. On hover, surface shifts to `#F1F5F9`.
- **Verified Action:** Background `#059669` or `#0D9488`, pure white text, utilized for certifying nodes or acknowledging verified claims.

### Credibility & Provenance Chips
- Monospace typographic styling (`label-sm`), fixed height of 22px, padding 2px 8px, 2px radius.
- **Verified Source:** Background `#ECFDF5`, border `#A7F3D0`, text `#047857`. Leading dot icon indicates cryptographic signature.
- **Contested Claim:** Background `#FFFBEB`, border `#FDE68A`, text `#B45309`.
- **Refuted / Biased:** Background `#FFF1F2`, border `#FECDD3`, text `#BE123C`.

### Text Annotation & Diff Highlighting
- **Neutralized Diff Spans:** Deletions marked with subtle strikethrough and `#FFE4E6` background (`#9F1239` text); algorithmic neutral replacements rendered with `#ECFDF5` background (`#065F46` text, subtle underline).
- **Claim Offset Indicators:** Inline interactive tokens showing character markers (e.g., `^1`, `[§24]`) set in JetBrains Mono, clicking smoothly synchronizes the active claim inspector on the right pane.

### Input Fields & Search Bars
- Background `#FFFFFF`, 1px border `#CBD5E1`, focus ring 2px `#2563EB` offset by 1px. Placeholder text set in muted slate (`#94A3B8`). Left-aligned monospaced syntax markers for complex query operators (`source:`, `score:>90`).

### Inspection Cards
- Enclosed with 1px `#E2E8F0` borders and 0.5rem radius. Header bars feature split serif/monospace labeling: Newsreader title accompanied by right-aligned monospace confidence scores (`CONFIDENCE: 98.4%`).
- Dividers within cards are hairline-thin (`#F1F5F9`) running edge-to-edge.

### Checkboxes & Segmented Controls
- Checkboxes use 2px rounded corners with ink navy fills when selected. Segmented switch bars are encapsulated in `#F1F5F9` troughs with crisp `#FFFFFF` toggle tabs carrying subtle 1px `#E2E8F0` borders.