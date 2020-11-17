import React, { useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { signup } from '../../actions/auth';

import './signup.css';

const SignUp = ({ signup, isAuthenticated }) => {

    const [ accountCreated, setAccountCreated ] = useState(false);

    const [ formData, setFormData ] = useState({
        email: '',
        first_name: '',
        last_name: '',
        password: '',
        re_password: ''
    });

    const { email, first_name, last_name, password, re_password } = formData;

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});

    const onSubmit = e => {
        e.preventDefault();

        if (password === re_password) {
            signup(email, first_name, last_name, password, re_password);
            setAccountCreated(true);
        }
    };

    if (isAuthenticated) {
        return <Redirect to='/' />
    }

    if (accountCreated) {
        return <Redirect to='/login'/>
    }

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
                        <div className='container'>
                            <div className='row mt-4'>
                                <div className='col-lg-10 col-xl-7 mx-auto'>
                                    <h3 className='display-4'>Регистрация</h3>
                                    <p className='text-muted mb-3 mt-2'>Пройдите регистрацию, чтобы иметь возможность заказывать товары и накапливать бонусы.</p>
                                    <form onSubmit={e => onSubmit(e)}>
                                        <div className='form-group mb-3'>
                                            <input
                                                className='form-control rounded-pill border-0 shadow-sm px-4' 
                                                type='email' 
                                                placeholder='Email'
                                                name='email'
                                                value={ email }
                                                onChange={e => onChange(e)} 
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
                                                onChange={e => onChange(e)} 
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
                                                onChange={e => onChange(e)} 
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
                                                onChange={e => onChange(e)}
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
                                                onChange={e => onChange(e)}
                                                minLength='6'
                                                required />
                                        </div>
                                        <p className='mt-4 text-muted'>
                                        У вас уже есть аккаунт? Тогда вы можете пройти <Link to='/login'>авторизацию</Link></p>
                                        <button type='submit' className='btn btn-primary btn-block text-uppercase mb-2 rounded-pill shadow-sm'>Войти</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )

};

const mapStateToProps = state => ({
    isAuthenticated: state.authReducer.isAuthenticated
});

export default connect(mapStateToProps, { signup })(SignUp);