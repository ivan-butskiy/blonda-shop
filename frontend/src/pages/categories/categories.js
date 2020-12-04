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

    updateCategoriesList = () => {
        this.service.getCategoriesList(this.props.section)
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

    componentDidUpdate(prevProps) {
        if (this.state.section !== this.props.section) {
            this.setState({
                section: this.props.section
            });
            this.updateCategoriesList();
        }
    }

    render() {

        const categoryList = this.state.categoryList;

        return (
            <Fragment>
                <div className='container mt-5'>
                    <div className='row'>
                        { categoryList }
                    </div>
                </div>
            </Fragment>
        );
    };
};

export default CategoriesList;