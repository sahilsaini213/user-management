

export const arrayToJsonById = (arr: any[]) => {
    return arr.reduce((old, current) => {
        old[current.id] = current;
        return old;
    }, {})
}