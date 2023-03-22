export const isEmpty = obj =>
  [Object, Array].includes((obj || {}).constructor) &&
  !Object.entries(obj || {}).length

export const getObjectKeys = obj => {
  if (!obj) return
  return Object.keys(obj)
}

export const removeNewLinesAndSpaces = str => {
  return str.replace(/[\r\n\s\\n]/gm, '')
}

export const b64EncodeUnicode = str => {
  // first we use encodeURIComponent to get percent-encoded UTF-8,
  // then we convert the percent encodings into raw bytes which
  // can be fed into btoa.
  return window.btoa(
    encodeURIComponent(str).replace(
      /%([0-9A-F]{2})/g,
      function toSolidBytes(match, p1) {
        return String.fromCharCode('0x' + p1)
      },
    ),
  )
}

export const b64DecodeUnicode = str => {
  // Going backwards: from bytestream, to percent-encoding, to original string.
  return decodeURIComponent(
    window
      .atob(str)
      .split('')
      .map(c => {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
      })
      .join(''),
  )
}

export const localStorageSet = (key, value) => {
  localStorage.setItem(key, value)
}

export const localStorageGet = key => {
  return localStorage.getItem(key)
}

export const localStorageRemove = key => {
  localStorage.removeItem(key)
}

export const localStorageClear = () => {
  localStorage.clear()
}
