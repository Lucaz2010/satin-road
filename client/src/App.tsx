import { APITester } from "./APITester";
import "./index.css";

import logo from "./logo.svg";
import reactLogo from "./react.svg";
import {Api, type ProductDto, type ProductType} from "../Api.ts";
import {useEffect, useState} from "react";
import toast from "react-hot-toast";



const MyApi = new Api();  

export function App() {
    
    const [products, setProducts] = useState<ProductDto[]>([]);
    const [newProductName, setNewProductName] = useState("")

    const [productTypes, setProductTypes] = useState<ProductType[]>([]);
    const [selectedProductTypeId, setSelectedProductTypeId] = useState("");

    const [newPrice, setNewPrice] = useState("")
    const [newInventory, setNewInventory] = useState("")
    
    useEffect(() => {
        
        MyApi.productType.productTypeGetProductTypes()
            .then(r=> {
                setProductTypes(r.data);
            })
            .catch(e => {
                console.error("Product types error:", e);
                toast.error("Could not load product categories.");
            });
        
        MyApi.product.productGetProducts({
            page: 1,
            resultsPerPage:10
        }
        )
            .then(r =>{ 
                const data = r.data;
                setProducts(data);
            })
            .catch(e => {
                console.error("Products error:", e);
                toast.error("Could not load products.");
            });
        
        }, []);


    function createProduct() {
        if(!newProductName.trim()) {
            toast.error("Product name is required.");
            return;
        } 
        
        if(!selectedProductTypeId.trim()){
            toast.error("Please select a category.");
            return;
        }
        
        
        const price = Number(newPrice);

        if (!Number.isFinite(price) || price <= 0) {
            toast.error("Price must be higher than zero.");
            return;
        }

        const inventory = Number(newInventory);

        if (!Number.isInteger(inventory) || inventory < 1) {
            toast.error("Inventory must be 1 or higher.");
            return;
        }
        
        
        MyApi.product.productCreateProduct({
            
            
            productName: newProductName,
            price : Number(newPrice),
            vendorId: "1",
            inventory : inventory,
            productTypeId: selectedProductTypeId,
        }).then(r => {
            const duplicate = [...products,r.data];
            setProducts(duplicate);
            setNewProductName("");
            setSelectedProductTypeId("");
            setNewPrice("");
            setNewInventory("");
        }).catch(e => {
            toast(e.error.title)
            
        });
    }

    return (
    <div className="app">
        {
        products.map(p=>{
            return <div key={p.productId}>{p.productName}</div>
         
    })
        }
        
        <input value={newProductName} onChange={e => setNewProductName(e.target.value)}/>
        <select
        value={selectedProductTypeId}
        onChange={e => setSelectedProductTypeId(e.target.value)}>
            <option value="">Select Category</option>
            {productTypes.map(type => {
                return(
                <option
                    key = {type.productTypeId}
                    value={type.productTypeId}
                    >
                    {type.productTypeName}
                </option>);
            })}
        </select>

        <input type={"number"} placeholder={"Price DKK"} value={newPrice} onChange={e => setNewPrice(e.target.value)}/>

        <input
            type="number"
            placeholder={"Inventory"}
            value={newInventory}
            onChange={e => setNewInventory(e.target.value)}
        />
        
        <button onClick={createProduct}>Create Product</button>
        
    </div>
  );
}

export default App;
