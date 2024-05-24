import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom';
import GlobalStyles from '../src/components/GlobalStyles';
import AuthProvider from '../src/contexts/AuthContext';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <AuthProvider>
            <GlobalStyles>
                <Router>
                    <App />
                </Router>
            </GlobalStyles>
        </AuthProvider>
    </React.StrictMode>,
);

