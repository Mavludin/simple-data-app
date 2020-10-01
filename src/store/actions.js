export const PUT_DATA = 'PUT_DATA';
export const LOAD_DATA = 'LOAD_DATA';

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