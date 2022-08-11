import { handbookAPI } from "../../api/api"
import { handbookSlice, IHandbookData } from "../slices/handbook-slice"
import { AppDispatch } from "../store"

export const getHandbooks = () => {
   return async (dispatch: AppDispatch) => {
      try {
         dispatch(handbookSlice.actions.fetching())
         const response = await Promise.all([
            handbookAPI.getTypes(),
            handbookAPI.getCountries(),
            handbookAPI.getCities()
         ])

         const handbooks: IHandbookData = {
            types: response[0].data,
            countries: response[1].data,
            cities: response[2].data
         }

         dispatch(handbookSlice.actions.fetchingSuccess(handbooks))
      } catch (error) {
         dispatch(handbookSlice.actions.fetchError(error as Error))
      }
   }
}
