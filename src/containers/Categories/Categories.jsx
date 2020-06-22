import React from 'react';
import { Loading } from '../../components';
import './Categories.scss';
import CategoryItem from './CategoryItem';

const Categories = ({ data, isLoading, url }) => {
    return (
        <div className="categories" data-testid="categories">
            <div className="container">
                <h3 className="categories__title">Categorias</h3>
                <div className="categories__content">
                    {
                        isLoading
                            ? <Loading text="Caregando..." />
                            : data?.length &&
                              data.map(category => {
                                return (
                                    <CategoryItem
                                        key={category.id}
                                        id={category.id}
                                        icon={category.icons[0]}
                                        name={category.name}
                                        url={url}
                                    />
                                );
                             })
                    } 
                </div>
            </div>
        </div>
    )
};

export default Categories;

