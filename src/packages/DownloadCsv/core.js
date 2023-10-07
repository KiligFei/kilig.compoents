/**
 * Simple safari detection based on user agent test
 */
function isSafari() {
  return /^((?!chrome|android).)*safari/i.test(navigator.userAgent)
}

function isJsons(array) {
  return Array.isArray(array)
    && array.every(row => typeof row === 'object' && !(Array.isArray(row)))
}

function isArrays(array) {
  return Array.isArray(array) && array.every(row => Array.isArray(row))
}

function jsonsHeaders(array) {
  return Array.from(
    array
      .map(json => Object.keys(json))
      .reduce((a, b) => new Set([...a, ...b]), []),
  )
}

function jsons2arrays(jsons, headers) {
  headers = headers || jsonsHeaders(jsons)

  // allow headers to have custom labels, defaulting to having the header data key be the label
  let headerLabels = headers
  let headerKeys = headers
  if (isJsons(headers)) {
    headerLabels = headers.map(header => header.label)
    headerKeys = headers.map(header => header.key)
  }

  const data = jsons.map(object =>
    headerKeys.map(header => getHeaderValue(header, object)),
  )
  return [headerLabels, ...data]
}

function getHeaderValue(property, obj) {
  const foundValue = property
    .replace(/\[([^\]]+)]/g, '.$1')
    .split('.')
    .reduce((o, p, i, arr) => {
      // if at any point the nested keys passed do not exist, splice the array so it doesnt keep reducing
      if (o[p] === undefined) {
        arr.splice(1)
        return null
      }
      else {
        return o[p]
      }
    }, obj)
  // if at any point the nested keys passed do not exist then looks for key `property` in object obj
  return foundValue === undefined
    ? property in obj
      ? obj[property]
      : ''
    : foundValue
}

const elementOrEmpty = element => (element || element === 0 ? element : '')

function joiner(data) {
  const separator = ','
  const enclosingCharacter = '"'

  return data
    .filter(e => e)
    .map(row =>
      row
        .map(element => elementOrEmpty(element))
        .map(column => `${enclosingCharacter}${column}${enclosingCharacter}`)
        .join(separator),
    )
    .join('\n')
}

function arrays2csv(data, headers) {
  return joiner(headers ? [headers, ...data] : data)
}

const jsons2csv = (data, headers) => joiner(jsons2arrays(data, headers))

function string2csv(data, headers) {
  return headers ? `${headers.join()}\n${data}` : data
}

function toCSV(data, headers) {
  if (isJsons(data))
    return jsons2csv(data, headers)
  if (isArrays(data))
    return arrays2csv(data, headers)
  if (typeof data === 'string')
    return string2csv(data, headers)
  throw new TypeError(
    'Data should be a "String", "Array of arrays" OR "Array of objects" ',
  )
}

export function buildURI(data, headers) {
  const csv = toCSV(data, headers)
  const type = isSafari() ? 'application/csv' : 'text/csv'
  const blob = new Blob(['', csv], { type })
  const dataURI = `data:${type};charset=utf-8,${''}${csv}`

  const URL = window.URL || window.webkitURL

  return typeof URL.createObjectURL === 'undefined'
    ? dataURI
    : URL.createObjectURL(blob)
}
