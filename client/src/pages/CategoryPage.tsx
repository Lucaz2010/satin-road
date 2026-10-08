import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Api, type ProductDto } from "../../Api.ts";

const MyApi = new Api();

export function CategoryPage() {
    const { categoryId } = useParams<{ categoryId: string }>();

    const [products, setProducts] = useState<ProductDto[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!categoryId) return;

        setLoading(true);

        MyApi.api.productGetProducts({
            page: 1,
            resultsPerPage: 50,
        })
            .then(response => {
             
                const categoryProducts = response.data.filter(
                    product => product.productTypeId === categoryId
                );

                setProducts(categoryProducts);
            })
            .catch(error => {
                console.error("Failed to load products:", error);
            })
            .finally(() => {
                setLoading(false);
            });

    }, [categoryId]);

    if (loading) {
        return <p>Loading products...</p>;
    }

    return (
        <div>
            <h1>Category</h1>

            {products.length === 0 ? (
                <p>No products found in this category.</p>
            ) : (
                <div>
                    {products.map(product => (
                        <div key={product.productId}>
                            <h2>{product.productName}</h2>
                            <p>Price: {product.price} DKK</p>
                            <p>Inventory: {product.inventory}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}