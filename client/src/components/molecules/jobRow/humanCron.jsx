import React from "react"
import cronstrue from 'cronstrue'
import ErrorValue from "../../atoms/errorValue"

const HumanCron = ({ cron }) => {
  const humanCron = cronstrue.toString(cron, { verbose: true, use24HourTimeFormat: true, throwExceptionOnParseError: false })

  return <Choose>
    <When condition={humanCron.match(/error/i)}>
      <ErrorValue />
    </When>
    <Otherwise>
      {humanCron}
    </Otherwise>
  </Choose >
}

export default HumanCron
