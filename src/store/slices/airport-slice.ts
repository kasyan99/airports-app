import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IAirport } from "../../models/models"

type AirportState = {
   loading: boolean
   error: string
   airports: Array<IAirport>
   totalItemsCount: number
   itemsPerPage: number
   currentPage: number
   searchedAirports: Array<IAirport>
}

const initialState: AirportState = {
   loading: false,
   error: '',
   airports: [],
   totalItemsCount: 20,
   itemsPerPage: 2,
   currentPage: 1,
   searchedAirports: []
}

export const airportSlice = createSlice({
   name: 'airport',
   initialState,
   reducers: {
      fetching(state) {
         state.loading = true
      },
      setAirports(state, action: PayloadAction<Array<IAirport>>) {
         state.loading = false
         state.airports = action.payload
      },
      fetchError(state, action: PayloadAction<Error>) {
         state.loading = false
         state.error = action.payload.message
      },
      setTotalItemsCount(state, action) {
         state.totalItemsCount = action.payload
      },
      setPage(state, action) {
         state.currentPage = action.payload
      },
      setSearchedAirports(state, action) {
         state.searchedAirports = action.payload
      }
   }
})

export default airportSlice.reducer