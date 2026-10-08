import {useEffect, useState} from "react";
import {Api, type ProductDto} from "../../Api.ts";
import ProductSection from "@/components/ProductSection.tsx";
import FeaturedVendors from "@/components/FeaturedVendors.tsx";
import {CATEGORIES} from "@/categories.ts";

const api = new Api();

export default function LandingPage() {
    const [productsByType, setProductsByType] = useState<Record<string, ProductDto[]>>({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Promise.all(CATEGORIES.map(category =>
            api.api.productGetProducts({
                page: 1,
                resultsPerPage: 4,
                productTypeId: [category.id],
            })
        ))
            .then(responses => setProductsByType(Object.fromEntries(
                CATEGORIES.map((category, i) => [category.id, responses[i]?.data ?? []])
            )))
            .catch(error => console.error("Failed to fetch products:", error))
            .finally(() => setLoading(false));
    }, []);

    return (
        <>
            <FeaturedVendors/>

            {CATEGORIES.map((category, i) => (
                <ProductSection
                    key={category.id}
                    index={i + 1}
                    title={category.label}
                    products={productsByType[category.id] ?? []}
                    productTypeId={category.id}
                    loading={loading}
                />
            ))}
        </>
    );
}
