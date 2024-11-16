import React from "react";
import { Routes, Route } from "react-router-dom";
import ResultList from "./ResultList";
import CompanyResults from "./CompanyResults";
import PostResults from "./PostResults";

const Results = () => {
  return (
    <Routes>
      <Route path="/" element={<ResultList />} />
      <Route path="/companies" element={<CompanyResults />} />
      <Route path="/posts" element={<PostResults />} />
    </Routes>
  );
};

export default Results;
