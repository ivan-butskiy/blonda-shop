import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteFromBasket } from '../../actions/basket';

import CartItem from './cart-item';

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
            // cartList: this.state.cartItems.map((item) => {
                return <CartItem 
                    key={item.slug}
                    slug={item.slug}
                    title={item.title}
                    price={item.price}
                    headerImage={item.headerImage}
                    size={item.size}
                    color={item.color}
                    delete={ () => this.deleteCartItem(item.slug) }
                    // delete={ () => this.props() }
                    />
            })
        });
    };

    deleteCartItem = (slug) => {
        this.props.deleteFromBasket(slug);
        console.log('Deleted', slug)
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
                <p className='count'><strong>Количество товаров в корзине:</strong> {this.props.count}</p>
                </div>
            </div>
        );
    };

}

const mapStateToProps = store => ({
    basketList: store.basketReducer.basketList,
    count: store.basketReducer.count
})

export default  connect(mapStateToProps, { deleteFromBasket })(Cart);