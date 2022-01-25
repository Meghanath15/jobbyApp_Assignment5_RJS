import './index.css'

const Skills = props => {
  const {skillsList} = props

  const getFormattedData = data => ({
    name: data.name,
    imageUrl: data.image_url,
  })

  const formattedData = getFormattedData(skillsList)
  const {imageUrl, name} = formattedData

  return (
    <li className="skills-row">
      <img src={imageUrl} alt={name} className="skill-img" />
      <p className="life-content">{name}</p>
    </li>
  )
}

export default Skills
