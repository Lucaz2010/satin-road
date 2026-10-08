import type {ProductDto} from "../Api.ts";

// Ids match the seeded ProductType rows on the server.
export const CATEGORIES = [
    {id: "1", label: "Drugs"},
    {id: "2", label: "Weaponry"},
    {id: "3", label: "Stolen Artifacts"},
] as const;

export function categoryLabel(product: ProductDto) {
    return product.productType?.productTypeName
        ?? CATEGORIES.find(c => c.id === product.productTypeId)?.label
        ?? "Unfiled";
}
