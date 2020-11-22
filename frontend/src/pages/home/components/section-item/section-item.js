import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './section-item.css';

class SectionItem extends Component {

    state = {
        slug: '',
        title: '',
        image: ''
    }

    componentDidMount() {
        this.setState({
            slug: this.props.section.slug,
            title: this.props.section.title,
            image: this.props.section.section_image
        });
    };


    render() {

        const { slug, image, title } = this.state;

        return (
            <div className="col-lg-6 mb-3 mb-lg-0">
                <div className="hover hover-1 text-white rounded"><img src={ image } alt={ slug } />
                <div className="hover-overlay"></div>
                    <div className="hover-1-content px-5 py-4">
                        <h3 className="hover-1-title text-uppercase font-weight-bold mb-0" style={{color: 'white'}}>
                            <Link to={`/${slug}/`}>{ title }</Link>
                        </h3>
                    </div>
                </div>
            </div>
        )
    }
    
};

export default SectionItem;