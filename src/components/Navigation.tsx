import React from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../hook/redux"
import { authSlice } from "../store/slices/auth-slice"

export function Navigation() {
   const { isAuth, login } = useAppSelector(state => state.auth)
   const navigate = useNavigate()
   const dispatch = useAppDispatch()

   const logout = () => {
      dispatch(authSlice.actions.logout())
      navigate("../auth", { replace: true })
   }

   return <nav className="flex justify-between px-5 h-[50px] bg-gray-100 shadow-lg shadow-gray-500/50 items-center">
      <Link to='/'>Airport</Link>
      <>
         {!isAuth && <Link to='/auth'>Auth</Link>}
         {isAuth && <span>{login} <span className="text-red-500 cursor-pointer" onClick={logout}>Logout</span></span>}
      </>
   </nav>
}