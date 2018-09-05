import { isStr, isNum, str2RGBAArr } from './utils'

function rtn(...args) {
  const invalid = () => {throw new Error('invalid input: ' + args)}
  const argLen = args.length
  let RGBA = []
  if (argLen < 1) throw new Error('no input detected')
  if (argLen === 1) {
    const arg0 = args[0].toLowerCase()
    if (isStr(arg0)) {
      RGBA = str2RGBAArr(arg0)
    } else if (isNum(arg0)) {
      if (arg0 > 0xffffff) invalid()
      
    } else invalid()
    console.log('RGBAArr', RGBA)
  }
  if (argLen === 2) invalid()
}

// export default rtn

rtn('hsl(75,.77,.77)')
rtn('#DBF297')

