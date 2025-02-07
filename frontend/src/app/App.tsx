import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AppRoutes from "./routes/AppRoutes.tsx";
import { Provider } from 'react-redux';
import { store } from './store.ts';
import "../shared/styles/index.scss"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <AppRoutes />
    </Provider>
  </StrictMode>,
)
