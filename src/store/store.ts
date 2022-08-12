import { combineReducers, configureStore } from "@reduxjs/toolkit";
import airportReducer from './slices/airport-slice'
import authSlice from "./slices/auth-slice";
import handbookSlice from "./slices/handbook-slice";

const rootReducer = combineReducers({
   airport: airportReducer,
   handbook: handbookSlice,
   auth: authSlice
})

export function setupStore() {
   return configureStore({
      reducer: rootReducer
   })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch'] 