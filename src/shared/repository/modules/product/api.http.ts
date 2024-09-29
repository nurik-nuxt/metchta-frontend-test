import useApi from "~/composables/useApi";

const getAllProducts = async (filters = {}) => {
    try {
        const queryString = new URLSearchParams(filters).toString();
        const url = `/v1/products?${queryString}`;

        return await useApi(url, {
            method: 'get',
        });
    } catch (e) {
        console.error(e);
    }
};

const getProductById = async (productId: number) => {
    try {
        const url = `/v1/products/${productId}`;
        return await useApi(url, {
            method: 'get',
        });
    } catch (e) {
        console.error(e);
    }
};

const useProductApiService = () => {
    return {
        getAllProducts,
        getProductById,
    };
};

export { useProductApiService, getAllProducts, getProductById };
