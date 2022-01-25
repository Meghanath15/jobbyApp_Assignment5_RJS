import {Link} from 'react-router-dom'
import {BsStar, BsBag} from 'react-icons/bs'
import {GoLocation} from 'react-icons/go'

import './index.css'

const JobCard = props => {
  const {jobDetails} = props
  const {
    jobDescription,
    companyLogo,
    location,
    packages,
    rating,
    title,
    eType,
    jobId,
  } = jobDetails

  return (
    <Link to={`/jobs/${jobId}`} className="job-link">
      <li className="job-card">
        <div className="logo-title-star-container">
          <img src={companyLogo} alt="company logo" className="company-logo" />
          <div className="title-rating-container">
            <h1 className="title-name">{title}</h1>
            <div className="row">
              <p className="rating">
                <BsStar className="star" />
                {rating}
              </p>
            </div>
          </div>
        </div>
        <div className="location-job-package-container">
          <div className="row">
            <div className="row11">
              <p className="fonts">
                <GoLocation className="font" />
                {location}
              </p>
            </div>
            <div className="row11">
              <p className="fonts">
                <BsBag className="font" /> {eType}
              </p>
            </div>
          </div>
          <p className="package">{packages}</p>
        </div>
        <hr className="hr-line" />
        <h1 className="des-name">Description</h1>
        <p className="job-para">{jobDescription}</p>
      </li>
    </Link>
  )
}

export default JobCard
