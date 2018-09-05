const isStr = a => Object.prototype.toString.call(a) === '[object String]'
const isNum = a => !isNaN(parseFloat(a)) && isFinite(a)

const _h2n = hex => parseInt(hex, 16)
const _d2n = dec => parseInt(dec, 10)
const agl2trn = str => {
  const mt = /^(\d+(?:\.\d+)?|\.\d+)(.*?)$/.exec(str)
  const deObj = {
    'deg': 360,
    'rad': 2 * Math.PI,
    'grad': 400,
    'turn': 1
  }
  if (!mt) throw new Error(str + ' is not an angle')
  if (!mt[2]) return parseFloat(mt[1]) / 360
  return parseFloat(mt[1]) / deObj[mt[2].toLowerCase()]
}

const str2num = str => {
  const mt = /^(\d+(?:\.\d+)?|\.\d+)(.*?)$/.exec(str)
  const deObj = {
    '': 1,
    '%': 100
  }
  if (!mt) return NaN
  return parseFloat(mt[1]) / deObj[mt[2]]
}

const _HSLA2RGB = (H, S, L, A) => {
  // http://www.easyrgb.com/en/math.php
  const __Hue2RGB = (v1, v2, vH) => {
    if (vH < 0) vH += 1
    if (vH > 1) vH -= 1
    if (6 * vH < 1) return v1 + (v2 - v1) * 6 * vH
    if (2 * vH < 1) return v2
    if (3 * vH < 2) return v1 + (v2 - v1) * (2 / 3 - vH) * 6
    return v1
  }
  let R, G, B, t1
  if (S == 0) {
    R = L * 255
    G = L * 255
    B = L * 255
  } else {
    if (L < 0.5) t1 = L * (1 + S)
    else t1 = L + S - S * L
    const t0 = 2 * L - t1
    R = 255 * __Hue2RGB(t0, t1, H + 1 / 3)
    G = 255 * __Hue2RGB(t0, t1, H)
    B = 255 * __Hue2RGB(t0, t1, H - 1 / 3)
  }
  return [R, G, B, A]
}

const str2RGBAArr = str => {
  const _mArr = [
    {
      reg: /^#([0-9a-f]{1})([0-9a-f]{1})([0-9a-f]{1})$/,
      fn: mt => {
        const A = mt[1]
        const B = mt[2]
        const C = mt[3]
        return [_h2n(A + A), _h2n(B + B), _h2n(C + C), 1]
      }
    },
    {
      reg: /^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/,
      fn: mt => [_h2n(mt[1]), _h2n(mt[2]), _h2n(mt[3]), 1]
    },
    {
      reg: /^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/,
      fn: mt => [_h2n(mt[1]), _h2n(mt[2]), _h2n(mt[3]), _h2n(mt[4])]
    },
    {
      reg: /^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/,
      fn: mt => [_d2n(mt[1]), _d2n(mt[2]), _d2n(mt[3]), 1]
    },
    {
      reg: /^rgba\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3}),\s*(\d+(?:\.\d+)?|\.\d+)\)$/,
      fn: mt => [_d2n(mt[1]), _d2n(mt[2]), _d2n(mt[3]), parseFloat(mt[4])]
    },
    {
      reg: /^hsl\((.+?),\s*(.+?),\s*(.+?)\)$/,
      fn: mt => _HSLA2RGB(agl2trn(mt[1]) % 1, str2num(mt[2]), str2num(mt[3]), 1)
    },
    {
      reg: /^hsla\((.+?),\s*(.+?),\s*(.+?),\s*(\d+(?:\.\d+)?|\.\d+)\)$/,
      fn: mt => _HSLA2RGB(agl2trn(mt[1]) % 1, str2num(mt[2]), str2num(mt[3]), parseFloat(mt[4]))
    }
  ]
  for (let o of _mArr) {
    let m = o.reg.exec(str)
    if (m) return o.fn(m)
  }
}

export { isStr, isNum, str2RGBAArr, startWith }
