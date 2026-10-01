import { APITester } from "./APITester";
import "./index.css";

import logo from "./logo.svg";
import reactLogo from "./react.svg";
import {Api, type Product, type ProductType} from "../Api.ts";
import {useEffect, useState} from "react";



const MyApi = new Api();  

export function App() {
    
    const [products, setProducts] = useState<Product[]>([]);
    
    useEffect(() => {
        MyApi.product.productGetProducts({
            page: 1,
            resultsPerPage:2
        }
        )
            .then(r =>{ 
                const data = r.data;
                setProducts(data);
            })
        }, []);
    
    
        
  return (
    <div className="app">
        {
        products.map(p=>{
            return <div key={p.productId}>{p.productName}</div>
         
    })
        }
        
    </div>
  );
}

export default App;
