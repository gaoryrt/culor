const isStr = a => Object.prototype.toString.call(a) === '[object String]'
const isNum = a => !isNaN(parseFloat(a)) && isFinite(a)
const h2n = hex => parseInt(hex, 16)
const d2n = dec => parseInt(dec, 10)
const agl2trn = str => {
  const mt = /^(\d+(?:\.\d+)?|\.\d+)(.*?)$/.exec(str)
  const deObj = {
    deg: 360,
    rad: 2 * Math.PI,
    grad: 400,
    turn: 1
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

const HSLA2RGB = (H, S, L, A) => {
  // http://www.easyrgb.com/en/math.php
  const Hue2RGB = (v1, v2, vH) => {
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
    R = 255 * Hue2RGB(t0, t1, H + 1 / 3)
    G = 255 * Hue2RGB(t0, t1, H)
    B = 255 * Hue2RGB(t0, t1, H - 1 / 3)
  }
  return [R, G, B, A]
}
export { isStr, isNum, h2n, d2n, agl2trn, str2num, HSLA2RGB }
