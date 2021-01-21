import React, { Component, Fragment } from 'react';
import BlondaShopService from '../../../service/blonda-shop-service';

import './filter-panel.css';

class FilterPanel extends Component {

    service = new BlondaShopService();

    state = {
        colors: [],
        sizes: [],
        brands: [],

        filterSize: '',
        filterColor: '',
        filterBrand: '',
        minPrice: null,
        maxPrice: null,
        filterNew: false,
        filterSell: false
    };

    handlerFiltersChoose = (e) => {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        })
    };

    handlerSellChecked = (e) => {
        if (this.state.filterSell === false) {
            this.setState({filterSell: true})
        } else {
            this.setState({filterSell: false})
        };
    };

    handlerNewChecked = (e) => {
        if (this.state.filterNew === false) {
            this.setState({filterNew: true})
        } else {
            this.setState({filterNew: false})
        };
    };

    submitFilters = (e) => {
        e.preventDefault();
        const {
            filterSize,
            filterColor,
            filterBrand,
            minPrice,
            maxPrice,
            filterNew,
            filterSell
        } = this.state;

        this.props.filterHandler(
            filterSize,
            filterColor,
            filterBrand,
            minPrice,
            maxPrice,
            filterNew,
            filterSell
        );
    }

    componentDidMount() {
        this.service.getFilterInfo()
            .then((filter) => {
                this.setState({
                    sizes: filter.sizes,
                    colors: filter.colors,
                    brands: filter.brands
                });
            });
    };

    render() {


        const { colors, sizes, brands } = this.state;
        
        const sizeItems = sizes.map(size => (
            <option key={size.size}>{size.size}</option>
        ));

        const brandsItems = brands.map(brand => (
            <option key={brand.title}>{brand.title}</option>
        ))

        const colorItems = colors.map(color => (
            <option key={color.color}>{color.color}</option>
        ))

        const { filterSell } = this.state;

        return (
            <Fragment>
                <form className='container row filter-panel mb-5' onSubmit={ e => this.submitFilters(e) }>
                    <div className='col-md-4 mt-3'>
                        <div className='mt-3'>
                            <small><strong>Размер:</strong></small>
                            <select 
                                className='custom-select mt-2' 
                                id='inputGroupSelect01'
                                name='filterSize'
                                key='1'
                                onChange={ (e) => this.handlerFiltersChoose(e) }
                                required>
                                <option value>Выберите размер</option>
                                { sizeItems }
                            </select>
                        </div>
                        <div className='mt-3'>
                            <small><strong>Цвет:</strong></small>
                            <select 
                                className='custom-select mt-2' 
                                id='inputGroupSelect02'
                                name='filterColor'
                                key='2'
                                onChange={ (e) => this.handlerFiltersChoose(e) }
                                required>
                                <option value>Выберите цвет</option>
                                { colorItems }
                            </select>
                        </div>
                        
                    </div>
                    <div className='col-md-4 mt-3'>
                        <div className='mt-3'>
                            <small><strong>Бренд:</strong></small>
                            <select 
                                className='custom-select mt-2' 
                                id='inputGroupSelect03'
                                name='filterBrand'
                                onChange={ (e) => this.handlerFiltersChoose(e) }
                                key='3'
                                required>
                                <option value>Выберите бренд</option>
                                { brandsItems }
                            </select>
                        </div>
                        <div className='row mt-3'>
                            <div className='col-md-6'>
                                <small><strong>Цена от:</strong></small>
                                <input 
                                    type='number'
                                    min='1'
                                    name='minPrice'
                                    onChange={ (e) => this.handlerFiltersChoose(e) }
                                    className='form-control mt-2' />
                            </div>
                            <div className='col-md-6'>
                                <small><strong>Цена до:</strong></small>
                                <input 
                                    type='number'
                                    min='100'
                                    name='maxPrice'
                                    onChange={ (e) => this.handlerFiltersChoose(e) }
                                    className='form-control mt-2' />
                            </div>
                        </div>
                    </div>
                    <div className='col-md-4 mt-5 right-block'>
                        <div className='form-group form-check mt-3'>
                            <input 
                                type='checkbox' 
                                className='form-check-input' 
                                id='exampleCheck1'
                                name='filterNew'
                                onChange={ (e) => this.handlerNewChecked(e) } />
                            <label className='form-check-label' htmlFor='exampleCheck1'>Новинка</label>
                        </div>
                        <div className='form-group form-check mt-3'>
                            <input 
                                type='checkbox' 
                                className='form-check-input' 
                                id='exampleCheck2'
                                name='filterSell'
                                checked={ filterSell }
                                onChange={ (e) => this.handlerSellChecked(e) }
                                 />
                            <label className='form-check-label' htmlFor='exampleCheck2'>Акционный товар</label>
                        </div>
                        <button
                            type='submit'
                            className='btn btn-block text-uppercase mb-3 shadow-sm mt-3' >
                            <i className='far fa-search mr-2'></i>Поиск
                        </button>
                    </div>
                </form>
            </Fragment>
        );
    };
};

export default FilterPanel;
