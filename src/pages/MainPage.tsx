import React, { useEffect } from "react"
import { AirportCard } from "../components/AirportCard"
import { AirportFelter } from "../components/AirportFelter"
import { AirportSearch } from "../components/AirportSearch"
import { useAppDispatch, useAppSelector } from "../hook/redux"
import { fetchAirports } from "../store/actions/airportActions"

export function MainPage() {
   const dispatch = useAppDispatch()
   const { airports, loading, error } = useAppSelector(state => state.airort)

   useEffect(() => {
      dispatch(fetchAirports())
   }, [])

   return <div className="container mx-auto max-w-[760px] p-5">
      <AirportSearch />

      <AirportFelter />

      {loading && <p className="text-center text-lg">Loading...</p>}
      {error && <p className="text-center text-lg text-red-600">{error}</p>}

      {
         airports.map(airport => <AirportCard key={airport.id} airport={airport} />)
      }

   </div>
}