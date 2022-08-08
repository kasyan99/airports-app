import { airportsApi } from "../../api/api"
import { airportSlice } from "../slices/airport-slice"
import { AppDispatch } from "../store"

export const getAirports = (page: number) => {
   return async (dispatch: AppDispatch) => {
      try {
         dispatch(airportSlice.actions.fetching())
         const { data, headers } = await airportsApi.getAirports(page)
         dispatch(airportSlice.actions.setTotalItemsCount(headers['x-total-count']))
         dispatch(airportSlice.actions.setAirports(data))
      } catch (error) {
         dispatch(airportSlice.actions.fetchError(error as Error))
      }
   }
}

export const searchByName = (name: string) => async (dispatch: AppDispatch) => {
   try {
      const { data } = await airportsApi.getAirportsByName(name)
      dispatch(airportSlice.actions.setSearchedAirports(data))
   } catch (error) {
      dispatch(airportSlice.actions.fetchError(error as Error))
   }
}
