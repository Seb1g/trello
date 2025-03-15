import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AppRoutes from "./routes/AppRoutes.tsx";
import "../shared/styles/index.scss"
import {ReduxProvider} from "./providers/ReduxProvider.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ReduxProvider>
      <AppRoutes />
    </ReduxProvider>
  </StrictMode>,
)
