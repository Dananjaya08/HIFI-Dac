# HIFI DAC Dongle Update v0.1.1

## Overview
This is the first design update for the premium portable Hi-Fi DAC dongle concept. The design direction blends:

- iBasso DC07 Pro aesthetic: compact premium body, OLED display, rotary input control, user-focused front panel
- Bloon V1 internal showcase style: exposed board character, visible internal structure, premium transparent-shell feel

## What changed in this revision

### 1. Reworked board placement
The PCB concept was reorganized to be more physically realistic and product-oriented instead of a dense, overly packed schematic.

Key improvements:
- front panel block arranged near the top/mid area
- USB-C section moved to the left edge
- digital processing zone centralized in the middle
- DAC and amplifier region placed on the right side
- output jack area positioned for more natural connectivity

### 2. Improved functional grouping
System blocks are now separated more intentionally:
- user interface area: OLED, knob, buttons
- USB power input area
- digital signal processing area: XMOS, flash, oscillators
- analog output block: DACs and amplifiers
- peripheral / power support block: LDOs and decoupling

### 3. Better power rail concept
The power architecture was tightened to a cleaner concept:
- VBUS 5V input from USB-C
- VDD_1V8 for core logic
- VDD_3V3 for MCU and digital support
- VDD_PERIPH for front-panel and low-noise peripherals
- LDO and decoupling capacitors added around the rails

### 4. Front panel and control wiring
The design now more clearly reflects a premium dongle product:
- OLED display wiring to I2C bus
- encoder wiring for volume/selection control
- physical buttons for next, previous, and play
- more legible interface connectivity for product concepting

### 5. Output path refinement
The analog output stage is grouped more realistically:
- balanced output section separated from the single-ended output area
- DAC outputs structured toward amplifier inputs
- jack placements arranged for a more practical consumer product layout

### 6. Product identity refinement
The board now better matches the desired product story:
- premium compact dongle form factor
- exposed-internals luxury concept
- minimal but high-end hardware expression
- strong visual identity influenced by iBasso DC07 Pro and Bloon V1

### 7. Desk-orientated USB-C placement refinement (v0.1.1)
The USB-C layout was adjusted to better match the intended use case: the device sits on a desk with the transparent side facing upward.

Key changes:
- main USB-C data/power port moved to the top edge of the board
- secondary USB-C port moved to the right edge for a more practical desk-use layout
- power and PD routing concept kept close to the top-edge USB area
- this avoids the previous side-edge arrangement that felt less natural for a visible tabletop product

This update reflects a more product-realistic orientation for a premium DAC dongle that is viewed from above while resting on a desk.

## Design intent
This v0.1.1 revision is still a concept-level refinement, not a manufacturing-ready board. It improves:

- board readability
- functional zoning
- product aesthetic alignment
- route plausibility for a future detailed revision

## Files updated
- [index.tsx](index.tsx)
- [update.md](update.md)

## Status
This revision refines the desk-mounted orientation and keeps the concept aligned with the premium transparent-shell DAC direction. It remains a concept-stage iteration, with the next step focused on a cleaner final product layout.
