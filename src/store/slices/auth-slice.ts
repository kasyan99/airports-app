import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IUser } from "../../models/models"

const LOGIN_KEY = 'LOGIN'
const PASSWORD_KEY = 'PASSWORD'

type AuthState = {
   loading: boolean
   error: Error
   isAuth: boolean
   login: string
   password: string
}

const initialState: AuthState = {
   loading: false,
   error: { name: '', message: '' },
   isAuth: Boolean(localStorage.getItem(LOGIN_KEY)),
   login: localStorage.getItem(LOGIN_KEY) ?? '',
   password: localStorage.getItem(PASSWORD_KEY) ?? ''
}

export const authSlice = createSlice({
   name: 'auth',
   initialState,
   reducers: {
      fetching(state) {
         state.loading = true
      },
      login(state, action: PayloadAction<IUser>) {
         state.loading = false
         state.error = { name: '', message: '' }
         state.isAuth = true
         state.login = action.payload.login
         state.password = action.payload.password

         localStorage.setItem(LOGIN_KEY, action.payload.login)
         localStorage.setItem(PASSWORD_KEY, action.payload.password)
      },
      logout(state) {
         state.isAuth = false
         state.login = ''
         state.password = ''

         localStorage.removeItem(LOGIN_KEY)
         localStorage.removeItem(PASSWORD_KEY)
      },
      fetchError(state, action: PayloadAction<Error>) {
         state.loading = false
         state.error = action.payload
      }
   }
})

export default authSlice.reducer