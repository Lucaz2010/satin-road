import { useNavigate, useSearchParams } from "react-router";
import ProductList from "@/components/ProductList.tsx";
import { useEffect, useState } from "react";

export default function ProductsPage() {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    
    const productTypeId = searchParams.get("productTypeId");
    const currentSearch = searchParams.get("search") ?? "";

    const [search, setSearch] = useState(currentSearch);

   
    function handleSearch(event: React.FormEvent) {
        event.preventDefault();

        const params = new URLSearchParams(searchParams);

        if (search.trim()) {
            params.set("search", search.trim());
        } else {
            params.delete("search");
        }

        setSearchParams(params);
    }

    return (
        <div>
            
            <h1>Products</h1>
            <ProductList
                productTypeId={productTypeId ?? undefined}
                search={currentSearch || undefined}
            />
        </div>
    );
}