import {Link} from "react-router";
import type {ProductDto} from "../../Api.ts";
import {formatPrice, lotNumber} from "@/format.ts";
import {categoryLabel} from "@/categories.ts";

type ProductCardProps = {
    product: ProductDto;
}

export default function ProductCard({product}: ProductCardProps) {
    const lot = lotNumber(product.productId);
    const inventory = product.inventory ?? 0;

    return (
        <Link to={`/products/${product.productId}`} className="card">
            <div className="card__head">
                <span>Lot {lot}</span>
                <span>{categoryLabel(product)}</span>
            </div>

            <div className="card__plate" aria-hidden="true">
                <span className="card__plate-code">{lot}</span>
            </div>

            <div className="card__body">
                <h3 className="card__title">{product.productName}</h3>
                {product.description && <p className="card__desc">{product.description}</p>}
            </div>

            <dl className="card__meta">
                <div>
                    <dt>Vendor</dt>
                    <dd>{product.vendor?.username ?? "Unknown"}</dd>
                </div>
                <div>
                    <dt>Stock</dt>
                    <dd className={inventory < 5 ? "is-low" : undefined}>
                        {inventory === 0 ? "Depleted" : `${inventory} units`}
                    </dd>
                </div>
            </dl>

            <div className="card__foot">
                <span className="card__price">{formatPrice(product.price)}</span>
                <span className="card__cta">View <span className="arrow">→</span></span>
            </div>
        </Link>
    );
}
