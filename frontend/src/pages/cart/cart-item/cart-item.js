import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './cart-item.css';

class CartItem extends Component {

    state = {
        slug: '',
        title: '',
        headerImage: '',
        price: '',
        size: '',
        color: '',
    }

    deleteItemFromBasket(slug) {
        this.props.deleteFromBasket(slug);
    }

    componentDidMount() {
        this.setState({
            slug: this.props.slug,
            title: this.props.title,
            headerImage: this.props.headerImage,
            price: this.props.price,
            size: this.props.size,
            color: this.props.color, 
        })
    }

    render() {

        const { slug, title, headerImage, price, size, color } = this.state;

        return (
            <tr>
                <th scope='row' className='border-0'>
                    <div className='p-2'>
                    <img src={ headerImage } alt='' width='70' className='img-fluid rounded shadow-sm' />
                    <div className='ml-3 d-inline-block align-middle'>
                        <h5 className='mb-0'>
                            <Link 
                                to={`/products/detail/${slug}/`} 
                                className='text-dark d-inline-block align-middle'>
                                { title }
                            </Link>
                        </h5>
                    </div>
                    </div>
                </th>

                <td className='border-0 align-middle'>{ price } грн</td>
                <td className='border-0 align-middle'>{ size }</td>
                <td className='border-0 align-middle'>{ color }</td>
                <td className='border-0 align-middle'>
                <i 
                    className='fa fa-trash basket-icon' 
                    onClick={ () => this.props.delete(slug) }>
                </i>

                </td>
            </tr>
        )
    }
}

export default (CartItem);