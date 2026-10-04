import { useNavigate } from "react-router";

export default function ProductsPage() {
    const navigate = useNavigate();

    return (
        <div>
            <h1>Products</h1>

            <input
                type="text"
                placeholder="Search products..."
            />

            <button onClick={() => navigate("/")}>
                Home
            </button>

            <div>
                <button onClick={() => navigate("/products/1")}>
                    Example Product
                </button>
            </div>
        </div>
    );
}