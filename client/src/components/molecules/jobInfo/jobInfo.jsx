import React, { useState } from "react"
import FormatedDate from "./formatedDate"
import HumanCron from "./humanCron"
import DaysInAdvance from "./daysInAdvance"
import isEqual from 'date-fns/isEqual'
import JobFailReason from "./jobFailReason"
import Cell from "../../atoms/cell"
import { capitalCase } from "change-case";

const JobInfo = ({ job }) => {

  function jobFailedCheck(failedAt, lastFinishedAt) {
    const failedDate = Date.parse(failedAt)
    const lastFinishedDate = Date.parse(lastFinishedAt)
    return isEqual(failedDate, lastFinishedDate)
  }

  const [expand, setExpand] = useState(false)

  const jobFailed = jobFailedCheck(job.failedAt, job.lastFinishedAt)

  const failedInfo = jobFailed ? "has-background-danger-dark has-text-white-bis" : ""

  return <>
    <tr className={failedInfo} onClick={() => { setExpand(!expand) }} >
      <Cell data-label="Job Name">{job.name}</Cell>
      <Cell data-label="Last run"><FormatedDate date={job.lastRunAt} /></Cell>
      <Cell data-label="Next run"><FormatedDate date={job.nextRunAt} /></Cell>
      <Cell data-label="Interval"><HumanCron cron={job.interval} /></Cell>
      <Cell data-label="Puppet">{capitalCase(job.puppet)}</Cell>
      <Cell data-label="Class Local">{job.local}</Cell>
      <Cell data-label="Class Hour">{job.hour}</Cell>
      <Cell data-label="Days in advance"><DaysInAdvance days={job.daysInAdvance} /></Cell>
    </tr>

    <If condition={expand && jobFailed}>
      <JobExpandable failReason={job.failReason} />
    </If>
  </>
}

const JobExpandable = ({ failReason }) => {
  const numCells = 8

  return <>
    <tr>
      <td colSpan={numCells}>
        <JobFailReason reason={failReason} />
      </td>
    </tr>
  </>

}

export default JobInfo
