import type {ProductDto} from "../../Api.ts";
import ProductCard from "../components/ProductCard";
import {use} from "react";
import {useNavigate} from "react-router";



type ProductSectionProps = {
    title: string;
    products: ProductDto[];
    productTypeId: string;
};

export default function ProductSection({
    title,products,productTypeId}: ProductSectionProps) {
    
    const navigate = useNavigate();
    
    return (
        <section>
            <div>
                <h2>{title}</h2>
                <button  onClick={() =>
                    navigate(`/products?productTypeId=${productTypeId}`)
                }
                >
                    View All</button>
                
            </div>
            <div>
                {products.map((product)=>
                <ProductCard
                    key={product.productId}
                    product={product}
                />)}
            </div>
            
        </section>
        
    )
    
}