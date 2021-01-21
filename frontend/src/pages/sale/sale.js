import React, { Component } from 'react';
import ProductItem from '../../components/product-item';
import BlondaShopService from '../../service/blonda-shop-service';

import './sale.css';

export default class Sale extends Component {

    state = {
        productItems: ''
    };

    service = new BlondaShopService();

    getSaleProductItems() {
        this.service.getSaleProducts()
            .then(products => {
                console.log(products);
                this.setState({
                    productItems: products.results.map((product) => {
                        return <ProductItem product={ product } key={ product.id } />
                    })
                });
            });
    };

    componentDidMount() {
        this.getSaleProductItems();
    };

    render() {

        const { productItems } = this.state;
        // console.log(prod)
        return (
            <div className='container'>
                <h1 className='mt-5 mb-5'>Распродажа</h1>
                <div className='row mb-5'>
                    { productItems }
                </div>
            </div>
        );
    };
};
