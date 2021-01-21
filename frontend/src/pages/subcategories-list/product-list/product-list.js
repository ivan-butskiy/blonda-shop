import React, { Component } from 'react';

import ProductItem from '../../../components/product-item';
import BlondaShopService from '../../../service/blonda-shop-service';
import './product-list.css';

class ProductList extends Component {

    service = new BlondaShopService()

    state = {
        subcategory: this.props.subcategory,
        products: [],
        allProducts: [],

        filterSize: '', 
        filterColor: '', 
        filterBrand: '',
        minPrice: '',
        maxPrice: '',
        filterNew: '',
        filterSell: ''
    }

    productList = (slug) => {
        this.service.getProductList(slug)
        .then((products) => {
        this.setState({
            products: products.results.map((product) => {
                return <ProductItem product={ product } key={ product.id } />
            })
        });
    })
    };

    getAllProducts = () => (
        this.service.getAllProducts()
            .then((products) => {
                this.setState({
                    products: products.results.map((product) => {
                        return <ProductItem product={ product } key={ product.id } />
                    })
                });
            })
    );

    getFilteredProducts() {
        let subcategory = '';
        if (this.state.subcategory) {
            subcategory = this.state.subcategory;
        };

        this.service.getFilteredProducts(
            subcategory,
            this.props.filterSize, 
            this.props.filterColor, 
            this.props.filterBrand,
            this.props.minPrice,
            this.props.maxPrice,
            this.props.filterNew,
            this.props.filterSell
            )
        .then((productsList) => {
            this.setState({
                products: productsList.data.map((product) => <ProductItem product={ product } key={ product.id } /> )
            });
        });
    };

    componentDidUpdate(prevProps) {
        if (this.props.subcategory !== prevProps.subcategory) {
            this.setState({
                subcategory: this.props.subcategory
            });
            this.productList(this.props.subcategory);
            };
        if (this.props !== prevProps) {
            this.getFilteredProducts();
            };
        };

    componentDidMount() {
        if (this.state.subcategory) {
            this.productList(this.state.subcategory);
        } else {
            this.getAllProducts();
        };
    };

    render() {

        const { products } = this.state;

        return (
            <div className='row'>
                { products }
            </div>
        );
    };
};

export default ProductList;