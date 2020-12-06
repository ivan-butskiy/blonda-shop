import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteFromBasket, clearBasket } from '../../actions/basket';

import CartItem from './cart-item';
import Order from './order';

import './cart.css';

class Cart extends Component {

    constructor(props){
        super(props);
        this.state = {
            cartItems: this.props.basketList,
            cartList: null,
            sum: null
        };
    };

    getCartList() {
        this.setState({
            cartList: this.props.basketList.map((item) => {
                return <CartItem 
                    key={item.slug}
                    slug={item.slug}
                    title={item.title}
                    price={item.price}
                    headerImage={item.headerImage}
                    size={item.size}
                    color={item.color}
                    delete={ () => this.deleteCartItem(item.slug) }
                    />
            })
        });
    };

    deleteCartItem = (slug) => {
        this.props.deleteFromBasket(slug);
        this.getCartList();
        this.setState({cartItems: this.props.basketList});
        this.getTotalSum();
        
    }

    getTotalSum() {
        let count = 0;
        for (let item of this.props.basketList) {
            count += parseFloat(item.price);
        };
        this.setState({sum: count.toFixed(2)});
    }

    clearBasketHandler() {
        this.props.clearBasket();
        this.getCartList();
        this.setState({cartItems: this.props.basketList});
        this.getTotalSum();
    }

    componentDidUpdate(prevProps) {
        if (this.props.basketList !== prevProps.basketList) {
            this.setState({cartItems: this.props.basketList})
            this.getCartList();
            this.getTotalSum();
        }
    }

    componentDidMount() {
        this.setState({ cartItems: this.props.basketList })
        this.getCartList();
        this.getTotalSum();
    };

    render() {

        const { cartList, sum } = this.state;
        console.log(this.props.count)

        if (this.props.count < 1) {
            return (
                <div className='pb-5'>
                    <div className='container favorites'>
                        <div className='row text-center'>
                            <div className='empty col-lg-12 p-5 bg-white rounded shadow-sm mb-5'>
                                <i className='far fa-stars'></i>
                                <h3>Ваша корзина пока что пуста</h3>
                                <p>Но вы ее можете пополнить, начав покупки</p>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }

        return (
            <div className='pb-5'>
                <div className='container'>
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

                                { cartList }
                                
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                
                <div className='row justify-content-center'>
                    <div className='col-md-6'>
                        <p className='count'><strong>Общая сумма заказа:</strong> { sum } грн.</p>
                        <p className='count'><strong>Количество товаров в корзине:</strong> {this.props.count}</p>
                    </div>
                    <div className='col-md-6'>
                        <button
                            type='submit'
                            className='btn btn-block text-uppercase mb-2 shadow-sm mt-3'
                            onClick={ () => this.clearBasketHandler() }
                            >
                            Очистить корзину
                        </button>
                    </div>
                </div>
                </div>
                <hr className='mt-5 mb-5'></hr>
                <div className='order-in-cart container mt-5'>
                    <h3>Оформление заказа</h3>
                    <Order/>
                </div>
            </div>
        );
    };

}

const mapStateToProps = store => ({
    basketList: store.basketReducer.basketList,
    count: store.basketReducer.count
})

export default  connect(mapStateToProps, { deleteFromBasket, clearBasket })(Cart);