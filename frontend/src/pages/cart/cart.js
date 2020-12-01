import React, { Component } from 'react';
import { connect } from 'react-redux';

import CartItem from './cart-item';

import BlondaShopService from '../../service/blonda-shop-service';

import './cart.css';

class Cart extends Component {

    constructor(props){
        super(props);
        this.state = {
            counter: 0,
            cartItems: JSON.parse(this.props.basketList),
            cartList: null,
            sum: null
        };
    };

    service = new BlondaShopService();

    getCartList() {
        this.setState({
            cartList: this.state.cartItems.map((item) => {
                return <CartItem 
                    key={item.slug}
                    slug={item.slug}
                    title={item.title}
                    price={item.price}
                    headerImage={item.headerImage}
                    size={item.size}
                    color={item.color}
                    />
            })
        });
    };

    getTotalSum() {
        let count = 0;
        for (let item of this.state.cartItems) {
            count += parseFloat(item.price);
        };
        this.setState({sum: count.toFixed(2)});
    }

    componentDidUpdate(prevProps) {
        if (this.props.count !== prevProps.count) {
            console.log('Количество из props при update', this.props.count);
            console.log('BasketList при update', JSON.parse(this.props.basketList));
            this.setState({cartItems: JSON.parse(this.props.basketList)})
            this.setState({
                cartList: this.state.cartItems.map((item) => {
                    return <CartItem 
                        key={item.slug}
                        slug={item.slug}
                        title={item.title}
                        price={item.price}
                        headerImage={item.headerImage}
                        size={item.size}
                        color={item.color}
                    />
                })
            })
            console.log(this.state.cartItems.length)
        };
    };

    componentDidMount() {
        this.getCartList();
        this.getTotalSum();
    };

    render() {

        const { cartList, sum } = this.state;

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
                
                <p className='count'><strong>Общая сумма заказа:</strong> { sum } грн.</p>
                <p>Количество товаров в корзине: {this.props.count}</p>
                </div>
            </div>
        );
    };

}

const mapStateToProps = store => ({
    basketList: store.basketReducer.basketList,
    count: store.basketReducer.count
})

export default  connect(mapStateToProps, null)(Cart);