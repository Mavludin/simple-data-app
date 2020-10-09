const has = Object.prototype.hasOwnProperty

// Sorting function
export const dynamicSort = (key, order = 'asc') => {
  return function innerSort (a, b) {
    if (!has.call(a, key) || !has.call(b, key)) {
      return 0
    }
    const varA = (typeof a[key] === 'string')
      ? a[key].toUpperCase() : a[key]
    const varB = (typeof b[key] === 'string')
      ? b[key].toUpperCase() : b[key]
    let comparison = 0
    if (varA > varB) {
      comparison = 1
    } else if (varA < varB) {
      comparison = -1
    }
    return (
      (order === 'desc') ? (comparison * -1) : comparison
    )
  }
}

// Get object property names
export const getPropertyNames = (obj) => {
  const list = []
  for (const key in obj) {
    if (has.call(obj, key)) {
      list.push(key.charAt(0).toUpperCase() + key.substr(1))
    }
  }

  return list
}
