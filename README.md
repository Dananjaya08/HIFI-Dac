# Hi-Fi DAC & Headphone Amplifier

A high-performance portable Hi-Fi USB DAC & Headphone Amplifier designed with [tscircuit](https://tscircuit.com) (Hardware as Code).

## 🚀 Overview

Inspired by audiophile dongle DACs like the iBasso DC07Pro and FiiO Melody, this project implements a complete dual-mono balanced architecture capable of native DSD512 and PCM 768kHz/32-bit decoding, onboard 10-band hardware PEQ, and desktop-grade amplification.

## 🛠️ Key Specifications

- **Controller / USB DSP**: XMOS XU316 (16-core xCORE-200 / 300 series) with asynchronous USB Audio Class 2.0.
- **Clocking**: Dual femtosecond ultra-low phase noise audio oscillators (45.1584 MHz / 49.152 MHz).
- **DAC Stage**: Dual ESS Sabre ES9039Q2M (True Dual-Mono configuration).
- **Amplifier Stage**: Dual SGM8262 high-current low-noise operational amplifiers.
- **Outputs**:
  - 4.4mm Pentaconn Balanced Output
  - 3.5mm Single-Ended Stereo Output (with S/PDIF Coaxial support)
- **Power Architecture**:
  - Dual USB-C: Port 1 (Audio + 5V Bus) & Port 2 (USB-PD High Voltage Desktop Mode, 9V/12V via CH224K).
  - Ultra-low noise LDOs (TI TPS7A20 series) with dedicated analog, digital, and peripheral power isolation.
- **Display & Controls**:
  - 0.96" Monochrome I2C OLED display
  - Rotary encoder for stepped digital volume control
  - Physical Ultra-High Gain (UHG) mode switch
  - 3.5mm TRRS mic input with CTIA/OMTP auto-detection (TS3A225E) and dedicated audio ADC.
- **Enclosure Design**: CNC aluminum body for rear thermal heatsinking with a transparent front window.

## 📂 Project Structure

- `index.tsx`: Main tscircuit schematic & PCB design file.
- `.agents/`: Project memory, rules, and hardware engineering specifications.
- `package.json`: Project dependencies and scripts.

## 💻 Getting Started

### Prerequisites
- Node.js (v18+)

### Development
```bash
# Install dependencies
npm install

# Start tscircuit development preview
npm run dev
```

## 📄 License
MIT