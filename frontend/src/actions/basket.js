import {
    ADD_TO_BASKET,
    DELETE_FROM_BASKET,
    ALREADY_IN_BASKET
} from './basket-types';

export const addProductToBasket = (slug, title, headerImage, price, size, color) => dispatch => {
    if (localStorage.getItem('basket-list')) {
        const basketList = JSON.parse(localStorage.getItem('basket-list'));

        const basketObject = {
            slug: slug, 
            title: title, 
            headerImage: headerImage,
            price: price,
            size: size,
            color: color
        };

        basketList.push(basketObject);
        localStorage.setItem('basket-list', JSON.stringify(basketList));

        dispatch({type: ADD_TO_BASKET});

    } else {
        const basketList = []
        const basketObject = {
            slug: slug, 
            title: title, 
            headerImage: headerImage,
            price: price,
            size: size,
            color: color
        };
        basketList.push(basketObject);
        localStorage.setItem('basket-list', JSON.stringify(basketList));

        dispatch({type: ADD_TO_BASKET});
    };
};

export const deleteFromBasket = (slug) => dispatch => {
    const basketList = JSON.parse(localStorage.getItem('basket-list'));
    const index = basketList.findIndex(item => item.slug === slug);
    basketList.splice(index, 1);
    localStorage.setItem('basket-list', JSON.stringify(basketList));

    dispatch({type: DELETE_FROM_BASKET});
};

export const clearBasket = () => async dispatch => {
    localStorage.removeItem('basket-list');
};