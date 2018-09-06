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
      fn: mt => HSLA2RGB(agl2trn(mt[1]) % 1, per2dec(mt[2]) || d2n(mt[2]), per2dec(mt[3]) || d2n(mt[3]), 1)
    },
    {
      reg: /^hsla\((.+?),\s*(.+?),\s*(.+?),\s*(\d+(?:\.\d+)?|\.\d+)\)$/,
      fn: mt => HSLA2RGB(agl2trn(mt[1]) % 1, per2dec(mt[2]) || d2n(mt[2]), per2dec(mt[3]) || d2n(mt[3]), parseFloat(mt[4]))
    }
  ]
  for (let o of _mArr) {
    let m = o.reg.exec(str)
    if (m) return o.fn(m)
  }
}

function roloc(...args) {
  const invalid = () => {
    throw new Error('invalid input: ' + args)
  }
  const argLen = args.length
  let RGBA = []
  if (argLen < 1) throw new Error('no input detected')
  if (argLen === 1) {
    const arg0 = args[0]
    if (isStr(arg0)) {
      RGBA = str2RGBAArr(arg0.toLowerCase())
    } else if (isNum(arg0)) {
      if (arg0 > 0xffffff || arg0 < 0) invalid()
      RGBA = str2RGBAArr(num2str(arg0))
    } else invalid()
    console.log('RGBAArr', RGBA)
  }
  if (argLen >= 2) invalid()
  return RGBA
}

// export default roloc
roloc('#ffffff')
roloc('rgb(1, 1, 1)')
roloc('rgba(22, 22, 22, .8)')
roloc('hsl(11, 89%, 89%)')
roloc('hsla(11, 89%, 89%, .8)')
console.log(roloc(0xffffff))