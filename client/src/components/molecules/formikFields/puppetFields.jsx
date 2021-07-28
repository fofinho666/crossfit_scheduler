import React, { useEffect } from "react"
import { useFormikContext } from 'formik'
import { sentenceCase } from "change-case";
import TextField from "./textField";

const PuppetFields = ({ puppet }) => {
  const { setFieldValue } = useFormikContext()

  useEffect(() => {
    if (puppet) {
      setFieldValue("puppet-form-puppet", puppet.puppet)
    }
  }, [])

  const validateField = (value) => {
    if (!value || value.trim() === "") {
      return `You must provide a value`
    }
    else
      return null
  }

  return <div className="columns is-mobile is-multiline is-centered">
    <For each="field" index="idx" of={puppet.fields}>
      <div className="column is-narrow" key={`field-${idx}`} >
        <TextField name={`puppet-form-${field}`} label={sentenceCase(field)} validate={validateField} />
      </div>
    </For>
    
    <If condition={puppet.fields.length == 0}>
      <div className="column is-narrow pb-5" >
        <p>No values needed</p>
      </div>
    </If>
  </div>
}

export default PuppetFields
