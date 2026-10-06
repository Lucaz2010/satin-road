import { useNavigate } from "react-router";
import ProductList from "../components/ProductList";

export default function LandingPage() {
    const navigate = useNavigate();

    return (
        <div>
            <h1>Satin Road</h1>

            <p>
                A place to gather your most desired globally stolen goods.
            </p>

            <input
                type="text"
                placeholder="Search products..."
            />

            <button onClick={() => navigate("/products")}>
                Browse Products
            </button>

            <h2>Featured Vendors</h2>

            <p>
                Vendors with more than 100 completed orders will appear here.
            </p>
            

            <h2>Featured Products</h2>

            <ProductList />

            
        </div>
    );
}