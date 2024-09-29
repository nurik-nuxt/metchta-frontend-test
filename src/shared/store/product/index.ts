import { defineStore } from 'pinia';
import { Product } from "~/src/entities/product";

export const useProductStore = defineStore('productStore', () => {
    const products = ref<Product[]>([]);
    const currentProduct = ref<Product | null>(null);
    const page = ref<number>(1);
    const hasMoreProducts = ref<boolean>(true);

    const setProducts = (newProducts: Product[]) => {
        products.value = newProducts;
    };

    const addProducts = (newProducts: Product[]) => {
        products.value = [...products.value, ...newProducts];
    };

    const resetProducts = () => {
        products.value = [];
        page.value = 1;
        hasMoreProducts.value = true;
    };

    const setCurrentProduct = (product: Product | null) => {
        currentProduct.value = product
    }

    return { products, page, hasMoreProducts, currentProduct, setProducts, addProducts, resetProducts, setCurrentProduct };
});
