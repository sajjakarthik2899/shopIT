import React, { useEffect } from 'react'
import MetaData from './layouts/meatdata'
import { useGetProductsQuery } from '../Redux/api/productsApi.js'
import ProductItem from './Products/productItem.jsx'
import Loader from './layouts/Loader.jsx'
import toast from 'react-hot-toast'
import CustomPagination from './layouts/CustomPagination.jsx'
const Home = () => {
    const {data, isLoading, error, isError} = useGetProductsQuery();
    console.log(data, "Query Data");
    useEffect(() => {
        if (isError) {
            toast.error(error?.data?.message || "Something went wrong while fetching products");
            console.error("Error fetching products:", error);
        }
    }, [isError]);
    if(isLoading) return <Loader />
    console.log(data, "Redux Toolkit Query Data");
    return (
        <>
            <MetaData title={"Buy best product online"} />
            <div className="container">
            <div className="row">
                <div className="col-12 col-sm-6 col-md-12">
                <h1 id="products_heading" className="text-secondary">Latest Products</h1>

                <section id="products" className="mt-5">
                    <div className="row">
                        {data?.products?.map((item)=>{
                            return <ProductItem key={item.id} product={item} />
                        })}
                    </div>
                </section>
                <CustomPagination
                    resultsPerPage={data?.resultsPerPage}
                    filteredProductsCount={data?.filteredProductsCount}
                />
                </div>
            </div>
            </div>
        </>
    )
}

export default Home
