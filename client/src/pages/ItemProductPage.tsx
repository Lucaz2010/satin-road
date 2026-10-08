import {useParams, useNavigate} from "react-router";
import {Api, type ProductDto} from "../../Api.ts";
import {useEffect, useState} from "react";
import {formatPrice} from "@/format.ts";

const api = new Api();
export default function ItemProductPage() {
    const {productId} = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState<ProductDto | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const storedUser = sessionStorage.getItem("user");
    const user = storedUser ? JSON.parse(storedUser) : null;
    useEffect(() => {
        if (!productId) {
            setError("ProductId not set");
            setLoading(false);
            return;
        }
        api.api.productGetProduct(productId).then(response => {
            setProduct(response.data);
        }).catch(() => {
            setError("Could not load product.");
        }).finally(() => {
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
    const isOwner = user !== null && product.vendor?.userId === user.userId;
    return (
        <div>
            <h1>
                {product.productName}
            </h1> 
            {product.description && (<p>{product.description}</p>)}
        <h2>{formatPrice(product.price)}</h2> <p> Inventory: {product.inventory} </p>
        <p> Category: {product.productTypeId} </p> {product.vendor && (
            <p> Sold by: {product.vendor.username} </p>)} {isOwner ? (
            <button
                type="button" onClick={() => navigate(`/products/${product.productId}/edit`)}> Edit
                Product 
            </button>) : (
                <button type="button" disabled={product.inventory === 0}> 
                    {product.inventory === 0 ? "Out of Stock" : "Buy"}
                </button>)}
    </div>);
}