import { airportsAPI } from "../../api/api"
import { airportSlice } from "../slices/airport-slice"
import { IFilter } from "../slices/handbook-slice"
import { AppDispatch } from "../store"

export const getAirports = (page: number, filter: IFilter) => {
   return async (dispatch: AppDispatch) => {
      try {
         dispatch(airportSlice.actions.fetching())
         const { data, headers } = await airportsAPI.getAirports(page, filter)
         dispatch(airportSlice.actions.setTotalItemsCount(headers['x-total-count']))
         dispatch(airportSlice.actions.setAirports(data))
      } catch (error) {
         dispatch(airportSlice.actions.fetchError(error as Error))
      }
   }
}

export const searchByName = (name: string) => async (dispatch: AppDispatch) => {
   try {
      const { data } = await airportsAPI.getAirportsByName(name)
      dispatch(airportSlice.actions.setSearchedAirports(data))
   } catch (error) {
      dispatch(airportSlice.actions.fetchError(error as Error))
   }
}

