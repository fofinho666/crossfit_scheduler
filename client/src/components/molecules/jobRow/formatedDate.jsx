import React from "react"
import { isValid, format } from "date-fns"
import { pt, enUS } from "date-fns/locale"
import EmptyValue from "../../atoms/emptyValue"

const FormatedDate = ({ date }) => {
  const parsedDate = Date.parse(date)

  const myLocale = {
    ...pt,
    localize: {
      ...enUS.localize
    }
  }

  return <Choose>
    <When condition={isValid(parsedDate)}>
      {format(parsedDate, "iiii',' dd/MM/yyyy 'at' HH:mm:ss", { locale: myLocale })}
    </When>
    <Otherwise>
      <EmptyValue />
    </Otherwise>
  </Choose >
}

export default FormatedDate