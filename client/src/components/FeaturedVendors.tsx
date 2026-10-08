import {useEffect, useState} from "react";
import {Link} from "react-router";
import {Api, type ProductDto} from "../../Api.ts";
import {formatPrice, lotNumber} from "@/format.ts";
import {categoryLabel} from "@/categories.ts";

const api = new Api();
const AUTOPLAY_MS = 7000;
const MAX_FEATURED = 3;

type Feature = {
    vendorName: string;
    listings: number;
    product: ProductDto;
};

// There is no sales data yet, so "top vendor" = most listings on file,
// and their most expensive item is the showcase piece.
function pickFeatured(products: ProductDto[]): Feature[] {
    const byVendor = new Map<string, ProductDto[]>();
    for (const product of products) {
        const vendorId = product.vendorId ?? product.vendor?.userId;
        if (!vendorId) continue;
        const list = byVendor.get(vendorId) ?? [];
        list.push(product);
        byVendor.set(vendorId, list);
    }

    return [...byVendor.values()]
        .sort((a, b) => b.length - a.length)
        .slice(0, MAX_FEATURED)
        .map(list => {
            const product = list.reduce((best, p) => (p.price ?? 0) > (best.price ?? 0) ? p : best);
            return {
                vendorName: product.vendor?.username ?? "Unknown vendor",
                listings: list.length,
                product,
            };
        });
}

export default function FeaturedVendors() {
    const [features, setFeatures] = useState<Feature[]>([]);
    const [loading, setLoading] = useState(true);
    const [index, setIndex] = useState(0);
    const [paused, setPaused] = useState(false);

    useEffect(() => {
        api.api.productGetProducts({page: 1, resultsPerPage: 50})
            .then(response => setFeatures(pickFeatured(response.data)))
            .catch(error => console.error("Failed to load featured vendors:", error))
            .finally(() => setLoading(false));
    }, []);

    const count = features.length;
    const go = (step: number) => setIndex(i => (i + step + count) % count);

    return (
        <section
            className={`featured${paused ? " is-paused" : ""}`}
            aria-roledescription="carousel"
            aria-label="Featured vendors"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocus={() => setPaused(true)}
            onBlur={() => setPaused(false)}
        >
            <div className="featured__head">
                <div>
                    <span className="eyebrow">Bestsellers · This cycle</span>
                    <h1 className="featured__title">Featured</h1>
                </div>

                {count > 1 && (
                    <div className="featured__controls">
                        <span className="featured__counter">
                            <span className="featured__counter-current">{String(index + 1).padStart(2, "0")}</span>
                            {" / "}{String(count).padStart(2, "0")}
                        </span>
                        <button type="button" className="arrow-btn" aria-label="Previous vendor" onClick={() => go(-1)}>←</button>
                        <button type="button" className="arrow-btn" aria-label="Next vendor" onClick={() => go(1)}>→</button>
                    </div>
                )}
            </div>

            {loading ? (
                <div className="featured__viewport featured__viewport--loading" aria-busy="true"/>
            ) : count === 0 ? (
                <p className="empty-note">No featured vendors on file.</p>
            ) : (
                <>
                    <div className="featured__viewport">
                        <div className="featured__track" style={{transform: `translateX(-${index * 100}%)`}}>
                            {features.map((feature, i) => (
                                <FeaturedSlide
                                    key={feature.product.productId}
                                    feature={feature}
                                    position={i}
                                    count={count}
                                    active={i === index}
                                />
                            ))}
                        </div>
                    </div>

                    {count > 1 && (
                        <div className="featured__progress-track">
                            <span
                                key={index}
                                className="featured__progress"
                                style={{animationDuration: `${AUTOPLAY_MS}ms`}}
                                onAnimationEnd={() => go(1)}
                            />
                        </div>
                    )}
                </>
            )}
        </section>
    );
}

type FeaturedSlideProps = {
    feature: Feature;
    position: number;
    count: number;
    active: boolean;
};

function FeaturedSlide({feature, position, count, active}: FeaturedSlideProps) {
    const {product, vendorName, listings} = feature;

    return (
        <article
            className={`slide${active ? " is-active" : ""}`}
            aria-roledescription="slide"
            aria-label={`${position + 1} of ${count}`}
            inert={!active}
        >
            <div className="slide__plate" aria-hidden="true">
                <span className="eyebrow">Exhibit {String.fromCharCode(65 + position)}</span>
                <span className="slide__plate-code">{lotNumber(product.productId)}</span>
                <span className="eyebrow">File · {categoryLabel(product)}</span>
                <span className="stamp">Top vendor</span>
            </div>

            <div className="slide__info">
                <p className="slide__vendor">
                    @{vendorName}
                    <span className="eyebrow"> · {listings} {listings === 1 ? "listing" : "listings"} on file</span>
                </p>
                <h2 className="slide__name">“{product.productName}”</h2>
                {product.description && <p className="slide__desc">{product.description}</p>}
                <div className="slide__foot">
                    <span className="slide__price">{formatPrice(product.price)}</span>
                    <Link to={`/products/${product.productId}`} className="btn-outline">
                        View item <span className="arrow">→</span>
                    </Link>
                </div>
            </div>
        </article>
    );
}
