import React from 'react'
import { createBrowserRouter as Router, RouterProvider } from 'react-router-dom'
import PageNotFound from '../pages/PageNotFound'
import Password from "../pages/Password"
import Profile from '../pages/Profile'
import Register from '../pages/Register'
import Reset from '../pages/Reset'
import Recovery from '../pages/Recovery'
import Login from '../pages/Login'
import { AuthorizeUser, ProtectedRoute } from '../middlewares/auth'


const App = () => {

    const router = Router([
        {
            path: '/',
            element: <Login />
        },
        {
            path: '/register',
            element: <Register />
        },
        {
            path: '/profile',
            element: <AuthorizeUser><Profile /></AuthorizeUser>
        },
        {
            path: '/reset',
            element: <Reset />
        },
        {
            path: '/password',
            element: <ProtectedRoute><Password /></ProtectedRoute>
        },
        {
            path: '/recovery',
            element: <ProtectedRoute><Recovery /></ProtectedRoute>
        },
        {
            path: '*',
            element: <PageNotFound />
        }
    ])

  return (
    <div>
        <RouterProvider router={router} />
    </div>
  )
}

export default App