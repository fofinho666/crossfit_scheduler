import React from "react"
import EmptyValue from "../../atoms/emptyValue"
import ErrorValue from "../../atoms/errorValue"

const DaysInAdvance = ({ days }) => {
  
  return <Choose>
    <When condition={days == 1}>
      1 day
    </When>
    <When condition={days > 1 || days == 0}>
      {`${days} days`}
    </When>
    <When condition={days > 1 || days == 0}>
      <ErrorValue />
    </When>
    <Otherwise>
      <EmptyValue />
    </Otherwise>
  </Choose >
}

export default DaysInAdvance
