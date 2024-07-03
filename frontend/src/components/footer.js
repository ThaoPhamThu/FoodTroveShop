import React, { memo } from 'react';
import logo from '../assets/logo-f.png';
import { IoLocationSharp } from "react-icons/io5";
import { RiPhoneFill } from 'react-icons/ri';
import { MdEmail } from 'react-icons/md';

const Footer = () => {
    return (
        <div className='w-full'>
            <div className='h-[407px] bg-[#F7F7F7] flex items-center justify-center text-[13px]'>
                <div className='w-main flex gap-4'>
                    <div className='flex-2 flex flex-col gap-2'>
                        <img src={logo} alt='logo' className='w-[150px] object-contain mt-[-20px]' />
                        <span className='text-[#7A7A7A] text-sm mb-2'>FoodTrove is the biggest market of grocery products. Get your daily needs from our store.</span>
                        <span className='flex gap-2 items-center'>
                            <IoLocationSharp color='red' size={20} />
                            <span className='opacity-70'>Số 1 Đại Cồ Việt, Hai Bà Trưng, Hà Nội.</span>
                        </span>
                        <span className='flex gap-2 items-center'>
                            <RiPhoneFill color='red' size={20} />
                            <span className='opacity-70'>(+1800) 123 4567</span>
                        </span>
                        <span className='flex gap-2 items-center'>
                            <MdEmail color='red' size={20} />
                            <span className='opacity-70'>foodtroveshop@gmail.com</span>
                        </span>
                    </div>
                    <div className='flex-1 flex flex-col gap-2'>
                        <h3 className='mb-[20px] text-[15px] font-medium border-l-2 border-main pl-[15px]'>Company</h3>
                        <span className='text-[#7A7A7A] text-sm'>About Us</span>
                        <span className='text-[#7A7A7A] text-sm'>Delivery Information</span>
                        <span className='text-[#7A7A7A] text-sm'>Privacy Policy</span>
                        <span className='text-[#7A7A7A] text-sm'>Terms & Conditions</span>
                        <span className='text-[#7A7A7A] text-sm'>Support Center</span>
                        <span className='text-[#7A7A7A] text-sm'>Contact Us</span>
                    </div>
                    <div className='flex-1 flex flex-col gap-2'>
                        <h3 className='mb-[20px] text-[15px] font-medium border-l-2 border-main pl-[15px]'>Category</h3>
                        <span className='text-[#7A7A7A] text-sm'>Dairy & Bakery</span>
                        <span className='text-[#7A7A7A] text-sm'>Fruits & Vegetable</span>
                        <span className='text-[#7A7A7A] text-sm'>Snack & Spice</span>
                        <span className='text-[#7A7A7A] text-sm'>Juice & Drinks</span>
                        <span className='text-[#7A7A7A] text-sm'>Chicken & Meat</span>
                        <span className='text-[#7A7A7A] text-sm'>Fast Food</span>
                    </div>
                    <div className='flex-1 flex flex-col gap-2'>
                        <h3 className='mb-[20px] text-[15px] font-medium border-l-2 border-main pl-[15px]'>#FOODTROVESHOP</h3>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default memo(Footer)