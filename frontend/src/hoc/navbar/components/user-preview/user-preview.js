import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { logout } from '../../../../actions/auth';

const UserPreview = ({ isAuthenticated, logout  }) => {

    const guestLoginButton = () => (
        <Link className='navbar-brand' to='/login'>Вход</Link>
    )

    const userInfo = () => (
        <div className="dropdown">
            <a className="btn btn-secondary dropdown-toggle" href="/" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Мой аккаунт
            </a>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                <Link className="dropdown-item" to="/home/" onClick={ logout }>Выйти</Link>
                <Link className="dropdown-item" href="/">Another action</Link>
                <Link className="dropdown-item" href="/">Something else here</Link>
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