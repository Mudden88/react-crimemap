import Events from "./components/Events";
import Enter from "./components/Enter";
import Home from "./components/Home";
import Footer from "./components/Footer";

import {
  createHashRouter,
  Link,
  Outlet,
  RouterProvider,
} from "react-router-dom";

import "./App.css";

function Root() {
  return (
    <>
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
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

function App() {
  const router = createHashRouter([
    {
      children: [
        { element: <Enter />, path: "/" },
        { element: <Home />, path: "/home" },
        { element: <Events />, path: "/events" },
      ],
      element: <Root />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
