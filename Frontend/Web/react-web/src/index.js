import React from 'react';
import {render} from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import reportWebVitals from './reportWebVitals';
import { ThemeContextProvider } from './components/ThemeContext.js';
import { ModalContextProvider } from './pages/Modal/ModalContext';
import "leaflet-geometryutil";
import 'leaflet/dist/leaflet.css';


const rootElement = document.getElementById('root');
render(
    <ModalContextProvider>
    <ThemeContextProvider>
  <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
        </React.StrictMode>
    </ThemeContextProvider>
        </ModalContextProvider>,
    rootElement
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
