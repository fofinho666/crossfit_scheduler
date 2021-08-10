import React from "react"
import JobPovider from "./atoms/jobsProducer"
import JobList from "./organisms/jobList"
import NewJobButton from "./organisms/newJobButton"

const App = () => {

    return <JobPovider>
        <div className="container">
            <section className="section has-background-primary-dark p-2">
                <nav className="level is-mobile">
                    <div className="level-left">
                        <div className="level-item ">
                            <h1 className="title is-4 has-text-white">CrossFit Scheduler 🗓</h1>
                        </div>
                    </div>
                    <div className="level-right">
                        <div className="level-item">
                            <NewJobButton />
                        </div>
                    </div>
                </nav>
            </section>
            
            <JobList />
        </div>
    </JobPovider>
}

export default App