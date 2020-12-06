import React, { Component } from 'react';
import { connect } from 'react-redux';

import CartItem from '../cart/cart-item';
import { deleteFromFavorite } from '../../actions/favorite';

import './favorites.css';

class Favorites extends Component {

    state = {
        favoriteList: null
    };

    getFavoriteList() {
        this.setState({
            favoriteList: this.props.favoriteList.map(item => {
                return <CartItem 
                    key={item.slug}
                    slug={item.slug}
                    title={item.title}
                    price={item.price}
                    headerImage={item.headerImage}
                    size={item.size}
                    color={item.color}
                    delete={() => this.deleteFavoriteItem(item.slug)}
                />
            })
        })
    };

    deleteFavoriteItem = (slug) => {
        this.props.deleteFromFavorite(slug);
        this.getFavoriteList();
    } 

    componentDidUpdate(prevProps) {
        if (this.props.favoriteList !== prevProps.favoriteList) {
            this.getFavoriteList();
            // this.getTotalSum();
        }
    }

    componentDidMount() {
        this.setState({ cartItems: this.props.favoriteList })
        this.getFavoriteList();
        // this.getTotalSum();
    };

    render() {

        const { favoriteList } = this.state;

        if (this.props.favoriteList.length < 1) {
            return (
                <div className='pb-5'>
                    <div className='container favorites'>
                        <div className='row text-center'>
                            <div className='empty col-lg-12 p-5 bg-white rounded shadow-sm mb-5'>
                                <i className='far fa-stars'></i>
                                <h3>Список желаемых товаров пока что пуст</h3>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }

        return (

            <div className='pb-5'>
                <div className='container favorites'>
                    <h1>Список желаемых товаров</h1>
                    <div className='row'>
                        <div className='col-lg-12 p-5 bg-white rounded shadow-sm mb-5'>

                        <div className='table-responsive'>

                            <table className='table'>

                                <thead>
                                    <tr>
                                        <th scope='col' className='border-0 bg-light'>
                                            <div className='p-2 px-3'>Товар</div>
                                        </th>
                                        <th scope='col' className='border-0 bg-light'>
                                            <div className='py-2'>Стоимость</div>
                                        </th>
                                        <th scope='col' className='border-0 bg-light'>
                                            <div className='py-2'>Размер</div>
                                        </th>
                                        <th scope='col' className='border-0 bg-light'>
                                            <div className='py-2'>Цвет</div>
                                        </th>
                                        <th scope='col' className='border-0 bg-light'>
                                            <div className='py-2'>Удалить</div>
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>

                                { favoriteList }
                                
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                </div>
            </div>
        );
    };
};

const mapStateToProps = store => ({
    favoriteList: store.favoriteReducer.favoriteList,
    favoriteCount: store.favoriteReducer.favoriteCount
})

export default connect(mapStateToProps, { deleteFromFavorite })(Favorites);