import React from "react"
import { Field, ErrorMessage, useField } from 'formik'


const WeekDaysField = () => {

  const [, weekDaysMeta] = useField("weekDays")

  const validateWeekDays = (value) => {
    if (!value || !value.length) {
      return "Should at least select 1 day"
    }
    return null
  }

  const labelClass = (weekDaysMeta.touched && weekDaysMeta.error)
    ? "b-checkbox checkbox has-text-danger"
    : "b-checkbox checkbox"

  const WeekDaysError = () => {
    if (weekDaysMeta.touched && weekDaysMeta.error) {
      return <ErrorMessage className="help is-danger" name="weekDays" component="p" />
    }
    return <p className="help">&nbsp;</p>
  }

  return <>
    <div className="label" label="checkbox-group">Job Days</div>
    <div className="columns is-mobile is-multiline is-centered" role="group" aria-labelledby="checkbox-group">
      <div className="column is-narrow pb-0"><label className={labelClass}> <Field type="checkbox" name="weekDays" value="1" validate={validateWeekDays} /> <span className="check"></span> <span className="control-label">Monday</span></label></div>
      <div className="column is-narrow pb-0"><label className={labelClass}> <Field type="checkbox" name="weekDays" value="2" validate={validateWeekDays} /> <span className="check"></span> <span className="control-label">Tuesday </span></label></div>
      <div className="column is-narrow pb-0"><label className={labelClass}> <Field type="checkbox" name="weekDays" value="3" validate={validateWeekDays} /> <span className="check"></span> <span className="control-label">Wednesday </span></label></div>
      <div className="column is-narrow pb-0"><label className={labelClass}> <Field type="checkbox" name="weekDays" value="4" validate={validateWeekDays} /> <span className="check"></span> <span className="control-label">Thursday </span></label></div>
      <div className="column is-narrow pb-0"><label className={labelClass}> <Field type="checkbox" name="weekDays" value="5" validate={validateWeekDays} /> <span className="check"></span> <span className="control-label">Friday </span></label></div>
      <div className="column is-narrow pb-0"><label className={labelClass}> <Field type="checkbox" name="weekDays" value="6" validate={validateWeekDays} /> <span className="check"></span> <span className="control-label">Saturday </span></label></div>
      <div className="column is-narrow pb-0"><label className={labelClass}> <Field type="checkbox" name="weekDays" value="0" validate={validateWeekDays} /> <span className="check"></span> <span className="control-label">Sunday </span></label></div>
    </div>
    <WeekDaysError />
  </>
}

export default WeekDaysField