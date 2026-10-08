import {Link} from "react-router";
import type {ProductDto} from "../../Api.ts";
import ProductCard from "../components/ProductCard";

type ProductSectionProps = {
    title: string;
    products: ProductDto[];
    productTypeId: string;
    index?: number;
    loading?: boolean;
};

export default function ProductSection({title, products, productTypeId, index, loading}: ProductSectionProps) {
    return (
        <section className="section">
            <div className="section__head">
                {index != null && <span className="section__index">{String(index).padStart(2, "0")}</span>}
                <h2 className="section__title">{title}</h2>
                <span className="section__rule"/>
                <Link to={`/products?productTypeId=${productTypeId}`} className="link-arrow">
                    View all <span className="arrow">→</span>
                </Link>
            </div>

            <div className="section__row">
                {loading
                    ? Array.from({length: 4}, (_, i) => <div key={i} className="card card--skeleton"/>)
                    : products.length === 0
                        ? <p className="empty-note">No entries on file.</p>
                        : products.map(product => (
                            <ProductCard key={product.productId} product={product}/>
                        ))}
            </div>
        </section>
    );
}
