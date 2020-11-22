import React, { Component } from 'react';

import ProductItem from '../product-item/product-item';
import BlondaShopService from '../../../service/blonda-shop-service';
import './product-list.css';

class ProductList extends Component {

    service = new BlondaShopService()

    state = {
        subcategory: 'jeans',
        products: []
    }

    productList = (slug) => (
        this.service.getProductList(slug)
            .then((products) => {
                this.setState({
                    products: products.results.map((product) => {
                        return <ProductItem product={ product } key={ product.id } />
                    })
                })
            })        
    );

    componentDidMount() {
        this.productList(this.state.subcategory);
    }

    componentDidUpdate(prevProps) {
        if (this.props.subcategory !== prevProps.subcategory) {
            this.setState({
                subcategory: this.props.subcategory
            });
            this.productList(this.props.subcategory);
        };
    }

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