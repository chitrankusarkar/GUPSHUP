import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Home from './pages/home/Home.jsx'
import Login from './pages/auth/login.jsx'
import Signup from './pages/auth/signup.jsx'
import { store } from './store/store.js'
import {Provider} from 'react-redux'
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
]);

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
  <RouterProvider router={router}>
        <App />
  </RouterProvider>
  </Provider>
)