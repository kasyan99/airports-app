export interface IAirport {
   id: number
   name: string
   type: string
   country: string
   city: string
}

export interface IUser {
   id: number
   login: string
   password: string
}

export type IType = string
export type ICountry = string
export type ICity = string