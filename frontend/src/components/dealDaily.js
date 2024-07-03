import React, { useState, useEffect, memo } from "react";
import icons from "../ultils/icons";
import { apiGetProducts } from "../apis/product";
import { renderStarFromNumber, formatMoney, secondsToHms } from '../ultils/helper';
import { CountDown } from './';
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { getDealDaily } from "../store/products/productSlice";
import { useNavigate } from "react-router-dom";

const { AiFillStar, IoMenu } = icons;

let idInterval

const DealDaily = () => {
    const { dealDaily } = useSelector(state => state.products)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [hour, setHour] = useState(0);
    const [minute, setMinute] = useState(0);
    const [second, setSecond] = useState(0);
    const [expireTime, setExpireTime] = useState(false);


    const fetchDealDaily = async () => {
        const response = await apiGetProducts({ sort: '-ratingsProduct', limit: 20 });
        if (response.success) {
            const pr = response.products[Math.round(Math.random() * 20)]
            dispatch(getDealDaily({ data: pr, time: Date.now() + 24 * 60 * 60 * 1000 }))
        }
    }

    useEffect(() => {
        if (dealDaily?.time) {
            const dealtaTime = dealDaily.time - Date.now()
            const number = secondsToHms(dealtaTime)
            setHour(number.h)
            setMinute(number.m)
            setSecond(number.s)
        }
    })

    useEffect(() => {
        idInterval && clearInterval(idInterval)
        if (moment(moment(dealDaily?.time).format('MM/DD/YYYY')).isBefore((moment()))) fetchDealDaily();
    }, [expireTime]);

    useEffect(() => {
        idInterval = setInterval(() => {
            if (second > 0) setSecond(prev => prev - 1)
            else {
                if (minute > 0) {
                    setMinute(prev => prev - 1);
                    setSecond(60);
                } else {
                    if (hour > 0) {
                        setHour(prev => prev - 1);
                        setMinute(60);
                        setSecond(60);
                    } else {
                        setExpireTime(!expireTime)
                    }
                }

            }
        }, 1000);
        return () => {
            clearInterval(idInterval)
        }
    }, [second, minute, hour, expireTime]);

    return (
        <div className='border w-full flex-auto' >
            <div className="flex items-center justify-between p-4 w-full">
                <span className="flex-1 flex justify-center "><AiFillStar size={20} color="#DD1111" /></span>
                <span className="flex-8 font-semibold text-[20px] flex justify-center text-gray-700">DEAL DAILY</span>
                <span className="flex-1"></span>
            </div>
            <div
                className="w-full flex flex-col items-center pt-8 gap-2 px-4 cursor-pointer"
                onClick={() => navigate(`/products/${dealDaily?.data?.category}/${dealDaily?.data?._id}/${dealDaily?.data?.titleProduct}`)}>
                <img src={dealDaily?.data?.imagesProduct[0] || ''} alt="" className="w-full object-contain" />
                <span className="text-center text-2xl">{dealDaily?.data?.titleProduct}</span>
                <span className="flex">{renderStarFromNumber(dealDaily?.data?.ratingsProduct, 20)?.map((el, index) => (
                    <span key={index}>{el}</span>
                ))}</span>
                {dealDaily?.data?.saleProduct
                    ? <div className="flex flex-col gap-0 items-center">
                        <span className=" text-xl font-medium text-main">{`${formatMoney(dealDaily?.data?.finalprice)} VNĐ`}</span>
                        <del className="">{`${formatMoney(dealDaily?.data?.price)} VNĐ`}</del>
                    </div>
                    : <span className="text-xl font-medium text-main">{`${formatMoney(dealDaily?.data?.price)} VNĐ`}</span>
                }

            </div>
            <div className="px-4 mt-6 ">
                <div className="flex justify-center items-center gap-2 mb-4">
                    <CountDown unit={'Hours'} number={hour} />
                    <CountDown unit={'Minutes'} number={minute} />
                    <CountDown unit={'Seconds'} number={second} />
                </div>
                <button type="button" className="flex gap-2 mt-6 items-center justify-center w-full bg-main hover:bg-gray-800 text-white font-medium py-2">
                    <IoMenu />
                    <span>Options</span>
                </button>
            </div>
        </div>
    )
}

export default memo(DealDaily)