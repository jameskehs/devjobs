import "./AllJobs.css";
import JobCard from "../JobCard/JobCard";
import { useEffect, useState } from "react";

const AllJobs = ({ filteredJobs }) => {
  const [maxJobs, setMaxJobs] = useState(9);

  useEffect(() => {
    setMaxJobs(9);
  }, [filteredJobs]);
  function showMoreJobs() {
    setMaxJobs((prev) => prev + 3);
  }
  return (
    <div id="all-jobs">
      <div className="all-jobs-container">
        {filteredJobs.length < 1 && <p>No Results Found!</p>}
        {filteredJobs.map((job, index) => {
          if (index <= maxJobs - 1) return <JobCard job={job} key={job.id} />;
          else return "";
        })}
      </div>
      {filteredJobs.length - 1 > maxJobs && (
        <button className="button1 load-more-btn" onClick={() => showMoreJobs()}>
          Load More
        </button>
      )}
    </div>
  );
};

export default AllJobs;
