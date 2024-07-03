import React, { useEffect, useState, memo, Fragment } from "react";
import { ProductCard } from '.'
import { apiGetProducts } from "../apis";
import banner2 from '../assets/banner-2.jpg';
import banner3 from '../assets/banner-3.png';
import banner4 from '../assets/banner-4.png';
import banner5 from '../assets/banner-5.png';


const TopSaleProduct = () => {
    const [topSaleProduct, setTopSaleProduct] = useState(null);

    const fetchProducts = async () => {
        const response = await apiGetProducts({ limit: 9, page: 1, sort: "-saleProduct" });

        if (response?.success) setTopSaleProduct(response.products);
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div className="w-main ">
            <h3 className="text-[20px] font-semibold py-[15px] border-b-2 border-main">SUPER SALE PRODUCT</h3>
            <div className="flex flex-wrap mt-[15px] mx-[-10px] relative">
                {topSaleProduct?.map((el) => (
                    <Fragment>
                        <ProductCard key={el._id} pid={el._id} saleProduct={el.saleProduct} finalprice={el.finalprice} category={el.category} image={el.imagesProduct[0]} title={el.titleProduct} ratingsProduct={el.ratingsProduct} price={el.price} />
                    </Fragment>

                ))}

            </div>
            <div className="flex gap-[20px]">
                <img src={banner2} alt="" className="w-[580px] h-[655px] object-cover" />
                <div className="flex flex-col gap-4">
                    <img src={banner4} alt="" className="w-[300px] h-[319px] object-cover" />
                    <img src={banner5} alt="" className="w-[300px] h-[319px] object-cover" />
                </div>
                <img src={banner3} alt="" className="w-[300px] h-[655px] object-cover" />

            </div>
        </div>
    )
}

export default memo(TopSaleProduct)