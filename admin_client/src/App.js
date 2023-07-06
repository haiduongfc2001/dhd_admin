import {Fragment, useContext, useEffect} from "react";
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import DefaultLayout from '~/components/Layout/DefaultLayout'
import "~/components/GlobalStyles/GlobalStyles.scss"
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import {publicRoutes, privateRoutes} from '~/routes';
import {AuthContext} from "~/context/AuthContext";

function App() {
    const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
        }
    }, [setIsLoggedIn]);

    return (
        <Router>
            <div className="App">
                <Routes>
                    {publicRoutes.map((route, index) => {
                        const Layout = route.layout === null ? Fragment : DefaultLayout;
                        const Page = route.component;
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
                    {privateRoutes.map((route, index) => {
                        const Layout = route.layout === null ? Fragment : DefaultLayout;
                        const Page = route.component;
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    isLoggedIn === true ? (
                                        <Layout>
                                            <Page />
                                        </Layout>
                                    ) : (
                                        <Navigate to="/admin/login" replace />
                                    )
                                }
                            />
                        );
                    })}

                    {/* Catch-all route for unknown routes */}
                    <Route path="*" element={<Navigate to="/not-found" />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;