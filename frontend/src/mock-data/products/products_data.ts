import { delay, of } from 'rxjs';
import { getCountriesList } from 'src/app/pages/admin/pages/warehouse-management/warehouse.const';
import { getAllUnits } from 'src/app/pages/employee/pages/warehouse-exist/products/product.const';
import { IProduct } from 'src/app/pages/employee/pages/warehouse-exist/products/products.service';
import { loggeedInUser } from '../user';
import { arrayToJsonById } from '../util';
import { getAllBrands } from '../brands_data';
import { getAllCategories } from './product_category';
import { STORAGE_KEY_SELECTED_WAREHOUSE } from '../warehouse-management/warehouse-data';

const STORAGE_KEY = 'dummy-products';

export const getProduct = (id) => {
    return of(getAllProducts().find(product => product.id == id)).pipe(delay(1000));
}

export const saveProduct = (product: IProduct, productId?) => {
    if (productId) {
        const index = findIndexById(productId);
        const products = getAllProducts();
        product.id = productId;
        products[index] = {...products[index], ...product};
        localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    } else {
        createProduct(product);
    }
    return of({}).pipe(delay(1000));
}

export const deleteProduct = (productId) => {
    const products = getAllProducts();
    products.splice(findIndexById(productId), 1);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    return of({}).pipe(delay(1000));
}

const findIndexById = (id) => {
    return getAllProducts().findIndex(product => product.id == id);
}

export const getProducts = (query?) => {
    const adminId = loggeedInUser().id;
    const countries =  arrayToJsonById(getCountriesList());
    const categories =  arrayToJsonById(getAllCategories(true));
    const brands =  arrayToJsonById(getAllBrands());
    const warehouseId = localStorage.getItem(STORAGE_KEY_SELECTED_WAREHOUSE);
    const units =  arrayToJsonById(getAllUnits());
    const products = getAllProducts().filter(product =>( product.created_by === adminId && product.warehouse_id == warehouseId)).map( product => {
        product.origin_country = countries[product.origin_country_id].name;
        product.category = categories[product.category_id].category;
        product.sub_category = categories[product.category_id].sub_categories_mapping[product.sub_category_id].name;
        product.brand = brands[product.brand_id].name;
        product.unit = units[product.unit_id].unit;
        return product;
    })
    return of({ list:products, count: products.length }).pipe(delay(1000));
}

function createProduct(product) {
    const products: any[] = getAllProducts();
    product.id = Date.now();
    product.created_by = loggeedInUser().id;
    product.warehouse_id = localStorage.getItem(STORAGE_KEY_SELECTED_WAREHOUSE);
    products.push(product);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
}

function getAllProducts() {
    const products: any[] = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    return products;
}