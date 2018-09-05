import { isStr, isNum, h2n, d2n, agl2trn, str2num, HSLA2RGB } from './utils'

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
      reg: /^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/,
      fn: mt => [h2n(mt[1]), h2n(mt[2]), h2n(mt[3]), h2n(mt[4])]
    },
    {
      reg: /^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/,
      fn: mt => [d2n(mt[1]), d2n(mt[2]), d2n(mt[3]), 1]
    },
    {
      reg: /^rgba\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3}),\s*(\d+(?:\.\d+)?|\.\d+)\)$/,
      fn: mt => [d2n(mt[1]), d2n(mt[2]), d2n(mt[3]), parseFloat(mt[4])]
    },
    {
      reg: /^hsl\((.+?),\s*(.+?),\s*(.+?)\)$/,
      fn: mt => HSLA2RGB(agl2trn(mt[1]) % 1, str2num(mt[2]), str2num(mt[3]), 1)
    },
    {
      reg: /^hsla\((.+?),\s*(.+?),\s*(.+?),\s*(\d+(?:\.\d+)?|\.\d+)\)$/,
      fn: mt => HSLA2RGB(agl2trn(mt[1]) % 1, str2num(mt[2]), str2num(mt[3]), parseFloat(mt[4]))
    }
  ]
  for (let o of _mArr) {
    let m = o.reg.exec(str)
    if (m) return o.fn(m)
  }
}

function rtn(...args) {
  const invalid = () => {
    throw new Error('invalid input: ' + args)
  }
  const argLen = args.length
  let RGBA = []
  if (argLen < 1) throw new Error('no input detected')
  if (argLen === 1) {
    const arg0 = args[0].toLowerCase()
    if (isStr(arg0)) {
      RGBA = str2RGBAArr(arg0)
    } else if (isNum(arg0)) {
      if (arg0 > 0xffffff || arg0 < 0) invalid()
    } else invalid()
    console.log('RGBAArr', RGBA)
  }
  if (argLen === 2) invalid()
}

// export default rtn
rtn('#fff')
rtn('#ffffff')
rtn('rgb(1, 1, 1)')
rtn('rgba(22, 22, 22, .8)')
rtn('hsl(11, 89%, 89%)')
rtn('hsla(11, 89%, 89%, .8)')

console.log((0x0ff).toString(16))