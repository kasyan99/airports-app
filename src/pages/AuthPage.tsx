import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { authAPI } from "../api/api";
import { useAppDispatch, useAppSelector } from "../hook/redux";
import { checkLogin } from "../store/actions/auth-actions";

interface IFormInput {
   login: string
   password: string
}

export function AuthPage() {
   const dispatch = useAppDispatch()
   const navigate = useNavigate()
   const { loading, error, isAuth } = useAppSelector(state => state.auth)

   const { register, formState: { errors }, handleSubmit } = useForm<IFormInput>();
   const onSubmit: SubmitHandler<IFormInput> = data => {
      console.log(data)
      dispatch(checkLogin(data.login, data.password))

   }

   useEffect(() => {
      if (isAuth) {
         navigate('../', { replace: true })
      }
   }, [isAuth])

   const requiredMessage = (condition: boolean) => condition && <span className="text-red-500">field is required</span>
   const reqLogin = errors.login?.type === 'required'
   const reqPass = errors.password?.type === 'required'

   return (
      <form onSubmit={handleSubmit(onSubmit)}
         className="container mx-auto max-w-[360px] p-5 flex flex-col"
      >
         <label className="inline-flex justify-between mb-2 ">Login: {requiredMessage(reqLogin)}</label>
         <input {...register("login", { required: true })}
            placeholder='Enter email or phone number'
            className={`py-1 px-2 outline-none w-full border border-grey-400 border-solid rounded-md focus:border-gray-900 mb-2 
            ${reqLogin || error.name === 'loginErr' && 'border-2 border-solid border-red-500 focus:border-red-500'}`}
         />
         <label className="inline-flex justify-between  mb-2">Password: {requiredMessage(reqPass)}</label>
         <input {...register("password", { required: true })}
            placeholder='Enter your password'
            className={`py-1 px-2 outline-none w-full border border-grey-400 border-solid rounded-md focus:border-gray-900 mb-2 
            ${reqPass || error.name === 'passErr' && 'border-2 border-solid border-red-500 focus:border-red-500'}`}
         />
         {error.message && <span className="text-red-500 mb-2">{error?.message}</span>}
         <button type="submit" className="py-1 px-2 rounded-md text-white bg-sky-700 mb-2">Auth</button>
         {/* <button type="button" onClick={createAccount} className="py-1 px-2 rounded-md text-white bg-lime-700">Register</button> */}
      </form>
   );
}

