import React from "react";
import SearchBar from "../SearchBar/SearchBar";
import AllJobs from "../AllJobs/AllJobs";

const Home = ({ filteredJobs, searchJobs }) => {
  return (
    <>
      <SearchBar searchJobs={searchJobs} />
      <AllJobs filteredJobs={filteredJobs} />
    </>
  );
};

export default Home;
