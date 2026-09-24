/**
 * Hi-Fi DAC - Full Schematic (Hardware as Code)
 * 
 * Components:
 * - XMOS XU316-1024-QF60B (Master Controller)
 * - 2x ESS ES9039Q2M (Dual Mono DAC)
 * - 2x SGM8262-2 (Dual Op-Amp, SOIC-8)
 * - WCH CH224K (USB-PD Controller, ESSOP-10)
 * - TI TS3A225E (CTIA/OMTP Audio Jack Switch)
 * - 4x TI TPS7A20 (Ultra-Low Noise LDO, SOT-23-5)
 * - Winbond W25Q64 (64Mbit QSPI Flash, SOP-8)
 * - 2x Crystal Oscillators (45.1584MHz & 49.152MHz)
 */

export default () => (
  <board width="140mm" height="90mm">
    
    {/* ================================================================
        SECTION 1: USB TYPE-C CONNECTORS
        ================================================================ */}

    {/* USB-C Port 1: Data + Power (Main) */}
    <chip
      name="USB_C1"
      footprint="sip12"
      pinLabels={{
        pin1: "GND1",
        pin2: "TX1P",
        pin3: "TX1N",
        pin4: "VBUS1",
        pin5: "CC1",
        pin6: "DP",
        pin7: "DN",
        pin8: "SBU1",
        pin9: "VBUS2",
        pin10: "CC2",
        pin11: "SBU2",
        pin12: "GND2"
      }}
    />

    {/* 5.1k CC Resistors for UFP (Sink) Detection */}
    <resistor name="R_CC1_1" resistance="5.1k" footprint="0402" />
    <resistor name="R_CC2_1" resistance="5.1k" footprint="0402" />
    <trace from=".USB_C1 .CC1" to=".R_CC1_1 .pin1" />
    <trace from=".R_CC1_1 .pin2" to="net.GND" />
    <trace from=".USB_C1 .CC2" to=".R_CC2_1 .pin1" />
    <trace from=".R_CC2_1 .pin2" to="net.GND" />

    {/* USB-C Port 2: Power Only (Desktop Mode) */}
    <chip
      name="USB_C2"
      footprint="sip6"
      pinLabels={{
        pin1: "GND1",
        pin2: "VBUS1",
        pin3: "CC1",
        pin4: "CC2",
        pin5: "VBUS2",
        pin6: "GND2"
      }}
    />

    {/* ================================================================
        SECTION 2: USB-PD CONTROLLER (CH224K - ESSOP-10)
        ================================================================ */}

    <chip
      name="U_PD"
      footprint="ssop10_p0.5mm"
      pinLabels={{
        pin1: "VDD",
        pin2: "CFG1",
        pin3: "CFG2",
        pin4: "DP",
        pin5: "DM",
        pin6: "CC1",
        pin7: "CC2",
        pin8: "VBUS",
        pin9: "CFG3",
        pin10: "PG"
      }}
    />

    {/* CH224K: 6.8k on CFG1 to request 9V from PD adapter */}
    <resistor name="R_CFG1" resistance="6.8k" footprint="0402" />
    <trace from=".U_PD .CFG1" to=".R_CFG1 .pin1" />
    <trace from=".R_CFG1 .pin2" to="net.GND" />

    {/* CH224K: VDD decoupling 1uF */}
    <capacitor name="C_PD_VDD" capacitance="1uF" footprint="0402" />
    <trace from=".U_PD .VDD" to=".C_PD_VDD .pin1" />
    <trace from=".C_PD_VDD .pin2" to="net.GND" />

    {/* CH224K: VBUS sense through series resistor */}
    <resistor name="R_VBUS_SENSE" resistance="10k" footprint="0402" />
    <trace from=".USB_C2 .VBUS1" to=".R_VBUS_SENSE .pin1" />
    <trace from=".R_VBUS_SENSE .pin2" to=".U_PD .VBUS" />

    {/* CH224K: CC lines from USB-C Port 2 */}
    <trace from=".USB_C2 .CC1" to=".U_PD .CC1" />
    <trace from=".USB_C2 .CC2" to=".U_PD .CC2" />

    {/* ================================================================
        SECTION 3: POWER SUPPLY - LDOs (TPS7A20, SOT-23-5)
        ================================================================ */}

    {/* LDO 1: 1.8V Digital (XMOS Core + DAC DVDD) */}
    <chip
      name="LDO_1V8"
      footprint="SOT-23-5"
      pinLabels={{
        pin1: "IN",
        pin2: "GND",
        pin3: "EN",
        pin4: "NC",
        pin5: "OUT"
      }}
    />
    <capacitor name="C_LDO1_IN" capacitance="1uF" footprint="0402" />
    <capacitor name="C_LDO1_OUT" capacitance="1uF" footprint="0402" />
    <trace from=".USB_C1 .VBUS1" to="net.VBUS_5V" />
    <trace from="net.VBUS_5V" to=".LDO_1V8 .IN" />
    <trace from=".LDO_1V8 .IN" to=".C_LDO1_IN .pin1" />
    <trace from=".C_LDO1_IN .pin2" to="net.GND" />
    <trace from=".LDO_1V8 .EN" to="net.VBUS_5V" />
    <trace from=".LDO_1V8 .OUT" to="net.VDD_1V8" />
    <trace from=".LDO_1V8 .OUT" to=".C_LDO1_OUT .pin1" />
    <trace from=".C_LDO1_OUT .pin2" to="net.GND" />
    <trace from=".LDO_1V8 .GND" to="net.GND" />

    {/* LDO 2: 3.3V Analog (DAC AVCC) */}
    <chip
      name="LDO_3V3A"
      footprint="SOT-23-5"
      pinLabels={{
        pin1: "IN",
        pin2: "GND",
        pin3: "EN",
        pin4: "NC",
        pin5: "OUT"
      }}
    />
    <capacitor name="C_LDO2_IN" capacitance="1uF" footprint="0402" />
    <capacitor name="C_LDO2_OUT" capacitance="1uF" footprint="0402" />
    <trace from="net.VBUS_5V" to=".LDO_3V3A .IN" />
    <trace from=".LDO_3V3A .IN" to=".C_LDO2_IN .pin1" />
    <trace from=".C_LDO2_IN .pin2" to="net.GND" />
    <trace from=".LDO_3V3A .EN" to="net.VBUS_5V" />
    <trace from=".LDO_3V3A .OUT" to="net.AVCC_3V3" />
    <trace from=".LDO_3V3A .OUT" to=".C_LDO2_OUT .pin1" />
    <trace from=".C_LDO2_OUT .pin2" to="net.GND" />
    <trace from=".LDO_3V3A .GND" to="net.GND" />

    {/* LDO 3: 3.3V Digital (XMOS IO + DAC DVDD_IO) */}
    <chip
      name="LDO_3V3D"
      footprint="SOT-23-5"
      pinLabels={{
        pin1: "IN",
        pin2: "GND",
        pin3: "EN",
        pin4: "NC",
        pin5: "OUT"
      }}
    />
    <capacitor name="C_LDO3_IN" capacitance="1uF" footprint="0402" />
    <capacitor name="C_LDO3_OUT" capacitance="1uF" footprint="0402" />
    <trace from="net.VBUS_5V" to=".LDO_3V3D .IN" />
    <trace from=".LDO_3V3D .IN" to=".C_LDO3_IN .pin1" />
    <trace from=".C_LDO3_IN .pin2" to="net.GND" />
    <trace from=".LDO_3V3D .EN" to="net.VBUS_5V" />
    <trace from=".LDO_3V3D .OUT" to="net.DVDD_3V3" />
    <trace from=".LDO_3V3D .OUT" to=".C_LDO3_OUT .pin1" />
    <trace from=".C_LDO3_OUT .pin2" to="net.GND" />
    <trace from=".LDO_3V3D .GND" to="net.GND" />

    {/* LDO 4: 3.3V Peripheral (OLED, Encoder) - Isolated */}
    <chip
      name="LDO_3V3P"
      footprint="SOT-23-5"
      pinLabels={{
        pin1: "IN",
        pin2: "GND",
        pin3: "EN",
        pin4: "NC",
        pin5: "OUT"
      }}
    />
    <capacitor name="C_LDO4_IN" capacitance="1uF" footprint="0402" />
    <capacitor name="C_LDO4_OUT" capacitance="1uF" footprint="0402" />
    <trace from="net.VBUS_5V" to=".LDO_3V3P .IN" />
    <trace from=".LDO_3V3P .IN" to=".C_LDO4_IN .pin1" />
    <trace from=".C_LDO4_IN .pin2" to="net.GND" />
    <trace from=".LDO_3V3P .EN" to="net.VBUS_5V" />
    <trace from=".LDO_3V3P .OUT" to="net.VDD_PERIPH" />
    <trace from=".LDO_3V3P .OUT" to=".C_LDO4_OUT .pin1" />
    <trace from=".C_LDO4_OUT .pin2" to="net.GND" />
    <trace from=".LDO_3V3P .GND" to="net.GND" />

    {/* ================================================================
        SECTION 4: QSPI FLASH (W25Q64, SOP-8)
        ================================================================ */}

    <chip
      name="U_FLASH"
      footprint="soic8"
      pinLabels={{
        pin1: "CS",
        pin2: "DO_IO1",
        pin3: "WP_IO2",
        pin4: "GND",
        pin5: "DI_IO0",
        pin6: "CLK",
        pin7: "HOLD_IO3",
        pin8: "VCC"
      }}
    />
    <capacitor name="C_FLASH" capacitance="100nF" footprint="0402" />
    <trace from=".U_FLASH .VCC" to="net.DVDD_3V3" />
    <trace from=".U_FLASH .VCC" to=".C_FLASH .pin1" />
    <trace from=".C_FLASH .pin2" to="net.GND" />
    <trace from=".U_FLASH .GND" to="net.GND" />

    {/* ================================================================
        SECTION 5: CRYSTAL OSCILLATORS
        ================================================================ */}

    <chip
      name="OSC_44K"
      footprint="soic4"
      pinLabels={{
        pin1: "EN",
        pin2: "GND",
        pin3: "OUT",
        pin4: "VDD"
      }}
    />
    <capacitor name="C_OSC1" capacitance="100nF" footprint="0402" />
    <trace from=".OSC_44K .VDD" to="net.DVDD_3V3" />
    <trace from=".OSC_44K .VDD" to=".C_OSC1 .pin1" />
    <trace from=".C_OSC1 .pin2" to="net.GND" />
    <trace from=".OSC_44K .GND" to="net.GND" />
    <trace from=".OSC_44K .EN" to="net.DVDD_3V3" />

    <chip
      name="OSC_48K"
      footprint="soic4"
      pinLabels={{
        pin1: "EN",
        pin2: "GND",
        pin3: "OUT",
        pin4: "VDD"
      }}
    />
    <capacitor name="C_OSC2" capacitance="100nF" footprint="0402" />
    <trace from=".OSC_48K .VDD" to="net.DVDD_3V3" />
    <trace from=".OSC_48K .VDD" to=".C_OSC2 .pin1" />
    <trace from=".C_OSC2 .pin2" to="net.GND" />
    <trace from=".OSC_48K .GND" to="net.GND" />
    <trace from=".OSC_48K .EN" to="net.DVDD_3V3" />

    {/* ================================================================
        SECTION 6: XMOS XU316 MCU (QF60B - 60-pin QFN)
        Simplified functional pin grouping
        ================================================================ */}

    <chip
      name="U_XMOS"
      footprint="qfn60_w7_h7_p0.4mm_thermalpad"
      pinLabels={{
        /* Power */
        pin1: "VDD_CORE",
        pin2: "VDDIO_L",
        pin3: "GND1",
        /* USB 2.0 PHY */
        pin4: "USB_DP",
        pin5: "USB_DN",
        pin6: "USB_VBUS",
        /* QSPI Flash Interface */
        pin7: "QSPI_CS",
        pin8: "QSPI_CLK",
        pin9: "QSPI_IO0",
        pin10: "QSPI_IO1",
        pin11: "QSPI_IO2",
        pin12: "QSPI_IO3",
        /* I2S Output to DAC Left */
        pin13: "I2S_MCLK_L",
        pin14: "I2S_BCLK_L",
        pin15: "I2S_LRCLK_L",
        pin16: "I2S_DATA_L",
        /* I2S Output to DAC Right */
        pin17: "I2S_MCLK_R",
        pin18: "I2S_BCLK_R",
        pin19: "I2S_LRCLK_R",
        pin20: "I2S_DATA_R",
        /* I2S Input from Mic ADC */
        pin21: "I2S_MIC_BCLK",
        pin22: "I2S_MIC_LRCLK",
        pin23: "I2S_MIC_DATA",
        /* I2C Bus (OLED, DAC Control, Mic ADC) */
        pin24: "I2C_SDA",
        pin25: "I2C_SCL",
        /* S/PDIF Transmitter */
        pin26: "SPDIF_TX",
        /* Clock Inputs */
        pin27: "MCLK_44K_IN",
        pin28: "MCLK_48K_IN",
        /* GPIO: Rotary Encoder */
        pin29: "ENC_A",
        pin30: "ENC_B",
        pin31: "ENC_SW",
        /* GPIO: Media Buttons */
        pin32: "BTN_NEXT",
        pin33: "BTN_PREV",
        pin34: "BTN_PLAY",
        /* GPIO: Control */
        pin35: "MUTE_RELAY",
        pin36: "UHG_SWITCH",
        pin37: "PD_PG",
        pin38: "JACK_DET",
        /* More Power/GND */
        pin59: "VDDIO_R",
        pin60: "GND2"
      }}
    />

    {/* XMOS Power Connections */}
    <trace from=".U_XMOS .VDD_CORE" to="net.VDD_1V8" />
    <trace from=".U_XMOS .VDDIO_L" to="net.DVDD_3V3" />
    <trace from=".U_XMOS .VDDIO_R" to="net.DVDD_3V3" />
    <trace from=".U_XMOS .GND1" to="net.GND" />
    <trace from=".U_XMOS .GND2" to="net.GND" />

    {/* XMOS -> USB Port 1 */}
    <trace from=".U_XMOS .USB_DP" to=".USB_C1 .DP" />
    <trace from=".U_XMOS .USB_DN" to=".USB_C1 .DN" />

    {/* XMOS -> QSPI Flash */}
    <trace from=".U_XMOS .QSPI_CS" to=".U_FLASH .CS" />
    <trace from=".U_XMOS .QSPI_CLK" to=".U_FLASH .CLK" />
    <trace from=".U_XMOS .QSPI_IO0" to=".U_FLASH .DI_IO0" />
    <trace from=".U_XMOS .QSPI_IO1" to=".U_FLASH .DO_IO1" />
    <trace from=".U_XMOS .QSPI_IO2" to=".U_FLASH .WP_IO2" />
    <trace from=".U_XMOS .QSPI_IO3" to=".U_FLASH .HOLD_IO3" />

    {/* XMOS -> Clock Oscillators */}
    <trace from=".OSC_44K .OUT" to=".U_XMOS .MCLK_44K_IN" />
    <trace from=".OSC_48K .OUT" to=".U_XMOS .MCLK_48K_IN" />

    {/* XMOS -> PD Controller Power Good */}
    <trace from=".U_PD .PG" to=".U_XMOS .PD_PG" />

    {/* ================================================================
        SECTION 7: DUAL DAC (ESS ES9039Q2M, QFN-32)
        ================================================================ */}

    {/* DAC Left Channel */}
    <chip
      name="DAC_L"
      footprint="qfn32_w5_h5_p0.5mm_thermalpad"
      pinLabels={{
        pin1: "DVDD",
        pin2: "DGND",
        pin3: "DATA_CLK",
        pin4: "DATA1",
        pin5: "DATA2",
        pin6: "SPDIF_IN",
        pin7: "GPIO1",
        pin8: "GPIO2",
        pin9: "GPIO3",
        pin10: "GPIO4",
        pin11: "AVCC_DAC",
        pin12: "AGND1",
        pin13: "OUTP",
        pin14: "OUTN",
        pin15: "HW1",
        pin16: "HW0",
        pin17: "VCCA",
        pin18: "AGND2",
        pin19: "HW2",
        pin20: "MUTE_CTRL",
        pin21: "GPIO5",
        pin22: "GPIO6",
        pin23: "GPIO7",
        pin24: "GPIO8",
        pin25: "AVCC_CLK",
        pin26: "XTAL_IN",
        pin27: "XTAL_OUT",
        pin28: "RESET",
        pin29: "MODE",
        pin30: "SCL",
        pin31: "SDA",
        pin32: "ADDR",
        pin33: "EPAD_GND"
      }}
    />

    {/* DAC Left Power */}
    <capacitor name="C_DACL_DVDD" capacitance="100nF" footprint="0402" />
    <capacitor name="C_DACL_AVCC" capacitance="1uF" footprint="0402" />
    <capacitor name="C_DACL_VCCA" capacitance="1uF" footprint="0402" />
    <trace from=".DAC_L .DVDD" to="net.VDD_1V8" />
    <trace from=".DAC_L .DVDD" to=".C_DACL_DVDD .pin1" />
    <trace from=".C_DACL_DVDD .pin2" to="net.GND" />
    <trace from=".DAC_L .AVCC_DAC" to="net.AVCC_3V3" />
    <trace from=".DAC_L .AVCC_DAC" to=".C_DACL_AVCC .pin1" />
    <trace from=".C_DACL_AVCC .pin2" to="net.GND" />
    <trace from=".DAC_L .VCCA" to="net.AVCC_3V3" />
    <trace from=".DAC_L .VCCA" to=".C_DACL_VCCA .pin1" />
    <trace from=".C_DACL_VCCA .pin2" to="net.GND" />
    <trace from=".DAC_L .DGND" to="net.GND" />
    <trace from=".DAC_L .AGND1" to="net.GND" />
    <trace from=".DAC_L .AGND2" to="net.GND" />
    <trace from=".DAC_L .EPAD_GND" to="net.GND" />

    {/* DAC Left I2S from XMOS */}
    <trace from=".U_XMOS .I2S_BCLK_L" to=".DAC_L .DATA_CLK" />
    <trace from=".U_XMOS .I2S_DATA_L" to=".DAC_L .DATA1" />
    <trace from=".U_XMOS .I2S_MCLK_L" to=".DAC_L .XTAL_IN" />

    {/* DAC Left I2C Control */}
    <trace from=".DAC_L .SCL" to="net.I2C_SCL" />
    <trace from=".DAC_L .SDA" to="net.I2C_SDA" />
    <resistor name="R_DACL_ADDR" resistance="0" footprint="0402" />
    <trace from=".DAC_L .ADDR" to=".R_DACL_ADDR .pin1" />
    <trace from=".R_DACL_ADDR .pin2" to="net.GND" />

    {/* DAC Right Channel */}
    <chip
      name="DAC_R"
      footprint="qfn32_w5_h5_p0.5mm_thermalpad"
      pinLabels={{
        pin1: "DVDD",
        pin2: "DGND",
        pin3: "DATA_CLK",
        pin4: "DATA1",
        pin5: "DATA2",
        pin6: "SPDIF_IN",
        pin7: "GPIO1",
        pin8: "GPIO2",
        pin9: "GPIO3",
        pin10: "GPIO4",
        pin11: "AVCC_DAC",
        pin12: "AGND1",
        pin13: "OUTP",
        pin14: "OUTN",
        pin15: "HW1",
        pin16: "HW0",
        pin17: "VCCA",
        pin18: "AGND2",
        pin19: "HW2",
        pin20: "MUTE_CTRL",
        pin21: "GPIO5",
        pin22: "GPIO6",
        pin23: "GPIO7",
        pin24: "GPIO8",
        pin25: "AVCC_CLK",
        pin26: "XTAL_IN",
        pin27: "XTAL_OUT",
        pin28: "RESET",
        pin29: "MODE",
        pin30: "SCL",
        pin31: "SDA",
        pin32: "ADDR",
        pin33: "EPAD_GND"
      }}
    />

    {/* DAC Right Power */}
    <capacitor name="C_DACR_DVDD" capacitance="100nF" footprint="0402" />
    <capacitor name="C_DACR_AVCC" capacitance="1uF" footprint="0402" />
    <capacitor name="C_DACR_VCCA" capacitance="1uF" footprint="0402" />
    <trace from=".DAC_R .DVDD" to="net.VDD_1V8" />
    <trace from=".DAC_R .DVDD" to=".C_DACR_DVDD .pin1" />
    <trace from=".C_DACR_DVDD .pin2" to="net.GND" />
    <trace from=".DAC_R .AVCC_DAC" to="net.AVCC_3V3" />
    <trace from=".DAC_R .AVCC_DAC" to=".C_DACR_AVCC .pin1" />
    <trace from=".C_DACR_AVCC .pin2" to="net.GND" />
    <trace from=".DAC_R .VCCA" to="net.AVCC_3V3" />
    <trace from=".DAC_R .VCCA" to=".C_DACR_VCCA .pin1" />
    <trace from=".C_DACR_VCCA .pin2" to="net.GND" />
    <trace from=".DAC_R .DGND" to="net.GND" />
    <trace from=".DAC_R .AGND1" to="net.GND" />
    <trace from=".DAC_R .AGND2" to="net.GND" />
    <trace from=".DAC_R .EPAD_GND" to="net.GND" />

    {/* DAC Right I2S from XMOS */}
    <trace from=".U_XMOS .I2S_BCLK_R" to=".DAC_R .DATA_CLK" />
    <trace from=".U_XMOS .I2S_DATA_R" to=".DAC_R .DATA1" />
    <trace from=".U_XMOS .I2S_MCLK_R" to=".DAC_R .XTAL_IN" />

    {/* DAC Right I2C Control (different address) */}
    <trace from=".DAC_R .SCL" to="net.I2C_SCL" />
    <trace from=".DAC_R .SDA" to="net.I2C_SDA" />
    <resistor name="R_DACR_ADDR" resistance="4.7k" footprint="0402" />
    <trace from=".DAC_R .ADDR" to=".R_DACR_ADDR .pin1" />
    <trace from=".R_DACR_ADDR .pin2" to="net.DVDD_3V3" />

    {/* I2C Bus Pull-ups */}
    <resistor name="R_I2C_SDA" resistance="4.7k" footprint="0402" />
    <resistor name="R_I2C_SCL" resistance="4.7k" footprint="0402" />
    <trace from=".U_XMOS .I2C_SDA" to="net.I2C_SDA" />
    <trace from=".U_XMOS .I2C_SCL" to="net.I2C_SCL" />
    <trace from="net.I2C_SDA" to=".R_I2C_SDA .pin1" />
    <trace from=".R_I2C_SDA .pin2" to="net.DVDD_3V3" />
    <trace from="net.I2C_SCL" to=".R_I2C_SCL .pin1" />
    <trace from=".R_I2C_SCL .pin2" to="net.DVDD_3V3" />

    {/* ================================================================
        SECTION 8: AMPLIFIER STAGE (2x SGM8262-2, SOIC-8)
        ================================================================ */}

    {/* Op-Amp Left Channel */}
    <chip
      name="AMP_L"
      footprint="soic8"
      pinLabels={{
        pin1: "OUTA",
        pin2: "INA_NEG",
        pin3: "INA_POS",
        pin4: "V_NEG",
        pin5: "INB_POS",
        pin6: "INB_NEG",
        pin7: "OUTB",
        pin8: "V_POS"
      }}
    />

    {/* Op-Amp Right Channel */}
    <chip
      name="AMP_R"
      footprint="soic8"
      pinLabels={{
        pin1: "OUTA",
        pin2: "INA_NEG",
        pin3: "INA_POS",
        pin4: "V_NEG",
        pin5: "INB_POS",
        pin6: "INB_NEG",
        pin7: "OUTB",
        pin8: "V_POS"
      }}
    />

    {/* Amp Power Supply */}
    <capacitor name="C_AMPL_VCC" capacitance="100nF" footprint="0402" />
    <capacitor name="C_AMPR_VCC" capacitance="100nF" footprint="0402" />
    <trace from=".AMP_L .V_POS" to="net.AMP_VCC" />
    <trace from=".AMP_L .V_NEG" to="net.GND" />
    <trace from=".AMP_L .V_POS" to=".C_AMPL_VCC .pin1" />
    <trace from=".C_AMPL_VCC .pin2" to="net.GND" />
    <trace from=".AMP_R .V_POS" to="net.AMP_VCC" />
    <trace from=".AMP_R .V_NEG" to="net.GND" />
    <trace from=".AMP_R .V_POS" to=".C_AMPR_VCC .pin1" />
    <trace from=".C_AMPR_VCC .pin2" to="net.GND" />

    {/* DAC L -> LPF Resistors -> Amp L */}
    <resistor name="R_LPF_LP" resistance="470" footprint="0402" />
    <resistor name="R_LPF_LN" resistance="470" footprint="0402" />
    <capacitor name="C_LPF_LP" capacitance="1nF" footprint="0402" />
    <capacitor name="C_LPF_LN" capacitance="1nF" footprint="0402" />
    <trace from=".DAC_L .OUTP" to=".R_LPF_LP .pin1" />
    <trace from=".R_LPF_LP .pin2" to=".AMP_L .INA_POS" />
    <trace from=".AMP_L .INA_POS" to=".C_LPF_LP .pin1" />
    <trace from=".C_LPF_LP .pin2" to="net.GND" />
    <trace from=".DAC_L .OUTN" to=".R_LPF_LN .pin1" />
    <trace from=".R_LPF_LN .pin2" to=".AMP_L .INB_POS" />
    <trace from=".AMP_L .INB_POS" to=".C_LPF_LN .pin1" />
    <trace from=".C_LPF_LN .pin2" to="net.GND" />

    {/* DAC R -> LPF Resistors -> Amp R */}
    <resistor name="R_LPF_RP" resistance="470" footprint="0402" />
    <resistor name="R_LPF_RN" resistance="470" footprint="0402" />
    <capacitor name="C_LPF_RP" capacitance="1nF" footprint="0402" />
    <capacitor name="C_LPF_RN" capacitance="1nF" footprint="0402" />
    <trace from=".DAC_R .OUTP" to=".R_LPF_RP .pin1" />
    <trace from=".R_LPF_RP .pin2" to=".AMP_R .INA_POS" />
    <trace from=".AMP_R .INA_POS" to=".C_LPF_RP .pin1" />
    <trace from=".C_LPF_RP .pin2" to="net.GND" />
    <trace from=".DAC_R .OUTN" to=".R_LPF_RN .pin1" />
    <trace from=".R_LPF_RN .pin2" to=".AMP_R .INB_POS" />
    <trace from=".AMP_R .INB_POS" to=".C_LPF_RN .pin1" />
    <trace from=".C_LPF_RN .pin2" to="net.GND" />

    {/* Amp Feedback Resistors (Gain Setting) */}
    <resistor name="R_FB_LA" resistance="2.2k" footprint="0402" />
    <resistor name="R_FB_LB" resistance="2.2k" footprint="0402" />
    <resistor name="R_FB_RA" resistance="2.2k" footprint="0402" />
    <resistor name="R_FB_RB" resistance="2.2k" footprint="0402" />
    <trace from=".AMP_L .OUTA" to=".R_FB_LA .pin1" />
    <trace from=".R_FB_LA .pin2" to=".AMP_L .INA_NEG" />
    <trace from=".AMP_L .OUTB" to=".R_FB_LB .pin1" />
    <trace from=".R_FB_LB .pin2" to=".AMP_L .INB_NEG" />
    <trace from=".AMP_R .OUTA" to=".R_FB_RA .pin1" />
    <trace from=".R_FB_RA .pin2" to=".AMP_R .INA_NEG" />
    <trace from=".AMP_R .OUTB" to=".R_FB_RB .pin1" />
    <trace from=".R_FB_RB .pin2" to=".AMP_R .INB_NEG" />

    {/* ================================================================
        SECTION 9: OUTPUT STAGE (Isolation Resistors + Jacks)
        ================================================================ */}

    {/* Output Isolation Resistors (prevent oscillation) */}
    <resistor name="R_OUT_LP" resistance="10" footprint="0402" />
    <resistor name="R_OUT_LN" resistance="10" footprint="0402" />
    <resistor name="R_OUT_RP" resistance="10" footprint="0402" />
    <resistor name="R_OUT_RN" resistance="10" footprint="0402" />

    {/* 4.4mm Balanced Output Jack */}
    <chip
      name="JACK_BAL"
      footprint="sip5"
      pinLabels={{
        pin1: "L_PLUS",
        pin2: "L_MINUS",
        pin3: "R_PLUS",
        pin4: "R_MINUS",
        pin5: "GND"
      }}
    />

    <trace from=".AMP_L .OUTA" to=".R_OUT_LP .pin1" />
    <trace from=".R_OUT_LP .pin2" to=".JACK_BAL .L_PLUS" />
    <trace from=".AMP_L .OUTB" to=".R_OUT_LN .pin1" />
    <trace from=".R_OUT_LN .pin2" to=".JACK_BAL .L_MINUS" />
    <trace from=".AMP_R .OUTA" to=".R_OUT_RP .pin1" />
    <trace from=".R_OUT_RP .pin2" to=".JACK_BAL .R_PLUS" />
    <trace from=".AMP_R .OUTB" to=".R_OUT_RN .pin1" />
    <trace from=".R_OUT_RN .pin2" to=".JACK_BAL .R_MINUS" />
    <trace from=".JACK_BAL .GND" to="net.GND" />

    {/* 3.5mm Single-Ended + SPDIF + Mic (TRRS Jack) */}
    <chip
      name="JACK_SE"
      footprint="sip5"
      pinLabels={{
        pin1: "TIP",
        pin2: "RING1",
        pin3: "RING2",
        pin4: "SLEEVE",
        pin5: "DETECT"
      }}
    />

    {/* SE output from Amp positive phases */}
    <resistor name="R_SE_L" resistance="10" footprint="0402" />
    <resistor name="R_SE_R" resistance="10" footprint="0402" />
    <trace from=".AMP_L .OUTA" to=".R_SE_L .pin1" />
    <trace from=".R_SE_L .pin2" to=".JACK_SE .TIP" />
    <trace from=".AMP_R .OUTA" to=".R_SE_R .pin1" />
    <trace from=".R_SE_R .pin2" to=".JACK_SE .RING1" />

    {/* S/PDIF TX from XMOS */}
    <resistor name="R_SPDIF" resistance="75" footprint="0402" />
    <trace from=".U_XMOS .SPDIF_TX" to=".R_SPDIF .pin1" />

    {/* Jack detect to XMOS */}
    <trace from=".JACK_SE .DETECT" to=".U_XMOS .JACK_DET" />

    {/* ================================================================
        SECTION 10: CTIA/OMTP SWITCH (TS3A225E, WQFN-16)
        ================================================================ */}

    <chip
      name="U_JACK_SW"
      footprint="qfn16_w3_h3_p0.5mm_thermalpad"
      pinLabels={{
        pin1: "MIC_IN",
        pin2: "AGND_IN",
        pin3: "SLEEVE",
        pin4: "RING2",
        pin5: "VDD",
        pin6: "GND",
        pin7: "SCL",
        pin8: "SDA",
        pin9: "INTn",
        pin10: "MIC_DET",
        pin11: "KEY_DET",
        pin12: "SENSE",
        pin13: "BIAS",
        pin14: "HP_L",
        pin15: "HP_R",
        pin16: "HP_GND"
      }}
    />
    <capacitor name="C_JACKSW" capacitance="100nF" footprint="0402" />
    <trace from=".U_JACK_SW .VDD" to="net.DVDD_3V3" />
    <trace from=".U_JACK_SW .VDD" to=".C_JACKSW .pin1" />
    <trace from=".C_JACKSW .pin2" to="net.GND" />
    <trace from=".U_JACK_SW .GND" to="net.GND" />

    {/* Connect jack switch to 3.5mm TRRS jack */}
    <trace from=".U_JACK_SW .SLEEVE" to=".JACK_SE .SLEEVE" />
    <trace from=".U_JACK_SW .RING2" to=".JACK_SE .RING2" />

    {/* I2C for TS3A225E control */}
    <trace from=".U_JACK_SW .SCL" to="net.I2C_SCL" />
    <trace from=".U_JACK_SW .SDA" to="net.I2C_SDA" />

    {/* ================================================================
        SECTION 11: PERIPHERALS
        ================================================================ */}

    {/* 0.96" OLED Display (I2C) */}
    <chip
      name="OLED"
      footprint="sip4"
      pinLabels={{
        pin1: "GND",
        pin2: "VCC",
        pin3: "SCL",
        pin4: "SDA"
      }}
    />
    <trace from=".OLED .VCC" to="net.VDD_PERIPH" />
    <trace from=".OLED .GND" to="net.GND" />
    <trace from=".OLED .SCL" to="net.I2C_SCL" />
    <trace from=".OLED .SDA" to="net.I2C_SDA" />

    {/* Rotary Encoder (with RC debounce) */}
    <chip
      name="ENCODER"
      footprint="sip5"
      pinLabels={{
        pin1: "A",
        pin2: "B",
        pin3: "SW",
        pin4: "COM1",
        pin5: "COM2"
      }}
    />
    <resistor name="R_ENC_A" resistance="10k" footprint="0402" />
    <resistor name="R_ENC_B" resistance="10k" footprint="0402" />
    <resistor name="R_ENC_SW" resistance="10k" footprint="0402" />
    <capacitor name="C_ENC_A" capacitance="100nF" footprint="0402" />
    <capacitor name="C_ENC_B" capacitance="100nF" footprint="0402" />
    <capacitor name="C_ENC_SW" capacitance="100nF" footprint="0402" />

    {/* Pull-ups */}
    <trace from=".ENCODER .A" to=".R_ENC_A .pin1" />
    <trace from=".R_ENC_A .pin2" to="net.VDD_PERIPH" />
    <trace from=".ENCODER .B" to=".R_ENC_B .pin1" />
    <trace from=".R_ENC_B .pin2" to="net.VDD_PERIPH" />
    <trace from=".ENCODER .SW" to=".R_ENC_SW .pin1" />
    <trace from=".R_ENC_SW .pin2" to="net.VDD_PERIPH" />

    {/* Debounce capacitors */}
    <trace from=".ENCODER .A" to=".C_ENC_A .pin1" />
    <trace from=".C_ENC_A .pin2" to="net.GND" />
    <trace from=".ENCODER .B" to=".C_ENC_B .pin1" />
    <trace from=".C_ENC_B .pin2" to="net.GND" />
    <trace from=".ENCODER .SW" to=".C_ENC_SW .pin1" />
    <trace from=".C_ENC_SW .pin2" to="net.GND" />

    {/* Connect encoder to XMOS */}
    <trace from=".ENCODER .A" to=".U_XMOS .ENC_A" />
    <trace from=".ENCODER .B" to=".U_XMOS .ENC_B" />
    <trace from=".ENCODER .SW" to=".U_XMOS .ENC_SW" />
    <trace from=".ENCODER .COM1" to="net.GND" />
    <trace from=".ENCODER .COM2" to="net.GND" />

    {/* Media Buttons with RC debounce */}
    <chip name="BTN_NEXT" footprint="sip2" pinLabels={{ pin1: "IN", pin2: "OUT" }} />
    <chip name="BTN_PREV" footprint="sip2" pinLabels={{ pin1: "IN", pin2: "OUT" }} />
    <chip name="BTN_PLAY" footprint="sip2" pinLabels={{ pin1: "IN", pin2: "OUT" }} />

    <resistor name="R_BTN_N" resistance="10k" footprint="0402" />
    <resistor name="R_BTN_P" resistance="10k" footprint="0402" />
    <resistor name="R_BTN_PL" resistance="10k" footprint="0402" />
    <capacitor name="C_BTN_N" capacitance="100nF" footprint="0402" />
    <capacitor name="C_BTN_P" capacitance="100nF" footprint="0402" />
    <capacitor name="C_BTN_PL" capacitance="100nF" footprint="0402" />

    <trace from=".BTN_NEXT .IN" to=".R_BTN_N .pin1" />
    <trace from=".R_BTN_N .pin2" to="net.VDD_PERIPH" />
    <trace from=".BTN_NEXT .IN" to=".C_BTN_N .pin1" />
    <trace from=".C_BTN_N .pin2" to="net.GND" />
    <trace from=".BTN_NEXT .OUT" to="net.GND" />
    <trace from=".BTN_NEXT .IN" to=".U_XMOS .BTN_NEXT" />

    <trace from=".BTN_PREV .IN" to=".R_BTN_P .pin1" />
    <trace from=".R_BTN_P .pin2" to="net.VDD_PERIPH" />
    <trace from=".BTN_PREV .IN" to=".C_BTN_P .pin1" />
    <trace from=".C_BTN_P .pin2" to="net.GND" />
    <trace from=".BTN_PREV .OUT" to="net.GND" />
    <trace from=".BTN_PREV .IN" to=".U_XMOS .BTN_PREV" />

    <trace from=".BTN_PLAY .IN" to=".R_BTN_PL .pin1" />
    <trace from=".R_BTN_PL .pin2" to="net.VDD_PERIPH" />
    <trace from=".BTN_PLAY .IN" to=".C_BTN_PL .pin1" />
    <trace from=".C_BTN_PL .pin2" to="net.GND" />
    <trace from=".BTN_PLAY .OUT" to="net.GND" />
    <trace from=".BTN_PLAY .IN" to=".U_XMOS .BTN_PLAY" />

    {/* Mute Relay Control (via N-MOSFET) */}
    <chip
      name="Q_MUTE"
      footprint="SOT-23"
      pinLabels={{
        pin1: "GATE",
        pin2: "SOURCE",
        pin3: "DRAIN"
      }}
    />
    <chip
      name="RELAY_MUTE"
      footprint="dip4"
      pinLabels={{
        pin1: "COIL_A",
        pin2: "COIL_B",
        pin3: "COM",
        pin4: "NO"
      }}
    />
    <resistor name="R_MUTE_GATE" resistance="10k" footprint="0402" />
    <trace from=".U_XMOS .MUTE_RELAY" to=".R_MUTE_GATE .pin1" />
    <trace from=".R_MUTE_GATE .pin2" to=".Q_MUTE .GATE" />
    <trace from=".Q_MUTE .SOURCE" to="net.GND" />
    <trace from=".Q_MUTE .DRAIN" to=".RELAY_MUTE .COIL_B" />
    <trace from=".RELAY_MUTE .COIL_A" to="net.DVDD_3V3" />

    {/* UHG Toggle Switch */}
    <chip name="SW_UHG" footprint="sip2" pinLabels={{ pin1: "IN", pin2: "OUT" }} />
    <resistor name="R_UHG" resistance="10k" footprint="0402" />
    <trace from=".SW_UHG .IN" to=".R_UHG .pin1" />
    <trace from=".R_UHG .pin2" to="net.VDD_PERIPH" />
    <trace from=".SW_UHG .OUT" to="net.GND" />
    <trace from=".SW_UHG .IN" to=".U_XMOS .UHG_SWITCH" />

  </board>
)
