import Cookies from 'js-cookie'
import {Component} from 'react'

import './index.css'

class Profile extends Component {
  state = {
    profiles: '',
    loadData: false,
  }

  componentDidMount() {
    this.getProfile()
  }

  getFormattedProfileList = profile => ({
    name: profile.name,
    profileImageUrl: profile.profile_image_url,
    shortBio: profile.short_bio,
  })

  getProfile = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/profile`

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = this.getFormattedProfileList(
        fetchedData.profile_details,
      )

      this.setState({profiles: updatedData, loadData: true})
    }
  }

  showProfile = () => {
    this.getProfile()
  }

  render() {
    const {profiles, loadData} = this.state
    const {name, profileImageUrl, shortBio} = profiles
    return loadData ? (
      <div className="profile">
        <img className="profile-pic" src={profileImageUrl} alt="profile" />
        <h1 className="name">{name}</h1>
        <p className="bio">{shortBio}</p>
      </div>
    ) : (
      <div className="retry">
        <button className="retry-btn" type="button" onClick={this.showProfile}>
          Retry
        </button>
      </div>
    )
  }
}

export default Profile
