import { useParams, useNavigate } from "react-router"

export default function ItemProductPage() {

    const { productId } = useParams();
    const navigate = useNavigate();

    return (
        <div>
            <button onClick={() => navigate("/products")}>
                Back to products
            </button>

            <h1>Product</h1>

            <p>Product ID: {productId}</p>
        </div>
    );
    
    
}