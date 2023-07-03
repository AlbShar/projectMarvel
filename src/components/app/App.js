import AppHeader from "../appHeader/AppHeader";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  createBrowserRouter,
  useLocation,
  useOutlet,
} from "react-router-dom";
import { createRef } from "react";
import Page404 from "../pages/Page404";
import MainPage from "../pages/MainPage";
import ComicsPage from "../pages/ComicsPage";
import SingleComicPage from "../pages/singleComicPage/SingleComicPage";
import {
  SwitchTransition,
  CSSTransition,
  TransitionGroup,
} from "react-transition-group";

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
      <Router>
        <div className="app">
          <AppHeader />
          <main>
            <SwitchTransition>
              <CSSTransition
                key={location.key}
                timeout={300}
                classNames="fade"
              >
                <Routes location={location}>
                  <Route exact path="/">
                    <MainPage />
                  </Route>
                  <Route  path="/comics">
                    <ComicsPage />
                  </Route>
                  <Route  path="/comics/:comicId">
                    <SingleComicPage />
                  </Route>
                  <Route path="*">
                    <Page404 />
                  </Route>
                </Routes>
              </CSSTransition>
            </SwitchTransition>
          </main>
        </div>
      </Router>
    </div>
  );
}


