import { delay, of } from "rxjs";

export interface ICountry {
    id: string,
    name: string
} 

export const COUNTRY_LIST: ICountry[] = [
    {
        id: "1",
        name: "India"
    },
    {
        id: "2",
        name: "USA"
    },
    {
        id: "3",
        name: "UK"
    },
    {
        id: "4",
        name: "Canada"
    },
    {
        id: "5",
        name: "Australia"
    }
];


export const getCountries = () => {
    return of (COUNTRY_LIST).pipe(delay(1000));
}

export const getCountriesList = () => {
    return COUNTRY_LIST;
}

export const getCountryById = (id) => {
    return COUNTRY_LIST.find(country => country.id === id);
}