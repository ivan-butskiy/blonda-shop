import React, { Component } from 'react';

import './contacts.css';

export default class Contacts extends Component {

    render() {

        return (
            <div className='pb-5 contacts'>
                <div className='container favorites'>
                    <div className='p-5 bg-white rounded shadow-sm mb-5'>
                        <p><i className='far fa-at mr-3'></i><strong>Почта:</strong> bestorytrand@gmail.com</p>
                        <p><i className='fab fa-telegram mr-3'></i><strong>Telegram:</strong> @be_story</p>
                        <p><i className='fab fa-instagram mr-3'></i><strong>Instagram:</strong> @be_story_trand</p>
                    </div>
                </div>
            </div>
        );
    };
};