import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './new-product-slides-item.css';

class NewProductSlidesItem extends Component {

    state = {
        slug: this.props.slug,
        header: this.props.header,
        image: this.props.image,
        price: this.props.price,
        oldPrice: this.props.oldPrice
    };

    render() {

        const { slug, header, image, price, oldPrice } = this.state;

        return (
            <div className='carousel-item box-carousel-item'>
                <img
                    style={{filter: 'blur(5px)'}}
                    src='https://img.tsn.ua/cached/1518092914/tsn-1dd5ddd6a1f0076bf1e5ac5461d52989/thumbs/x/cf/1d/645133629a1ca64ecc753959e7eb1dcf.jpg' alt={ header } />
                <div className='text-box'>
                    <div className='row align-items-center'>
                        <div className='col-md-6'>
                            <Link className='header' to={`/products/detail/${slug}/`} >
                                <p className='wow fadeInUp' data-wow-duration='4s'>{ header }</p>
                            </Link>
 
                            { oldPrice ? <p className='wow fadeInUp price true-old' data-wow-duration='2s'><strong>Стоимость:</strong> { price } грн.</p> : null }

                            { !oldPrice ? <p className='wow fadeInUp price' data-wow-duration='2s'><strong>Стоимость:</strong> { price } грн.</p> : null }
                            { oldPrice ? <p id='old-price' className='text-muted wow fadeInUp old-price'><strong>Старая цена: </strong><s>{ oldPrice }</s> грн.</p> : null }

                        </div>
                        <div className='col-md-6 wow slideInLeft' data-wow-duration='4s'>
                            <img src={ image } alt='camel' />
                        </div>
                    </div>
                </div>
            </div>
        )
    };
};

export default NewProductSlidesItem;