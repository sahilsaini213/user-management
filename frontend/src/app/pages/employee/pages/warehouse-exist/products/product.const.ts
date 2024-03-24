import { of, delay } from "rxjs";

export const UNITS = [
    {
        id: 1,
        unit: "Kilogram"
    },
    {
        id: 2,
        unit: "Piece"
    },
    {
        id: 3,
        unit: "Meter"
    }
];

export const getUnit = (id) => {
    return UNITS.find(unit => unit.id === Number(id))
}

export const getUnits = () => {
    return of(UNITS).pipe(delay(1000));
}
export const getAllUnits = () => {
    return UNITS
}