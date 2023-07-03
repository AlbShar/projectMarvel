import React from "react";
import ReactDOM from "react-dom";
import "./style/style.scss";
import AppHeader from "./components/appHeader/AppHeader";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  createBrowserRouter,
  useLocation,
  useOutlet,
  RouterProvider,
} from "react-router-dom";
import { createRef } from "react";
import Page404 from "./components/pages/Page404";
import MainPage from "./components/pages/MainPage";
import ComicsPage from "./components/pages/ComicsPage";
import SingleComicPage from "./components/pages/singleComicPage/SingleComicPage";
import {
  SwitchTransition,
  CSSTransition,
  TransitionGroup,
} from "react-transition-group";
import { createRoot } from "react-dom/client";
import "./index.css";

const routes = [
  { path: "/", name: "MainPage", element: <MainPage />, nodeRef: createRef() },
  {
    path: "/comics",
    name: "ComicsPage",
    element: <ComicsPage />,
    nodeRef: createRef(),
  },
  { path: "*", name: "Page404", element: <Page404 />, nodeRef: createRef() },
  {
    path: "/comics/:comicId",
    name: "SingleComicPage",
    element: <SingleComicPage />,
    nodeRef: createRef(),
  },
];

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: routes.map((route) => ({
      index: route.path === "/",
      path: route.path === "/" ? undefined : route.path,
      element: route.element,
    })),
  },
]);

function App() {
  const location = useLocation();

  return (
    <div>
      <div className="app">
        <AppHeader />
        <main>
          <TransitionGroup component={null}>
            <CSSTransition key={location.key} timeout={1300} classNames="fade">
              <Routes location={location}>
                <Route exact path="/" element={<MainPage />} />

                <Route path="/comics" element={<ComicsPage />} />

                <Route path="/comics/:comicId" element={<SingleComicPage />} />

                <Route path="*" element={<Page404 />} />
              </Routes>
            </CSSTransition>
          </TransitionGroup>
        </main>
      </div>
    </div>
  );
}

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<RouterProvider router={router} />);
