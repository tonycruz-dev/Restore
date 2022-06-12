import { useEffect } from "react";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useAppDispatch, useAppSelector } from "../../app/store/configStore";
import { fetchProductsAsync, productSelecters } from "./catalogSlice";
import ProductList from "./ProductList";


export default function Catalog() {
    const products = useAppSelector(productSelecters.selectAll);
    const dispatch =  useAppDispatch();
    const {productsLoaded, status} = useAppSelector(state => state.catalog)
    // const [products, setProducts] = useState<Product[]>([])
    // const [loading, setLoading] = useState(true)

    useEffect(() => {
     if(!productsLoaded) dispatch(fetchProductsAsync());

    },[dispatch, productsLoaded]);

    if (status.includes('pendingFetchProducts')) return <LoadingComponent message='Loading products...' />
    return (
        <>
            <ProductList products={products} />
        </>
    )
}