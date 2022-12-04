import { Fragment } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LayoutAdmin from "./layouts/LayoutAdmin";
import LayoutClient from "./layouts/LayoutClient";
import { privateRoutes, publicRoutes } from "./routes";
import NotFound from "./pages/Error/NotFound";
import LayoutProfile from "./layouts/LayoutProfile";
import "./App.less";

function App() {
  return (
    <Router>
      <Routes>
        {privateRoutes.map((route, index) => {
          const Page = route.component;
          const Layout = route.layout === null ? Fragment : LayoutAdmin;
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
        {publicRoutes.map((route, index) => {
          const Page = route.page;
          const Layout = route.layout === null ? Fragment : LayoutClient;
          return (
            <Route
              key={"public-route" + index}
              path={route.path}
              element={
                <Layout>
                  {route.path.includes("profile") ? (
                    <LayoutProfile>
                      <Page />
                    </LayoutProfile>
                  ) : (
                    <Page />
                  )}
                </Layout>
              }
            />
          );
        })}
        <Route path="*" element={<NotFound />} />
        <Route path="404" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
