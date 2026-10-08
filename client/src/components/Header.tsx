import {Link, useLocation, useNavigate, useSearchParams} from "react-router";
import {type FormEvent, useEffect, useRef, useState} from "react";
import type {ProductTypeDto} from "../../Api.ts";

type HeaderProps = {
    productTypes: ProductTypeDto[];
};

export default function Header({ productTypes }: HeaderProps) {
    const {pathname} = useLocation();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const [searchOpen, setSearchOpen] = useState(false);
    const [query, setQuery] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (searchOpen) inputRef.current?.focus();
    }, [searchOpen]);

    const activeTypeId = pathname.startsWith("/products")
        ? searchParams.get("productTypeId")
        : pathname.startsWith("/category/") ? pathname.split("/")[2] : null;

    const links = [
        {to: "/", label: "Home", active: pathname === "/"},
        ...productTypes.map(type => ({
            to: `/products?productTypeId=${type.productTypeId}`,
            label: type.productTypeName ?? "Unnamed",
            active: activeTypeId === type.productTypeId,
        })),
    ];

    function handleSearch(e: FormEvent) {
        e.preventDefault(); 
        const q = query.trim();

        if (!searchOpen) {
            setSearchOpen(true); 
            return; 
        }

        if (!q) { 
            navigate("/products"); 
            setSearchOpen(false); 
            setQuery(""); 
            return;
        }
        navigate(`/products?search=${encodeURIComponent(q)}`); 
        setSearchOpen(false);
    }

    return (
        <header className="site-header">
            <div className="site-header__inner">
                <div className="site-header__top">
                    <Link to="/" className="brand">
                        Satin Road<span className="brand__dot">.</span>
                    </Link>
                    <div className="site-header__meta">
                        <Link to="/admin" className="header-btn">
                            Admin
                        </Link>

                        <Link to="/create-listing" className="header-btn">
                            Create Listing
                        </Link>
                    </div>
                </div>

                <div className="site-header__bar">
                    <nav className="site-nav" aria-label="Primary">
                        {links.map(link => (
                            <Link
                                key={link.label}
                                to={link.to}
                                className={`site-nav__link${link.active ? " is-active" : ""}`}
                                aria-current={link.active ? "page" : undefined}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>
                    
                    <div className="site-actions">
                        <form
                            className={`search${searchOpen ? " is-open" : ""}`}
                            role="search"
                            onSubmit={handleSearch}
                        >
                            <input
                                ref={inputRef}
                                className="search__input"
                                type="search"
                                placeholder="Search the index…"
                                aria-label="Search products"
                                value={query}
                                tabIndex={searchOpen ? 0 : -1}
                                onChange={e => setQuery(e.target.value)}
                                onKeyDown={e => e.key === "Escape" && setSearchOpen(false)}
                            />
                            <button type="submit" className="icon-btn" aria-label="Search">
                                <SearchIcon/>
                            </button>
                        </form>

                        <button
                            type="button"
                            className="icon-btn"
                            onClick={() => navigate("/login")}>
                            <UserIcon/>
                            <span className="icon-btn__label">Login</span>
                        </button>

                        <button type="button" className="icon-btn" aria-label="Cart, 0 items">
                            <CartIcon/>
                            <span className="cart-count">0</span>
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}

const iconProps = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    "aria-hidden": true,
} as const;

function SearchIcon() {
    return (
        <svg {...iconProps}>
            <circle cx="11" cy="11" r="6.5"/>
            <path d="M16 16l4.5 4.5"/>
        </svg>
    );
}

function UserIcon() {
    return (
        <svg {...iconProps}>
            <circle cx="12" cy="8.5" r="3.5"/>
            <path d="M5 20c1.2-3.5 3.8-5.2 7-5.2s5.8 1.7 7 5.2"/>
        </svg>
    );
}

function CartIcon() {
    return (
        <svg {...iconProps}>
            <path d="M3.5 4.5h2.2l2.1 10.2h10.4l1.8-7.2H7"/>
            <circle cx="9.5" cy="19" r="1.2"/>
            <circle cx="17" cy="19" r="1.2"/>
        </svg>
    );
}
