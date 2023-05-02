import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import './App.css';
import Home from "~/pages/Home";
import Following from "~/pages/Following";
import { publicRoutes } from "~/routes";

function App() {
  return (
    <Router>
        <div className="App">
            <Routes>
                {publicRoutes.map((route, index) => {
                    const Page = route.component
                    return <Route key={index} path={route.path} element={<Page />} />
                })}
            </Routes>
        </div>
    </Router>
  );
}

export default App;
