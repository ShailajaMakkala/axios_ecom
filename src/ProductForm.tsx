import React, { useRef, FormEvent } from "react";
import { addProduct } from "./ProductService";

interface ProductData {
    name: string;
    description: string;
    price: number;
    color: string;
    size: string;
    mainImageUrl: string | null;
    imageUrls: string[];
    stockQuantity: number;
    category: string;
}

const ProductForm: React.FC = () => {
    const nameRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLTextAreaElement>(null);
    const priceRef = useRef<HTMLInputElement>(null);
    const colorRef = useRef<HTMLInputElement>(null);
    const sizeRef = useRef<HTMLInputElement>(null);
    const mainImageRef = useRef<HTMLInputElement>(null);
    const imageUrlsRef = useRef<HTMLInputElement>(null);
    const stockRef = useRef<HTMLInputElement>(null);
    const categoryRef = useRef<HTMLInputElement>(null);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const imageUrls = imageUrlsRef.current?.files
            ? Array.from(imageUrlsRef.current.files).map(file => file.name)
            : [];

        const productData: ProductData = {
            name: nameRef.current?.value || "",
            description: descriptionRef.current?.value || "",
            price: parseFloat(priceRef.current?.value || "0"),
            color: colorRef.current?.value || "",
            size: sizeRef.current?.value || "",
            mainImageUrl: mainImageRef.current?.files?.[0]?.name || null,
            imageUrls,
            stockQuantity: parseInt(stockRef.current?.value || "0"),
            category: categoryRef.current?.value || "",
        };

        console.log("Product Data:", productData);

        await addProduct(productData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Add Product</h2>

            <label>Product Name:</label>
            <input type="text" ref={nameRef} required />

            <label>Description:</label>
            <textarea ref={descriptionRef} required />

            <label>Price:</label>
            <input type="number" step="0.01" ref={priceRef} required />

            <label>Color:</label>
            <input type="text" ref={colorRef} required />

            <label>Size:</label>
            <input type="text" ref={sizeRef} required />

            <label>Main Image:</label>
            <input type="file" accept="image/*" ref={mainImageRef} />

            <label>Additional Images:</label>
            <input type="file" accept="image/*" ref={imageUrlsRef} multiple />

            <label>Stock Quantity:</label>
            <input type="number" ref={stockRef} required />

            <label>Category:</label>
            <input type="text" ref={categoryRef} required />

            <button type="submit">Add Product</button>
        </form>
    );
};

export default ProductForm;
