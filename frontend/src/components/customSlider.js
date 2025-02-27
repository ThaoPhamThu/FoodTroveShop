import React, { memo } from "react";
import { Product } from './';
import Slider from "react-slick";

const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
};

const CustomSlider = ({ products, activedTab, normal }) => {
    return (
        <>
            {products && <Slider className="custom-slider" {...settings}>
                {products?.map(el => (
                    <Product key={el._id} productData={el} isNew={activedTab === 1 ? false : true} normal={normal} />
                ))}
            </Slider>}
        </>
    )
}

export default memo(CustomSlider)