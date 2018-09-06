import { isStr, isNum, parse, agl2trn, HSLA2RGB, num2str, per2bin } from './utils'

const hex = parse({sys: 16, max: 255})
const dec = parse({sys: 10, max: 255})
const bin = parse({sys: 10, max: 1, fn: parseFloat})
const any = s => isStr(s) ? per2bin(s) : bin(s)

function rgb(r, g, b) {
  return [dec(r), dec(g), dec(b), 1]
}

function rgba(r, g, b, a) {
  return [dec(r), dec(g), dec(b), bin(a)]
}

function hsl(h, s, l) {
  return HSLA2RGB(agl2trn(h), any(s), any(l), 1)
}

function hsla(h, s, l, a) {
  return HSLA2RGB(agl2trn(h), any(s), any(l), bin(a))
}

const str2RGBAArr = str => {
  const _mArr = [
    {
      reg: /^#([0-9a-f]{1})([0-9a-f]{1})([0-9a-f]{1})$/,
      fn: mt => {
        const A = mt[1]
        const B = mt[2]
        const C = mt[3]
        return [hex(A + A), hex(B + B), hex(C + C), 1]
      }
    },
    {
      reg: /^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/,
      fn: mt => [hex(mt[1]), hex(mt[2]), hex(mt[3]), 1]
    },
    {
      reg: /^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/,
      fn: ([_, ...args]) => rgb(...args)
    },
    {
      reg: /^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/,
      fn: mt => [hex(mt[1]), hex(mt[2]), hex(mt[3]), hex(mt[4])]
    },
    {
      reg: /^rgba\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3}),\s*(\d+(?:\.\d+)?|\.\d+)\)$/,
      fn: ([_, ...args]) => rgba(...args)
    },
    {
      reg: /^hsl\((.+?),\s*(.+?),\s*(.+?)\)$/,
      fn: m => HSLA2RGB(agl2trn(m[1]), per2bin(m[2]), per2bin(m[3]), 1)
    },
    {
      reg: /^hsla\((.+?),\s*(.+?),\s*(.+?),\s*(\d+(?:\.\d+)?|\.\d+)\)$/,
      fn: m => HSLA2RGB(agl2trn(m[1]), per2bin(m[2]), per2bin(m[3]), bin(m[4]))
    }
  ]
  for (let o of _mArr) {
    let m = o.reg.exec(str)
    if (m) return o.fn(m)
  }
  throw new Error('invalid input: ' + str)
}

function color(str) {
  const invalid = () => {throw new Error('invalid input: ' + str)}
  if (isStr(str)) return str2RGBAArr(str.toLowerCase())
  else if (isNum(str)) {
    if (str > 0xffffff || str < 0) invalid()
    return str2RGBAArr(num2str(str))
  } else invalid()
}

// export default color
// console.log(color('rgb(255, 22, 22)'))
// console.log(color(0xffffff))
// console.log(color('rgb(1, 1, 255)'))
// color('rgba(22, 22, 22, .8)')
// color('hsl(11, 89%, 89%)')
// console.log(color('hsla(11, 89%, 89%, .8)'))
console.log(hsl(11, .89, '89%'))