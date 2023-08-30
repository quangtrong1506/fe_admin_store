import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import EmployeeManager from '../pages/employee/';
import ErrorPage from '../pages/error-page';
import Index from '../pages/index';
import Layout from '../pages/layout';
import ProductIndex from '../pages/products';
import ProductForm from '../pages/products/elements/forms';
import UserIndex from '../pages/users';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <Index />,
            },
            {
                path: '/employee-manager',
                element: <EmployeeManager />,
            },
            {
                path: '/users',
                element: <UserIndex />,
            },
            {
                path: '/products',
                element: <ProductIndex />,
            },
            {
                path: '/products/new',
                element: <ProductForm />,
            },
            {
                path: '/products/:id',
                element: <ProductForm />,
            },
        ],
    },
]);
export default router;
