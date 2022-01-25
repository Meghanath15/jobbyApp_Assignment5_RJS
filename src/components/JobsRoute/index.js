import Cookies from 'js-cookie'
import {Component} from 'react'

import {BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import Profile from '../Profile'
import JobCard from '../JobCard'
import Filters from '../Filters'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobsRoute extends Component {
  state = {
    jobsList: [],
    apiStatus: apiStatusConstants.initial,
    empList1: [],
    salaryList1: [],
    searchInput: '',
    empType: '',
    salary: '',
  }

  componentDidMount() {
    this.getJobsList()
  }

  onCheckSalary = Id => {
    const {salaryList1} = this.state
    if (salaryList1.includes(Id)) {
      const genL = salaryList1.filter(each => each !== Id)
      const genJ = genL.join(',')

      this.setState({salary: genJ, salaryList1: genL}, this.getJobsList)
    } else {
      salaryList1.push(Id)
      const dess = salaryList1.join(',')
      this.setState({salary: dess, salaryList1}, this.getJobsList)
    }
  }

  onCheckEmp = Id => {
    const {empList1} = this.state
    if (empList1.includes(Id)) {
      const genL = empList1.filter(each => each !== Id)
      const genJ = genL.join(',')
      this.setState({empType: genJ, empList1: genL}, this.getJobsList)
    } else {
      empList1.push(Id)
      const des = empList1.join(',')
      this.setState({empType: des, empList1}, this.getJobsList)
    }
  }

  getJobsList = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {searchInput, salary, empType} = this.state
    const token = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs?employment_type=${empType}&minimum_package=${salary}&search=${searchInput}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.jobs.map(eachJob => ({
        jobDescription: eachJob.job_description,
        companyLogo: eachJob.company_logo_url,
        location: eachJob.location,
        packages: eachJob.package_per_annum,
        rating: eachJob.rating,
        title: eachJob.title,
        eType: eachJob.employment_type,
        jobId: eachJob.id,
      }))
      this.setState({
        jobsList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderNoJobsView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
      />
      <h1>No Jobs Found</h1>
      <p>We could not find any jobs. Try other filters</p>
    </div>
  )

  renderSuccessView = () => {
    const {jobsList} = this.state
    if (jobsList.length === 0) {
      return this.renderNoJobsView()
    }
    return (
      <ul>
        {jobsList.map(eachJob => (
          <JobCard key={eachJob.id} jobDetails={eachJob} />
        ))}
      </ul>
    )
  }

  renderLoadingView = () => (
    <div testid="loader" className="loader-container">
      <Loader type="ThreeDots" color="blue" height={50} width={50} />
    </div>
  )

  onClickRetryButton = () => this.getJobsList()

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>we cannot seem to find the page you are looking for </p>
      <div className="retry">
        <button
          className="retry-button"
          type="button"
          onClick={this.onClickRetryButton}
        >
          Retry
        </button>
      </div>
    </div>
  )

  renderFinalJobsList = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  onClickSearchButton = () => {
    this.getJobsList()
  }

  onChangeSearch = event => {
    this.setState({searchInput: event.target.value})
  }

  render() {
    const {searchInput, salaryValue, eTypeValue} = this.state
    return (
      <>
        <div className="jobs-main-container">
          <Header />
          <div className="jobs-home-content">
            <div className="filters-container">
              <div>
                <Profile />
                <hr />
              </div>
              <div>
                <Filters
                  empList={employmentTypesList}
                  salaryList={salaryRangesList}
                  onCheckEmp={this.onCheckEmp}
                  onCheckSalary={this.onCheckSalary}
                  empTypeValue={eTypeValue}
                  salaryValue={salaryValue}
                />
              </div>
            </div>
            <div className="jobs-card-container">
              <div className="search-container">
                <input
                  type="search"
                  placeholder="Search"
                  className="search-input"
                  value={searchInput}
                  onChange={this.onChangeSearch}
                />
                <button
                  type="button"
                  testid="searchButton"
                  className="search-button"
                  onClick={this.onClickSearchButton}
                >
                  <BsSearch className="search-icon" />
                </button>
              </div>
              <div className="job-cards">
                <div>{this.renderFinalJobsList()}</div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default JobsRoute
