import {useEffect, useState} from "react";
import {useNavigate} from "react-router";
import {Api, type ProductTypeDto} from "../../Api.ts";

const api = new Api();

export default function CreateListingPage() {
    const navigate = useNavigate();

    const [productTypes, setProductTypes] = useState<ProductTypeDto[]>([]);
    const [productName, setProductName] = useState("");
    const [productTypeId, setProductTypeId] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [inventory, setInventory] = useState("");
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    
    useEffect(() => {
        async function loadProductTypes() {
            try {
                const response = await api.api.productTypeGetProductTypes({isActive: true,});
                setProductTypes(response.data);
            } catch (error) {
                console.error("Failed to load product categories:", error);
                setError("Failed to load product categories.");
            } finally {
                setLoading(false);
            }
        }

        void loadProductTypes();
    }, []);

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        setError("");
        const storedUser = localStorage.getItem("user");
        const user = storedUser ? JSON.parse(storedUser) : null;
        if (!user) {
            setError("You must be logged in to create a listing.");
            return;
        }
        if (!productTypeId) {
            setError("Please select a category.");
            return;
        }
        setSaving(true);
        try {
            await api.api.productCreateProduct({
                productName,
                productTypeId,
                description: description || undefined,
                price: Number(price),
                inventory: Number(inventory),
                vendorId: user.userId,
            });
            navigate("/");
        } catch (error) {
            console.error("Failed to create listing:", error);
            setError("Failed to create listing. Please check your information.");
        } finally {
            setSaving(false);
        }
    }

    if (loading) {
        return <p>Loading categories...</p>;
    }
    return (<div className="page">
        <div className="admin-category">
            <div className="admin-category__intro"><span className="eyebrow">Marketplace</span> <h1
                className="admin-category__title"> Create Listing </h1> <p
                className="admin-category__description"> Create a product listing and make it available to other
                users. </p></div>
            <div className="section">
                <div className="section__head"><span className="section__index">01</span> <h2
                    className="section__title"> Product Details </h2> <span className="section__rule"/></div>
                <form className="admin-category__form" onSubmit={handleSubmit}>
                    <div className="admin-category__form-header"><span className="eyebrow"> Listing Information </span>
                    </div>
                    <div className="admin-category__form-field"><label htmlFor="product-name"> Product Name </label>
                        <input id="product-name" type="text" value={productName}
                               onChange={event => setProductName(event.target.value)} placeholder="Product name"
                               required/></div>
                    <div className="admin-category__form-field"><label htmlFor="product-category"> Category </label>
                        <select id="product-category" value={productTypeId}
                                onChange={event => setProductTypeId(event.target.value)} required>
                            <option value=""> Select a category</option>
                            {productTypes.map(type => (<option key={type.productTypeId}
                                                               value={type.productTypeId}> {type.productTypeName} </option>))}
                        </select></div>
                    <div className="admin-category__form-field"><label
                        htmlFor="product-description"> Description </label> <textarea id="product-description"
                                                                                      value={description}
                                                                                      onChange={event => setDescription(event.target.value)}
                                                                                      placeholder="Describe your product"
                                                                                      rows={5}/></div>
                    <div className="admin-category__form-field"><label htmlFor="product-price"> Price </label> <input
                        id="product-price" type="number" min="0.01" step="0.01" value={price}
                        onChange={event => setPrice(event.target.value)} placeholder="0.00" required/></div>
                    <div className="admin-category__form-field"><label htmlFor="product-inventory"> Inventory </label>
                        <input id="product-inventory" type="number" min="1" step="1" value={inventory}
                               onChange={event => setInventory(event.target.value)} placeholder="Quantity available"
                               required/></div>
                    {error && (<p className="admin-category__form-error"> {error} </p>)}
                    <div className="admin-category__form-actions">
                        <button type="button" className="admin-category__button admin-category__button--deactivate"
                                onClick={() => navigate(-1)} disabled={saving}> Cancel
                        </button>
                        <button type="submit" className="admin-category__button admin-category__button--activate"
                                disabled={saving}> {saving ? "Creating..." : "Create Listing"} </button>
                    </div>
                </form>
            </div>
        </div>
    </div>);
}