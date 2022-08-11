import React from "react"
import { useNavigate } from "react-router-dom"
import { IAirport } from "../models/models"

type AirportCardProps = {
   airport: IAirport
}

export function AirportCard({ airport }: AirportCardProps) {
   const navigate = useNavigate()

   const clickHandler = () => navigate(`/airport/${airport.id}`)

   return <div onClick={clickHandler} className="border rounded-md py-4 px-6 mb-2 hover:shadow-md hover:transition-all cursor-pointer">
      <p className="text-lg font-bold">{airport.name}</p>
      <p>{airport?.country}</p>
      <p>{airport?.city}</p>
      <p>{airport?.type}</p>
   </div>
}