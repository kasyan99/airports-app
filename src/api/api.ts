import axios from "axios";

const instance = axios.create({
   baseURL: process.env.REACT_APP_BASE_URL
})


export const airportsApi = {
   getAirports(page: number) {
      return instance.get(`airports?_page=${page}&_limit=2`)
   },
   getAirportsByName(name: string) {
      return instance.get(`airports?name_like=${name}`)
   }
}

