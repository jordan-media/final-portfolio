// src/App.tsx

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import About from "./pages/About";
import Layout from "./layouts/Layout";
import ProjectDetail from "./pages/ProjectDetail";
import Blog from "./pages/Blog";
import Error from "./pages/Error";
import ScrollToTop from "./components/ScrollToTop";


const App = () => {
  // Explicitly typing the component as returning JSX.Element
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>

        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:projectId" element={<ProjectDetail />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
