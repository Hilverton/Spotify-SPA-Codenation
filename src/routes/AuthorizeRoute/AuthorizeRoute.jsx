import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { authCallbackError, authCallbackSucess } from '../../actions';
import { Authorize } from '../../containers';
import { getInfoFromUrlHash } from '../../modules/url';

const AuthorizeRoute = () => {
  const [redirect, setRedirect] = useState(false);
  const isLogged = useSelector(state => state.auth.isLogged);
  const dispatch = useDispatch();

  const urlHash = window.location.hash;

  useEffect(() => {
    const hashData = getInfoFromUrlHash(urlHash);
    console.log('autorizou ou não? ',hashData)
    if (hashData.error) {
      dispatch(authCallbackError(hashData.error));

      return;
    }

    dispatch(authCallbackSucess(hashData));
  }, [dispatch, urlHash]);

  useEffect(() => {
    if (isLogged) {
      setTimeout(
        () => setRedirect(true),
        3000);
    }
  }, [isLogged]);

  if (redirect) {
    return (<Redirect to={{ pathname: '/dashboard' }} />);
  }

  return (<Authorize />);
}

export default AuthorizeRoute;