import {Outlet} from "react-router";
import Header from "./Header";
import {useEffect, useState} from "react";
import {Api, type ProductTypeDto} from "../../Api.ts";

const api = new Api();

export default function Layout() {
    
    
 
    const [productTypes, setProductTypes] = useState<ProductTypeDto[]>([])
    
    useEffect(() => {
        api.api.productTypeGetProductTypes()
            .then(response => setProductTypes(response.data))
            .catch(error => console.error("Failed to load product types:", error));
        
    },[]);
    return (
        <>
            <Header productTypes={productTypes}/>
            <main className="page">
                <Outlet context={productTypes}/>
            </main>
        </>
    );
}
