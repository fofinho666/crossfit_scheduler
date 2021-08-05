import React from "react"
import { useField } from 'formik'

const TextField = ({ validate, label, ...props }) => {
  const [field, meta] = useField({ validate, ...props })
  const value = (field.value) ? field.value : ""

  const nameClassName = ({ touched, error }) => (touched && error) ? "input is-danger" : "input"
  const TextError = ({ touched, error }) => (touched && error)
    ? <p className="help is-danger">{error}</p>
    : <p className="help">&nbsp;</p>

  return <>
    <label className="label" htmlFor={props.name}>{label}</label>
    <input className={nameClassName(meta)} {...field} {...props} value={value} />
    <TextError {...meta} />
  </>
}

export default TextField