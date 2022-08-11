import React, { useEffect } from "react"
import { AirportCard } from "../components/AirportCard"
import { AirportFilter } from "../components/AirportFilter"
import { AirportSearch } from "../components/AirportSearch"
import { useAppDispatch, useAppSelector } from "../hook/redux"
import { getAirports } from "../store/actions/airport-actions"
import ReactPaginate from 'react-paginate'
import { airportSlice } from "../store/slices/airport-slice"

export function MainPage() {
   const dispatch = useAppDispatch()
   const { airports, loading, error, totalItemsCount, itemsPerPage, currentPage } = useAppSelector(state => state.airport)
   const pageCount = Math.ceil(totalItemsCount / itemsPerPage)
   const filter = useAppSelector(state => state.handbook.filter)
   useEffect(() => {
      dispatch(getAirports(currentPage, filter))
   }, [dispatch, currentPage, filter])

   const pageChangeHandler = ({ selected }: { selected: number }) => {
      console.log('pageChangeHandler', selected + 1);
      const newPage = selected + 1
      dispatch(airportSlice.actions.setPage(newPage))
      dispatch(getAirports(newPage, filter))
   }

   return <div className="container mx-auto max-w-[760px] p-5">
      <AirportSearch />

      <AirportFilter />

      {loading &&
         <p className="text-center text-lg">Loading...</p>}

      {error &&
         <p className="text-center text-lg text-red-600">{error}</p>}

      {!loading && !error &&
         airports.map(airport => <AirportCard key={`${airport.id}${Date.now}`} airport={airport} />)}

      <ReactPaginate
         breakLabel="..."
         nextLabel="NEXT"
         onPageChange={pageChangeHandler}
         pageRangeDisplayed={5}
         pageCount={pageCount}
         previousLabel="PREV"
         className="flex justify-center"
         pageLinkClassName="inline-block w-8 rounded-md text-center mr-2 border-solid border border-gray-400"
         activeLinkClassName='bg-gray-400 text-white'
         previousLinkClassName="inline-block mr-2 px-2 rounded-md border-solid border border-gray-400 active:bg-gray-400 active:text-white"
         nextLinkClassName="inline-block px-2 rounded-md border-solid border border-gray-400 active:bg-gray-400 active:text-white"
         breakClassName="inline-block w-8 rounded-md text-center mr-2"
      />
   </div>
}