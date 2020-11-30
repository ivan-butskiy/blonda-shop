import React, { Component } from 'react';
import ReactHtmlParser from 'react-html-parser';
import BlondaShopService from '../../service/blonda-shop-service';
import WentToSubcategory from './went-to-subcategory';

import './product-detail.css';

class ProductDetail extends Component {

    service = new BlondaShopService();

    state = {
        slug: '',
        colors: [],
        sizes: [],
        brandTitle: '',
        brandCountry: '',
        brandImage: '',
        title: '',
        subcategory: '',
        description: '',
        price: '',
        oldPrice: '',
        newProduct: false,
        headerImage: '',
        image_1: '',
        image_2: '',
        image_3: '',
        image_4: '',
        image_5: '',
        image_6: '',
    }

    getProduct = () => (
        this.service.getProductDetail(this.props.slug)
            .then((product) => {
                this.setState({
                    slug: product.slug,
                    colors: product.color,
                    sizes: product.sizes,
                    brandTitle: product.brand.title,
                    brandCountry: product.brand.country,
                    brandImage: product.brand.brand_image,
                    title: product.title,
                    description: product.description,
                    price: product.price,
                    oldPrice: product.old_price,
                    newProduct: product.new_product,
                    headerImage: product.header_image,
                    image_1: product.image_1,
                    image_2: product.image_2,
                    image_3: product.image_3,
                    image_4: product.image_4,
                    image_5: product.image_5,
                    image_6: product.image_6,
                });
            })
        );

    componentDidMount() {
        this.getProduct(this.props.slug);
    };

    render() {

        const { slug, colors, sizes, brandTitle, brandCountry, brandImage, title, description, price, oldPrice,
            newProduct, headerImage, image_1, image_2, image_3,
            image_4, image_5, image_6 } = this.state;

        const sizesArray = sizes.map((sizes) => {
            return sizes.size;
        });

        const sizesToString = sizesArray.sort().join(', ')
        
        const colorsArray = colors.map((color) => {
            return color.color;
        });
        const colorsToString = colorsArray.sort().join(', ')

        const sizesForForm = sizesArray.map((size) => {
            return (
                <option key={ size.size }>{ size }</option>
            );
        });

        const colorsForForm = colorsArray.map((color) => {
            return (
                <option key={ color.color }>{ color }</option>
            );
        });

        return (
            <div className='container'>
                <WentToSubcategory 
                    productSlug={ this.props.slug }
                    />
                <div className='product row'>
                    <div className='product-images col-md-6 mt-3'>
                        <div id='carouselExampleIndicators' className='carousel slide' data-ride='carousel'>
                            <ol className='carousel-indicators'>
                                <li data-target='#carouselExampleIndicators' data-slide-to='0' className='active'></li>
                                { image_1 ? <li data-target='#carouselExampleIndicators' data-slide-to='1'></li> : null }
                                { image_2 ? <li data-target='#carouselExampleIndicators' data-slide-to='2'></li> : null }
                                { image_3 ? <li data-target='#carouselExampleIndicators' data-slide-to='3'></li> : null }
                                { image_4 ? <li data-target='#carouselExampleIndicators' data-slide-to='4'></li> : null }
                                { image_5 ? <li data-target='#carouselExampleIndicators' data-slide-to='5'></li> : null }
                                { image_6 ? <li data-target='#carouselExampleIndicators' data-slide-to='6'></li> : null }
                            </ol>
                            <div className='carousel-inner'>
                                { newProduct ? <span className='product-new-label'>New</span> : null }
                                <div className='carousel-item active'>
                                    <img src={ headerImage } className='d-block w-100' alt='...'/>
                                </div>
                                { image_1 ? <div className='carousel-item'>
                                    <img src={ image_1 } className='d-block w-100' alt='...' />
                                    </div> : null 
                                }
                                { image_2 ? <div className='carousel-item'>
                                    <img src={ image_2 } className='d-block w-100' alt='...' />
                                    </div> : null 
                                }
                                { image_3 ? <div className='carousel-item'>
                                    <img src={ image_3 } className='d-block w-100' alt='...' />
                                    </div> : null 
                                }
                                { image_4 ? <div className='carousel-item'>
                                    <img src={ image_4 } className='d-block w-100' alt='...' />
                                    </div> : null 
                                }
                                { image_5 ? <div className='carousel-item'>
                                    <img src={ image_5 } className='d-block w-100' alt='...' />
                                    </div> : null 
                                }
                                { image_6 ? <div className='carousel-item'>
                                    <img src={ image_6 } className='d-block w-100' alt='...' />
                                    </div> : null 
                                }
                            </div>
                            <a className='carousel-control-prev' href='#carouselExampleIndicators' role='button' data-slide='prev'>
                                <span className='carousel-control-prev-icon' aria-hidden='true'></span>
                                <span className='sr-only'>Previous</span>
                            </a>
                            <a className='carousel-control-next' href='#carouselExampleIndicators' role='button' data-slide='next'>
                                <span className='carousel-control-next-icon' style={{color: '#464646'}} aria-hidden='true'></span>
                                <span className='sr-only'>Next</span>
                            </a>
                        </div>
                    </div>
                    <div className='col-md-6 mt-3'>
                        <img src={ brandImage } alt={ title } />
                        <h3 className='mt-3'><strong>{ title }</strong></h3>
                        <br/>
                        { oldPrice ? <div className='true-old'><strong>Стоимость:</strong> { price } грн.</div> : null }
                        { !oldPrice ? <div><strong>Стоимость:</strong> { price } грн.</div> : null }
                        { oldPrice ? <div id='old-price' className='text-muted'><strong>Старая цена: </strong><s>{ oldPrice }</s> грн.</div> : null }
                        <div><strong>Размеры:</strong> { sizesToString }</div>
                        <div><strong>Цвета:</strong> { colorsToString }</div>
                        <div><strong>Бренд:</strong> { brandTitle }</div>
                        <div><strong>Страна:</strong> { brandCountry }</div>

                        <hr/>
                        <p><strong>Описание:</strong></p>
                        { ReactHtmlParser(description) }
                        <hr/>
                        <form className='row'>
                            <div className='col-md-6'>
                                <small><strong>Выберите размер:</strong></small>
                                <select 
                                    className='custom-select mt-2' 
                                    id='inputGroupSelect01'
                                    required>
                                    { sizesForForm }
                                </select>
                            </div>
                            <div className='col-md-6'>
                                <small><strong>Выберите цвет:</strong></small>
                                <select 
                                    className='custom-select mt-2' 
                                    id='inputGroupSelect02'
                                    required>
                                    { colorsForForm }
                                </select>
                            </div>
                            <button type='button' className='btn btn-primary btn-block text-uppercase mb-2 shadow-sm mt-3'><i className='fa fa-shopping-cart mr-2'></i>В корзину</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
};

export default ProductDetail;

// TODO добавление товара в корзину
// TODO добавить комментарии