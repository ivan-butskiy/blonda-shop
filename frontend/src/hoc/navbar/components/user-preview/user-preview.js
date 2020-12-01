import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { logout } from '../../../../actions/auth';

import './user-preview.css';

const UserPreview = ({ isAuthenticated, logout  }) => {

    const guestLoginButton = () => (        
        <li className='nav-item text-center'>
            <i className='far fa-sign-in-alt'></i>
            <Link className='nav-link' to='/login/'>Вход</Link>
        </li>
    )

    const userInfo = () => (
        <div className='row dropdown text-center'>
            <i className='col-lg-12 far fa-user-circle'></i>
            <Link className='col-lg-12 btn dropdown-toggle' to='/' role='button' id='dropdownMenuLink' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>
            Аккаунт
            </Link>
            <div className='dropdown-menu' aria-labelledby='dropdownMenuLink'>
                <Link className='dropdown-item' to='/' onClick={ logout }>Выйти</Link>
            </div>
        </div>
    )

    return (
        <Fragment>
            { isAuthenticated ? userInfo() : guestLoginButton() }
        </Fragment>
    );
};


const mapStateToProps = state => ({
    isAuthenticated: state.authReducer.isAuthenticated
});

export default connect(mapStateToProps, {logout})(UserPreview);