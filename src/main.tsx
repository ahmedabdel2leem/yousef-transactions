import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { CustomersProvider } from './Context/CustomersContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(

  <CustomersProvider>
    <App />
  </CustomersProvider>

)
