import { useState } from "react";
import { useParams } from "react-router-dom";
import jobs from "../../data";
import "./JobDetails.css";
const JobDetails = ({ filteredJobs }) => {
  const { jobID } = useParams();
  const [selectedJob, setSelectedJob] = useState(
    jobs.find((job) => {
      return job.id.toString() === jobID;
    })
  );
  const { apply, company, contract, description, location, logo, position, postedAt, requirements, role, website } = selectedJob;

  return (
    <div id="jobdetails">
      <div className="jobdetails-company">
        <img src={logo} alt={`${company} Logo`} style={{ backgroundColor: selectedJob.logoBackground }} />
        <div>
          <h2>{company}</h2>
          <p>{website}</p>
        </div>
        <a href={website}>
          <button className="button2">Company Site</button>
        </a>
      </div>
      <div className="jobdetails-position">
        <div className="jobdetails-position-header">
          <p>
            {postedAt} &#9679; {contract}
          </p>
          <h1>{position}</h1>
          <p className="jobdetails-position-header-location">{location}</p>
          <a href={apply}>
            <button className="button1">Apply Now</button>
          </a>
        </div>
        <p className="jobdetails-desc">{description}</p>
        <div>
          <h3>Requirements</h3>
          <p>{requirements.content}</p>
          <ul>
            {requirements.items.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3>What You Will Do</h3>
          <p>{role.content}</p>
          <ol>
            {role.items.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ol>
        </div>
      </div>
      <div className="jobdetails-applyfooter">
        <div className="jobdetails-applyfooter-container">
          <div className="jobdetails-applyfooter-position">
            <h3>{position}</h3>
            <p>{company}</p>
          </div>

          <a href={apply}>
            <button className="button1 applyfooter-btn">Apply Now</button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
