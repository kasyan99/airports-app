import axios from "axios";
import { IFilter } from "../store/slices/handbook-slice";

const instance = axios.create({
   baseURL: process.env.REACT_APP_BASE_URL
})


export const airportsAPI = {
   getAirports(page: number, filter: IFilter) {
      const { type, country, city } = filter

      // const qType = `&type_like=${type}`
      // const qCountry = `&country_like=${country}`
      // const qCity = `&city_like=${city}`

      return instance.get(`airports?_page=${page}&_limit=2&type_like=${type}&country_like=${country}&city_like=${city}`)
   },
   getAirportsByName(name: string) {
      return instance.get(`airports?name_like=${name}`)
   }
}

export const handbookAPI = {
   getTypes() {
      return instance.get(`types`)
   },
   getCountries() {
      return instance.get(`countries`)
   },
   getCities() {
      return instance.get(`cities`)
   },
}

