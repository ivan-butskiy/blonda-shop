import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import './footer.css';

class Footer extends Component {

    date = new Date();
    year = this.date.getFullYear()

    render() {

        const isAuthenticated = this.props.isAuthenticated;

        return (
            <footer className=''>
                <div className='container py-5'>
                    <div className='row py-4'>
                        <div className='col-lg-4 col-md-6 mb-4 mb-lg-0'><img src='img/logo.png' alt='' width='180' className='mb-3' />
                            <p className='font-italic text-muted'>Интернет-магазин модной одежды для молодежи.</p>
                            <ul className='list-inline mt-4'>
                                <li className='list-inline-item'>
                                    <a href='https://www.instagram.com/be_story_trand/' rel="noreferrer" target='_blank' title='instagram'>
                                        <i className='fab fa-instagram' style={{color: '#ff9900'}}>
                                        </i>
                                    </a>
                                </li>
                                <li className='list-inline-item'> 
                                    <a href='http://t.me/be_story' rel="noreferrer" target='_blank' title='telegram'>
                                        <i className='fab fa-telegram' style={{color: '#ff9900'}}>
                                        </i>
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className='col-lg-2 col-md-6 mb-4 mb-lg-0'>
                        <h6 className='text-uppercase font-weight-bold mb-4'>Интернет-магазин</h6>
                        <ul className='list-unstyled mb-0'>
                            <li className='mb-2'><Link to='/categories/mens/' className='text-muted'>Для парней</Link></li>
                            <li className='mb-2'><Link to='/categories/womans/' className='text-muted'>Для девушек</Link></li>
                            <li className='mb-2'><Link to='/sale/' className='text-muted'>Sale</Link></li>
                            <li className='mb-2'><Link to='/new/' className='text-muted'>New</Link></li>
                        </ul>
                        </div>
                        <div className='col-lg-2 col-md-6 mb-4 mb-lg-0'>
                        <h6 className='text-uppercase font-weight-bold mb-4'>О компании</h6>
                        <ul className='list-unstyled mb-0'>
                            { !isAuthenticated ? <li className='mb-2'><Link to='/login/' className='text-muted'>Вход</Link></li> : null }
                            { !isAuthenticated ? <li className='mb-2'><Link to='/signup/' className='text-muted'>Регистрация</Link></li> : null }
                            
                            <li className='mb-2'><Link to='/contacts/' className='text-muted'>Контакты</Link></li>
                            <li className='mb-2'><Link to='/' className='text-muted'>Условия заказа</Link></li>
                        </ul>
                        </div>
                        <div className='col-lg-4 col-md-6 mb-lg-0'>
                        <h6 className='text-uppercase font-weight-bold mb-4'>Подписка</h6>
                        <p className='text-muted mb-4'>Подпишитесь на нашу рассылку, чтобы всегда быть в тренде.</p>
                        <div className='p-1 rounded border'>
                            <div className='input-group'>
                            <input type='email' placeholder='Введите свой e-mail' aria-describedby='button-addon1' className='form-control border-0 shadow-0' />
                            <div className='input-group-append'>
                                <button id='button-addon1' type='submit' className='btn btn-link'><i className='fa fa-paper-plane'></i></button>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>

                    <div className='bottom-footer py-4'>
                    <div className='container text-center'>
                        <p className='text-muted mb-0 py-2'>© { this.year } BeStory Trand Zone All rights reserved.</p>
                    </div>
                </div>
            </footer>
        )
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.authReducer.isAuthenticated
})

export default connect(mapStateToProps, null)(Footer);