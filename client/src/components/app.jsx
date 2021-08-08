import React from "react"
import JobPovider from "./atoms/jobsProducer"
import JobList from "./organisms/jobList"
import NewJobButton from "./organisms/newJobButton"

const App = () => {

    return <JobPovider>
        <div className="container">
            
            <section class="section has-background-primary-dark p-2">
                <nav class="level is-mobile">
                    <div class="level-left">
                        <div class="level-item ">
                            <h1 className="title is-4 has-text-white">CrossFit Scheduler 🗓</h1>
                        </div>
                    </div>
                    <div class="level-right">
                        <div class="level-item">
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