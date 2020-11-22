import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import UserPreview from './components/user-preview';

import { checkAuthenticated, load_user } from '../../actions/auth';

import './navbar.css';

class Navbar extends Component {

    constructor(props){
        super(props);
        props.checkAuthenticated();
        props.load_user();
    };

    render() {

        
        return (
            <Fragment>
                <nav className='navbar navbar-expand-lg navbar-light'>
                    <div className='container'>
                        <Link className='navbar-brand mr-3' to='/'>BlondaShop</Link>
                        <UserPreview />
                        <button 
                            className='navbar-toggler'
                            type='button'
                            data-toggle='collapse'
                            data-target='#navbarNav'
                            aria-controls='navbarNav'
                            aria-expanded='false'
                            aria-label='Toggle navigation'>
                            <span className='navbar-toggler-icon'></span>
                        </button>
                        <div className='collapse navbar-collapse mx-auto' id='navbarNav'>
                            <ul className="topBotomBordersOut navbar-nav mx-auto text-center">
                                <li className="nav-item active">
                                    <a className="nav-link" href="/">Мужчинам</a>
                                </li>
                                <li className="nav-item active">
                                    <a className="nav-link" href="/">Женщинам</a>
                                </li>
                                <li className="nav-item active">
                                    <a className="nav-link" href="/">Новинки</a>
                                </li>
                                <li className="nav-item active">
                                    <a className="nav-link" href="/">Распродажа</a>
                                </li>
                                <li className="nav-item active">
                                    <a className="nav-link" href="/">Контакты</a>
                                </li>
                            </ul>    
                        </div>
                    </div>
                    
                    
                </nav>
                { this.props.children }
            </Fragment>
        );
    };
};


const mapStateToProps = state => ({
    isAuthenticated: state.authReducer.isAuthenticated
})

const mapDispatchToProps = {
    checkAuthenticated,
    load_user
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);