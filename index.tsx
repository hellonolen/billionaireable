import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { ConvexProvider, ConvexReactClient } from 'convex/react';
import { AuthProvider } from './contexts/AuthContext';

const CONVEX_URL = import.meta.env.VITE_CONVEX_URL;

if (!CONVEX_URL) {
  throw new Error("Missing Convex URL. Add VITE_CONVEX_URL to your .env.local file.");
}

const convex = new ConvexReactClient(CONVEX_URL);

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <ConvexProvider client={convex}>
      <BrowserRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </BrowserRouter>
    </ConvexProvider>
  </React.StrictMode>
);
