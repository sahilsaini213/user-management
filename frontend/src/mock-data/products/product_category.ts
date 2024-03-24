import { categories } from '@ctrl/ngx-emoji-mart/ngx-emoji';
import { delay, of } from 'rxjs';
import { ICategory } from 'src/app/pages/admin/pages/product-category/product-category.service';
import { isEmployee, loggeedInUser } from '../user';
import { arrayToJsonById } from '../util';

const STORAGE_KEY = 'dummy-categories';

export const getCategory = (id) => {
    return of(getAllCategories().find(category => category.id === id)).pipe(delay(1000));
}

export const saveCategory = (category: ICategory, categoryId?) => {
    if (categoryId) {
        const index = findIndexById(categoryId);
        const categories = getAllCategories();
        category.id = categoryId;
        category.sub_categories = category.sub_categories.map((subCategory, index) => {
            return subCategoriesDataMapping(subCategory, index)
        });
        categories[index] = {...categories[index], ...category};
        localStorage.setItem(STORAGE_KEY, JSON.stringify(categories));
    } else {
        createCategory(category);
    }
    return of({}).pipe(delay(1000));
}

export const deleteCategory = (categoryId) => {
    const categories = getAllCategories();
    categories.splice(findIndexById(categoryId), 1);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(categories));
    return of({}).pipe(delay(1000));
}

const findIndexById = (id) => {
    return getAllCategories().findIndex(category => category.id === id);
}

export const getCategories = (query?) => {
    const user = loggeedInUser();
    const adminId = user[ !isEmployee(user) ? 'id' : 'created_by'];
    const category = getAllCategories().filter(category => category.created_by == adminId)
    return of({list: category, count: category.length}).pipe(delay(2000));
}

function createCategory(category) {
    const categories: any[] = getAllCategories();
    category.id = Date.now();
    category.created_by = loggeedInUser().id;
    category.sub_categories = category.sub_categories.map((subCategory, index) => {
        return subCategoriesDataMapping(subCategory, index)
    });
    categories.push(category);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(categories));
}

export function getAllCategories(needSubCategories = false) {
    let categories: any[] = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    if (needSubCategories) {
        categories = categories.map( category => {
            category.sub_categories_mapping = arrayToJsonById(category.sub_categories);
          return category;
        })
    }
    return categories;
}

const subCategoriesDataMapping = (subCategory, index) => {
    subCategory.id = subCategory.id || Date.now()+index;
    return subCategory;
}
