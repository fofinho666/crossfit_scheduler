import React from "react"
import { ErrorMessage, useField } from 'formik'
import NumberField from "../../../atoms/fields/numberField"

const TimeField = ({ labelledby }) => {

  const [, hoursMeta] = useField("hours")
  const [, minutesMeta] = useField("minutes")
  const [, secondsMeta] = useField("seconds")

  const hourClass = (hoursMeta.touched && hoursMeta.error) ? "is-danger" : ""
  const validateHours = (value) => {
    if (!value) {
      return "Hours are requeired"
    } else if (!/^(2[0-3]|1[0-9]|[0-9])$/.test(value)) {
      return "Invalid hours"
    }
    return null
  }

  const minutesClass = (minutesMeta.touched && minutesMeta.error) ? "is-danger" : ""
  const validateMinutes = (value) => {
    if (!value) {
      return "Minutes are requeired"
    } else if (!/^[1-5]?[0-9]$/.test(value)) {
      return "Invalid hours"
    }
    return null
  }

  const secondsClass = (secondsMeta.touched && secondsMeta.error) ? "is-danger" : ""
  const validateSeconds = (value) => {
    if (!value) {
      return "Seconds are requeired"
    } else if (!/^[1-5]?[0-9]$/.test(value)) {
      return "Invalid hours"
    }
    return null
  }

  const TimeError = () => {
    if (hoursMeta.touched && hoursMeta.error) {
      return <ErrorMessage name="hours" className="help is-danger" component="p" />
    }
    else if (minutesMeta.touched && minutesMeta.error) {
      return <ErrorMessage name="minutes" className="help is-danger" component="p" />
    }
    else if (secondsMeta.touched && secondsMeta.error) {
      return <ErrorMessage name="seconds" className="help is-danger" component="p" />
    }
    return <p className="help">&nbsp;</p>
  }

  return (
    <>
      <div className="dropdown" role="group" aria-labelledby={labelledby}>
        <NumberField className={hourClass} name="hours" lenght={24} validate={validateHours} />
        <span className="m-2">:</span>
        <NumberField className={minutesClass} name="minutes" lenght={60} validate={validateMinutes} />
        <span className="m-2">:</span>
        <NumberField className={secondsClass} name="seconds" lenght={60} validate={validateSeconds} />
      </div>
      <TimeError />
    </>
  )
}

export default TimeField