import React from 'react';
import ReactDOM from 'react-dom/client';
import firebaseConfig from './Dbconnection/firebaseConfig';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import stors from './Features/Store/Store';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    
   <Provider store={stors}>
      <App />
   </Provider>

    
);


