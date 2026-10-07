import {useNavigate, useSearchParams} from "react-router";
import ProductList from "@/components/ProductList.tsx";
import {useState} from "react";

export default function ProductsPage() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const productTypeId = searchParams.get("productTypeId");


    return (
        <div>
            
            <button onClick={() => navigate("/")}>
                Home
            </button>

            <h1>Products</h1>

            <input
                type="text"
                placeholder="Search products..."
            />


            <ProductList productTypeId={productTypeId ?? undefined}/>
        </div>
    );
}