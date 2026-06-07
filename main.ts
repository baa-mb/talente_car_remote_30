function hole_neigung () {
    gerade = Math.min(Math.max(input.rotation(Rotation.Pitch), -45), 45)
    gerade = Math.round(gerade / k_empfind) * k_empfind
    kurve = Math.min(Math.max(input.rotation(Rotation.Roll), -45), 45)
    kurve = Math.round(kurve / k_empfind) * k_empfind
    kurve = Math.round(kurve / empfind * 2) * empfind * 2
}
input.onButtonPressed(Button.B, function () {
    if (oben) {
        radio.sendValue("kupplung", 1)
    } else {
        radio.sendValue("kupplung", 0)
    }
    oben = !(oben)
})
let oben = false
let kurve = 0
let gerade = 0
let empfind = 0
let k_empfind = 0
let alt_gerade = -99
let alt_kurve = -99
let sende_flag = 0
radio.setGroup(26)
basic.showString("26")
let g_empfind = 5
k_empfind = 5
basic.showLeds(`
    . . . . .
    . . . . .
    . . # . .
    . . . . .
    . . . . .
    `)
empfind = 4
basic.forever(function () {
    hole_neigung()
    // basic.pause(100)
    if (input.buttonIsPressed(Button.A)) {
        if (gerade != alt_gerade || kurve != alt_kurve) {
            radio.sendValue("gerade", gerade)
            radio.sendValue("kurve", kurve / 3)
            sende_flag = 1
        }
    } else {
        if (sende_flag == 1) {
            radio.sendValue("gerade", 0)
            radio.sendValue("kurve", 0)
            sende_flag = 0
        }
    }
    alt_gerade = gerade
    alt_kurve = kurve
    music.play(music.tonePlayable(262, music.beat(BeatFraction.Whole)), music.PlaybackMode.UntilDone)
})
