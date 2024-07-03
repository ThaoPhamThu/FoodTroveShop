import React, { useEffect, useState, memo } from "react";
import { apiGetProducts } from "../apis/product";
import { CustomSlider } from "./";
import discount1 from '../assets/discount-1.png';
import discount2 from '../assets/discount-2.png';
import discount3 from '../assets/discount-3.png';
import { getNewProducts } from '../store/products/asyncActions';
import { useDispatch, useSelector } from "react-redux";

const tabs = [
    {
        id: 1,
        name: "best seller",
    },
    {
        id: 2,
        name: "new arrivals",
    },
];

const BestSeller = () => {
    const [bestSellers, setBestSellers] = useState(null);
    const [activedTab, setActivedTab] = useState(1);
    const [products, setProducts] = useState(null);
    const dispatch = useDispatch();
    const { newProducts } = useSelector(state => state.products)

    const fetchProducts = async () => {
        const response = await apiGetProducts({ sort: "-productSold" });

        if (response?.success) {
            setBestSellers(response.products);
            setProducts(response.products);
        }

    };

    useEffect(() => {
        fetchProducts();
        dispatch(getNewProducts());
    }, []);

    useEffect(() => {
        if (activedTab === 1) setProducts(bestSellers);

        if (activedTab === 2) setProducts(newProducts);

    }, [activedTab]);

    return (
        <div>
            <div className="flex text-[20px] ml-[-32px]">
                {tabs.map((el) => (
                    <span
                        key={el.id}
                        className={`font-semibold uppercase px-8 border-r cursor-pointer text-gray-400 ${activedTab === el.id ? "text-gray-900" : ""
                            }`}
                        onClick={() => setActivedTab(el.id)}
                    >
                        {el.name}
                    </span>
                ))}
            </div>
            <div className="mt-4 mx-[-10px]  border-main border-t-2 pt-4">
                <CustomSlider products={products} activedTab={activedTab} />
            </div>
            <div className="w-full flex gap-[20px] mt-4">
                <img src={discount1} alt="banner" className="flex-1 object-contain w-[285px]" />
                <img src={discount2} alt="banner" className="flex-1 object-contain w-[285px]" />
                <img src={discount3} alt="banner" className="flex-1 object-contain w-[285px]" />
            </div>
        </div>
    );
};

export default memo(BestSeller);
