import { IBrand } from "src/app/pages/admin/pages/brand/brand.service";
import { delay, of } from 'rxjs';
import { isEmployee, loggeedInUser } from './user';

const STORAGE_KEY = 'dummy-brands';

export const getBrand = (id) => {
    return of(getAllBrands().find(brand => brand.id === id)).pipe(delay(1000));
}

export const saveBrand = (brand: IBrand, brandId?) => {
    if (brandId) {
        const index = findIndexById(brandId);
        const brands = getAllBrands();
        brand.id = brandId;
        brands[index] = {...brands[index], ...brand};
        localStorage.setItem(STORAGE_KEY, JSON.stringify(brands));
    } else {
        createBrand(brand);
    }
    return of({}).pipe(delay(1000));
}

export const deleteBrand = (brandId) => {
    const brands = getAllBrands();
    brands.splice(findIndexById(brandId), 1);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(brands));
    return of({}).pipe(delay(1000));
}

const findIndexById = (id) => {
    return getAllBrands().findIndex(brand => brand.id === id);
}

export const getBrands = (query?) => {
    const brands = getBrandsList(query);
    return of({ list: brands, count: brands.length }).pipe(delay(1000));
}

export const getBrandsList = (query?) => {
    const user = loggeedInUser();
    const adminId = user[!isEmployee(user) ? 'id' : 'created_by'];
    const brands = getAllBrands().filter(brand => brand.created_by === adminId)
    return brands;
}

function createBrand(brand) {
    const brands: any[] = getAllBrands();
    brand.id = Date.now();
    brand.created_by = loggeedInUser().id;
    brands.push(brand);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(brands));
}

export function getAllBrands() {
    const brands: any[] = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    return brands;
}