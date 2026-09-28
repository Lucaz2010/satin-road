import { APITester } from "./APITester";
import "./index.css";

import logo from "./logo.svg";
import reactLogo from "./react.svg";
import {Api, type ProductType} from "../Api.ts";
import {useEffect, useState} from "react";



const MyApi = new Api();  

export function App() {

    const [productTypes, setProductTypes] = useState<ProductType[]>([])
    
    useEffect(() => {
        MyApi.getProductTypes.productTypeGetProductTypes()
            .then(r =>{ 
                const data = r.data;
                setProductTypes(data);
            })
        }, []);
    
    
        
        
        
  return (
    <div className="app">
        {
        productTypes.map(p=>{
            return <div key={p.productTypeId}>{p.productTypeName}</div>
         
    })
        }
        
    </div>
  );
}

export default App;
