import React, { Component, Fragment } from 'react';

import './filter-panel.css';

class FilterPanel extends Component {

    render() {
        return (
            <Fragment>
            <h3 className='mb-4'>Фильтр</h3>
            <form className='container row filter-panel mb-5' onSubmit={ null }>
                <div className='col-md-6 mt-3'>
                    <small><strong>Желаемый размер:</strong></small>
                    <select 
                        className='custom-select mt-2' 
                        id='inputGroupSelect01'
                        name='chooseSize'
                        onChange={ null }
                        required>
                        <option value>Выберите размер</option>
                        <option key='1'>S</option>
                    </select>
                </div>
                <div className='col-md-6 mt-3'>
                    <small><strong>Желаемый цвет:</strong></small>
                    <select 
                        className='custom-select mt-2' 
                        id='inputGroupSelect02'
                        name='chooseColor'
                        onChange={ null }
                        required>
                        <option value>Выберите цвет</option>
                        <option key='1'>Red</option>
                    </select>
                </div>
                <button
                    type='submit'
                    className='btn btn-primary btn-block text-uppercase mb-3 shadow-sm mt-3'>
                    <i className='fa fa-shopping-cart mr-2'></i>В корзину
                </button>
            </form>
            </Fragment>
        );
    };
};

export default FilterPanel;