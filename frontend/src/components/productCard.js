import React, { memo } from "react";
import { renderStarFromNumber, formatMoney } from '../ultils/helper'
import { useNavigate } from "react-router-dom";
import path from "../ultils/path";

const ProductCard = ({ title, image, ratingsProduct, price, pid, category, saleProduct, finalprice }) => {
    const navigate = useNavigate();
    return (
        <div className="w-1/3 flex-auto flex px-[10px] mb-[20px] relative">
            <div
                className="flex w-full border cursor-pointer"
                onClick={() => navigate(`/products/${category}/${pid}/${title}`)}>
                <img src={image} alt="products" className="w-[120px] object-contain p-4" />
                <div className="flex flex-col gap-1 mt-[15px] items-start w-full text-xs mt-[-15px] justify-center">
                    <span className="capitalize text-sm">{title}</span>
                    <span className="flex">{renderStarFromNumber(ratingsProduct, 14)?.map((el, index) => (
                        <span key={index}>{el}</span>
                    ))}</span>
                    {saleProduct
                        ? <div className="flex gap-2 items-center">
                            <span className=" text-[#3BB77E]">{`${formatMoney(finalprice)} VNĐ`}</span>
                            <del className="">{`${formatMoney(price)} VNĐ`}</del>
                        </div>
                        : <span>{`${formatMoney(price)} VNĐ`}</span>
                    }
                </div>
            </div>
            <div className=" flex items-center justify-center bg-main absolute w-[60px] h-[45px] border rounded-lg right-[10px]">
                <span className="text-2xl text-white  font-semibold">{saleProduct}</span>
                <div className="flex flex-col">
                    <span className="text-white text-xs mt-1">%</span>
                    <span className="text-white text-[8px] pb-1">OFF</span>
                </div>
            </div>
        </div>
    )
}

export default memo(ProductCard)