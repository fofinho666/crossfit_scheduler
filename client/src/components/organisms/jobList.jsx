import React from "react"
import JobRow from "../molecules/jobRow"
import { useJobs } from "../atoms/jobsProducer"

const JobList = () => {
    const { jobs } = useJobs()

    return (
        <div className="b-table">
            <div className="table-wrapper has-mobile-cards">
                <table className="table is-hoverable is-fullwidth">
                    <thead>
                        <tr>
                            <th>Job Name</th>
                            <th>Last run</th>
                            <th>Next run</th>
                            <th>Interval</th>
                            <th>Puppet</th>
                            <th>Class Local</th>
                            <th>Class Hour</th>
                            <th>Days in advance</th>
                        </tr>
                    </thead>

                    <tbody>
                        <For each="job" of={jobs}>
                            <JobRow key={job.id} job={job} />
                        </For>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default JobList
