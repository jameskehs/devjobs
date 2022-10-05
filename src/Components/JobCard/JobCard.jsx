import { Link } from "react-router-dom";
import "./JobCard.css";
const JobCard = ({ job }) => {
  const { company, contract, location, logo, logoBackground, position, postedAt } = job;
  return (
    <Link className="jobcard-link" to={`/jobs/${job.id}`}>
      <div className="jobcard">
        <div className="jobcard-img" style={{ backgroundColor: logoBackground }}>
          <img src={logo} alt={`${company} Logo`} />
        </div>
        <div className="jobcard-contents">
          <p>
            {postedAt} &#9679; {contract}
          </p>
          <h3>{position}</h3>
          <p>{company}</p>
        </div>
        <p className="jobcard-location">{location}</p>
      </div>
    </Link>
  );
};

export default JobCard;
