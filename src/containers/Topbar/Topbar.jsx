import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../../components';
import { useSelector } from 'react-redux';
import './Topbar.scss';
import userImage from '../../assets/images/userImage.jpg';

const Topbar = ({ logoff }) => {
    const user = useSelector(state => state.user);
    return (
        <header className="topbar" data-testid="topbar">
            <div className="container">
                <Link to="/dashboard">
                    <Logo />
                </Link>

                <div className="user">
                    <span className="user__name">{user.name}</span>

                    <figure className="user__thumb" onClick={() => logoff()}>
                        <img src={user.thumb || userImage} alt={user.name} />
                    </figure>
                </div>
            </div>
        </header>
    )
};

export default Topbar;
