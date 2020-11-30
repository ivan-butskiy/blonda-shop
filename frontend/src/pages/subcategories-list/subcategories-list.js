import React, { Component } from 'react';

import SubcategoryItem from './subcategory-item/subcategory-item';
import ProductList from './product-list/product-list';
import './subcategories-list.css';

import BlondaShopService from '../../service/blonda-shop-service';

class SubcategoriesList extends Component {
    
    state = {
        subcategoriesList: [],
        category: this.props.category,
        subcategory: this.props.subcategory
    };

    service = new BlondaShopService();

    getSubcategoriesList = () => {
        this.service.getSubcategoriesList(this.state.category)
            .then((subcategories) => {
                this.setState({
                    subcategoriesList: subcategories.results.map((subcategory) => {
                        return <SubcategoryItem setSubcategory={this.handleSubcategory} subcategory={subcategory} key={ subcategory.id }/>
                    })
                })
            })
    };

    handleSubcategory = (slug) => {
        this.setState({
            subcategory: slug
        });
    };

    componentDidMount() {
        this.getSubcategoriesList();
    }

    render() {
        const subcategoriesList = this.state.subcategoriesList;
        return (
                <div className='row'>
                    <div className='col-lg-3 mb-4 mb-lg-0'>
                        <nav className='nav flex-column shadow-sm p-3'>
                            { subcategoriesList }
                        </nav>
                    </div>

                    <div className='col-lg-9 mb-5'>
                        <div className='p-5 bg-white d-flex align-items-center shadow-sm h-100'>
                            <div className='row demo-content'>
                                <ProductList subcategory={ this.state.subcategory } />
                            </div>
                        </div>
                    </div>
                </div>

        );
    };
};

export default SubcategoriesList;