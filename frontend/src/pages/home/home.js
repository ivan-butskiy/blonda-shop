import React, { Component, Fragment } from 'react';

import SectionItem from './components/section-item';

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
                        // console.log(section);
                        return <SectionItem section={section} key={section.id} />
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
                <div className='container'>
                    <div className='row'>
                        { sectionList }
                    </div>
                </div>
            </Fragment>
        )
    };
};

export default Home;