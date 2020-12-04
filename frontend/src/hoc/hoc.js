import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';

import Navbar from './navbar';
import Footer from './footer';

import { checkAuthenticated, load_user } from '../actions/auth';

class Hoc extends Component {

    constructor(props) {
        super(props);
        props.checkAuthenticated();
        props.load_user()
    };
    
    render() {
        return (
            <Fragment>
                <Navbar/>
                { this.props.children }
                <Footer/>
            </Fragment>
        )
    }
}

const mapDispatchToProps = {
    checkAuthenticated,
    load_user
}

export default connect(null, mapDispatchToProps)(Hoc);