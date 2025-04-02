import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import router from './router';

import {RouterProvider} from "react-router-dom";
const myrouter = router;
  
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <RouterProvider router={myrouter}/>   
  </React.StrictMode>
);





