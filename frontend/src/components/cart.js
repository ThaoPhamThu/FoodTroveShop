import React, { memo } from 'react'
import { IoMdCloseCircle } from "react-icons/io";
const Cart = () => {
    return (
        <div className='w-[700px] max-h-screen overflow-y-auto bg-black text-white p-6'>
            <header className='flex justify-between py-4 border-b border-b-main font-bold text-2xl '>
                <span>Your Cart</span>
                <span className='cursor-pointer p-2'><IoMdCloseCircle size={24} color='white' /></span>
            </header>
        </div>
    )
}

export default memo(Cart)