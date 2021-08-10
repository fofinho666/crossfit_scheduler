import React from "react"
import WeekDaysField from "../fields/weekDaysField"
import TimeField from "../fields/timeField"
import Tabs from "../../tabs"

const CronsFrom = () => {
  return <>
    <div className="field">
      <Tabs initialTab="Weekly Job">
        <WeekDaysField label="Weekly Job" />
        <p label="Monthly Job">ToD0</p>
      </Tabs>
    </div>

    <div className="field columns is-mobile is-centered">
      <div className="column is-narrow">
        <div className="label" label="start-time-group">Starts at</div>
        <TimeField labelledby="start-time-group" />
      </div>
    </div>
  </>
}

export default CronsFrom

