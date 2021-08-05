import React from "react"
import JobPovider from "./atoms/jobsProducer"
import JobList from "./organisms/jobList"
import NewJobButton from "./organisms/NewJobButton"

const App = () => {


    return <div className="container is-mobile">
        <JobPovider>
            <NewJobButton />
            <JobList />
        </JobPovider>
    </div>
}

export default App