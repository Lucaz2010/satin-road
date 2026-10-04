import {useNavigate} from "react-router";

export default function LandingPage() {
    
    const navigate = useNavigate();
    
    return <div> Satin Road - A Place to gather your most desired globally stolen goods
        
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
        
        
    </div>
    
}