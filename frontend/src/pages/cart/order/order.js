import React, { Component } from 'react';
import BlondaShopService from '../../../service/blonda-shop-service';

import './order.css';

class Order extends Component {

    service = new BlondaShopService();

    state = {
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        region: '',
        district: '',
        city: '',

        deliveryItems: [],

        chooseDelivery: ''
    };

    getUserInfo() {
        this.service.getInfoForOrder()
            .then(info => {
            if (info.user) {
                this.setState({
                    firstName: info.user.first_name,
                    lastName: info.user.last_name,
                    phone: info.user.phone,
                    email: info.user.email
                })
            }
            if (info.delivery) {
                this.setState({
                    deliveryItems: info.delivery
                });
            };
        });
    };

    changeDeliveryHandler = (e) => {
        this.setState({
            chooseDelivery: e.target.id
        })
    };

    changeHandler = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        });
    };

    submitOrder(e) {
        e.preventDefault();
        const {
            firstName,
            lastName,
            phone,
            email,
            region,
            district,
            city,
            chooseDelivery
        } = this.state;
        this.service.submitOrder(
            firstName,
            lastName,
            phone,
            email,
            region,
            district,
            city,
            chooseDelivery
        );
        console.log('Was submit')
    };



    componentDidMount() {
        this.getUserInfo();
    };

    render() {
        
        const { firstName, lastName, phone, email, region, district, city } = this.state;

        const deliveryItems = this.state.deliveryItems.map(item => {
            return (
                <div className='col-md-6' key={ item.id }>
                    <input 
                        id={ item.id }
                        type='radio'
                        name='delivery'
                        value={ item.id }
                        onChange={ (e) => this.changeDeliveryHandler(e) }
                        required
                        />
                    <label 
                        className={`drinkcard-cc`}
                        style={{backgroundImage: `url(${item.logo})`}}
                        htmlFor={ item.id }
                        >
                    </label>
                </div>
            )
        })

        return (
            <div className='container mt-5'>
                <form onSubmit={ (e) => this.submitOrder(e) }>
                    <div className='row'>
                        <div className='col-md-4'>
                            <label htmlFor='lastName'><strong>Фамилия</strong></label>
                            <input 
                                type='text'
                                className='form-control'
                                id='lastName'
                                name='lastName'
                                onChange={ (e) => this.changeHandler(e) }
                                value={ lastName }
                                required
                            />

                            <label htmlFor='firstName' className='mt-3'><strong>Имя</strong></label>
                            <input 
                                type='text'
                                className='form-control'
                                id='firstName'
                                name='firstName'
                                onChange={ (e) => this.changeHandler(e) }
                                value={ firstName }
                                required
                            />

                            <label htmlFor='phone' className='mt-3'><strong>Телефон</strong></label>
                            <input 
                                type='phone'
                                className='form-control'
                                id='phone'
                                name='phone'
                                onChange={ (e) => this.changeHandler(e) }
                                value={ phone }
                                required
                            />
                            <label htmlFor='email' className='mt-3'><strong>E-mail</strong></label>
                            <input 
                                type='email'
                                className='form-control'
                                id='email'
                                name='email'
                                onChange={ (e) => this.changeHandler(e) }
                                value={ email }
                                required
                            />
                        </div>
                        <div className='col-md-4'>
                            
                            <label htmlFor='region' className=''><strong>Область</strong></label>
                            <input 
                                type='text'
                                className='form-control'
                                id='region'
                                name='region'
                                onChange={ (e) => this.changeHandler(e) }
                                value={ region }
                                required
                            />
                            <label htmlFor='district' className='mt-3'><strong>Район</strong></label>
                            <input 
                                type='text'
                                className='form-control'
                                id='district'
                                name='district'
                                onChange={ (e) => this.changeHandler(e) }
                                value={ district }
                            />
                            <label htmlFor='city' className='mt-3'><strong>Город</strong></label>
                            <input 
                                type='text'
                                className='form-control'
                                id='city'
                                name='city'
                                onChange={ (e) => this.changeHandler(e) }
                                value={ city }
                                required
                            />
                        </div>
                        <div className='col-md-4 delivery'>
                            <h4 className='text-center'>Выберите способ доставки</h4>
                            <div className='cc-selector mt-5 row text-center'>

                                { deliveryItems }

                            </div>
                            <button
                                type='submit'
                                className='btn btn-block text-uppercase mb-2 shadow-sm mt-3'>
                            Оформить заказ
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        );
    };
};

export default Order;