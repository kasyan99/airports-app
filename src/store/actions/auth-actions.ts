import { useNavigate } from "react-router-dom"
import { authAPI } from "../../api/api"
import { authSlice } from "../slices/auth-slice"
import { AppDispatch } from "../store"

export const checkLogin = (login: string, password: string) => {
   return async (dispatch: AppDispatch) => {
      try {
         dispatch(authSlice.actions.fetching())
         const { data: loginResult } = await authAPI.checkLogin(login)
         if (loginResult.length === 0) {
            throw { name: 'loginErr', message: 'Account is not exist' }
         }
         if (loginResult[0].password !== password) {
            throw { name: 'passErr', message: 'Password is wrong' }
         }
         dispatch(authSlice.actions.login(loginResult[0]))
      } catch (error) {
         dispatch(authSlice.actions.fetchError(error as Error))
      }
   }
}



