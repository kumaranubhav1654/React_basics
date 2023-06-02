import { Route, Routes, Link } from "react-router-dom";
import Home from "./components/Home";
//import Stocks from "./components/Stocks";
import Movies from "./components/Movies";

function App() {
  return (
    <div className="main">
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/movies">Movies</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/movies" Component={Movies} />
      </Routes>
    </div>
  );
}

export default App;
