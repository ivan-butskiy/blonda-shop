import React, { Component, Fragment } from 'react';

import BlondaShopService from '../../../service/blonda-shop-service';
import PopupMessageFeedback from '../popup-message-feedback/';
import './feedback-form.css';

class FeedBackForm extends Component {

    service = new BlondaShopService();

    state = {
        header: '',
        content: '',
        modalActive: false
    };

    handlerPopupActive = () => {
        if (this.state.modalActive === false) {
            this.setState({
                modalActive: true
            });
        } else if (this.state.modalActive === true) {
            this.setState({
                modalActive: false
            })
        }
        console.log(this.state.modalActive)
    }

    onChange = e => {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value 
        });
    };

    submitHandler = (e) => {
        e.preventDefault();
        this.service.submitFeedback(this.props.productId, this.state.header, this.state.content)
        this.handlerPopupActive();
    };

    render() {

        const { header, content } = this.state;

        return (
            <Fragment>
                <form 
                className='feedback-form mb-5'
                onSubmit={ e => this.submitHandler(e) }
                >
                <div className='form-group'>
                    <label for='feedbackHeader'><strong>Заголовок</strong></label>
                    <input 
                        type='text'
                        className='form-control'
                        id='feedbackHeader'
                        name='header'
                        value={ header }
                        onChange={ e => this.onChange(e) }
                        required
                        />
                </div>
                <div className='form-group'>
                    <label for='feedbackContent'><strong>Отзыв</strong></label>
                    <textarea 
                        type='text'
                        className='form-control'
                        id='feedbackContent'
                        name='content'
                        value={ content }
                        onChange={ e => this.onChange(e) }
                        required
                        />
                </div>
                <button 
                    type='submit'
                    onClick
                    className='btn '>Отправить
                </button>
            </form>
            <PopupMessageFeedback active={ this.state.modalActive } activeHandler={ this.handlerPopupActive } />
            </Fragment>
        );
    };
};

export default FeedBackForm;