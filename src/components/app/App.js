import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import AppHeader from "../appHeader/AppHeader";
import Spinner from "../spinner/Spinner";

const Page404 = lazy(() => import("../pages/Page404"));
const MainPage = lazy(() => import("../pages/MainPage"));
const ComicsPage = lazy(() => import("../pages/ComicsPage"));
const SingleComicLayout = lazy(() =>
  import("../pages/SingleComicLayout/SingleComicLayout")
);
const SingleCharacterLayout = lazy(() =>
  import("../pages/SingleCharacterLayout/SingleCharacterLayout")
);
const SinglePage = lazy(() => import("../pages/SinglePage/SinglePage"));

const App = () => {
  return (
    <Router>
      <div className="app">
        <AppHeader />
        <main>
          <Suspense fallback={<Spinner />}>
            <Routes>
              <Route exact path="/" element={<MainPage />} />
              <Route exact path="/comics" element={<ComicsPage />}></Route>
              <Route
                exact
                path="/comics/:id"
                element={
                  <SinglePage
                    BaseComponent={SingleComicLayout}
                    dataType="comic"
                  />
                }
              ></Route>
              <Route
                exact
                path="/characters/:id"
                element={
                  <SinglePage
                    BaseComponent={SingleCharacterLayout}
                    dataType="character"
                  />
                }
              ></Route>
              <Route path="*" element={<Page404 />}></Route>
            </Routes>
          </Suspense>
        </main>
      </div>
    </Router>
  );
};

export default App;
