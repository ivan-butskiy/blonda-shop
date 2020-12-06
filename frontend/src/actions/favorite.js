import {
    ADD_TO_FAVORITE,
    DELETE_FROM_FAVORITE,
    ALREADY_IN_FAVORITE
} from './favorite-types';

export const addProductToFavorite = (slug, title, headerImage, price, size, color) => dispatch => {
    if (localStorage.getItem('favorite-list')) {
        const favoriteList = JSON.parse(localStorage.getItem('favorite-list'));
        if (favoriteList.findIndex(item => item.slug === slug) !== -1) {

            const index = favoriteList.findIndex(item => item.slug === slug);

            const favoriteObject = {
                slug: slug, 
                title: title, 
                headerImage: headerImage,
                price: price,
                size: size,
                color: color
            };
            favoriteList[index] = favoriteObject;
            localStorage.setItem('favorite-list', JSON.stringify(favoriteList));
            dispatch({type: ALREADY_IN_FAVORITE});
        
        } else {
            const favoriteObject = {
            slug: slug, 
            title: title, 
            headerImage: headerImage,
            price: price,
            size: size,
            color: color
            };
            favoriteList.push(favoriteObject);
            localStorage.setItem('favorite-list', JSON.stringify(favoriteList));

            dispatch({type: ADD_TO_FAVORITE});
        }
    } else {
        const favoriteList = [];
        const favoriteObject = {
            slug: slug, 
            title: title, 
            headerImage: headerImage,
            price: price,
            size: size,
            color: color
        };

        favoriteList.push(favoriteObject);
        localStorage.setItem('favorite-list', JSON.stringify(favoriteList));

        dispatch({type: ADD_TO_FAVORITE});
    };
};

export const deleteFromFavorite = (slug) => dispatch => {
    const favoriteList = JSON.parse(localStorage.getItem('favorite-list'));
    const index = favoriteList.findIndex(item => item.slug === slug)
    favoriteList.splice(index, 1);
    localStorage.setItem('favorite-list', JSON.stringify(favoriteList));

    dispatch({type: DELETE_FROM_FAVORITE});
};

export const clearFavoriteList = () => async dispatch => {
    localStorage.removeItem('favorite-list');
};
