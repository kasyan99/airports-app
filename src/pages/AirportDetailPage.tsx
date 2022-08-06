import React from "react"
import { useParams } from "react-router-dom"

export function AirportDetailPage() {
   const params = useParams<'id'>()

   return <div>
      {params.id}
   </div>
}