import { useEffect, useState } from "react";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { Product } from "../../app/models/product"
import ProductList from "./ProductList";


export default function Catalog() {
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
     fetch('http://localhost:5171/api/Products')
       .then(response => response.json())
       .then(data => setProducts(data))
       .finally(() => setLoading(false));
    },[]);

    if (loading) return <LoadingComponent message='Loading products...' />
    return (
        <>
            <ProductList products={products} />
        </>
    )
}