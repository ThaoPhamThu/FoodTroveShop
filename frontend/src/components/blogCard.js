import React, { memo } from "react";
import { useNavigate } from "react-router-dom";

const BlogCard = ({ title, image, author, bid, category }) => {
    const navigate = useNavigate();
    return (
        <div className="w-1/3 flex-auto flex px-[10px] mb-[20px] relative">
            <div className="flex flex-col w-full border rounded-lg">
                <div className="flex flex-col gap-1 mt-[15px] items-start w-full text-xs mt-[-15px] justify-center p-6">
                    <div className="flex gap-2">
                        <span className="text-sm font-normal text-[#777777] border-r-2 pr-2 ">{`By ${author}`}</span>
                        <span className="text-sm font-normal text-[#777777]">{category}</span>
                    </div>
                    <h3 className="font-semibold text-lg">{title}</h3>
                    <span onClick={() => navigate(`/blogs/${category}/${bid}/${title}`)} className="font-semibold text-[#64B496] text-sm cursor-pointer">Read more</span>
                </div>
                <img src={image} alt="image blog" className="w-full " />
            </div>
        </div>
    )
}

export default memo(BlogCard)