import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { airportsAPI } from "../api/api"
import { IAirport } from "../models/models"
import { FIlterNameType } from "../store/slices/handbook-slice"

export function AirportDetailPage() {
   const params = useParams<'id'>()

   const [details, setDetails] = useState<IAirport>()

   useEffect(() => {

      const id = Number(params.id)
      const promise = airportsAPI.getAirportsById(id)

      promise.then(res => {
         setDetails(res.data[0])
      })

   }, [params.id])

   const names = details ? Object.getOwnPropertyNames(details).filter(name => name !== 'name' && name !== 'id') : []
   if (!details) return <p className="container mx-auto max-w-[760px] p-5">Loading...</p>

   return <div className="container mx-auto max-w-[760px] p-5">
      <h2 className="font-bold">{details?.name}</h2>
      {names.map(name => <p key={name + Date.now}>
         <span className="font-medium">{`${name[0].toUpperCase()}${name.slice(1)}: `}</span>
         {details && details[`${name as FIlterNameType}`]}
      </p>)}
   </div>
}