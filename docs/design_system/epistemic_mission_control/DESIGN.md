---
name: Epistemic Mission Control
colors:
  surface: '#111319'
  surface-dim: '#111319'
  surface-bright: '#373940'
  surface-container-lowest: '#0c0e14'
  surface-container-low: '#191b22'
  surface-container: '#1e1f26'
  surface-container-high: '#282a30'
  surface-container-highest: '#33343b'
  on-surface: '#e2e2eb'
  on-surface-variant: '#bcc9cd'
  inverse-surface: '#e2e2eb'
  inverse-on-surface: '#2e3037'
  outline: '#869397'
  outline-variant: '#3d494c'
  surface-tint: '#4cd7f6'
  primary: '#4cd7f6'
  on-primary: '#003640'
  primary-container: '#06b6d4'
  on-primary-container: '#00424f'
  inverse-primary: '#00687a'
  secondary: '#4edea3'
  on-secondary: '#003824'
  secondary-container: '#00a572'
  on-secondary-container: '#00311f'
  tertiary: '#ffb95f'
  on-tertiary: '#472a00'
  tertiary-container: '#e79400'
  on-tertiary-container: '#563400'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#acedff'
  primary-fixed-dim: '#4cd7f6'
  on-primary-fixed: '#001f26'
  on-primary-fixed-variant: '#004e5c'
  secondary-fixed: '#6ffbbe'
  secondary-fixed-dim: '#4edea3'
  on-secondary-fixed: '#002113'
  on-secondary-fixed-variant: '#005236'
  tertiary-fixed: '#ffddb8'
  tertiary-fixed-dim: '#ffb95f'
  on-tertiary-fixed: '#2a1700'
  on-tertiary-fixed-variant: '#653e00'
  background: '#111319'
  on-background: '#e2e2eb'
  surface-variant: '#33343b'
typography:
  headline-xl:
    fontFamily: Newsreader
    fontSize: 36px
    fontWeight: '400'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-xl-mobile:
    fontFamily: Newsreader
    fontSize: 28px
    fontWeight: '400'
    lineHeight: 34px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Newsreader
    fontSize: 26px
    fontWeight: '500'
    lineHeight: 32px
    letterSpacing: -0.015em
  headline-lg-mobile:
    fontFamily: Newsreader
    fontSize: 22px
    fontWeight: '500'
    lineHeight: 28px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Newsreader
    fontSize: 20px
    fontWeight: '500'
    lineHeight: 26px
  claim-narrative:
    fontFamily: Newsreader
    fontSize: 17px
    fontWeight: '400'
    lineHeight: 26px
  body-lg:
    fontFamily: Inter
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 22px
  body-md:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  label-mono-lg:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 18px
    letterSpacing: 0.02em
  label-mono-md:
    fontFamily: JetBrains Mono
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 14px
    letterSpacing: 0.04em
  label-mono-sm:
    fontFamily: JetBrains Mono
    fontSize: 10px
    fontWeight: '400'
    lineHeight: 12px
    letterSpacing: 0.06em
  telemetry-digits:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: -0.01em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 0.75rem
  margin: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 0.75rem
  space-lg: 1.25rem
  space-xl: 2rem
---

## Brand & Style

This design system establishes an intelligence-grade verification operations console. Designed for analysts, intelligence operatives, fact-checkers, and real-time newsrooms, the interface prioritizes high signal-to-noise ratio, evidentiary provenance, and immediate epistemic categorization.

The aesthetic fuses **Tactical Technical Minimalism** with **Authoritative Editorial Publishing**:
- **Tactical Real-Time Telemetry:** Dense, tabular layouts, micro-indicators, monospaced metadata arrays, and structural hairline framing inspired by aerospace mission consoles.
- **Editorial Authority:** Classic, high-legibility serif narrative blocks for claims and editorial context, balancing clinical data scrutiny with deep journalistic integrity.
- **Epistemic Certainty Mapping:** Strict, desaturated operational surfaces broken only by purposeful, functional status signaling: verified truths, developing inquiries, and outright contradictions.

Every visual element must feel instrumental, measured, and uncompromisingly credible. Superfluous ornament, decorative gradients, and playful soft radius treatments are strictly barred.

## Colors

The palette operates under a strict dark-mode-first taxonomy optimized for low eye fatigue during sustained 24/7 monitoring shifts.

### Surface Architecture
- **Base Canvas (`#0a0c10` / `#0f1117`):** Deep abyssal charcoal, grounding the entire operational viewport.
- **Surface Elevation 1 (`#141824`):** Panel and dossier backgrounds.
- **Surface Elevation 2 (`#1a2030`):** Interactive inputs, active claim cards, and hovered cell states.
- **Structural Hairstyle Borders (`#1e2638`):** Unyielding structural outlines dividing dense telemetry fields.
- **Subtle Partition Lines (`#171d2b`):** Secondary dividers for metadata rows.

### Signal & Epistemic Taxonomy
- **Primary / Telemetry Focus (`#06b6d4` - Cyan):** Systems active, incoming packet stream, live queries, and selected operational filters.
- **Secondary / Verified Provenance (`#10b981` - Emerald):** Confirmed claims, cryptographic verification, validated multi-source corroboration.
- **Tertiary / Developing & Disputed (`#f59e0b` - Amber):** Uncorroborated reports, pending triage, contested assertions, temporal warnings.
- **Alert / Contradiction (`#ef4444` - Muted Coral/Red):** Debunked falsehoods, spoofed attribution, critical alert breaches, epistemic hazards.

### Text & Readability Tiers
- **Primary Text (`#f1f5f9`):** Headlines, claim bodies, crisp data values.
- **Muted Metadata (`#94a3b8`):** Timestamps, entity attribution tags, system telemetry labels.
- **Dimmest Functional (`#475569`):** Inactive toggles, bracket decorations, inactive grid coordinates.

## Typography

The typographic hierarchy implements a deliberate dual-system tension:

1. **Newsreader (Editorial Core):** Dedicated exclusively to claims, intelligence narrative briefings, incident headlines, and expert analysis blocks. The authoritative serif anchors human speech and journalistic prose, presenting claims as subjects of literary inquiry.
2. **Inter (Interface & Controls):** Used for navigation bars, form inputs, secondary descriptions, and contextual control elements where maximum optical legibility at small sizes is critical.
3. **JetBrains Mono (Telemetry & Metadata):** Mandatory for UTC timestamps, verification hashes, confidence scores, coordinate tracking, entity badges, keyboard shortcuts, and status state values. Numbers should use tabular figures (`tnum`) by default.

## Layout & Spacing

This design system uses a strict **Dense Fixed-Fluid Operations Grid**:
- **Desktop (1440px+):** Multi-pane console layout. Left pane (280px fixed) for live stream ingestion / claim queues; Center pane (fluid 60%) for active claim deep-dive and evidence graphs; Right pane (360px fixed) for entity confidence matrix and provenance logs.
- **Tablet (768px - 1439px):** Two-pane view with toggleable inspector drawer; gutter tightens to `0.5rem`.
- **Mobile (<768px):** Single-column stacked feed. Panes fold into segmented bottom tab views (`INBOX`, `CLAIM_INTEL`, `VERIFY_MATRIX`).

Horizontal and vertical rhythm adheres to a compact 4px grid. Information density is prioritized over expansive whitespace. Padding within operational containers must remain tight (`space-sm` to `space-md`) to ensure critical telemetry remains visible above the fold without scrolling.

## Elevation & Depth

Depth is established via **Tonal Planar Stacking and Low-Contrast Structural Borders**, completely rejecting blurred drop shadows and skeuomorphic gradients.

1. **Floor 0 (Viewport Canvas):** `#0a0c10` flat background.
2. **Floor 1 (Console Workspaces & Panes):** `#0f1117` with continuous 1px hairline border (`#1e2638`).
3. **Floor 2 (Dossier Cards & Data Arrays):** `#141824` with perimeter hairline border (`#1e2638`). On hover or selection, the border shifts to `#06b6d4` (cyan focus) or `#10b981` (verified) without card displacement.
4. **Floor 3 (Overlays, Flyouts & Radar Tooltips):** `#1a2030` with an uncompromising 1px solid border (`#2a364f`) and an intentional, subtle dark ambient diffusion: `0 8px 24px rgba(0, 0, 0, 0.65)`.
5. **Active Inset / Scanline Accents:** Selected elements feature a left-hand 2px solid indicator bar in the state's functional color (`#10b981`, `#06b6d4`, `#f59e0b`, or `#ef4444`).

## Shapes

The shape system adopts a **Sharp-to-Subtle (Soft - Level 1)** geometric philosophy. Corners are restrained to 2px or 4px (`0.25rem`), reflecting tactical aerospace displays and calibrated test equipment.

- Containers, claim dossiers, and pane wrappers use `0.25rem` or crisp `0px` outer boundaries with flush grid abutting.
- Status badges and metadata pills use micro-chamfers or `0.25rem` radius; circular pills are forbidden except for small live beacon status pips (4px × 4px dots).
- Interactive inputs and button hit areas maintain uniform `0.25rem` corners to preserve industrial rigidity.

## Components

### Buttons & Operational Triggers
- **Primary Action (Execute Verification):** Solid `#06b6d4` background, `#0a0c10` bold text, `0.25rem` border-radius, font `JetBrains Mono` 11px uppercase (`letterSpacing: 0.05em`).
- **Secondary (Inspect / Flag):** Transparent background, 1px border `#1e2638`, text `#94a3b8`. Hover: border `#06b6d4`, text `#f1f5f9`, background `rgba(6, 182, 212, 0.05)`.
- **Destructive / Invalidate Claim:** Background `rgba(239, 68, 68, 0.1)`, 1px border `rgba(239, 68, 68, 0.3)`, text `#ef4444`.

### Epistemic Status Chips & Badges
- Rendered in `JetBrains Mono` 10px, uppercase, padded `2px 6px`, with a 1px border matching the status color:
  - **VERIFIED:** `#10b981` text, `rgba(16, 185, 129, 0.1)` fill, `rgba(16, 185, 129, 0.3)` border. Leading 4px pulsing emerald dot.
  - **DISPUTED:** `#f59e0b` text, `rgba(245, 158, 11, 0.1)` fill, `rgba(245, 158, 11, 0.3)` border.
  - **DEBUNKED:** `#ef4444` text, `rgba(239, 68, 68, 0.1)` fill, `rgba(239, 68, 68, 0.3)` border.
  - **LIVE INGEST:** `#06b6d4` text, `rgba(6, 182, 212, 0.1)` fill, `rgba(6, 182, 212, 0.3)` border.

### Claim Intelligence Cards
- Modular cards containing 3 zones:
  1. *Header Bar:* Monospaced timestamp, claim UUID, and source reliability index (e.g., `SOURCE: REUTERS // CONF: 94.2%`).
  2. *Narrative Core:* Serif `Newsreader` claim headline and contextual statement.
  3. *Evidence Bar:* Micro-counter badges displaying corroborating sources, counter-claims, and primary documents with quick-open inspector triggers.
- Border: 1px `#1e2638`. Active state adds a 2px left border accent corresponding to verification status.

### Input & Search Filters
- Background `#141824`, border 1px `#1e2638`, text `#f1f5f9`, placeholder `#475569`.
- Monospaced query indicators (e.g., `QUERY: target_entity:*`) using `JetBrains Mono` 12px.
- Focus: 1px border `#06b6d4` with no drop-shadow glow.

### Checkboxes & Segmented Switches
- **Checkboxes:** 14px × 14px square, 2px border radius, `#1e2638` border. Checked: `#06b6d4` background with a crisp high-contrast checkmark.
- **Segmented Console Switches:** Continuous rectangular pill housing nested flush blocks (`AUTO-TRIAGE`, `MANUAL`, `AUDIT`). Selected segment has `#1e2638` background, `#f1f5f9` text, and a 1px active indicator border.

### Telemetry Sparklines & Confidence Gauges
- Horizontal segmented progress meters composed of 10 discrete 2px tick bars rather than a continuous smooth bar, reinforcing digital instrumentation.