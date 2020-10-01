// Sorting function
export const dynamicSort = (key, order = 'asc') => {
    return  function innerSort (a, b) {
      if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        return 0;
      }
  
      const varA = (typeof a[key] === 'string')
        ? a[key].toUpperCase() : a[key];
      const varB = (typeof b[key] === 'string')
        ? b[key].toUpperCase() : b[key];
  
      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }
      return (
        (order === 'desc') ? (comparison * -1) : comparison
      );
    };
}

// Check if object is empty
export const isObjEmpty = (obj) => {
  for (let key in obj) {
      if (obj.hasOwnProperty(key))
          return false;
  }
  return true;
}

//Get object property names
export const getPropertyNames = (obj) => {

  const list = []

  for (let key in obj) {

    if (obj.hasOwnProperty(key)) {
        list.push(key.charAt(0).toUpperCase() + key.substr(1));
    }
  }

  return list
}