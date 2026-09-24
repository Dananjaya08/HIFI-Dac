# Hi-Fi DAC Project - Hardware Architecture Specification

## Overview
Advanced portable Hi-Fi DAC project inspired by high-end devices like the FiiO Snowsky Melody. Targets extreme high-resolution audio decoding (up to DSD512 and PCM 768kHz/32-bit) with on-device processing capabilities, specifically a 10-band PEQ (Parametric Equalizer) and multi-filter support.

## Hardware Architecture Decisions

### 1. Core Processor & USB Interface
- **Master Controller:** XMOS XU316 (16-core).
- **USB Interface:** Asynchronous audio interface.
- **Boot & Storage Memory:** 64Mbit (8MB) QSPI Flash (e.g., Winbond W25Q64) for firmware booting and on-device storage (e.g., PEQ presets).

### 2. Clocking System
- **Architecture:** Dual-clock using two ultra-low phase noise precision audio crystal oscillators.
- **Frequencies:**
  - 45.1584 MHz (for 44.1kHz family & DSD512 support).
  - 49.152 MHz (for 48kHz family & PCM 768kHz support).

### 3. DAC Stage (Dual Mono Topology)
- **DAC Chips:** 2x ESS Technology ES9039Q2M in a dedicated Dual-DAC configuration.
- **Configuration:** One chip dedicated exclusively to Left channel differential output, and the other to Right channel.
- **Low Pass Filter (LPF):** Dedicated Op-Amp based I/V and LPF stage following the voltage output of the ES9039Q2M chips before hitting the main amplifier.
- **Audio Outputs:** 
  - 4.4mm Balanced output (true differential signals L+, L-, R+, R-).
  - 3.5mm Single-Ended output (positive phases and analog ground).
  - **S/PDIF Coaxial Output:** Shared with the 3.5mm Single-Ended jack, driven directly from the XMOS controller.

### 4. Power Management & Low-Noise Design
- **Dual USB-C Inputs:** 
  - **Port 1 (Data + Power):** Standard 5V USB Type-C input for portable use.
  - **Port 2 (Power Only / Desktop Mode):** Secondary USB-C port with a dedicated USB-PD controller (e.g., WCH CH224K). Negotiates 9V/12V from a fast charger.
  - **Power Path Prioritization:** System automatically prioritizes drawing power from Port 2 for the amplifier stage when connected, preserving the host device's battery.
- **LDO Topology:** Multi-stage Ultra-Low Noise LDO topology (e.g., TI TPS7A20) for standard rails. Dedicated boost/buck converters for UHG amplifier rails when Desktop Mode is active.
- **Supply Separation:**
  - Digital supply: 1.8V for XMOS core and DAC digital.
  - Analog supply: 3.3V for DAC analog.
  - Peripheral supply: Dedicated LDO line for peripherals (e.g., OLED screen) to prevent background hiss/noise.

### 5. Analog Output Stage
- **External Amplifier & UHG Mode:** 2x SGM8262 (Dual Op-Amps) placed after the DACs. Includes a **physical toggle switch** for the user to manually activate Ultra High Gain (UHG). When active and Port 2 is powered, it utilizes the boosted rails for maximum output.
- **Output Filter:** Built-in components including series damping/isolation resistors (e.g., 10 Ohms) and shunt capacitors (e.g., 1nF) for RF/EMI filtering.
- **Peripherals & UI:** 
  - Mute Relay (anti-pop circuit to protect IEM drivers).
  - **Rotary Encoder** for premium digital volume control.
  - Tactile media buttons (Next, Prev, Play/Pause) with hardware RC filtering (debouncing).
  - 0.96-inch OLED screen connected via I2C for visual feedback.

### 6. Microphone Input Stage
- **Mic Support & Jack Detection:** Single 3.5mm TRRS jack. Uses a hardware crosspoint switch (e.g., TI TS3A225E) for automatic CTIA/OMTP standard detection and routing.
- **ADC (Analog-to-Digital Converter):** High-quality, low-noise dedicated audio ADC chip (e.g., from Texas Instruments, Cirrus Logic, or AKM) with an I2S interface routing to the XMOS controller.
- **Gain Control (Mic Preamplifier):** 
  - Hardware Programmable Gain Amplifier (PGA) for adjustable mic analog gain control without clipping.
  - Digital software gain control routing via the XMOS DSP pipeline.

### 7. Mechanical & Thermal Design
- **Chassis:** Metal housing (e.g., CNC Aluminum) designed to function as a heatsink.
- **Thermal Management:** Heat-generating components (XMOS, power converters, Op-Amps) route heat through thermal vias to the bottom side of the PCB, which interfaces directly with the metal chassis via thermal pads.
- **Aesthetics:** Transparent front panel (inspired by BLON V1) to showcase the internal circuitry, while keeping thermal dissipation safely at the back.
