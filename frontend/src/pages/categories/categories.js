import React, { Component, Fragment } from 'react';

import CategoryItem from './category-item/category-item';

import BlondaShopService from '../../service/blonda-shop-service';

class CategoriesList extends Component {
    
    state = {
        categoryList: [],
        section: this.props.section
    };

    service = new BlondaShopService();

    getCategoriesList = () => {
        this.service.getCategoriesList(this.state.section)
            .then((categories) => {
                this.setState({
                    categoryList: categories.map((category) => {
                        return <CategoryItem
                            section={ this.state.section }
                            category={ category }
                            key={ category.id }/>
                    })
                })
            })
    }

    componentDidMount() {
        this.getCategoriesList();
    }

    render() {

        const categoryList = this.state.categoryList;

        return (
            <Fragment>
                <div className='container'>
                    <div className='row'>
                        { categoryList }
                    </div>
                </div>
            </Fragment>
        );
    };
};

export default CategoriesList;