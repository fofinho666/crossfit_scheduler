import React from "react"
import EmptyValue from "./emptyValue"

const cell = ({children, ...props}) => {

  return <td {...props} >
    <Choose>
      <When condition={children}>
        {children}
      </When>
      <Otherwise>
        <EmptyValue />
      </Otherwise>
    </Choose >
  </td>
}

export default cell