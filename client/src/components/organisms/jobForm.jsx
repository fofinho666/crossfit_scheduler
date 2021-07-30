import React from "react"
import { Formik, Form } from "formik"
import { weeklyCron } from "../../services/translateToCron"
import PuppetsForm from "../molecules/fromikForms/puppetsForm"
import CronsFrom from "../molecules/fromikForms/cronsForm"
import { postJob } from "../../services/jobsApi"
import NameForm from "../molecules/fromikForms/nameForm"
import { useJobs } from "../atoms/jobsProducer"

export default function JobForm() {
  const {jobs, setJobs} = useJobs()

  const sanitazedObject = (value, filter) => (
    Object
      .entries(value)
      .reduce((acc, [key, value]) => {
        if (filter.test(key)) {
          const sanitazedKey = key.replace(filter, "")
          return {
            [sanitazedKey]: value,
            ...acc
          }
        }
        return acc
      }, {})
  )

  const genCron = (values) => {
    if (values.weekDays) {
      return weeklyCron(values.weekDays, values.hours, values.minutes, values.seconds)
    }
  }

  const submit = (values) => {
    const puppetFields = sanitazedObject(values, /puppet-form-/)
    const interval = genCron(values)

    const payload = {
      ...puppetFields,
      name: values.name.trim(),
      interval,
    }

    postJob(payload)
    .then(response=>response.json())
    .then(data=>{ setJobs([...jobs, data]) })
  }
  
  return (<Formik initialValues={{}} onSubmit={submit} >
    {({ isValid, dirty }) => (
      <Form>
        <NameForm/>
        
        <PuppetsForm />

        <CronsFrom />

        <button className="button is-primary" type="submit" disabled={!(isValid && dirty)}>Submit</button>
      </Form>
    )}
  </Formik>)
}
