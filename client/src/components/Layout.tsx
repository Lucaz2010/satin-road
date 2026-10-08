import {Outlet} from "react-router";
import Header from "./Header";
import {useEffect, useState} from "react";
import {Api, type ProductTypeDto} from "../../Api.ts";

const api = new Api();
export default function Layout() {
    const [productTypes, setProductTypes] = useState<ProductTypeDto[]>([]);

    async function loadProductTypes() {
        try {
            const response = await api.api.productTypeGetProductTypes();
            setProductTypes(response.data);
        } catch (error) {
            console.error("Failed to load product types:", error);
        }
    }

    useEffect(() => {
        void loadProductTypes();
        const handleProductTypesChanged = () => {
            void loadProductTypes();
        };
        window.addEventListener("productTypesChanged", handleProductTypesChanged);
        return () => {
            window.removeEventListener("productTypesChanged", handleProductTypesChanged);
        };
    }, []);
    return (<> <Header productTypes={productTypes}/>
        <main className="page"><Outlet context={productTypes}/></main>
    </>);
}