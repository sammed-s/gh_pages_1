import Layout from "../layouts/Layout";
import Dashboard from "../pages/Dashboard";
import AIPageResult from "../pages/AIPageResult";
import QAPageResult from "../pages/QAPageResult";
import NotFound from "../pages/NotFound";

const routes = [
  {
    path: "/analysis/:paperId/:qKey/:token",
    element: (
      <Layout>
        <Dashboard />
      </Layout>
    ),
  },
  {
    path: "/AI/:aiPercentage/:paperId/:qKey/:token",
    element: (
      <Layout>
        <AIPageResult />
      </Layout>
    ),
  },
  {
    path: "/QA/:qaPercentage/:paperId/:qKey/:token",
    element: (
      <Layout>
        <QAPageResult />
      </Layout>
    ),
  },
  { path: "*", element: <NotFound /> },
];

export default routes;
