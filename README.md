# Culor
> Just another color converter.

[![https://nodei.co/npm/culor.png?downloads=true&downloadRank=true&stars=true](https://nodei.co/npm/culor.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/culor)

## Installation

npm:

```sh
npm install culor
```

yarn:

```sh
yarn add culor
```

## Usage example

```js
import {color} from 'culor'

const color_name = color('red')
const color_hex = color('#ff5555')
const color_hex_short = color('#f55')
const color_rgb = color('rgb(255, 85, 85)')
const color_rgba = color('rgba(255, 85, 85, .7)')
const color_hsl = color('hsl(360deg, 100%, 67%)')
const color_hsla = color('hsla(400grad, 100%, 67%, .7)')
```

```js
import {RGB, RGBA, HSL, HSLA} from 'culor'

const rgb = RGB('255', 85, 85)
const rgba = RGBA(255, '85', 85, .7)
const hsl = HSL(360, '100%', .67)
const hsla = HSLA('360deg', 1, '67%', .7)
```

## Syntax

`color(csscolor)`
`RGB(R, G, B)`
`RGBA(R, G, B, A)`
`HSL(H, S, L)`
`HSLA(H, S, L, A)`

### Parameters

|    Key   |  Type  | Value |
|:--------:|:------:|:-----:|
| `csscolor` | `String` | Color keywords, rgb() and rgba(), hsl() and hsla(), Hexadecimal notation in [css <color> data type](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value). |
| `R`        | `Number` or `String` | red, between 0 and 255 |
| `G`        | `Number` or `String` | green, between 0 and 255 |
| `B`        | `Number` or `String` | blue, between 0 and 255 |
| `H`        | `String` | hue [angel](https://developer.mozilla.org/en-US/docs/Web/CSS/angle) |
| `S`        | `Number` or `String` | saturation can be a number between 0 and 1, or a string, where the number 1 corresponds to 100% |
| `L`        | `Number` or `String` | lightness can be a number between 0 and 1, or a string, where the number 1 corresponds to 100% |
| `A`        | `Number` or `String` | alpha can be a number between 0 and 1, or a string, where the number 1 corresponds to 100% |

## To-Do

[ ] support rgb() / rgba() percentage unit.

## Contributing

1. Fork it (<https://github.com/gaoryrt/culor/fork>)
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request