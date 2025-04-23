import React, { useState } from "react";
import { fetchProducts, productDelete } from "./ProductService";

// Define the Product interface for TypeScript
interface Product {
  id: string;
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

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const handleFetchProducts = async () => {
    try {
      const data = await fetchProducts();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      await productDelete(id);
      const updatedProducts = products.filter((item) => item.id !== id);
      setProducts(updatedProducts);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleUpdateProduct = (id: string) => {
    // Placeholder for product update functionality
    console.log("Updating product with ID:", id);
  };

  return (
    <div>
      <h2>Product List</h2>
      <button onClick={handleFetchProducts}>Fetch Products</button>
      {products.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Color</th>
              <th>Size</th>
              <th>Main Image</th>
              <th>Stock Quantity</th>
              <th>Category</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>${product.price}</td>
                <td>{product.color}</td>
                <td>{product.size}</td>
                <td>
                  <img
                    src={`/Image/${product.mainImageUrl}`}
                    alt={product.name}
                    width="100"
                    height="100"
                  />
                </td>
                <td>{product.stockQuantity}</td>
                <td>{product.category}</td>
                <td>
                  <button onClick={() => handleUpdateProduct(product.id)}>
                    Update
                  </button>
                  <button onClick={() => deleteProduct(product.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No products available</p>
      )}
    </div>
  );
};

export default ProductList;
