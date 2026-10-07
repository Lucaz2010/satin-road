import { useNavigate } from "react-router";
import ProductList from "../components/ProductList";
import {Api, type ProductDto} from "../../Api.ts";
import ProductSection from "@/components/ProductSection.tsx";
import {useEffect, useState} from "react";


const api = new Api();
export default function LandingPage() {
    const navigate = useNavigate();
    const [drugs, setDrugs] = useState<ProductDto[]>([]);
    const [weapons, setWeapons] = useState<ProductDto[]>([]);
    const [artifacts, setArtifacts] = useState<ProductDto[]>([]);


    useEffect(() => {
        async function fetchProducts() {
            
            try {
                const [
                    drugsResponse,
                    weaponsResponse, 
                    artifactsResponse
                ] = await Promise.all([
                    api.api.productGetProducts({
                        page:1,
                        resultsPerPage:4,
                        productTypeId:["1"],
                    }),
                    api.api.productGetProducts({
                        page:1,
                        resultsPerPage:4,
                        productTypeId:["2"],
                    }),
                    api.api.productGetProducts({
                        page:1,
                        resultsPerPage:4,
                        productTypeId:["3"],
                    }),
                    ]);
                    
                    setDrugs(drugsResponse.data);
                    setWeapons(weaponsResponse.data);
                    setArtifacts(artifactsResponse.data);
                    } catch (error) {
                    console.error("Failed to fetch products:", error);
            }
        }
        
        fetchProducts();
    }, []);
    
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


            <ProductSection
                title="Featured Drugs"
                products={drugs}
                productTypeId="1"
            />

            <ProductSection
                title="Featured Weaponry"
                products={weapons}
                productTypeId="2"

            />

            <ProductSection
                title="Featured Stolen Artifacts"
                products={artifacts}
                productTypeId="3"

            />

            {/*<h2>Featured Products</h2>*/}
            
            {/*<ProductList />*/}

            
        </div>
    );
}