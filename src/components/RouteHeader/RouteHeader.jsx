import PropTypes from 'prop-types';
import React from 'react';
import { RiArrowLeftLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import './RouteHeader.scss';

const RouterHeader = ({ categoryName, path }) => {
    return (
        <div className="route-header" data-testid="route-header">
            <div className="route-header__title-group">
                <Link to={path} className="back-button">
                    <RiArrowLeftLine />
                </Link>
                <span className="route-header__title">{categoryName}</span>
            </div>
        </div>
    )
};

RouterHeader.defaultProps = {
    path: '/dashboard',
}

RouterHeader.propTypes = {
    categoryName: PropTypes.string.isRequired,
    path: PropTypes.string,
}

export default RouterHeader;

