import {
    ADD_TO_FAVORITE,
    DELETE_FROM_FAVORITE,
    ALREADY_IN_FAVORITE
} from '../actions/favorite-types';

const getFavoriteList = () => {
    if (localStorage.getItem('favorite-list')) {
        return JSON.parse(localStorage.getItem('favorite-list'));
    } else {
        return []
    };
};

const getFavoriteCount = () => {
    if (localStorage.getItem('favorite-list')) {
        return JSON.parse(localStorage.getItem('favorite-list')).length
    } else {
        return 0;
    }
}

const initialState = {
    favoriteList: getFavoriteList(),
    countFavorite: getFavoriteCount()
}

function favoriteReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_TO_FAVORITE:
            return {...state, countFavorite: getFavoriteCount(), favoriteList: getFavoriteList()};
        case DELETE_FROM_FAVORITE:
            return {...state, countFavorite: getFavoriteCount(), favoriteList: getFavoriteList()};
        case ALREADY_IN_FAVORITE:
            return {...state, countFavorite: getFavoriteCount(), favoriteList: getFavoriteList()};
        default:
            return {...state};
    };
};

export default favoriteReducer;