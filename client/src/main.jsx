import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Home from './pages/home/Home.jsx'
import Login from './pages/auth/login.jsx'
import Signup from './pages/auth/signup.jsx'
import { store } from './store/store.js'
import { Provider } from 'react-redux'
import ProtectedRoute from './components/ProtectedRoutes.jsx'
import PublicRoute from './components/PublicRoutes.jsx'
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        )
      },
      {
        path: "login",
        element: (
          <PublicRoute>
            <Login />
          </PublicRoute>
        )
      },
      {
        path: "signup",
        element: (
          <PublicRoute>
            <Signup />
          </PublicRoute>
        )
      },
    ],
  },
]);
createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
)
