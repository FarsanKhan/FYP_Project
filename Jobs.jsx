import React from "react";
import { Routes, Route } from "react-router-dom";
import JobList from "./JobList";
import JobDetails from "./JobDetails";
import NotFound from "../NotFound";
import JobPosting from "./JobPosting";
import { useStore } from "../../lib/store";

const Jobs = () => {
  const user = useStore((state) => state.user);
  return (
    <Routes>
      {user.type === "employer" && (
        <>
          <Route path="/posting" element={<JobPosting />} />
          <Route path="/posting/:id" element={<JobPosting />} />
        </>
      )}
      <Route path="/:id" element={<JobList />} />
      <Route path="/*" element={<JobList />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Jobs;
