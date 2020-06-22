import React from 'react';
import { Loading } from '../../components';
import backgroundImage from '../../assets/images/app-intro-1.jpg';
import './Authorize.scss';

const Authorize = () => {
  return (
    <div className="callback" data-testid="callback" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="container">
        <Loading text="Autenticando..." />
      </div>
    </div>
  );
}

export default Authorize;

