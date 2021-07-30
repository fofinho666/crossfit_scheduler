import React from "react"
import JobPovider from "./atoms/jobsProducer"
import JobList from "./molecules/jobList"
import JobForm from "./organisms/jobForm"

const App = () => {


    return <div className="container is-mobile">
        <JobPovider>
            <JobForm />
            <JobList />
        </JobPovider>
    </div>
}

export default App