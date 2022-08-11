import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useDebounce } from "../hook/debounc"
import { useInput } from "../hook/input"
import { useAppDispatch, useAppSelector } from "../hook/redux"
import { IAirport } from "../models/models"
import { searchByName } from "../store/actions/airport-actions"
import { airportSlice } from "../store/slices/airport-slice"

export function AirportSearch() {

   const input = useInput()
   const dispatch = useAppDispatch()
   const navigate = useNavigate()
   //to avoid a lot of requests
   const debounced = useDebounce(input.value)

   useEffect(() => {
      if (input.value.length > 1) {
         dispatch(searchByName(debounced))
      } else if (input.value.length <= 1) {
         dispatch(airportSlice.actions.setSearchedAirports([]))
      }
   }, [debounced])

   const searchedAirs = useAppSelector(state => state.airport.searchedAirports)

   return <div className="mb-4 relative">
      <input
         type='text'
         placeholder="Type airport name"
         {...input}
         className='py-1 px-2 outline-none w-full border border-grey-400 border-solid rounded-md focus:border-gray-900'
      />
      {searchedAirs.length > 0 &&
         <ul className="absolute shadow-lg rounded-md bg-white top-34 w-full h-60 overflow-auto">
            {searchedAirs.map((airp: IAirport) => {
               return <li key={`${airp.id}${Date.now}`}
                  className='px-2 py-1 hover:bg-gray-400 hover:text-white'
                  onClick={() => navigate(`/airport/${airp.id}`)}
               >{airp.name}</li>
            })}
         </ul>}
   </div>
}