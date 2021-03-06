import React, { Component } from 'react';

import './popup-message-feedback.css';

export default class PopupMessageFeedback extends Component {

    state = {
        active: this.props.active
    }

    componentDidUpdate(prevProps) {
        if (this.props.active !== prevProps.active) {
            this.setState({
                active: this.props.active
            })
        }
    }

    render() {

        return (
            <div className='popup-base' aria-live='polite' aria-atomic='true'>
                <div className={ this.state.active ? 'toast show' : 'toast'}>
                    <div className='toast-header'>

                        <button 
                            type='button' 
                            className='ml-2 mb-1 close' 
                            data-dismiss='toast' 
                            aria-label='Close'
                            onClick={ () => this.props.activeHandler() }
                            >
                            <span aria-hidden='true'>&times;</span>
                        </button>

                    </div>
                    <div className='toast-body text-center'>
                    <i className='far fa-comment-dots'></i>
                    <p>Отзыв отправлен. Он будет опубликован после проверки модератором.</p>
                    </div>
                </div>
            </div>
        )
    }
}
