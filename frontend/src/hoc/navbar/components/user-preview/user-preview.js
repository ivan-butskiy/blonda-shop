import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { logout } from '../../../../actions/auth';

import './user-preview.css';

const UserPreview = ({ isAuthenticated, logout  }) => {

    const guestLoginButton = () => (

        <button type="button" className="btn btn-primary">
            <i className="fa fa-sign-in mr-2"></i>
            <Link to='/login'>Вход
            </Link>
        </button>
 
  
    )

    const userInfo = () => (
        <div className="dropdown">
            <a className="btn dropdown-toggle" href="/" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <i class="fa fa-user-circle mr-2" aria-hidden="true"></i>
            Мой аккаунт
            </a>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                <Link className="dropdown-item" to="/home/" onClick={ logout }>Выйти</Link>
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