import {useEffect, useState} from "react";
import {Api, type ProductTypeDto} from "../../Api.ts";

const api = new Api();



export default function AdminPage() {
    const [productTypes, setProductTypes] = useState<ProductTypeDto[]>([]);
    const [loading, setLoading] = useState(true);
    async function loadProductTypes() {
        try {
            const response = await api.api.productTypeGetProductTypes({
                isActive: false,
            });

            setProductTypes(response.data);
        } catch (error) {
            console.error("Failed to load product types:", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        void loadProductTypes();
    }, []);

    async function handleActivate(id: string) {
        try {
            await api.api.productTypeActivateProductType({id});

            await loadProductTypes();

            window.dispatchEvent(new Event("productTypesChanged"));
        } catch (error) {
            console.error("Failed to activate category:", error);
        }
    }

    async function handleDeactivate(id: string) {
        try {
            await api.api.productTypeDeactivateProductType({id});

            await loadProductTypes();

            window.dispatchEvent(new Event("productTypesChanged"));
        } catch (error) {
            console.error("Failed to deactivate category:", error);
        }
    }

    if (loading) {
        return <p>Loading categories...</p>;
    }

    return (
        <div className="page">
            <div className="admin-category">
                <div className="admin-category__intro"><span className="eyebrow">Administration</span> <h1
                    className="admin-category__title"> Category Management </h1> <p
                    className="admin-category__description"> Manage which product categories are currently available to
                    vendors and customers. </p></div>
                <div className="section">
                    <div className="section__head"><span className="section__index">01</span> <h2
                        className="section__title"> Product Categories </h2> <span className="section__rule"/></div>
                    <div className="admin-category__list"> {productTypes.map(type => {
                        const id = type.productTypeId;
                        if (!id) {
                            return null;
                        }
                        const isActive = type.isActive === true;
                        return (
                            <div className={`admin-category__item ${isActive ? "" : "admin-category__item--inactive"}`}
                                 key={id}>
                                <div className="admin-category__main">
                                    <div className="admin-category__name"> {type.productTypeName} </div>
                                    <p className="admin-category__text"> {type.description || "No description"} </p>
                                </div>
                                <div className="admin-category__status"><span
                                    className={`admin-category__status-dot ${isActive ? "admin-category__status-dot--active" : "admin-category__status-dot--inactive"}`}/>
                                    <span> {isActive ? "ACTIVE" : "INACTIVE"} </span></div>
                                <button
                                    className={`admin-category__button ${isActive ? "admin-category__button--deactivate" : "admin-category__button--activate"}`}
                                    type="button"
                                    onClick={() => isActive ? handleDeactivate(id) : handleActivate(id)}> {isActive ? "Deactivate" : "Activate"} </button>
                            </div>);
                    })} </div>
                </div>
            </div>
        </div>);
}