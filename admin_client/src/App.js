import {Fragment} from "react";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import DefaultLayout from '~/components/Layout/DefaultLayout'
import {publicRoutes} from "~/routes";
import "~/components/GlobalStyles/GlobalStyles.scss"
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
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
                                        <Page/>
                                    </Layout>
                                }
                            />
                        );
                    })}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
