import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux'; // El componente que "distribuye" el estado
import { store } from './store';      // El store que configuramos antes
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        {/* El Provider debe envolver a <App /> para que CUALQUIER componente
            dentro de la jerarquía (rutas, páginas, botones) tenga acceso
            al estado global de Redux.
        */}
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>
);
