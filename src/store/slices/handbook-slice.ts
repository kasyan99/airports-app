import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface IHandbookData {
   types: Array<string>
   countries: Array<string>
   cities: Array<string>
}
export interface IFilter {
   type: string
   country: string
   city: string
}

interface InitialState extends IHandbookData {
   loading: boolean
   error: string,
   filter: IFilter
}

const initialState: InitialState = {
   loading: false,
   error: '',
   types: [],
   countries: [],
   cities: [],
   filter: {
      type: '',
      country: '',
      city: ''
   }
}

export type FIlterNameType = 'type' | 'country' | 'city'
export interface ISetFilterAction {
   name: FIlterNameType, value: string
}

export const handbookSlice = createSlice({
   name: 'handbook',
   initialState,
   reducers: {
      fetching(state) {
         state.loading = true
      },
      fetchError(state, action: PayloadAction<Error>) {
         state.loading = false
         state.error = action.payload.message
      },
      fetchingSuccess(state, action: PayloadAction<IHandbookData>) {
         state.loading = false
         state.types = action.payload.types
         state.countries = action.payload.countries
         state.cities = action.payload.cities
      },
      setFilter(state, action: PayloadAction<ISetFilterAction>) {
         state.filter[`${action.payload.name}`] = action.payload.value
      }
   }
})

export default handbookSlice.reducer