import axios from 'axios';

export default class BlondaShopService {

    _apiBase = 'http://68.183.56.201/';
    
    getResource = async (url, ...args) => {
        const response = await fetch(`${this._apiBase}${url}`);
        if (!response.ok) {
            throw new Error('Could not fetch url.');
        };
        return await response.json();
    };

    getSectionsList = async () => {
        const response = await this.getResource(`api/shop/`);
        return response;
    };

    getCategoriesList = async (slug) => {
        const response = await this.getResource(`api/shop/categories/${slug}/`);
        return response;
    };
    
    getSubcategoriesList = async (category) => {
        const response = await this.getResource(`api/shop/subcategories/${category}/`);
        return response;
    };

    getProductList = async (subcategory) => {
        const response = await this.getResource(`api/shop/products/${subcategory}/`);
        return response;
    };

    getProductDetail = async (slug) => {
        const response = await this.getResource(`api/shop/products/detail/${slug}/`);
        return response;
    };

    getAllProducts = async () => {
        const response = await this.getResource(`api/shop/products/all/`);
        return response;
    };

    getSubcategoryDetail = async (productSlug) => {
        const response = await this.getResource(`api/shop/subcategory/${productSlug}/`);
        return response;
    };

    getProductShortView = async (productSlug) => {
        const response = await this.getResource(`api/shop/products/short/${productSlug}/`);
        return response;
    };

    getFeedbacksList = async (productId) => {
        const response = await this.getResource(`api/shop/products/feedbacks/${productId}/`);
        return response;
    };

    
    getFilterInfo = async () => {
        const response = await this.getResource('api/shop/filterinfo/');
        return response;
    };
    
    submitFeedback = async (id, header, text) => {

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`
            },
        };

        const body = JSON.stringify({ id, header, text })

        await axios.post(`${this._apiBase}api/shop/products/feedbacks/${id}/`, body, config)
    
    };

    getFilteredProducts = async (
        subcategorySlug,
        filterSize, 
        filterColor, 
        filterBrand,
        minPrice,
        maxPrice,
        filterNew,
        filterSell
    ) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const filterSet = {
            subcategory: subcategorySlug,
            size: filterSize,
            color: filterColor,
            brand: filterBrand,
            min_price: minPrice,
            max_price: maxPrice,
            new: filterNew,
            sell: filterSell
        }
        const body = JSON.stringify(filterSet)
        const response = await axios.post(`${this._apiBase}api/shop/filtered-products/`, body, config);
    
        return response

    };

    getNewProducts = async () => {
        const response = await this.getResource('api/shop/new-products/')
        return response;
    };

    getInfoForOrder = async () => {
        const user = localStorage.getItem('access');
        const config = {
            headers: {
                'Content-Type': 'application/json',
            }
        };
        if (user) {
            config.headers.Authorization = `JWT ${localStorage.getItem('access')}`;
        }

        const response = await axios.get(`${this._apiBase}api/shop/order/info/`, config);

        return response.data;
    };

    submitOrder = async (
        firstName,
        lastName,
        phone,
        email,
        region,
        district,
        city,
        chooseDelivery
    ) => {

        const config = {
            headers: {
                'Content-Type': 'application/json',
            }
        };
        const user = localStorage.getItem('access');
        if (user) {
            config.headers.Authorization = `JWT ${localStorage.getItem('access')}`;
        }

        const products = Object(JSON.parse(localStorage.getItem('basket-list')));

        const body = {
            consumer_data : {
                first_name: firstName,
                last_name: lastName,
                phone: phone,
                email: email,
                region: region,
                district: district,
                city: city,
                choose_delivery_id: chooseDelivery
            },
            products: products
        };

        const response = await axios.post(`${this._apiBase}api/shop/order/register/`, body, config);

        return response
    };

    getSaleProducts = async () => {
        const response = await this.getResource('api/shop/sale-products/')
        return response;
    };

};
