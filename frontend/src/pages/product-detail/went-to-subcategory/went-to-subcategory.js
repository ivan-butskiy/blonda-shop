import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import BlondaShopService from '../../../service/blonda-shop-service';

import './went-to-subcategory.css';

export default class WentToSubcategory extends Component {

    service = new BlondaShopService();

    state = {
        subcategoryTitle: '',
        subcategorySlug: '',
        categorySlug: ''
    }

    getSubcategoryInfo() {
        this.service.getSubcategoryDetail(this.props.productSlug)
            .then((subcategory) => {
                return this.setState({
                    subcategoryTitle: subcategory.title,
                    subcategorySlug: subcategory.slug,
                    categorySlug: subcategory.category.slug
                })
            } 
        )}

    componentDidMount() {
        this.getSubcategoryInfo();
    }

    render () {

        const { subcategorySlug, categorySlug, subcategoryTitle } = this.state;
        const address = `/products/${categorySlug}/${subcategorySlug}/`;

        return (
            <nav aria-label='breadcrumb'>
                <Link to={ address }>
                <h4 className='mt-3 mb-3'><i className="far fa-arrow-circle-left mr-2"></i>Вернуться в подкатегорию «{ subcategoryTitle }»</h4>
                </Link>
            </nav>
        )
    }

}