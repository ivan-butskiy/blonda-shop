import React, { Component } from 'react';

import './feedback-item.css';

class FeedBackItem extends Component {

    state = {
        header: this.props.header,
        text: this.props.text,
        date: this.props.date,
        firstName: this.props.firstName,
        lastName: this.props.lastName
    }

    render(){

        const { header, text, date, firstName, lastName } = this.state;
        return(
            <div className='card'>
                <div className='row d-flex'>
                    <i className='far fa-user-circle '></i>
                    <div className='d-flex flex-column'>
                        <div className='mb-0'>
                            <strong className='col-lg-6'>{ firstName } { lastName }</strong>
                        </div>
                    </div>
                    <div className='ml-auto'>
                        <p className='text-muted pt-2 pt-sm-2'>{ date }</p>
                    </div>
                </div>
                <div className='row text-left'>
                    <div className='blue-text'>
                        <p><strong>{ header }</strong></p>
                        <p className='content'>{ text }</p>
                    </div>
                </div>
            </div>
        );
    };
};

export default FeedBackItem;