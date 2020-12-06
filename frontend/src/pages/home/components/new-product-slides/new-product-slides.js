import React, { Component, Fragment } from 'react';
import logoslider from '../../../../assets/logoslider.png';

import NewProductSlidesItem from '../new-product-slides-item';
import BlondaShopService from '../../../../service/blonda-shop-service';


import './new-product-slides.css';


class NewProductSlides extends Component {
    
    service = new BlondaShopService();

    state = {
        cartItems: []
    };

    getCartItems() {
        this.service.getNewProducts()
            .then((products) => {
                this.setState({
                    cartItems: products.results.map((product => {
                        return <NewProductSlidesItem 
                            slug={ product.slug }
                            key={ product.id }
                            header={ product.title }
                            image={ product.header_image }
                            price={ product.price }
                            oldPrice={ product.old_price }
                             />
                    }))
                });
            });
    };

    componentDidMount() {
        this.getCartItems();
    }

    render() {

        const { cartItems } = this.state;

        return (
            <Fragment>
                <section className='slides-new-products'>
                    <div id='slider-animation-2' className='carousel slide' data-ride='carousel'>

                    <div className='carousel-inner box-slides-new'>
                        <div className='carousel-item box-carousel-item active'>
                            <img
                                style={{filter: 'blur(5px)'}}
                                src='https://img.tsn.ua/cached/1518092914/tsn-1dd5ddd6a1f0076bf1e5ac5461d52989/thumbs/x/cf/1d/645133629a1ca64ecc753959e7eb1dcf.jpg' alt='Product slide' />
                            <div className='text-box'>
                                <div className='row align-items-center'>
                                    <div className='col-md-6'>
                                        <p className='wow header fadeInUp' data-wow-duration='4s'>Новинки</p>
                                        <p className='wow fadeInUp subheader' data-wow-duration='2s'>От интернет магазина</p>
                                        <p className='wow fadeInUp subheader' data-wow-duration='2s'>Be Story Trand Zone</p>
                                    </div>
                                    <div className='col-md-6 wow slideInLeft' data-wow-duration='4s'>
                                    <img src={ logoslider } alt='camel' />
                                    </div>
                                </div>
                            </div>
                        </div>

                        { cartItems }

                    </div>

                        <a className='carousel-control-prev' href='#slider-animation-2' data-slide='prev'>
                            <span className='carousel-control-prev-icon'></span>
                        </a>
                        <a className='carousel-control-next' href='#slider-animation-2' data-slide='next'>
                            <span className='carousel-control-next-icon'></span>
                        </a>
                    </div>
                </section>
    </Fragment>
        )
    }

}

export default NewProductSlides;