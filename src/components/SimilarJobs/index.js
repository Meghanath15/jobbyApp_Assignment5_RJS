import {BsStar, BsBag} from 'react-icons/bs'
import {GoLocation} from 'react-icons/go'

import './index.css'

const SimilarJobs = props => {
  const {similarJobsData} = props
  const {
    companyLogo,
    jobDescription,
    rating,
    title,
    location,
    eType,
  } = similarJobsData

  return (
    <li className="similar-job-card">
      <div className="logo-title-star-container">
        <img
          src={companyLogo}
          alt="similar job company logo"
          className="company-logo"
        />
        <div className="title-rating-container">
          <h1>{title}</h1>
          <div className="row1">
            <BsStar className="star" />
            <p className="rating">{rating}</p>
          </div>
        </div>
      </div>
      <h1 className="des-name">Description</h1>
      <p className="job-para">{jobDescription}</p>
      <div className="location-job-container">
        <div className="location-container">
          <GoLocation />
          <p className="location11">{location}</p>
        </div>
        <div className="location-container">
          <BsBag />
          <p className="location11">{eType}</p>
        </div>
      </div>
    </li>
  )
}

export default SimilarJobs
