import React, { Component, Fragment } from 'react';

import SectionItem from './components/section-item';
import NewProductSlides from './components/new-product-slides';

import BlondaShopService from '../../service/blonda-shop-service';

class Home extends Component {

    state = {
        sectionList: []
    };

    service = new BlondaShopService();

    getSectionsList = () => {
        this.service.getSectionsList()
            .then((sections) => {
                this.setState({
                    sectionList: sections.results.map((section) => {
                        return <SectionItem section={ section } key={ section.id } />
                    })
                });
            });
        };
    
    componentDidMount() {
        this.getSectionsList();
    };

    render() {

        const sectionList = this.state.sectionList;
        return (
            <Fragment>
                    <NewProductSlides />
                    <div className='container'>
                        <div className='row mt-5 mb-5'>
                            { sectionList }
                        </div>
                    </div>
            </Fragment>
        )
    };
};

export default Home;

// TODO добавить динамическое изменение Title