import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import logo from '../../assets/logo.png';

import UserPreview from './components/user-preview';

import './navbar.css';

class Navbar extends Component {
    
    render() {
        return (
            <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>

                <Link className='navbar-brand d-lg-none navbar-mini' to='/'>
                    <img src={logo} alt='bestory-logo'/>
                </Link>

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
                        <li className='nav-item link text-center'>
                            <Link className='nav-link' to='/categories/mens/'>Парням</Link>
                        </li>
                        <li className='nav-item link text-center'>
                            <Link className='nav-link' to='/categories/womans/'>Девушкам</Link>
                        </li>
                        <li className='nav-item link text-center'>
                            <Link className='nav-link' to='/'>Акции</Link>
                        </li>
                        <li className='nav-item link text-center'>
                            <Link className='nav-link' to='/'>Новинки</Link>
                        </li>
                    </ul>
                        
                    <Link className='navbar-brand d-none d-lg-block' to='/'>
                        <img src={logo} alt='bestory-logo'/>
                    </Link>
                        
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
                            <i className='fa fa-shopping-cart'></i>
                            <Link className='nav-link' to='/cart/'>Корзина { this.props.count ? <span className='badge badge-danger'>{ this.props.count }</span> : null }</Link>
                        </li>
                        <UserPreview />
                    </ul>
                </div>
            </nav>
        );
    };
};


const mapStateToProps = state => ({
    count: state.basketReducer.count
})

export default connect(mapStateToProps, null)(Navbar);