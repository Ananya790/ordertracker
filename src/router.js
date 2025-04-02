import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
 import Cookies from 'js-cookie';
import App from './App';
import ProtectedRoute from './ProtectedRoute';
import Home from './Home';
import Vehiclelist from './Vehiclelist';
import Leafletmap from './Leafletmap';

const getAccessToken = () => {
  return Cookies.get('cookieconstant');
}
const isAuthenticated = () => {
  console.log (getAccessToken()); 
  return (!!getAccessToken());
}
const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />,
      index: true
    },
  
    {
      element: <ProtectedRoute isAuthenticated={isAuthenticated()}
       />,
      children: [
        {
          path: '/Home',
          element: <Home />
        },
       
        {
          path: '/Vehiclelist',
          element: <Vehiclelist />
        },
        
        {
          path:'/leafletmap',
          element:<Leafletmap/>
        }, 
      ]
    },
    {
      path: '*',
      element: <p>404 Error - Nothing here...</p>
    }
  ]
);

export default router;