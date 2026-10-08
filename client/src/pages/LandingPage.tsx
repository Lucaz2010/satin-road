import {useEffect, useState} from "react";
import {Api, type ProductDto, type ProductTypeDto} from "../../Api.ts";
import ProductSection from "@/components/ProductSection.tsx";
import FeaturedVendors from "@/components/FeaturedVendors.tsx";
import {useOutletContext} from "react-router";


const api = new Api();

export default function LandingPage() {
    const productTypes = useOutletContext<ProductTypeDto[]>();

    const [productsByType, setProductsByType] =
        useState<Record<string, ProductDto[]>>({});

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (productTypes.length === 0) {
            return;
        }

        setLoading(true);

        Promise.all(
            productTypes.map(type =>
                api.api.productGetProducts({
                    page: 1,
                    resultsPerPage: 4,
                    productTypeId: [type.productTypeId!],
                })
            )
        )
            .then(responses =>
                setProductsByType(
                    Object.fromEntries(
                        productTypes.map((type, i) => [
                            type.productTypeId,
                            responses[i]?.data ?? [],
                        ])
                    )
                )
            )
            .catch(error =>
                console.error("Failed to fetch products:", error)
            )
            .finally(() => setLoading(false));
    }, [productTypes]);

    return (
        <>
            <FeaturedVendors />

            {productTypes.map((type, i) => (
                <ProductSection
                    key={type.productTypeId}
                    index={i + 1}
                    title={type.productTypeName ?? "Unnamed"}
                    products={productsByType[type.productTypeId!] ?? []}
                    productTypeId={type.productTypeId!}
                    loading={loading}
                />
            ))}
        </>
    );
}