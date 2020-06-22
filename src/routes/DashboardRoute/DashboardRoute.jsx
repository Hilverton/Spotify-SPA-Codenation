// import React, { useEffect } from 'react';
// import {  Switch, useRouteMatch } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
// import { Dashboard, Topbar, PrivateRoute, Categories } from '../containers';
// import { WelcomeBox } from '../components';
// import PlaylistsRoute from './PlaylistsRoute';
// import TracksRoute from './TracksRoute';
// import {
//   getCategoriesFailed,
//   getCategoriesRequest,
//   getCategoriesSuccess,
//   getUserFailed,
//   getUserRequest,
//   getUserSuccess,
//   logout,
// } from '../actions';
// import { endpoints } from '../modules/endpoints';
// import { request } from '../modules/request';

// const { getCategories, getUserProfile,  } = endpoints;

// const DashboardRoute = () => {
//   const { auth, user, content } = useSelector(state => state);
//   const { categories } = content;
//   const dispatch = useDispatch();
//   const { path, url } = useRouteMatch();

//   useEffect(() => {
//     console.log('Aqui', auth.tokenType);
//     const requestOptions = {
//       ...getUserProfile.options,
//       headers: { 'Authorization': `${auth.tokenType} ${auth.accessToken}` }
//     }

//     dispatch(getUserRequest());

//     request(getUserProfile.url, requestOptions)
//       .then(data => {
//         console.log('Dado depois do requeste: ',data);
//         return dispatch(getUserSuccess(data))
//       })
//       .catch(error => {
//         if (error === 401) {
//           console.log('Logout');
//           //dispatch(logout());
//           dispatch(getUserFailed(error));
//           return;
//         }

//         dispatch(getUserFailed(error));
//       });
//   }, [auth, dispatch]);

//   useEffect(() => {
//     const requestOptions = {
//       ...getCategories.options,
//       headers: { 'Authorization': `Bearer ${auth.accessToken}` }
//     }

//     dispatch(getCategoriesRequest());

//     request(getCategories.url, requestOptions)
//       .then(data => dispatch(getCategoriesSuccess(data)))
//       .catch(error => {
//         if (error === 401) {
//           dispatch(logout());

//           return;
//         }

//         dispatch(getCategoriesFailed(error))
//       });

//   }, [auth, dispatch]);

//   const DashboardChildren = () => (
//     <>
//       <WelcomeBox name={user.name} />
//       <Categories
//         isLoading={content.status === 'running' && categories.length === 0}
//         categories={categories}
//         url={url}
//       />
//     </>
//   );

//   return (
//     <Dashboard>
//       <Topbar />
//       <Switch>
//         <PrivateRoute exact path={path}>
//           <DashboardChildren />
//         </PrivateRoute>
//         <PrivateRoute exact path={`${path}/:categoryId`}>
//           <PlaylistsRoute path={path} />
//         </PrivateRoute>
//         <PrivateRoute exact path={`${path}/:categoryId/:playlistId`}>
//           <TracksRoute />
//         </PrivateRoute>
//       </Switch>
//     </Dashboard>
//   )
// }

// export default DashboardRoute;

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Switch,
  useRouteMatch,
} from 'react-router-dom';

import {
  getCategoriesFailed,
  getCategoriesRequest,
  getCategoriesSuccess,
  getUserFailed,
  getUserRequest,
  getUserSuccess,
  logout,
} from '../../actions';

import { endpoints } from '../../modules/endpoints';
import { request } from '../../modules/request';

import { WelcomeBox } from '../../components';
import {
  Categories,
  Dashboard,
  PrivateRoute,
  Topbar,
} from '../../containers';

import PlaylistsRoute from '../PlaylistsRoute';
import TracksRoute from '../TracksRoute';

const { getCategories, getUserProfile,  } = endpoints;

const DashboardRoute = () => {
  const { auth, content, user } = useSelector(state => state);
  const { path, url } = useRouteMatch();
  const dispatch = useDispatch();

  useEffect(() => {
    const requestOptions = {
      ...getUserProfile.options,
      headers: { 'Authorization': `Bearer ${auth.accessToken}` }
    }

    dispatch(getUserRequest());

    request(getUserProfile.url, requestOptions)
      .then(data => dispatch(getUserSuccess(data)))
      .catch(error => {
        if (error === 401) {
          dispatch(logout());

          return;
        }

        dispatch(getUserFailed(error));
      });

  }, [auth, dispatch]);

  useEffect(() => {
    const requestOptions = {
      ...getCategories.options,
      headers: { 'Authorization': `Bearer ${auth.accessToken}` }
    }

    dispatch(getCategoriesRequest());

    request(getCategories.url, requestOptions)
      .then(data => dispatch(getCategoriesSuccess(data)))
      .catch(error => {
        if (error === 401) {
          dispatch(logout());

          return;
        }

        dispatch(getCategoriesFailed(error))
      });

  }, [auth, dispatch]);

  function logoff() {
    let check = window.confirm('Deseja sair?');
    if(check) dispatch(logout());
  }

  return (
    <Dashboard>
      <Topbar logoff={logoff} />

      <Switch>
        <PrivateRoute exact path={path}>
          <WelcomeBox name={user.name} />

          <Categories
            isLoading={content.status === 'running' && content.categories.length === 0}
            data={content.categories}
            url={url}
          />
        </PrivateRoute>

        <PrivateRoute exact path={`${path}/:categoryId`}>
          <PlaylistsRoute path={path} />
        </PrivateRoute>

        <PrivateRoute exact path={`${path}/:categoryId/:playlistId`}>
          <TracksRoute />
        </PrivateRoute>
      </Switch>
    </Dashboard>
  );
}

export default DashboardRoute;