import { Box, Container, Grid } from "@mui/material";
import ProductCard from "../../widgets/ProductCard";
import Pagination from "../../widgets/Pagination";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { IProduct } from "../../models/IProduct";
import { Button } from "../../ui";
import { CategoriesFilter } from "../../widgets";
import SortFilter from "../../widgets/SortFilter/SortFilter";
import { useHttp } from "../../hooks/useHttp";
import { IGetAllProductsDTO } from "../../models/dto/IGetAllProductsDTO";
import { useSelector } from "react-redux";
import { filtersSelector } from "../../store/filters/filtersSelector";

interface ProductListProps {
    
}

const ProductList: React.FC<ProductListProps> = () => {

    const [products, setProducts] = useState<IProduct[]>([]);
    const [productsSize, setProductsSize] = useState<number>(1);

    const { request } = useHttp();

    const filtersQuery = useSelector(filtersSelector);

    useEffect(() => {
       request(`products?page=${filtersQuery.page}&perPage=${4}&sort=${filtersQuery.sort}`, 'get', {
       }).then((res: IGetAllProductsDTO) => {
            setProducts(res.products);
            setProductsSize(res.length);
        })
    }, [filtersQuery]);


    return (
        <Box sx={{display: "flex", height: "100%"}}>
            <CategoriesFilter setProducts={(products: IProduct[]) => setProducts(products)}/>
            <Box sx={{flexGrow: 1, display: "flex", flexDirection: "column"}}>
                <SortFilter/>
                <Box sx={{display: "flex", flexDirection: "column", justifyContent: "space-between", flexGrow: 1}}>
                    <Grid container spacing={3} sx={{marginTop: "2rem"}}>
                        {products.map((product, index) => {
                            return (<Grid key={index} item xs = {12} md={4} lg = {3}>
                                <Link to={`product/${product._id}`}>
                                    <ProductCard product={product}/>
                                </Link>
                            </Grid>)
                        })}
                    </Grid>
                    <Pagination 
                    count={Math.floor(productsSize / 4) + 1}
                    color={"primary"}
                    sx={{display: "flex", justifyContent: "center"}}/>
                </Box>
            </Box>
        </Box>
    );
}
 
export default ProductList;