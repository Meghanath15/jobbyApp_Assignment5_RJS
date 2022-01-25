import './index.css'

const Filters = props => {
  const {
    empList,
    salaryList,
    onCheckSalary,
    onCheckEmp,
    empTypeValue,
    salaryValue,
  } = props

  const renderTypeOfEmployment = () => (
    <ul className="emp-type-sal-list">
      {empList.map(eachType => {
        const {label, employmentTypeId} = eachType
        const onCheckEmpType = () => {
          onCheckEmp(employmentTypeId)
        }

        return (
          <li className="check-box" key={employmentTypeId}>
            <input
              id={employmentTypeId}
              type="checkbox"
              value={empTypeValue}
              onClick={onCheckEmpType}
            />
            <label htmlFor={employmentTypeId} className="label">
              {label}
            </label>
          </li>
        )
      })}
    </ul>
  )

  const renderSalaryRange = () => (
    <ul className="emp-type-sal-list">
      {salaryList.map(eachSal => {
        const {label, salaryRangeId} = eachSal
        const onCheckSalaryItem = () => {
          onCheckSalary(salaryRangeId)
        }

        return (
          <li className="check-box" key={salaryRangeId}>
            <input
              id={salaryRangeId}
              type="radio"
              value={salaryValue}
              onClick={onCheckSalaryItem}
            />
            <label htmlFor={salaryRangeId} className="label">
              {label}
            </label>
          </li>
        )
      })}
    </ul>
  )

  return (
    <div className="filter-container">
      <h1 className="filter-heading">Type of Employment</h1>
      {renderTypeOfEmployment()}
      <hr className="hr-line" />
      <h1 className="filter-heading">Salary Range</h1>
      {renderSalaryRange()}
    </div>
  )
}

export default Filters
