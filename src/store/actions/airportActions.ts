import axios from "../../axios"
import { airportSlice } from "../slices/airportSlice"
import { AppDispatch } from "../store"

export const fetchAirports = () => {
   return async (dispatch: AppDispatch) => {
      try {
         dispatch(airportSlice.actions.fetching())
         const response = await axios.get('airports')
         console.log(response)
         dispatch(airportSlice.actions.fetchSuccess(response.data))
      } catch (error) {
         dispatch(airportSlice.actions.fetchError(error as Error))
      }
   }
}