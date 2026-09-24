# Project Progress & Roadmap

## Phase 1: Hardware Architecture & Component Selection
- [x] Define core architecture (XMOS XU316 + Dual ESS ES9039Q2M + S/PDIF).
- [x] Define power topology (USB-C + Ultra-Low Noise LDOs).
- [x] Define output stage and clocking system.
- [x] Define Microphone Input Stage (CTIA/OMTP Switch, Dedicated ADC, PGA).
- [x] Define Desktop Mode Power Topology (Dual USB-C, PD Controller).
- [x] Finalize peripheral component selection (OLED, Rotary Encoder, UHG Switch, Mute Relay, TS3A225E, CH224K, SGM8262, Mic ADC).
- [x] Draft initial block diagram / pin mapping.

## Phase 2: Schematic & PCB Design
- [x] MCU & USB Interface Schematic.
- [x] Power Supply Routing & LDO integration.
- [x] DAC Dual-Mono Routing.
- [x] Output Stage & Filters.
- [ ] PCB Layout & DRC Verification.

## Phase 3: Firmware Development (XMOS)
- [ ] USB Audio Class 2.0 implementation.
- [ ] Clock management & I2S output.
- [ ] I2C peripheral control (OLED).
- [ ] DSP integration (10-band PEQ).

## Phase 4: Software Companion Tool
- [ ] WebUSB Interface design.
- [ ] PEQ Configuration UI.
