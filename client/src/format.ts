const priceFormat = new Intl.NumberFormat("en-US", {style: "currency", currency: "USD"});

export function formatPrice(price?: number) {
    return price == null ? "—" : priceFormat.format(price);
}

// Short catalogue reference derived from the product id, e.g. "3F9A1C".
export function lotNumber(id?: string) {
    return id ? id.replace(/-/g, "").slice(0, 6).toUpperCase() : "------";
}
