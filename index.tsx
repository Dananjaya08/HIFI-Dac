/**
 * Hi-Fi DAC Dongle Concept
 *
 * Concept direction:
 * - iBasso DC07 Pro styling: OLED screen + rotary knob + premium compact form factor
 * - Bloon V1 aesthetic: exposed internal board/view, transparent shell vibe
 * - Portable dual-mono balanced DAC with clean analog/digital partitioning
 */

export default () => (
  <board width="120mm" height="80mm">
    {/* Front panel / user interface */}
    <chip
      name="OLED"
      pcbX="31mm"
      pcbY="63mm"
      footprint="pinrow4"
      pinLabels={{ pin1: "GND", pin2: "VCC", pin3: "SCL", pin4: "SDA" }}
    />

    <chip
      name="KNOB"
      pcbX="74mm"
      pcbY="63mm"
      footprint="pinrow4"
      pinLabels={{ pin1: "A", pin2: "B", pin3: "SW", pin4: "COM" }}
    />

    <chip
      name="BTN_NEXT"
      pcbX="58mm"
      pcbY="68mm"
      footprint="pinrow2"
      pinLabels={{ pin1: "SIG", pin2: "GND" }}
    />

    <chip
      name="BTN_PREV"
      pcbX="62mm"
      pcbY="68mm"
      footprint="pinrow2"
      pinLabels={{ pin1: "SIG", pin2: "GND" }}
    />

    <chip
      name="BTN_PLAY"
      pcbX="66mm"
      pcbY="68mm"
      footprint="pinrow2"
      pinLabels={{ pin1: "SIG", pin2: "GND" }}
    />

    <chip
      name="USB_C1"
      pcbX="10mm"
      pcbY="31mm"
      footprint="pinrow12"
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
        pin12: "GND2",
      }}
    />

    <chip
      name="USB_C2"
      pcbX="10mm"
      pcbY="16mm"
      footprint="pinrow6"
      pinLabels={{ pin1: "GND1", pin2: "VBUS1", pin3: "CC1", pin4: "CC2", pin5: "VBUS2", pin6: "GND2" }}
    />

    <chip
      name="U_PD"
      pcbX="24mm"
      pcbY="18mm"
      footprint="tssop10_p0.5mm"
      pinLabels={{
        pin1: "VDD",
        pin2: "CFG1",
        pin3: "CFG2",
        pin4: "DP",
        pin5: "DM",
        pin6: "CC1",
        pin7: "CC2",
        pin8: "VBUS",
        pin9: "PG",
        pin10: "GND",
      }}
    />

    {/* Main digital / audio processor */}
    <chip
      name="U_XMOS"
      pcbX="46mm"
      pcbY="30mm"
      footprint="qfn60_w7_h7_p0.4mm_pw0.2mm_pl0.8mm"
      pinLabels={{
        pin1: "VDD_CORE",
        pin2: "VDDIO",
        pin3: "GND",
        pin4: "USB_DP",
        pin5: "USB_DN",
        pin6: "QSPI_CS",
        pin7: "QSPI_CLK",
        pin8: "QSPI_IO0",
        pin9: "QSPI_IO1",
        pin10: "QSPI_IO2",
        pin11: "QSPI_IO3",
        pin12: "I2S_MCLK_L",
        pin13: "I2S_BCLK_L",
        pin14: "I2S_LRCLK_L",
        pin15: "I2S_DATA_L",
        pin16: "I2S_MCLK_R",
        pin17: "I2S_BCLK_R",
        pin18: "I2S_LRCLK_R",
        pin19: "I2S_DATA_R",
        pin20: "I2C_SDA",
        pin21: "I2C_SCL",
        pin22: "SPDIF_TX",
        pin23: "MCLK_44K_IN",
        pin24: "MCLK_48K_IN",
        pin25: "ENC_A",
        pin26: "ENC_B",
        pin27: "ENC_SW",
        pin28: "BTN_NEXT",
        pin29: "BTN_PREV",
        pin30: "BTN_PLAY",
        pin31: "UHG_SW",
        pin32: "PD_PG",
      }}
    />

    <chip
      name="U_FLASH"
      pcbX="30mm"
      pcbY="52mm"
      footprint="soic8"
      pinLabels={{ pin1: "CS", pin2: "DO", pin3: "WP", pin4: "GND", pin5: "DI", pin6: "CLK", pin7: "HOLD", pin8: "VCC" }}
    />

    <chip
      name="OSC_44K"
      pcbX="39mm"
      pcbY="52mm"
      footprint="soic4"
      pinLabels={{ pin1: "EN", pin2: "GND", pin3: "OUT", pin4: "VDD" }}
    />

    <chip
      name="OSC_48K"
      pcbX="48mm"
      pcbY="52mm"
      footprint="soic4"
      pinLabels={{ pin1: "EN", pin2: "GND", pin3: "OUT", pin4: "VDD" }}
    />

    {/* DAC section */}
    <chip
      name="DAC_L"
      pcbX="69mm"
      pcbY="31mm"
      footprint="qfn32_w5_h5_p0.5mm_pw0.25mm_pl0.6mm"
      pinLabels={{
        pin1: "DVDD",
        pin2: "DGND",
        pin3: "DATA_CLK",
        pin4: "DATA_L",
        pin5: "DATA_R",
        pin6: "SPDIF_IN",
        pin7: "GPIO1",
        pin8: "GPIO2",
        pin9: "GPIO3",
        pin10: "GPIO4",
        pin11: "AVCC_DAC",
        pin12: "AGND",
        pin13: "OUTP",
        pin14: "OUTN",
        pin15: "HW1",
        pin16: "HW0",
        pin17: "VCCA",
        pin18: "AGND2",
        pin19: "MUTE",
        pin20: "RESET",
        pin21: "CLKIN",
        pin22: "SCL",
        pin23: "SDA",
        pin24: "ADDR",
      }}
    />

    <chip
      name="DAC_R"
      pcbX="87mm"
      pcbY="31mm"
      footprint="qfn32_w5_h5_p0.5mm_pw0.25mm_pl0.6mm"
      pinLabels={{
        pin1: "DVDD",
        pin2: "DGND",
        pin3: "DATA_CLK",
        pin4: "DATA_L",
        pin5: "DATA_R",
        pin6: "SPDIF_IN",
        pin7: "GPIO1",
        pin8: "GPIO2",
        pin9: "GPIO3",
        pin10: "GPIO4",
        pin11: "AVCC_DAC",
        pin12: "AGND",
        pin13: "OUTP",
        pin14: "OUTN",
        pin15: "HW1",
        pin16: "HW0",
        pin17: "VCCA",
        pin18: "AGND2",
        pin19: "MUTE",
        pin20: "RESET",
        pin21: "CLKIN",
        pin22: "SCL",
        pin23: "SDA",
        pin24: "ADDR",
      }}
    />

    <chip
      name="AMP_L"
      pcbX="69mm"
      pcbY="15mm"
      footprint="soic8"
      pinLabels={{ pin1: "OUTA", pin2: "INA-", pin3: "INA+", pin4: "VSS", pin5: "INB+", pin6: "INB-", pin7: "OUTB", pin8: "VDD" }}
    />

    <chip
      name="AMP_R"
      pcbX="87mm"
      pcbY="15mm"
      footprint="soic8"
      pinLabels={{ pin1: "OUTA", pin2: "INA-", pin3: "INA+", pin4: "VSS", pin5: "INB+", pin6: "INB-", pin7: "OUTB", pin8: "VDD" }}
    />

    {/* Output / audio jacks */}
    <chip
      name="JACK_SE"
      pcbX="104mm"
      pcbY="24mm"
      footprint="pinrow5"
      pinLabels={{ pin1: "TIP", pin2: "RING1", pin3: "RING2", pin4: "SLEEVE", pin5: "DET" }}
    />

    <chip
      name="JACK_BAL"
      pcbX="104mm"
      pcbY="39mm"
      footprint="pinrow5"
      pinLabels={{ pin1: "L+", pin2: "L-", pin3: "R+", pin4: "R-", pin5: "GND" }}
    />

    <chip
      name="MIC_SW"
      pcbX="95mm"
      pcbY="10mm"
      footprint="qfn16_w3_h3_p0.5mm_pw0.25mm_pl0.6mm"
      pinLabels={{
        pin1: "MIC_IN",
        pin2: "AGND",
        pin3: "SLEEVE",
        pin4: "RING2",
        pin5: "VDD",
        pin6: "GND",
        pin7: "SCL",
        pin8: "SDA",
        pin9: "INT",
        pin10: "DET",
        pin11: "KEY",
        pin12: "SENSE",
        pin13: "BIAS",
        pin14: "HP_L",
        pin15: "HP_R",
        pin16: "HP_GND",
      }}
    />

    {/* Power rails */}
    <chip
      name="LDO_1V8"
      pcbX="18mm"
      pcbY="44mm"
      footprint="SOT-23-5"
      pinLabels={{ pin1: "IN", pin2: "GND", pin3: "EN", pin4: "NC", pin5: "OUT" }}
    />

    <chip
      name="LDO_3V3"
      pcbX="27mm"
      pcbY="44mm"
      footprint="SOT-23-5"
      pinLabels={{ pin1: "IN", pin2: "GND", pin3: "EN", pin4: "NC", pin5: "OUT" }}
    />

    <chip
      name="LDO_PERIPH"
      pcbX="36mm"
      pcbY="44mm"
      footprint="SOT-23-5"
      pinLabels={{ pin1: "IN", pin2: "GND", pin3: "EN", pin4: "NC", pin5: "OUT" }}
    />

    {/* Passive support parts */}
    <resistor name="R_CC1" resistance="5.1k" pcbX="16mm" pcbY="23mm" footprint="0402" />
    <resistor name="R_CC2" resistance="5.1k" pcbX="16mm" pcbY="20mm" footprint="0402" />
    <resistor name="R_CFG1" resistance="6.8k" pcbX="24mm" pcbY="9mm" footprint="0402" />
    <resistor name="R_VBUS_SENSE" resistance="10k" pcbX="18mm" pcbY="11mm" footprint="0402" />
    <resistor name="R_I2C_SDA" resistance="4.7k" pcbX="44mm" pcbY="19mm" footprint="0402" />
    <resistor name="R_I2C_SCL" resistance="4.7k" pcbX="46mm" pcbY="18mm" footprint="0402" />
    <resistor name="R_SPDIF" resistance="75" pcbX="90mm" pcbY="12mm" footprint="0402" />
    <resistor name="R_BTN_NEXT" resistance="10k" pcbX="57mm" pcbY="64mm" footprint="0402" />
    <resistor name="R_BTN_PREV" resistance="10k" pcbX="61mm" pcbY="64mm" footprint="0402" />
    <resistor name="R_BTN_PLAY" resistance="10k" pcbX="65mm" pcbY="64mm" footprint="0402" />

    <capacitor name="C_LDO_1V8_IN" capacitance="1uF" pcbX="18mm" pcbY="58mm" footprint="0402" />
    <capacitor name="C_LDO_1V8_OUT" capacitance="1uF" pcbX="18mm" pcbY="62mm" footprint="0402" />
    <capacitor name="C_LDO_3V3_IN" capacitance="1uF" pcbX="28mm" pcbY="58mm" footprint="0402" />
    <capacitor name="C_LDO_3V3_OUT" capacitance="1uF" pcbX="28mm" pcbY="62mm" footprint="0402" />
    <capacitor name="C_LDO_PERIPH_IN" capacitance="1uF" pcbX="38mm" pcbY="58mm" footprint="0402" />
    <capacitor name="C_LDO_PERIPH_OUT" capacitance="1uF" pcbX="38mm" pcbY="62mm" footprint="0402" />
    <capacitor name="C_FLASH" capacitance="100nF" pcbX="26mm" pcbY="54mm" footprint="0402" />
    <capacitor name="C_OSC_44K" capacitance="100nF" pcbX="46mm" pcbY="54mm" footprint="0402" />
    <capacitor name="C_OSC_48K" capacitance="100nF" pcbX="56mm" pcbY="54mm" footprint="0402" />

    {/* Nets: power and signal */}
    <trace from=".USB_C1 .VBUS1" to="net.VBUS_5V" />
    <trace from=".USB_C1 .VBUS2" to="net.VBUS_5V" />
    <trace from=".USB_C1 .GND1" to="net.GND" />
    <trace from=".USB_C1 .GND2" to="net.GND" />
    <trace from=".USB_C1 .CC1" to=".R_CC1 .pin1" />
    <trace from=".R_CC1 .pin2" to="net.GND" />
    <trace from=".USB_C1 .CC2" to=".R_CC2 .pin1" />
    <trace from=".R_CC2 .pin2" to="net.GND" />
    <trace from=".USB_C1 .DP" to=".U_XMOS .USB_DP" />
    <trace from=".USB_C1 .DN" to=".U_XMOS .USB_DN" />

    <trace from=".USB_C2 .VBUS1" to=".R_VBUS_SENSE .pin1" />
    <trace from=".R_VBUS_SENSE .pin2" to=".U_PD .VBUS" />
    <trace from=".USB_C2 .CC1" to=".U_PD .CC1" />
    <trace from=".USB_C2 .CC2" to=".U_PD .CC2" />
    <trace from=".U_PD .CFG1" to=".R_CFG1 .pin1" />
    <trace from=".R_CFG1 .pin2" to="net.GND" />
    <trace from=".U_PD .PG" to=".U_XMOS .PD_PG" />

    <trace from=".LDO_1V8 .IN" to="net.VBUS_5V" />
    <trace from=".LDO_1V8 .OUT" to="net.VDD_1V8" />
    <trace from=".LDO_1V8 .GND" to="net.GND" />
    <trace from=".C_LDO_1V8_IN .pin1" to=".LDO_1V8 .IN" />
    <trace from=".C_LDO_1V8_IN .pin2" to="net.GND" />
    <trace from=".C_LDO_1V8_OUT .pin1" to=".LDO_1V8 .OUT" />
    <trace from=".C_LDO_1V8_OUT .pin2" to="net.GND" />

    <trace from=".LDO_3V3 .IN" to="net.VBUS_5V" />
    <trace from=".LDO_3V3 .OUT" to="net.VDD_3V3" />
    <trace from=".LDO_3V3 .GND" to="net.GND" />
    <trace from=".C_LDO_3V3_IN .pin1" to=".LDO_3V3 .IN" />
    <trace from=".C_LDO_3V3_IN .pin2" to="net.GND" />
    <trace from=".C_LDO_3V3_OUT .pin1" to=".LDO_3V3 .OUT" />
    <trace from=".C_LDO_3V3_OUT .pin2" to="net.GND" />

    <trace from=".LDO_PERIPH .IN" to="net.VBUS_5V" />
    <trace from=".LDO_PERIPH .OUT" to="net.VDD_PERIPH" />
    <trace from=".LDO_PERIPH .GND" to="net.GND" />
    <trace from=".C_LDO_PERIPH_IN .pin1" to=".LDO_PERIPH .IN" />
    <trace from=".C_LDO_PERIPH_IN .pin2" to="net.GND" />
    <trace from=".C_LDO_PERIPH_OUT .pin1" to=".LDO_PERIPH .OUT" />
    <trace from=".C_LDO_PERIPH_OUT .pin2" to="net.GND" />

    <trace from=".U_XMOS .VDD_CORE" to="net.VDD_1V8" />
    <trace from=".U_XMOS .VDDIO" to="net.VDD_3V3" />
    <trace from=".U_XMOS .GND" to="net.GND" />

    <trace from=".U_XMOS .QSPI_CS" to=".U_FLASH .CS" />
    <trace from=".U_XMOS .QSPI_CLK" to=".U_FLASH .CLK" />
    <trace from=".U_XMOS .QSPI_IO0" to=".U_FLASH .DI" />
    <trace from=".U_XMOS .QSPI_IO1" to=".U_FLASH .DO" />
    <trace from=".U_XMOS .QSPI_IO2" to=".U_FLASH .WP" />
    <trace from=".U_XMOS .QSPI_IO3" to=".U_FLASH .HOLD" />
    <trace from=".U_FLASH .VCC" to="net.VDD_3V3" />
    <trace from=".U_FLASH .GND" to="net.GND" />
    <trace from=".C_FLASH .pin1" to="net.VDD_3V3" />
    <trace from=".C_FLASH .pin2" to="net.GND" />

    <trace from=".OSC_44K .VDD" to="net.VDD_3V3" />
    <trace from=".OSC_44K .GND" to="net.GND" />
    <trace from=".OSC_44K .OUT" to=".U_XMOS .MCLK_44K_IN" />
    <trace from=".C_OSC_44K .pin1" to="net.VDD_3V3" />
    <trace from=".C_OSC_44K .pin2" to="net.GND" />

    <trace from=".OSC_48K .VDD" to="net.VDD_3V3" />
    <trace from=".OSC_48K .GND" to="net.GND" />
    <trace from=".OSC_48K .OUT" to=".U_XMOS .MCLK_48K_IN" />
    <trace from=".C_OSC_48K .pin1" to="net.VDD_3V3" />
    <trace from=".C_OSC_48K .pin2" to="net.GND" />

    <trace from=".U_XMOS .I2S_BCLK_L" to=".DAC_L .DATA_CLK" />
    <trace from=".U_XMOS .I2S_DATA_L" to=".DAC_L .DATA_L" />
    <trace from=".U_XMOS .I2S_MCLK_L" to=".DAC_L .CLKIN" />

    <trace from=".U_XMOS .I2S_BCLK_R" to=".DAC_R .DATA_CLK" />
    <trace from=".U_XMOS .I2S_DATA_R" to=".DAC_R .DATA_R" />
    <trace from=".U_XMOS .I2S_MCLK_R" to=".DAC_R .CLKIN" />

    <trace from=".DAC_L .SCL" to="net.I2C_SCL" />
    <trace from=".DAC_L .SDA" to="net.I2C_SDA" />
    <trace from=".DAC_R .SCL" to="net.I2C_SCL" />
    <trace from=".DAC_R .SDA" to="net.I2C_SDA" />
    <trace from=".R_I2C_SDA .pin1" to="net.I2C_SDA" />
    <trace from=".R_I2C_SDA .pin2" to="net.VDD_3V3" />
    <trace from=".R_I2C_SCL .pin1" to="net.I2C_SCL" />
    <trace from=".R_I2C_SCL .pin2" to="net.VDD_3V3" />

    <trace from=".U_XMOS .ENC_A" to=".KNOB .A" />
    <trace from=".U_XMOS .ENC_B" to=".KNOB .B" />
    <trace from=".U_XMOS .ENC_SW" to=".KNOB .SW" />
    <trace from=".KNOB .COM" to="net.GND" />

    <trace from=".U_XMOS .BTN_NEXT" to=".R_BTN_NEXT .pin1" />
    <trace from=".R_BTN_NEXT .pin2" to="net.VDD_PERIPH" />
    <trace from=".R_BTN_NEXT .pin1" to=".BTN_NEXT .pin1" />
    <trace from=".BTN_NEXT .pin2" to="net.GND" />

    <trace from=".U_XMOS .BTN_PREV" to=".R_BTN_PREV .pin1" />
    <trace from=".R_BTN_PREV .pin2" to="net.VDD_PERIPH" />
    <trace from=".R_BTN_PREV .pin1" to=".BTN_PREV .pin1" />
    <trace from=".BTN_PREV .pin2" to="net.GND" />

    <trace from=".U_XMOS .BTN_PLAY" to=".R_BTN_PLAY .pin1" />
    <trace from=".R_BTN_PLAY .pin2" to="net.VDD_PERIPH" />
    <trace from=".R_BTN_PLAY .pin1" to=".BTN_PLAY .pin1" />
    <trace from=".BTN_PLAY .pin2" to="net.GND" />

    <trace from=".OLED .VCC" to="net.VDD_PERIPH" />
    <trace from=".OLED .GND" to="net.GND" />
    <trace from=".OLED .SCL" to="net.I2C_SCL" />
    <trace from=".OLED .SDA" to="net.I2C_SDA" />

    <trace from=".U_XMOS .SPDIF_TX" to=".R_SPDIF .pin1" />
    <trace from=".R_SPDIF .pin2" to=".JACK_SE .RING2" />

    <trace from=".DAC_L .OUTP" to=".AMP_L .INA+" />
    <trace from=".DAC_L .OUTN" to=".AMP_L .INB+" />
    <trace from=".DAC_R .OUTP" to=".AMP_R .INA+" />
    <trace from=".DAC_R .OUTN" to=".AMP_R .INB+" />

    <trace from=".AMP_L .OUTA" to=".JACK_BAL .L+" />
    <trace from=".AMP_L .OUTB" to=".JACK_BAL .L-" />
    <trace from=".AMP_R .OUTA" to=".JACK_BAL .R+" />
    <trace from=".AMP_R .OUTB" to=".JACK_BAL .R-" />
    <trace from=".JACK_BAL .GND" to="net.GND" />

    <trace from=".AMP_L .OUTA" to=".JACK_SE .TIP" />
    <trace from=".AMP_R .OUTA" to=".JACK_SE .RING1" />
    <trace from=".JACK_SE .SLEEVE" to="net.GND" />

    <trace from=".MIC_SW .VDD" to="net.VDD_3V3" />
    <trace from=".MIC_SW .GND" to="net.GND" />
    <trace from=".MIC_SW .SCL" to="net.I2C_SCL" />
    <trace from=".MIC_SW .SDA" to="net.I2C_SDA" />
    <trace from=".MIC_SW .SLEEVE" to=".JACK_SE .SLEEVE" />
    <trace from=".MIC_SW .RING2" to=".JACK_SE .RING2" />

    <trace from=".U_XMOS .UHG_SW" to="net.VDD_PERIPH" />
    <trace from=".U_XMOS .PD_PG" to="net.VDD_PERIPH" />
  </board>
)
