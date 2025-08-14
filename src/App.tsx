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
import BlogIndex from "./pages/BlogIndex";
import Privacy from "./pages/Privacy";
import Volunteer from "./pages/Volunteer";
import { PathProvider } from './contexts/PathContext';

const App = () => {
  return (
    <BrowserRouter>
      <PathProvider>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:projectId" element={<ProjectDetail />} />
            <Route path="/blog" element={<BlogIndex />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/volunteer" element={<Volunteer />} />
            <Route path="*" element={<Error />} />
          </Route>
        </Routes>
      </PathProvider>
    </BrowserRouter>
  );
};

export default App;