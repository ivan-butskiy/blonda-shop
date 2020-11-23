import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './product-item.css';

class ProductItem extends Component {

    state = {
        slug: this.props.product.slug,
        title: this.props.product.title,
        header_image: this.props.product.header_image,
        image_1: this.props.product.image_1,
        price: this.props.product.price,
        oldPrice: this.props.product.old_price,
        newProduct: this.props.product.new_product
    }

    render() {

        const { slug, title, header_image, image_1, price, oldPrice, newProduct } = this.state;

        return (
            <div className='col-md-4 col-sm-6 mb-2'>
                <div className='product-grid3'>
                    <div className='product-image3'>
                        <Link to={`/products/detail/${slug}/`}>
                            <img className='pic-1' src={ header_image } alt={ title } />
                            <img className='pic-2' src={image_1 ? image_1 : header_image } alt={ title } />
                        </Link>
                        <ul className='social'>
                            <li><a href='/'><i className='fa fa-shopping-bag'></i></a></li>
                            <li><a href='/'><i className='fa fa-shopping-cart'></i></a></li>
                        </ul>
                        { newProduct ? <span className='product-new-label'>New</span> : null }
                    </div>
                    <div className='product-content'>
                        <h3 className='title'><a href='/'>{ title }</a></h3>
                        <div className='price'>
                            { price } грн.
                            <span className='ml-1'>{ oldPrice ? oldPrice : null}</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    };

};

export default ProductItem;