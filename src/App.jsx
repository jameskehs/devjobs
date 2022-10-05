import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import jobs from "./data";
import NavBar from "./Components/NavBar/NavBar";
import Home from "./Components/Home/Home";
import JobDetails from "./Components/JobDetails/JobDetails";

const App = () => {
  let savedTheme = localStorage.getItem("dev-jobs-theme");
  if (savedTheme === null) savedTheme = "light";

  const [theme, setTheme] = useState(savedTheme);
  const [filteredJobs, setFilteredJobs] = useState(jobs);

  useEffect(() => {
    localStorage.setItem("dev-jobs-theme", theme);
  }, [theme]);

  function toggleTheme() {
    setTheme((currentTheme) => (currentTheme === "light" ? "dark" : "light"));
  }

  function searchJobs(genericSearch, locationSearch, isFullTimeOnly) {
    genericSearch = genericSearch.replace(/\s+/g, "").toLowerCase();
    locationSearch = locationSearch.replace(/\s+/g, "").toLowerCase();

    if (genericSearch === "" && locationSearch === "" && !isFullTimeOnly) {
      setFilteredJobs(jobs);
      return;
    }
    const searchedJobs = jobs.filter((job) => {
      const formattedTitle = job.position.replace(/\s+/g, "").toLowerCase();
      const formattedCompany = job.company.replace(/\s+/g, "").toLowerCase();
      const formattedLocation = job.location.replace(/\s+/g, "").toLowerCase();
      console.log(formattedTitle, genericSearch);
      console.log(formattedCompany, genericSearch);
      console.log(formattedLocation, locationSearch);
      console.log(isFullTimeOnly);

      if ((formattedTitle.includes(genericSearch) || formattedCompany.includes(genericSearch)) && formattedLocation.includes(locationSearch)) {
        if (isFullTimeOnly) {
          if (job.contract === "Full Time") return job;
          else return null;
        } else return job;
      } else return null;
    });
    setFilteredJobs(searchedJobs);
  }

  return (
    <div className="App" id={theme}>
      <NavBar toggleTheme={toggleTheme} theme={theme} />
      <Routes>
        <Route path="/" element={<Home filteredJobs={filteredJobs} searchJobs={searchJobs} />}></Route>
        <Route path="/jobs/:jobID" element={<JobDetails />}></Route>
      </Routes>
    </div>
  );
};

export default App;
