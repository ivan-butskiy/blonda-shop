import React, { Component } from 'react';

import FeedBackItem from '../feedback-item';
import BlondaShopService from '../../../service/blonda-shop-service';

import './feedbacks.css'

class FeedBacks extends Component {

    service = new BlondaShopService();

    state = {
        id: this.props.id,
        feedBacks: []
    };

    getFeedbacks = (productId) => {
        this.service.getFeedbacksList(productId)
        .then((feedback) => (
            this.setState({
                feedBacks: feedback.map(( feedback ) => {
                    return (
                        <FeedBackItem 
                            key={ feedback.id }
                            header={ feedback.header }
                            text={ feedback.text }
                            date={ feedback.adding_date }
                            firstName={feedback.author.first_name}
                            lastName={feedback.author.last_name}
                        />
                    )
                })
            })
        ))
    }

    componentDidUpdate(prevProps) {
        if (this.props.id !== prevProps.id) {
            this.setState({
                id: this.props.id
            });
            this.getFeedbacks(this.props.id);
        };
    };


    componentDidMount() {
        this.getFeedbacks(this.props.id);
    };

    render() {

        const { feedBacks } = this.state;

        return (
            <div className='feedbacks'>
                <h6 className='text-center mb-4'>Отзывы могут оставлять только авторизованные пользователи.</h6>
                { feedBacks } 
            </div>
        )
   };
};

export default FeedBacks;