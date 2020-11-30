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
                <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>

                    <Link className='navbar-brand d-lg-none' href='/'>Navbar</Link>

                    <button 
                        className='navbar-toggler' 
                        type='button' 
                        data-toggle='collapse' 
                        data-target='#navbarToggle' aria-controls='navbarToggle' 
                        aria-expanded='false' 
                        aria-label='Toggle navigation'>
                        <span className='navbar-toggler-icon'></span>
                    </button>

                    <div className='collapse navbar-collapse justify-content-between' id='navbarToggle'>

                        <ul className='navbar-nav'>
                            <li className='nav-item link'>
                                <Link className='nav-link' to='/categories/mens/'>Парням</Link>
                            </li>
                            <li className='nav-item link'>
                                <Link className='nav-link' to='/categories/womans/'>Девушкам</Link>
                            </li>
                            <li className='nav-item link'>
                                <Link className='nav-link' to='/'>Акции</Link>
                            </li>
                            <li className='nav-item link'>
                                <Link className='nav-link' to='/'>Новинки</Link>
                            </li>
                        </ul>
                            
                        <a className='navbar-brand d-none d-lg-block' href='/'>Navbar</a>
                            
                        <ul className='navbar-nav'>
                            <li className='nav-item text-center'>
                                <i className='far fa-sign-in-alt'></i>
                                <a className='nav-link' href='/'>Контакты</a>
                            </li>
                            <li className='nav-item text-center'>
                                <i className='far fa-search'></i>
                                <a className='nav-link' href='/'>Поиск</a>
                            </li>
                            <li className='nav-item text-center'>
                                <i className='far fa-shopping-basket'></i>
                                <a className='nav-link' href='/'>Корзина</a>
                            </li>
                            <UserPreview />
                        </ul>
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