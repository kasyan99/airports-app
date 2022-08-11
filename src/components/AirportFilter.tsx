import React, { ChangeEvent, useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../hook/redux"
import { getHandbooks } from "../store/actions/handbook-actions"
import { FIlterNameType, handbookSlice } from "../store/slices/handbook-slice"

export function AirportFilter() {
   const dispatch = useAppDispatch()

   useEffect(() => {
      dispatch(getHandbooks())
   }, [dispatch])

   const { loading, error, types, countries, cities } = useAppSelector(state => state.handbook)

   if (loading) return <p>Loading...</p>
   if (error) return <p>{error}</p>

   const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
      console.log(e.target.name, e.target.value);
      dispatch(handbookSlice.actions.setFilter({ name: e.target.name as FIlterNameType, value: e.target.value }))
   }

   const createSelect = (arr: Array<string>, name: string) => {
      return <select
         name={name}
         onChange={onChangeHandler}
         className="border border-solid border-gray-200 rounded-md mr-2 px-2 py-1"
      >
         <option value="">{name[0].toUpperCase() + name.slice(1)}</option>
         {arr.map(type => <option key={type} value={type}>{type}</option>)}
      </select>
   }
   return <div className="mb-4">
      <label className="font-bold">Filter: </label>
      {createSelect(types, 'type')}
      {createSelect(countries, 'country')}
      {createSelect(cities, 'city')}
   </div>
}