import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './subcategory-item.css';

class SubcategoryItem extends Component {

    state = {
        slug: '',
        title: '',
        image: ''
    }

    componentDidMount() {
        this.setState({
            slug: this.props.subcategory.slug,
            title: this.props.subcategory.title,
            image: this.props.subcategory.subcategory_image
        });
    };

    onClickHandler = () => {
        this.props.setSubcategory(this.state.slug);
    };

    render() {

        const { image, title } = this.state;

        return (
            <Link className='subcategory nav-link px-4 rounded-pill' to={`/products/${this.props.category}/${this.props.subcategory.slug}/`} >
                <img src={ image } className='mr-2' alt={ title } />
                { title }
            </Link>
        )
    }
    
};

export default SubcategoryItem;

// TODO заменить localhost