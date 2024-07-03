import React, { useState, memo } from "react";
import { formatMoney } from '../ultils/helper';
import label from '../assets/label.png';
import labelBlue from '../assets/labelBlue.png';
import { renderStarFromNumber } from '../ultils/helper';
import { SelectOption } from './';
import icons from "../ultils/icons";
import { createSearchParams, useLocation, useNavigate } from "react-router-dom";
import path from "../ultils/path";
import { useDispatch, useSelector } from "react-redux";
import { showModal } from "../store/app/appSlice";
import DetailProduct from "../pages/public/detailProduct";
import { apiUpdateCart, apiUpdateWishlist } from "../apis";
import { toast } from 'react-toastify'
import { getInforUser } from "../store/users/asyncActions";
import Swal from "sweetalert2";
import clsx from "clsx";

const { AiFillEye, FaCartPlus, BsCartCheckFill, FaHeart } = icons;

const Product = ({ productData, isNew, normal, className }) => {
    const [isShowOption, setIsShowOption] = useState(false);
    const { current } = useSelector(state => state.user)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation()
    const handleClickOption = async (e, option) => {
        e.stopPropagation()
        if (option === 'CART') {
            if (!current) return Swal.fire({
                title: 'Almost...',
                text: 'Please login first!',
                icon: 'info',
                cancelButtonText: 'Not now!',
                showCancelButton: true,
                confirmButtonText: 'Log in!'
            }).then((rs) => {
                if (rs.isConfirmed) navigate({
                    pathname: `/${path.LOGIN}`,
                    search: createSearchParams({ redirect: location.pathname }).toString()
                })
            })
            const response = await apiUpdateCart({ pid: productData?._id, quantity: 1 })
            if (response.success) {
                dispatch(getInforUser())
            }
            else toast.error(response.mes)
        }
        if (option === 'WISHLIST') {
            const response = await apiUpdateWishlist(productData?._id)
            if (response.success) {
                dispatch(getInforUser())
            }
            else toast.error(response.mes)
        }
        if (option === 'VIEW') {
            dispatch(showModal({ isShowModal: true, modalChildren: <DetailProduct data={{ pid: productData?._id, category: productData?.category }} isQuickView /> }))
        }
    }
    return (
        <div className={clsx("w-full text-base px-[10px]", className)}>
            <div
                className="w-full border p-[15px] flex flex-col items-center cursor-pointer"
                onClick={() => navigate(`/products/${productData?.category}/${productData?._id}/${productData?.titleProduct}`)}
                onMouseEnter={e => {
                    e.stopPropagation();
                    setIsShowOption(true);
                }}
                onMouseLeave={e => {
                    e.stopPropagation();
                    setIsShowOption(false);
                }}>
                <div className="w-full relative flex flex-col items-center">
                    {isShowOption && <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-2 animate-slide-top">
                        <span title="View" onClick={(e) => handleClickOption(e, 'VIEW')}><SelectOption icon={<AiFillEye />} /></span>
                        {current?.cart?.some(el => el.product._id === productData._id.toString())
                            ? <span title="Add to Cart"><SelectOption icon={<BsCartCheckFill color='orange' />} /></span>
                            : <span title="Add to Cart" onClick={(e) => handleClickOption(e, 'CART')}><SelectOption icon={<FaCartPlus />} /></span>}
                        <span title="Add to Wishlist" onClick={(e) => handleClickOption(e, 'WISHLIST')}><SelectOption icon={<FaHeart color={current?.wishlist?.some(i => i._id === productData?._id.toString()) ? 'red' : 'gray'} />} /></span>
                    </div>}
                    <img src={productData?.imagesProduct[0] || ''} alt="" className="w-[243px] h-[243px] object-cover" />
                    {!normal && <img src={isNew ? label : labelBlue} alt="" className={`absolute ${isNew ? 'w-[120px] top-[-32px] left-[-42px]' : 'w-[150px] top-[-39px] left-[-50px] '} object-contain`} />}
                    <span className="font-bold top-[-10px] left-[-12px] text-white absolute">{isNew ? 'New' : 'Trending'}</span>
                </div>
                <div className="flex flex-col gap-1 mt-[15px] items-start w-full">
                    <span className="flex h-4">{renderStarFromNumber(productData?.ratingsProduct, 14)?.map((el, index) => (
                        <span key={index}>{el}</span>
                    ))}</span>
                    <span>{productData?.titleProduct}</span>

                    {productData?.saleProduct
                        ? <div className="flex gap-4 items-center">
                            <span className=" text-[#3BB77E]">{`${formatMoney(productData?.finalprice)} VNĐ`}</span>
                            <del className="">{`${formatMoney(productData?.price)} VNĐ`}</del>
                        </div>
                        : <span>{`${formatMoney(productData?.price)} VNĐ`}</span>
                    }
                </div>
            </div>
        </div>
    )
}

export default memo(Product)