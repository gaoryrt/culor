import { RGB, color, RGBA, HSL, HSLA } from '../dist/culor.min.js'

const rgb = RGB('255', 85, 85).toHex()
const rgba = RGBA(255, '85', 85, .7).toHex()
const hsl = HSL(360, '100%', .67).toHex()
const hsla = HSLA('360deg', 1, '67%', .7).toHex()
const color_name = color('red').toHex()
const color_hex = color('#ff5555').toHex()
const color_hex_short = color('#f55').toHex()
const color_rgb = color('rgb(255, 85, 85)').toHex()
const color_rgba = color('rgba(255, 85, 85, .7)').toHex()
const color_hsl = color('hsl(360deg, 100%, 67%)').toHex()
const color_hsla = color('hsla(400grad, 100%, 67%, .7)').toHex()

console.log(
  rgb,
  rgba,
  hsl,
  hsla,
  color_name,
  color_hex,
  color_hex_short,
  color_rgb,
  color_rgba,
  color_hsl,
  color_hsla
)