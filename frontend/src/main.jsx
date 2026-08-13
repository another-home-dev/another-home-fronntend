import React from 'react';
import { createRoot } from 'react-dom/client';
import { AuthProvider } from '@asgardeo/auth-react';
import App from './app/App.jsx';
import './index.css';

import { asgardeoConfig } from '@features/authentication/infrastructure/asgardeoConfig';

createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <AuthProvider config={asgardeoConfig}>
            <App />
        </AuthProvider>
    </React.StrictMode>
);