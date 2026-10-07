import { useParams, useNavigate } from "react-router"
import {Api, type ProductDto} from "../../Api.ts";
import {useEffect, useState} from "react";


const api = new Api();

export default function ItemProductPage() {

    const { productId } = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState<ProductDto | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
            if(!productId){
                setError("ProductId not set");
                setLoading(false);
                return;
            }


        api.api.productGetProduct(productId)
            .then(response => {
                setProduct(response.data);
            })
            .catch(() => {
                setError("Could not load product.");
            })
            .finally(() => {
                setLoading(false);
            });
    }, [productId]);

    if (loading) {
        return <p>Loading product...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    if (!product) {
        return <p>Product not found.</p>;
    }



    return (
        <div>
            <button onClick={() => navigate("/products")}>
                Back to products
            </button>
            
                <h1>{product.productName}</h1>

                <p>
                    {product.description}
                </p>

                <h2>
                    ${product.price}
                </h2>

                <p>
                    Inventory: {product.inventory}
                </p>

                <p>
                    Category: {product.productTypeId}
                </p>

                {product.vendor && (
                    <p>
                        Sold by: {product.vendor.username}
                    </p>
                )}
            </div>
            );
            
}