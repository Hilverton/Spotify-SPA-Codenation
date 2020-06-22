import React from 'react';
import { useSelector } from 'react-redux';
import { Player } from '../';

import './Dashboard.scss';

const Dashboard = ({ children }) => {
    const playerHeight = useSelector(state => state.content.playerHeight);
    return (
        <div 
            className="dashboard" 
            data-testid="dashboard"
            style={{paddingBottom: `${playerHeight}`}}
        >
            { children }
            <Player />
        </div>
    )
}

export default Dashboard;

