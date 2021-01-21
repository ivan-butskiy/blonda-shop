import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../../actions/auth';

import './login.css';

class Login extends Component {

    state = {
        email: '',
        password: '',
        errorLogin: false
    }

    changeHandler(e) {
        if (this.state.errorLogin) {
            this.setState({ errorLogin: false });
        };
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    submitHandler(e) {
        e.preventDefault();
        const { email, password } = this.state;
        this.props.login(email, password)
            .then((result) => {
                if (!result) {
                    this.setState({errorLogin: true})
                };
            });
    };

    style = {
        backgroundImage: 'url(https://jadone.biz/image/cache/data/slider/DSC00202z-1800x1020.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        minHeight: 'calc(100vh - 76px)'
    }

    render() {

        const { email, password, errorLogin } = this.state;

        if (this.props.isAuthenticated) {
            return <Redirect to='/' />
        };

        return(

            <div className='container-fluid'>
                <div className='row no-gutter'>
                    <div className='col-md-6 d-none d-md-flex bg-image' style={this.style}></div>
                    <div className='col-md-6 bg-light'>
                        <div className='login d-flex align-items-center'>
                            <div className='row mt-4 mb-4'>
                                <div className='col-lg-8 text-center mx-auto auth-content'>
                                    <h3 className='display-4 mt-3'>Авторизация</h3>
                                    <p className='text-muted mb-3'>Войдите в систему, чтобы иметь возможность заказывать товары и накапливать бонусы.</p>
                                    { errorLogin ? <div className='alert alert-warning' role='alert'>
                                        Проверьте правильность введенных данных. Возможно, такого пользователя не существует
                                    </div> : null }
                                    <form onSubmit={e => this.submitHandler(e)}>
                                        <div className='form-group mb-3'>
                                            <input
                                                className='form-control rounded-pill border-0 shadow-sm px-4' 
                                                type='email' 
                                                placeholder='Email'
                                                name='email'
                                                value={ email }
                                                onChange={e => this.changeHandler(e)} 
                                                required
                                                    />
                                        </div>
                                        <div className='form-group mb-3'>
                                            <input 
                                                className='form-control rounded-pill border-0 shadow-sm px-4 text-primary'
                                                type='password' 
                                                placeholder='Пароль'
                                                name='password'
                                                value={ password }
                                                onChange={e => this.changeHandler(e)}
                                                minLength='6'
                                                required />
                                        </div>
                                        <button type='submit' className='btn btn-block text-uppercase mb-2 rounded-pill shadow-sm login-button-blonda'>Войти</button>
                                        <p className='mt-4 text-muted'>
                                        У вас еще нет аккаунта? Тогда вы можете пройти <Link to='/signup'>регистрацию</Link></p>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
};

const mapStateToProps = state => ({
    isAuthenticated: state.authReducer.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);

// TODO добавить страницу восстановления пароля