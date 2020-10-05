import { PUT_DATA, SET_AMOUNT_OF_PAGES, PAGINATE } from "./actions";

const initialState = {
    recievedData: [],
    showLoader: true,
    amountOfPages: 0,
    pageNumber: Number((localStorage[('pageNumber')])) || 1
};

export const mainReducer = (state = initialState, action) => {

    switch(action.type) {
        case PUT_DATA: {
            return {
                ...state,
                recievedData: action.payload,
                showLoader: false
            }
        }
        case SET_AMOUNT_OF_PAGES: {
            return {
                ...state,
                amountOfPages: action.payload
            }
        }
        case PAGINATE: {
            localStorage.setItem('pageNumber', action.payload)
            return {
                ...state,
                pageNumber: action.payload
            }
        }
        default:
            return {...state};
    }
}