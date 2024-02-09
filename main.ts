input.onButtonPressed(Button.A, function () {
    if (x == 0) {
        x += 1
        basic.showArrow(ArrowNames.North)
    } else if (x == 1) {
        x += 1
        basic.showIcon(IconNames.Confused)
    } else {
        x = 0
        basic.showArrow(ArrowNames.South)
    }
})
input.onButtonPressed(Button.B, function () {
    if (y == 0) {
        y += 1
        basic.showIcon(IconNames.Diamond)
        ταχύτητα = 250
    } else {
        y = 0
        basic.showIcon(IconNames.SmallDiamond)
        ταχύτητα = 100
    }
})
let ταχύτητα = 0
let y = 0
let x = 0
x = 1
y = 2
let on = 0
sensors.DDMmotor(
AnalogPin.P15,
1,
AnalogPin.P16,
0
)
pins.digitalWritePin(DigitalPin.P8, 1)
pins.setPull(DigitalPin.P14, PinPullMode.PullUp)
basic.forever(function () {
    if (pins.digitalReadPin(DigitalPin.P14) == 0) {
        if (on == 0) {
            music.playTone(784, music.beat(BeatFraction.Sixteenth))
            music.playTone(440, music.beat(BeatFraction.Sixteenth))
            music.playTone(698, music.beat(BeatFraction.Sixteenth))
            music.playTone(587, music.beat(BeatFraction.Sixteenth))
            on = 1
        } else {
            on = 0
            pins.digitalWritePin(DigitalPin.P8, 1)
            pins.digitalWritePin(DigitalPin.P2, 0)
            sensors.DDMmotor(
            AnalogPin.P15,
            1,
            AnalogPin.P16,
            0
            )
            music.playTone(247, music.beat(BeatFraction.Eighth))
            music.playTone(196, music.beat(BeatFraction.Eighth))
            music.playTone(220, music.beat(BeatFraction.Eighth))
            music.playTone(175, music.beat(BeatFraction.Eighth))
        }
        basic.pause(300)
    }
})
basic.forever(function () {
    if (on == 1) {
        if (y == 0) {
            if (ταχύτητα >= 230) {
                ταχύτητα = 230
            } else {
                ταχύτητα += 5
            }
            pins.digitalWritePin(DigitalPin.P2, 1)
            basic.pause(600)
            pins.digitalWritePin(DigitalPin.P2, 0)
            basic.pause(600)
            for (let index = 0; index < 2; index++) {
                pins.digitalWritePin(DigitalPin.P2, 1)
                basic.pause(200)
                pins.digitalWritePin(DigitalPin.P2, 0)
                basic.pause(200)
            }
        } else {
            ταχύτητα = 255
            pins.digitalWritePin(DigitalPin.P2, 1)
        }
    }
})
basic.forever(function () {
    if (x == 1 && on == 1) {
        sensors.DDMmotor(
        AnalogPin.P15,
        1,
        AnalogPin.P16,
        ταχύτητα
        )
        pins.digitalWritePin(DigitalPin.P8, 0)
    } else if (x == 0 && on == 1) {
        sensors.DDMmotor(
        AnalogPin.P15,
        0,
        AnalogPin.P16,
        ταχύτητα
        )
        pins.digitalWritePin(DigitalPin.P8, 1)
        basic.pause((300 - ταχύτητα) * 2)
        pins.digitalWritePin(DigitalPin.P8, 0)
        basic.pause((300 - ταχύτητα) * 2)
    } else if (x == 2 && on == 1) {
        pins.digitalWritePin(DigitalPin.P8, 0)
        sensors.DDMmotor(
        AnalogPin.P15,
        1,
        AnalogPin.P16,
        ταχύτητα
        )
        basic.pause((300 - ταχύτητα) * 6)
        pins.digitalWritePin(DigitalPin.P8, 1)
        sensors.DDMmotor(
        AnalogPin.P15,
        0,
        AnalogPin.P16,
        ταχύτητα
        )
        basic.pause((300 - ταχύτητα) * 6)
    }
})
