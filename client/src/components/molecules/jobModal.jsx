import React from "react"
import { Formik, Form } from "formik"
import { useJobs } from "../atoms/jobsProducer"
import PuppetsForm from "./jobModal/forms/puppetsForm"
import CronsFrom from "./jobModal/forms/cronsForm"
import JobNameForm from "./jobModal/forms/jobNameForm"
import { postJob } from "../../services/jobsApi"
import { weeklyCron } from "../../services/translateToCron"

export default function JobModal({ activeModal, closeModal, title }) {
  const { loadJobs } = useJobs()

  const modalClass = activeModal ? "modal is-active" : "modal"

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

    postJob(payload).then(() => { loadJobs() })
  }

  return <>
    <div className={modalClass}>
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">{title}</p>
          <button className="delete" aria-label="close" onClick={closeModal}></button>
        </header>

        <Formik initialValues={{}} onSubmit={submit} >
          {({ isValid, dirty }) => (
            <Form>
              
              <section className="modal-card-body">
                <JobNameForm />
                <PuppetsForm />
                <CronsFrom />
              </section>
              
              <footer className="modal-card-foot">
                <button className="button is-primary" type="submit" disabled={!(isValid && dirty)} onClick={closeModal} >Submit</button>
                <button className="button" onClick={closeModal}>Cancel</button>
              </footer>

            </Form>
          )}
        </Formik>

      </div>
    </div>
  </>
}
