import { PUT_DATA } from "./actions";

const initialState = {
    recievedData: [],
    showLoader: true,
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
        default:
            return {...state};
    }
}