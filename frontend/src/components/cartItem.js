import React, { memo, useEffect, useState } from 'react'
import { formatMoney } from '../ultils/helper';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { apiRemoveCart } from '../apis';
import { getInforUser } from '../store/users/asyncActions';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { SelectQuantity } from '.';

const CartItem = ({ el, handleChangeQuantities, defaultQuantity = 1 }) => {
    const dispatch = useDispatch()
    const [quantity, setQuantity] = useState(() => defaultQuantity)
    const handleQuantity = (number) => {
        if (+number > 1) setQuantity(number)
    };

    const handleChangeQuantity = (flag) => {
        if (flag === 'minus' && quantity === 1) return
        if (flag === 'minus') setQuantity(prev => +prev - 1);
        if (flag === 'plus') setQuantity(prev => +prev + 1);
    };

    useEffect(() => {
        handleChangeQuantities && handleChangeQuantities(el.product?._id, quantity)
    }, [quantity])


    const removeCart = async (pid) => {
        const response = await apiRemoveCart(pid)
        if (response.success) {
            dispatch(getInforUser())
        }
        else toast.error(response.mes)
    }
    return (
        <tr className='border-b bg-gray-100 border-white text-gray-600' >
            <td className='flex gap-2 items-center pl-2 py-2 '>
                <div className='p-1 border'><img src={el.product?.imagesProduct[0]} alt='thumb' className='w-12 h-12 object-cover' /></div>
                <div className='flex flex-col '>
                    <span>{el.product?.titleProduct}</span>
                    <span className='text-xs italic'>{el.product?.weightProduct}</span>
                </div>
            </td>
            <td className='text-start py-2'>{formatMoney(el.product?.finalprice) + 'VNĐ'}</td>
            <td className='text-center py-2'>
                <div className='flex justify-center items-center'>
                    <SelectQuantity quantity={quantity} handleQuantity={handleQuantity} handleChangeQuantity={handleChangeQuantity} />
                </div>
            </td>
            <td className='text-center py-2'>{formatMoney(el?.price * quantity) + 'VNĐ'}</td>
            <td className='text-end py-2 pr-6'>
                <span onClick={() => removeCart(el?.product?._id)} className='text-red-500 hover:underline inline-block cursor-pointer px-1'><RiDeleteBin6Line /></span>
            </td>
        </tr>
    )
}

export default memo(CartItem)