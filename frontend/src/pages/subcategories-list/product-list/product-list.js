import React, { Component } from 'react';

import ProductItem from '../product-item/product-item';
import BlondaShopService from '../../../service/blonda-shop-service';
import './product-list.css';

class ProductList extends Component {

    service = new BlondaShopService()

    state = {
        subcategory: this.props.subcategory,
        products: [],
        allProducts: []
    }

    productList = (slug) => (
        this.service.getProductList(slug)
        .then((products) => {
            this.setState({
                products: products.results.map((product) => {
                    return <ProductItem product={ product } key={ product.id } />
                })
            });
        })
    );

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

    componentDidUpdate(prevProps) {
        if (this.props.subcategory !== prevProps.subcategory) {
            this.setState({
                subcategory: this.props.subcategory
            });
            this.productList(this.props.subcategory);
        };
        console.log(this.props)
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