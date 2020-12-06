import React, { Component } from 'react';

import SubcategoryItem from './subcategory-item/subcategory-item';
import ProductList from './product-list/product-list';
import FilterPanel from './filter-panel';
import './subcategories-list.css';

import BlondaShopService from '../../service/blonda-shop-service';

class SubcategoriesList extends Component {
    
    state = {
        subcategoriesList: [],
        category: this.props.category,
        subcategory: this.props.subcategory,

        filterSize: '',
        filterColor: '',
        filterBrand: '',
        minPrice: null,
        maxPrice: null,
        filterNew: null,
        filterSell: null
    };

    filterHandler = (
        filterSize, 
        filterColor, 
        filterBrand,
        minPrice,
        maxPrice,
        filterNew,
        filterSell
        ) => {
            this.setState({
                filterSize: filterSize,
                filterColor: filterColor,
                filterBrand: filterBrand,
                minPrice: minPrice,
                maxPrice: maxPrice,
                filterNew: filterNew,
                filterSell: filterSell
            })
    }


    service = new BlondaShopService();

    getSubcategoriesList = () => {
        this.service.getSubcategoriesList(this.props.category)
            .then((subcategories) => {
                this.setState({
                    subcategoriesList: subcategories.results.map((subcategory) => {
                        return <SubcategoryItem 
                            category={this.state.category}
                            subcategory={subcategory}
                            key={ subcategory.id }/>
                    })
                })
            })
    };

    componentDidMount() {
        this.getSubcategoriesList();
    };


    render() {

        const subcategoriesList = this.state.subcategoriesList;

        const { filterSize, 
            filterColor, 
            filterBrand,
            minPrice,
            maxPrice,
            filterNew,
            filterSell } = this.state;

        return (
                <div className='row mt-5'>
                    <div className='col-lg-3 mb-4 mb-lg-0'>
                        <nav className='nav flex-column shadow-sm p-3'>
                            { subcategoriesList }
                        </nav>
                    </div>

                    <div className='col-lg-9 mb-5'>
                        <div className='p-5 bg-white d-flex align-items-center shadow-sm h-100'>
                            <div className='row demo-content'>
                                <ProductList 
                                    subcategory={ this.props.subcategory } 
                                    filterSize={filterSize} 
                                    filterColor={filterColor} 
                                    filterBrand={filterBrand}
                                    minPrice={minPrice}
                                    maxPrice={maxPrice}
                                    filterNew={filterNew}
                                    filterSell={filterSell}
                                    />
                            </div>
                        </div>
                    </div>
                </div>

        );
    };
};

export default SubcategoriesList;