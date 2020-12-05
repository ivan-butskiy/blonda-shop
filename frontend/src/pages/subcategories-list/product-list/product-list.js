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

    componentDidMount() {
        if (this.state.subcategory) {
            this.productList(this.state.subcategory);
        } else {
            this.getAllProducts();
        };
    };

    getFilteredProducts() {
        this.service.getFilteredProducts(
            this.props.subcategory,
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
                products: productsList.map((product) => <ProductItem product={ product } key={ product.id } /> )
            });
        });
    };

    // componentDidUpdate(prevProps) {
    //     if (this.props.filterBrand !== prevProps.filterBrand) {

    //         // if (this.props.filterBrand.length == 0) {

    //         // }
    //         console.log(this.props)
    //         this.getFilteredProducts();
    //     }
    // }

    componentDidUpdate(prevProps) {
        if (this.props.subcategory !== prevProps.subcategory) {
            console.log(this.props.subcategory);
            this.setState({
                subcategory: this.props.subcategory
            });
            this.productList(this.props.subcategory);
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