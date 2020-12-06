import React, { Component } from 'react';

import './success-page.css';

class SuccessPage extends Component {


    render() {
        return (
            <div className='text-center success-page mt-5'>

                <i className='far fa-thumbs-up'></i>

                {this.props.location.state.orderNumber ? <p className='mt-4 order-item'>Номер заказа: { this.props.location.state.orderNumber }</p> : null}
                
                <h1 className='text-center mt-5'>Ваш заказ успешно оформлен!</h1>
                <p className='mt-5'>В скором времени с вами свяжется наш менеджер.</p>
            </div>
        );
    };
};

export default SuccessPage;