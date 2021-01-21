import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { signup, login } from '../../actions/auth';

import './signup.css';

class SignUp extends Component {

    state = {
        accountCreated: '',
        email: '',
        first_name: '',
        last_name: '',
        password: '',
        re_password: '',
        error: false
    };

    onChangeHandler(e) {
        if (this.state.error) {
            this.setState({ error: false })
        };
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    onSubmitHandler(e) {
        e.preventDefault();
        const { email, first_name, last_name, password, re_password } = this.state;
        this.props.signup(email, first_name, last_name, password, re_password)
            .then((result) => {
                if (!result) {
                    this.setState({error: true});
                } else {
                    this.props.login(email, password);
                };
            });
    };

    render() {

        const { 
            accountCreated, 
            email, 
            first_name, 
            last_name, 
            password, 
            re_password,
            error } = this.state;

        if (this.props.isAuthenticated) {
            return <Redirect to='/' />
        };
    
        if (accountCreated) {
            return <Redirect to='/login'/>
        };
    
        const style = {
            backgroundImage: 'url(https://jadone.biz/image/cache/data/slider/DSC00202z-1800x1020.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            minHeight: 'calc(100vh - 76px)'
        }
    
        return(
    
            <div className='container-fluid'>
                <div className='row no-gutter'>
                    <div className='col-md-6 d-none d-md-flex bg-image' style={style}></div>
                    <div className='col-md-6 bg-light'>
                        <div className='login d-flex align-items-center'>
                            <div className='row mt-4'>
                                <div className='col-lg-8 text-center mx-auto'>
                                    <h3 className='display-4 mt-3'>Регистрация</h3>
                                    <p className='text-muted mb-3 mt-2'>Пройдите регистрацию, чтобы иметь возможность заказывать товары и накапливать бонусы.</p>
                                    { error ? <div className='alert alert-warning' role='alert'>
                                    Ошибка регистрации. Проверьте правильность введенных данных и повторите попытку.
                                    </div> : null }
                                    <form onSubmit={e => this.onSubmitHandler(e)}>
                                        <div className='form-group mb-3'>
                                            <input
                                                className='form-control rounded-pill border-0 shadow-sm px-4' 
                                                type='email' 
                                                placeholder='Email'
                                                name='email'
                                                value={ email }
                                                onChange={e => this.onChangeHandler(e)} 
                                                required
                                                    />
                                        </div>
                                        <div className='form-group mb-3'>
                                            <input
                                                className='form-control rounded-pill border-0 shadow-sm px-4' 
                                                type='text' 
                                                placeholder='Ваше имя'
                                                name='first_name'
                                                value={ first_name }
                                                onChange={e => this.onChangeHandler(e)} 
                                                required
                                                    />
                                        </div>
                                        <div className='form-group mb-3'>
                                            <input
                                                className='form-control rounded-pill border-0 shadow-sm px-4' 
                                                type='text' 
                                                placeholder='Ваша фамилия'
                                                name='last_name'
                                                value={ last_name }
                                                onChange={e => this.onChangeHandler(e)} 
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
                                                onChange={e => this.onChangeHandler(e)}
                                                minLength='6'
                                                required />
                                        </div>
                                        <div className='form-group mb-3'>
                                            <input 
                                                className='form-control rounded-pill border-0 shadow-sm px-4 text-primary'
                                                type='password' 
                                                placeholder='Повторите пароль'
                                                name='re_password'
                                                value={ re_password }
                                                onChange={e => this.onChangeHandler(e)}
                                                minLength='6'
                                                required />
                                        </div>
                                        <button type='submit' className='btn btn-block text-uppercase mb-2 rounded-pill shadow-sm signup-button-blonda'>Войти</button>
                                        <p className='mt-4 text-muted'>
                                        У вас уже есть аккаунт? Тогда вы можете пройти <Link to='/login'>авторизацию</Link></p>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    
        )
    };

};

const mapStateToProps = state => ({
    isAuthenticated: state.authReducer.isAuthenticated
});

export default connect(mapStateToProps, { signup, login })(SignUp);