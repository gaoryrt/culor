# Culor
> Just another color converter.

[![NPM Version][npm-image]][https://www.npmjs.com/package/culor]

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

## Meta

Your Name – [@YourTwitter](https://twitter.com/dbader_org) – YourEmail@example.com

Distributed under the XYZ license. See ``LICENSE`` for more information.

[https://github.com/yourname/github-link](https://github.com/dbader/)

## Contributing

1. Fork it (<https://github.com/yourname/yourproject/fork>)
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request

<!-- Markdown link & img dfn's -->
[npm-image]: https://img.shields.io/npm/v/datadog-metrics.svg?style=flat-square
[npm-url]: https://npmjs.org/package/datadog-metrics
[npm-downloads]: https://img.shields.io/npm/dm/datadog-metrics.svg?style=flat-square
[travis-image]: https://img.shields.io/travis/dbader/node-datadog-metrics/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/dbader/node-datadog-metrics
[wiki]: https://github.com/yourname/yourproject/wiki