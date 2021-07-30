import React from "react"
import JobInfo from "../molecules/jobInfo/jobInfo"
import { useJobs } from "../atoms/jobsProducer"

const JobList = () => {
    const { jobs } = useJobs()

    return (
        <For each="job" of={jobs}>
            <JobInfo key={job.id} job={job} />
        </For>
    )
}

export default JobList
