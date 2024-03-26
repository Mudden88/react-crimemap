import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Events from "./components/Events";
import Home from "./components/Home";
import Enter from "./components/Enter";
import Footer from "./components/Footer";

import "./App.css";

function App() {
  return (
    <>
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to='/'>Start</Link>
              </li>
              <li>
                <Link to='/home'>Händelser</Link>
              </li>
              <li>
                <Link to='/events'>Sök</Link>
              </li>
            </ul>
            <h1 className='title'>Brottsplatskartan</h1>
          </nav>
          <main>
            <Routes>
              <Route path='/' element={<Enter />} />
              <Route path='/home' element={<Home />} />
              <Route path='/events/:city?' element={<Events />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </>
  );
}

export default App;
