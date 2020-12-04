import React, { Component } from 'react';

class Order extends Component {

    render() {
        return (
            <div className='container mt-5'>
                <form>
                    <div className='col-md-6'>
                        <label for='lastName'><strong>Фамилия</strong></label>
                        <input 
                            type='text'
                            className='form-control'
                            id='lastName'
                            name='lastName'
                            value='lastName'
                            required
                        />

                        <label for='firstName' className='mt-3'><strong>Имя</strong></label>
                        <input 
                            type='text'
                            className='form-control'
                            id='firstName'
                            name='firstName'
                            value='firstName'
                            required
                        />

                        <label for='patronym' className='mt-3'><strong>Отчество</strong></label>
                        <input 
                            type='text'
                            className='form-control'
                            id='patronym'
                            name='patronym'
                            value='patronym'
                            required
                        />
                    </div>
                </form>
            </div>
        );
    };
};

export default Order;