import { Routes, Route, Link } from 'react-router-dom'
import './App.css';
import Header from "./Navbar/Header";
import News from "./Navbar/News";

function App() {
  return (
    <div className="App">
        <nav>
            <ul>
                <li>
                    <Link to="/">Home Page</Link>
                </li>
                <li>
                    <Link to="/news">News Page</Link>
                </li>
            </ul>
        </nav>

        <Routes>
            <Route path="/" element={<Header />} />
            <Route path="/news" element={<News />} />
        </Routes>
    </div>
  );
}

export default App;
