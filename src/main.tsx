import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/globals.scss'
import App from './App.tsx'
import { ToastContainer, type TypeOptions } from 'react-toastify'
import { BrowserRouter } from 'react-router-dom'

const getCustomIcon = (type?: TypeOptions) => {
  switch (type) {
  case 'success':
    return <img src="/images/toast_success.svg" alt="toast-success" />
  case 'warning':
    return <img src="/images/toast_warning.svg" alt="toast-warning" />
  case 'error':
    return <img src="/images/toast_error.svg" alt="toast-error" />
  default:
    return <img src="/images/toast_info.svg" alt="toast-info" />
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
      <ToastContainer
        position="top-right"
        pauseOnFocusLoss={false}
        closeOnClick
        autoClose={3000}
        hideProgressBar={true}
        closeButton={false}
        icon={(context) => getCustomIcon(context?.type)}
        toastClassName={(context) => {
          const toastType = context?.type

          return toastType === 'success' ? 'success-toast' :
            toastType === 'error' ? 'error-toast' :
              toastType === 'warning' ? 'warning-toast' :
                'default-toast'
        }}
      />
    </BrowserRouter>
  </StrictMode>,
)
