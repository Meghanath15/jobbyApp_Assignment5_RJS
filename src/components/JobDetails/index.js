import Cookies from 'js-cookie'
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {BsStar, BsBag} from 'react-icons/bs'
import {GoLocation} from 'react-icons/go'
import {RiExternalLinkFill} from 'react-icons/ri'
import Header from '../Header'
import SimilarJobs from '../SimilarJobs'
import Skills from '../Skills'
import './index.css'

const activeStatus = {
  Initial: 'Initial',
  progress: 'progress',
  success: 'success',
  failure: 'failure',
}

class JobDetails extends Component {
  state = {similarJob: '', jobDetailsList: '', status: activeStatus.Initial}

  componentDidMount() {
    this.getList()
  }

  updateList = data => {
    const List = data.job_details

    const jobData = {
      companyLogo: List.company_logo_url,
      websiteUrl: List.company_website_url,
      eType: List.employment_type,
      id: List.id,
      jobDescription: List.job_description,
      location: List.location,
      package1: List.package_per_annum,
      rating: List.rating,
      title: List.title,
      skills: List.skills,
      life: List.life_at_company,
    }

    const similarList = data.similar_jobs.map(each => ({
      companyLogo: each.company_logo_url,
      id: each.id,
      jobDescription: each.job_description,
      rating: each.rating,
      title: each.title,
      location: each.location,
      eType: each.employment_type,
    }))

    this.setState({
      jobDetailsList: jobData,
      status: activeStatus.success,
      similarJob: similarList,
    })
  }

  getList = async () => {
    this.setState({status: activeStatus.progress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const token = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    console.log(response)
    if (response.ok === true) {
      const data = await response.json()
      this.updateList(data)
    } else {
      this.setState({status: activeStatus.failure})
    }
  }

  onProgress = () => (
    <div className="loader-container" testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  onSuccess = () => {
    const {jobDetailsList, similarJob} = this.state
    const {
      companyLogo,
      eType,
      websiteUrl,
      jobDescription,
      location,
      package1,
      rating,
      title,
      skills,
      life,
    } = jobDetailsList
    return (
      <div className="similar-page2">
        <div className="job-card-detail">
          <div className="top-card">
            <img
              src={companyLogo}
              alt="job details company logo"
              className="company-logo"
            />
            <div className="title">
              <h1 className="title-font">{title}</h1>
              <div className="row">
                <p className="rating">
                  <BsStar className="star" />
                  {rating}
                </p>
              </div>
            </div>
          </div>
          <div className="font-cont">
            <div className="row">
              <div>
                <p className="fonts">
                  <GoLocation className="font" />
                  {location}
                </p>
              </div>
              <div>
                <p className="fonts">
                  <BsBag className="font" /> {eType}
                </p>
              </div>
            </div>
            <p className="package">{package1}</p>
          </div>
          <hr className="line-job" />
          <div className="row-link">
            <h1 className="des-name">Description</h1>
            <a href={websiteUrl} className="row-link">
              Visit
              <RiExternalLinkFill />
            </a>
          </div>
          <p className="job-para">{jobDescription}</p>
          <h1 className="skill-head">Skills</h1>
          <ul className="skill-cont">
            {skills.map(each => (
              <Skills skillsList={each} key={each.name} />
            ))}
          </ul>
          <h1 className="skill-head">Life at Company</h1>
          <div className="life-row">
            <p className="life-content">{life.description}</p>
            <img
              src={life.image_url}
              alt="life at company"
              className="company-img"
            />
          </div>
        </div>

        <h1 className="job-head">Similar jobs</h1>

        <ul className="similar-cont">
          {similarJob.map(each => (
            <SimilarJobs similarJobsData={each} key={each.id} />
          ))}
        </ul>
      </div>
    )
  }

  onRetry = () => this.getList()

  onFailure = () => (
    <div className="failure">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p className="warning">
        we cannot seem to find the page you are looking for{' '}
      </p>

      <button type="button" onClick={this.onRetry} className="retry-but">
        Retry
      </button>
    </div>
  )

  LoadingContent = () => {
    const {status} = this.state

    switch (status) {
      case 'success':
        return this.onSuccess()
      case 'failure':
        return this.onFailure()
      case 'progress':
        return this.onProgress()
      default:
        return null
    }
  }

  render() {
    // const {jobDetailsList} = this.state
    return (
      <div className="detail-cont">
        <Header />
        {this.LoadingContent()}
      </div>
    )
  }
}

export default JobDetails
