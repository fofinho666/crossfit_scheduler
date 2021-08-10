import React from "react"
import { Field } from 'formik'

const NumberField = ({ className, name, lenght, validate }) => {

  const value = (index) => lenght - 1 - index

  return <div className={`select ${className}`}>
    <Field name={name} as="select" validate={validate} >
      <option />

      <For index="index" of={Array.from(Array(lenght))}>
        <option key={index} value={value(index)}>{value(index)}</option>
      </For>

    </Field>
  </div>
}

export default NumberField