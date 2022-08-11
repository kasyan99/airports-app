import axios from "axios";
import { IAirport, ICity, ICountry, IType } from "../models/models";
import { IFilter } from "../store/slices/handbook-slice";

const instance = axios.create({
   baseURL: process.env.REACT_APP_BASE_URL
})


export const airportsAPI = {
   getAirports(page: number, filter: IFilter) {
      const { type, country, city } = filter

      return instance.get<IAirport[]>(`airports?_page=${page}&_limit=2&type_like=${type}&country_like=${country}&city_like=${city}`)
   },
   getAirportsByName(name: string) {
      return instance.get(`airports?name_like=${name}`)
   },
   getAirportsById(id: number) {
      return instance.get<IAirport[]>(`airports?id=${id}`)
   }
}

export const handbookAPI = {
   getTypes() {
      return instance.get<IType[]>(`types`)
   },
   getCountries() {
      return instance.get<ICountry[]>(`countries`)
   },
   getCities() {
      return instance.get<ICity[]>(`cities`)
   },
}

