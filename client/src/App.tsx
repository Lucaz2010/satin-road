import "./index.css";

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
            });
        
        MyApi.product.productGetProducts({
            page: 1,
            resultsPerPage:10
        })
            .then(r =>{
                setProducts(r.data);
            });
        
        }, []);


    function createProduct() {
        
        MyApi.product.productCreateProduct({
            
            
            productName: newProductName,
            price : Number(newPrice),
            vendorId: "1",
            inventory : Number(newInventory),
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
