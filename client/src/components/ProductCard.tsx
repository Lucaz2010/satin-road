import { useNavigate } from "react-router"; 
import type {ProductDto} from "../../Api.ts";

type ProductCardProps = {
    product: ProductDto;
}

export default function ProductCard({product} : ProductCardProps) {
    const navigate = useNavigate();
    
    return (
        <div>
            {/*<p> {product.productType?.productTypeName ?? "Uncategorized"} </p>*/}
            <h2> {product.productName} </h2>
            {product.description && <p>{product.description}</p>}
            <p> Price: ${product.price}</p>
            <p>Inventory: {product.inventory}</p>
            <p> Seller: {product.vendor?.username ?? "Unknown vendor"} </p>
            <button onClick={() => navigate(`/products/${product.productId}`)} >
                View Product </button>
            










        </div>
    );
}

