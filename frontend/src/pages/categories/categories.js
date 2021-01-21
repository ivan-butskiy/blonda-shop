import React, { Component, Fragment } from 'react';

import CategoryItem from './category-item/category-item';
import BlondaShopService from '../../service/blonda-shop-service';
import Spinner from './spinner';

class CategoriesList extends Component {
    
    state = {
        categoryList: '',
        section: this.props.section,
        showSpinner: false
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
            this.setState({ showSpinner: false })
    }

    componentDidMount() {
        this.getCategoriesList();
    }

    componentDidUpdate(prevProps) {
        if (this.state.section !== this.props.section) {
            this.setState({ showSpinner: true })
            this.setState({
                section: this.props.section
            });
            this.updateCategoriesList();
        }
    }

    render() {

        const categoryList = this.state.categoryList;
        const { showSpinner } = this.state;

        if (showSpinner) {
            return (
                <Fragment>
                    <div className='container mt-5 mb-5'>
                        <div className='row'>
                            <Spinner />
                        </div>
                    </div>
                </Fragment>
            );
        }

        return (
            <Fragment>
                <div className='container mt-5 mb-5'>
                    <div className='row'>
                        { categoryList ? categoryList : <Spinner /> }
                    </div>
                </div>
            </Fragment>
        );
    };
};

export default CategoriesList;