import { ADD_TO_BASKET, DELETE_FROM_BASKET } from '../actions/basket-types';

const getCount = () => {
    if (localStorage.getItem('basket-list')) {
        return JSON.parse(localStorage.getItem('basket-list')).length;
    } else {
        return 0;
    }
}

const initialState = {
    basketList: localStorage.getItem('basket-list'),
    count: getCount()
}

function basketReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_TO_BASKET:
            return {...state, count: getCount()};
        case DELETE_FROM_BASKET:
            return {...state, count: getCount()};
        default:
            return {...state};
    };
};

export default basketReducer;