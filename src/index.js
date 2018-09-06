import { isStr, isNum, h2n, d2n, agl2trn, HSLA2RGB, num2str, per2dec } from './utils'

const str2RGBAArr = str => {
  const _mArr = [
    {
      reg: /^#([0-9a-f]{1})([0-9a-f]{1})([0-9a-f]{1})$/,
      fn: mt => {
        const A = mt[1]
        const B = mt[2]
        const C = mt[3]
        return [h2n(A + A), h2n(B + B), h2n(C + C), 1]
      }
    },
    {
      reg: /^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/,
      fn: mt => [h2n(mt[1]), h2n(mt[2]), h2n(mt[3]), 1]
    },
    {
      reg: /^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/,
      fn: mt => [d2n(mt[1]), d2n(mt[2]), d2n(mt[3]), 1]
    },
    {
      reg: /^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/,
      fn: mt => [h2n(mt[1]), h2n(mt[2]), h2n(mt[3]), h2n(mt[4])]
    },
    {
      reg: /^rgba\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3}),\s*(\d+(?:\.\d+)?|\.\d+)\)$/,
      fn: mt => [d2n(mt[1]), d2n(mt[2]), d2n(mt[3]), parseFloat(mt[4])]
    },
    {
      reg: /^hsl\((.+?),\s*(.+?),\s*(.+?)\)$/,
      fn: mt => HSLA2RGB(agl2trn(mt[1]), per2dec(mt[2]) || d2n(mt[2]), per2dec(mt[3]) || d2n(mt[3]), 1)
    },
    {
      reg: /^hsla\((.+?),\s*(.+?),\s*(.+?),\s*(\d+(?:\.\d+)?|\.\d+)\)$/,
      fn: mt => HSLA2RGB(agl2trn(mt[1]), per2dec(mt[2]) || d2n(mt[2]), per2dec(mt[3]) || d2n(mt[3]), parseFloat(mt[4]))
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
console.log(color('rgba(255, 22, 22, .8)'))
// console.log(color(0xffffff))
// console.log(color('rgb(1, 1, 255)'))
// color('rgba(22, 22, 22, .8)')
// color('hsl(11, 89%, 89%)')
// color('hsla(11, 89%, 89%, .8)')
