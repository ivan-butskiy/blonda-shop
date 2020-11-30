export default class BlondaShopService {

    _apiBase = 'http://localhost:8000/';

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

};