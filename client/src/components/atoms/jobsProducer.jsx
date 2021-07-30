import React, { createContext, useContext, useEffect, useState } from "react"
import { getJobs } from "../../services/jobsApi"

const JobsContext = createContext()

export function useJobs() {
  return useContext(JobsContext)
}

export default function JobPovider({ children }) {
  const [jobs, setJobs] = useState([])
  const loadJobs = () => { getJobs().then(setJobs) }

  useEffect(() => { loadJobs() }, [])

  return (
    < JobsContext.Provider value={{ jobs, setJobs }} >
      {children}
    </JobsContext.Provider >
  )
}

