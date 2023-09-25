import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import OrderDetail from '../components/_common/order/orderDetail';
import AuthLayout from '../pages/auth/authLayout';
import Login from '../pages/auth/login';
import BrandIndex from '../pages/brands/index';
import CategoryIndex from '../pages/category/index';
import Chat from '../pages/chat/chat';
import EmployeeManager from '../pages/employee/';
import ErrorPage from '../pages/error-page';
import Index from '../pages/index';
import Layout from '../pages/layout';
import OrderIndex from '../pages/orders/orders';
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
                children: [
                    { index: true, element: <ProductIndex /> },
                    {
                        path: 'new',
                        element: <ProductForm />,
                    },
                    {
                        path: ':id',
                        element: <ProductForm />,
                    },
                ],
            },

            {
                path: '/brand',
                element: <BrandIndex />,
            },
            {
                path: '/category',
                element: <CategoryIndex />,
            },
            {
                path: '/orders',
                children: [
                    { index: true, element: <OrderIndex /> },
                    { path: ':id', element: <OrderDetail /> },
                ],
            },
            {
                path: '/chat',
                children: [{ index: true, element: <Chat /> }],
            },
        ],
    },
    {
        path: '/',
        element: <AuthLayout />,
        children: [
            {
                path: '/login',
                element: <Login />,
            },
        ],
    },
]);
export default router;
