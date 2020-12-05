import React, { Component } from 'react';

import ProductItem from '../../../../components/product-item';
import BlondaShopService from '../../../../service/blonda-shop-service';

import './new-product-slides.css';


class NewProducSlides extends Component {
    
    service = new BlondaShopService();

    state = {
        cartItems: []
    };

    getCartItems() {
        this.service.getNewProducts()
            .then((products) => {
                console.log(products)
                this.setState({
                    cartItems: products.results.map((product => {
                        return <ProductItem product={ product } key={ product.id } />
                    }))
                });
            });
    };

    componentDidMount() {
        this.getCartItems();
    }

    render() {

        const { cartItems } = this.state;
        console.dir(cartItems)

        return (
            <div className='row carousel-new-products'>
                <div className='col-md-4'>
                    <h1>Новинки</h1>
                </div>
                <div id='carouselExampleIndicators' className='carousel slide col-md-8' data-ride='carousel'>
                    <ol className='carousel-indicators'>
                        <li data-target='#carouselExampleIndicators' data-slide-to='0' className='active'></li>
                        <li data-target='#carouselExampleIndicators' data-slide-to='1'></li>
                        <li data-target='#carouselExampleIndicators' data-slide-to='2'></li>
                    </ol>
                    <div className='carousel-inner'>
                        <div className='carousel-item active'>
                        { cartItems }
                        </div>
                    </div>
                    <a className='carousel-control-prev' href='#carouselExampleIndicators' role='button' data-slide='prev'>
                        <span className='carousel-control-prev-icon' aria-hidden='true'></span>
                        <span className='sr-only'>Previous</span>
                    </a>
                    <a className='carousel-control-next' href='#carouselExampleIndicators' role='button' data-slide='next'>
                        <span className='carousel-control-next-icon' aria-hidden='true'></span>
                        <span className='sr-only'>Next</span>
                    </a>
                </div>
            </div>
        )
    }

}

export default NewProducSlides;