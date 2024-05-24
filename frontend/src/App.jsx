import { Fragment, useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';

import { publicRoutes, privateRoutes } from './routes';
import DefaultLayout from './layouts/DefaultLayout';
import { useAuth } from './contexts/AuthContext';
import './App.css';
import { Provider } from 'react-redux';
import store from './redux/store';
import { ToastContainer } from 'react-toastify';

function App() {
    const { user } = useAuth();
    console.log('app user login', user);

    return (
        <div className="App">
            <ToastContainer />
            <Provider store={store}>
                <Routes>
                    {publicRoutes.map((route, index) => {
                        const Page = route.component;
                        let Layout = DefaultLayout;
                        if (route.layout) {
                            Layout = route.layout;
                        } else if (route.layout === null) {
                            Layout = Fragment;
                        }

                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}

                    {/* privateRoutes */}
                    {user && // Kiểm tra user có tồn tại hay không
                        privateRoutes.map((route, index) => {
                            const Page = route.component;
                            let Layout = DefaultLayout;
                            if (route.layout) {
                                Layout = route.layout;
                            } else if (route.layout === null) {
                                Layout = Fragment;
                            }

                            return (
                                <Route
                                    key={index}
                                    path={route.path}
                                    element={
                                        <Layout>
                                            <Page />
                                        </Layout>
                                    }
                                />
                            );
                        })}

                    {/* Điều hướng mặc định */}
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </Provider>
        </div>
    );
}

export default App;
