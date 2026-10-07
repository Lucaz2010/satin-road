import { useParams } from "react-router";

export default function VendorPage() {
    const { vendorId } = useParams();

    return (
        <div>
            <h1>Vendor Profile</h1>

            <p>Vendor ID: {vendorId}</p>

            <h2>Products</h2>
        </div>
    );
}