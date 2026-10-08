import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import type { ProductDto } from "../../Api.ts";
import { Api } from "../../Api.ts";

const api = new Api();

type ProductListProps={
    productTypeId?: string;
    search?: string;
}

export default function ProductList(
    {
        productTypeId,search,
    }: ProductListProps) {
    const [products, setProducts] = useState<ProductDto[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchProducts() {
            setLoading(true);
            setError(null);
            try {
                const response = await api.api.productGetProducts({
                    page: 1,
                    resultsPerPage: 12,
                    productTypeId: productTypeId
                        ? [productTypeId]
                        : undefined,
                    search: search || undefined,
                });

                setProducts(response.data);
            } catch (error) {
                console.error(error);
                setError("Could not load products.");
            } finally {
                setLoading(false);
            }
        }

        void fetchProducts();
    }, [productTypeId,search]);

    if (loading) {
        return <p>Loading products...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    if (products.length === 0) {
        return <p>No products found.</p>;
    }

    return (
        <div className="product-grid">
            {products.map((product) => (
                <ProductCard
                    key={product.productId}
                    product={product}
                />
            ))}
        </div>
    );
}