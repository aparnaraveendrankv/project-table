import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


const Interviewtemplate = React.lazy(() => import("pages/Interviewtemplate"));
const ProjectRoutes = () => {
  return (
    <React.Suspense fallback={<>Loading...</>}>
      <Router>
        <Routes>
       
          <Route path="/" element={<Interviewtemplate />} />
        </Routes>
      </Router>
    </React.Suspense>
  );
};
export default ProjectRoutes;
