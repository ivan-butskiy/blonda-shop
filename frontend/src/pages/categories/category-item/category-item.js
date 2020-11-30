import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './category-item.css';

class CategoryItem extends Component {

    state = {
        slug: '',
        title: '',
        image: '',
        section: ''
    }

    componentDidMount() {
        this.setState({
            slug: this.props.category.slug,
            title: this.props.category.title,
            image: this.props.category.category_image,
        });
    };

    render() {

        const { slug, image, title } = this.state;

        return (
            <div className="col-md-4 mb-3 mb-lg-0">
                <div className="hover hover-1 text-white rounded"><img src={ `http://localhost:8000${image}` } alt={ slug } />
                <div className="hover-overlay"></div>
                    <div className="hover-1-content px-5 py-4">
                        <h3 className="hover-1-title text-uppercase font-weight-bold mb-0">
                            <Link to={`/products/${slug}/`}>{ title }</Link>
                        </h3>
                    </div>
                </div>
            </div>
        )
    }
    
};

export default CategoryItem;

// TODO заменить localhost