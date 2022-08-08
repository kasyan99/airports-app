import { ChangeEvent, useState } from "react"

type InputReturned = {
   value: string
   onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export const useInput = (initialValue = ''): InputReturned => {
   const [value, setValue] = useState(initialValue)

   const onChange = (e: ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value)
   }

   return ({
      value,
      onChange
   })
}