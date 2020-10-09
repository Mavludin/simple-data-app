export const PUT_DATA = 'PUT_DATA'
export const LOAD_DATA = 'LOAD_DATA'
export const SET_AMOUNT_OF_PAGES = 'SET_AMOUNT_OF_PAGES'
export const PAGINATE = 'SET_PAGE'

export const putData = (data) => {
  return {
    type: PUT_DATA,
    payload: data
  }
}

export const loadData = () => {
  return {
    type: LOAD_DATA
  }
}

export const setAmountOfPages = (data, amount) => {
  return {
    type: SET_AMOUNT_OF_PAGES,
    payload: Math.ceil(data.length / amount)
  }
}

export const paginate = (pageNum) => {
  return {
    type: PAGINATE,
    payload: pageNum
  }
}
