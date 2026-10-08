import { useParams } from "react-router";
import ProductList from "../components/ProductList";

export default function VendorPage() {
    const { vendorId } = useParams();

    

    return (
        <div className="page">
            <h1>Vendor Profile</h1>

            <p>Vendor ID: {vendorId}</p>

            <h2>Products</h2>

            {vendorId ? (
                <ProductList vendorId={vendorId} />
            ) : (
                <p>Vendor not found.</p>
            )}
        </div>
    );
}