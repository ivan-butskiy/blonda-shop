import React, { Component } from 'react';

import './spinner.css';

class Spinner extends Component {

    render() {

        return (
            <div className='spinner-border text-warning home-spinner' role='status'>
                <span className='sr-only'>Loading...</span>
            </div>
        );
    };
};

export default Spinner;
