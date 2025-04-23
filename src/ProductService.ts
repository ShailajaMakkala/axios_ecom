import axios from "axios";

const BASE_URL = "http://localhost:8001/product";

// Create a new product
export const addProduct = async (productData: any) => {
    try {
        const response = await axios.post(`${BASE_URL}/create`, productData);
        return response.data;
    } catch (error) {
        console.error("Error creating product:", error);
        throw error;
    }
};

// Get all products
export const fetchProducts = async () => {
    const response = await axios.get(`${BASE_URL}/all`);
    return response.data;
};

// Get a single product by ID
export const fetchProductById = async (id: string) => {
    const response = await axios.get(`${BASE_URL}/details/${id}`);
    return response.data;
};

// Delete a product
export const productDelete = async (id: string) => {
    await axios.delete(`${BASE_URL}/remove/${id}`);
};
