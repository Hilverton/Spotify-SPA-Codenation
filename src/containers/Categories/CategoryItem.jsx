import React from 'react';
import { Link } from 'react-router-dom';
import Ink from 'react-ink';

const CategoryItem = ({ id, icon, name, url }) => {
    return (
        <div className="categories__item" style={{ backgroundImage: `url(${icon.url})` }} data-testid="category">
            <Link
                to={{ pathname: `${url}/${id}`, state: { categoryName: name } }}
                className="categories__item__link"
            >
                <span className="categories__item__title">{name}</span>
                <Ink />
            </Link>
        </div>
    );
}
export default CategoryItem;

