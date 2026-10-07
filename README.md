# Archivist — Curatorial Archive & Needle Drop Platform

> An intentional, tactile mobile interface designed for independent vinyl archivists, rare photobook collectors, and physical sound preservationists.

[![Design System](https://img.shields.io/badge/Design%20System-Analog%20Archivist-1a1918?style=flat-square&color=1a1918)](https://github.com)
[![Platform](https://img.shields.io/badge/Platform-Mobile%20Web%20%2F%20PWA-c85a32?style=flat-square)](https://github.com)
[![Status](https://img.shields.io/badge/Concept-Portfolio%20Ready-2e5b44?style=flat-square)](https://github.com)

---

## Overview

**Analog Archivist** is a curatorial mobile interface concept dedicated to documenting, archiving, and auditioning rare physical media: master test pressings, private press vinyl, out-of-print photography monographs, and magnetic field recordings.

This project deliberately counters generic digital interfaces—rejecting hyper-saturated gradients, uniform card grids, and cookie-cutter SaaS paradigms. Instead, it draws directly from library science, archival card registries, museum accession slips, and tangible audiophile calibration rituals.

---

## Design Rationale & Visual Identity

| Foundation | Implementation & Spatial Logic |
| :--- | :--- |
| **Material Tactility** | Raw unbleached archival paper tones (`#FCF9F4`, `#F6F3EE`), aged letterpress carbon ink (`#1A1918`), and faded terracotta accession stamps (`#C85A32`). |
| **Editorial Typography** | High-contrast pairing of classical editorial serif (*Playfair Display*) for collection titles alongside tabular monospace (*JetBrains Mono* / *Courier Prime*) for matrix deadwax runouts, catalog serials, and equipment calibration. |
| **Authentic Physical Metadata** | Standard Goldmine grading metrics (*Mint, Near Mint, Very Good+*), lacquer plate etching, moving-coil phono cartridge tracking weights, and unvarnished curator acquisition logs. |

---

## Core Interface Modules

The system comprises four tightly integrated mobile views:

### 1. Dispatch (Curatorial Feed)
* **Purpose:** Daily curatorial journal and newly acquired specimen entries.
* **Core Elements:**
  * Firsthand curator acquisition narratives detailing field discovery and provenance.
  * Interactive Needle Drop audio waveform module sampled at 24-bit/96kHz analog fidelity.
  * Focus features on out-of-print art photography monographs and magnetic tape installations.
  * Depository verification marks confirming tactile physical inspection in Kyoto and Berlin.

### 2. The Vault (Specimen Directory)
* **Purpose:** Archival search directory and physical specimen ledger.
* **Core Elements:**
  * Taxonomy filtering by physical medium (12" Vinyl, 7" Master Acetate, Monograph Folio, Magnetic Tape) and release decades (1960s – 1990s).
  * Archival preservation condition filters (*M, NM, VG+*).
  * Rigorous technical cards featuring runout matrix etchings, pressing weight (140g / 180g), slip folio dimensions, and direct request/box slip actions.

### 3. Soundroom (Needle Drop Player)
* **Purpose:** Direct mechanical turntable playback and audiophile console monitor.
* **Core Elements:**
  * Visual turntable display featuring dynamic tonearm and stylus track positioning.
  * Dedicated mechanical controls: *Cue In, Needle Drop, 33⅓ RPM toggle, and Direct-Drive Pitch Adjustment*.
  * Discrete signal path transparency: cartridge head specifications (Audio-Technica AT-ART9XI MC), vacuum tube preamplification, and measured groove noise floor (-64dB direct master cut).
  * Expanded curator liner notes documenting historical studio acoustics and pressing run provenance.

### 4. Collection (Curator Logbook)
* **Purpose:** Archivist identity credential and personal crate inventory ledger.
* **Core Elements:**
  * Verified accession badge (Vault Clearance Tier II, Series IV Membership, Shibuya Depository Box registry).
  * Physical holding register tallying cataloged specimens, vault reserves, and magnetic reels.
  * Featured Acquisition spotlight with detailed historical provenance documentation and market valuation estimates.
  * Crate management interface and physical deadwax runout / ISBN barcode scanner modal.

---

## Design System Tokens

```css
/* Color Palette */
--color-surface-bg:       #FCF9F4; /* Unbleached archive paper */
--color-surface-card:     #F6F3EE; /* Off-white container low */
--color-ink-primary:      #1A1918; /* Deep litho ink */
--color-ink-secondary:    #5A5852; /* Aged carbon grey */
--color-terracotta-stamp: #C85A32; /* Archival accession stamp */
--color-preservation-m:   #2E5B44; /* Mint condition green */

/* Typography Scale */
--font-editorial:         'Playfair Display', Georgia, serif;
--font-metadata:          'JetBrains Mono', 'Courier Prime', monospace;
--font-interface:         -apple-system, BlinkMacSystemFont, 'Inter', sans-serif;
```

---

## Case Study Talking Points

When presenting this project in a portfolio review or design interview:

1. **Problem Space:** Digital streaming and music cataloging platforms frequently treat cultural artifacts as interchangeable, disembodied data streams stripped of historical gravity and sensory context.
2. **Design Approach:** Translating the deliberate rituals of record preservation and museum accession into a mobile paradigm that feels tactile, academic, and deeply intentional.
3. **Typography & Density:** Balancing editorial elegance with high-density tabular metadata to achieve an interface that feels authentic to real-world domain experts rather than superficial lifestyle mockups.

---

## License & Usage
Designed for independent portfolio case study demonstration. Open for non-commercial reference and curatorial interface research.
