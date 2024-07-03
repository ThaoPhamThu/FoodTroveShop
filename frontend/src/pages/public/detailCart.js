import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { BreadCrumb, CartItem } from '../../components';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { updateCart } from '../../store/users/userSlice';
import { formatMoney } from '../../ultils/helper';
import clsx from 'clsx';
import path from '../../ultils/path';
import cartempty from '../../assets/empty-box.png'


const DetailCart = () => {
    const { current, currentCart } = useSelector(state => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    if (!current) navigate(`/`)

    const handleChangeQuantities = (pid, quantity) => {
        dispatch(updateCart({ pid, quantity }))
    }

    return (
        <div className='w-full mb-16'>
            {location?.pathname === '/member/my-cart'
                ? <div className='flex justify-between py-4 pl-4 border-b border-b-blue-200 text-3xl font-semibold mb-20'>My Cart</div>
                : <div className="h-[51px] bg-main flex justify-center items-center mb-16">
                    <div className="w-main flex justify-between text-white">
                        <h3 className='font-semibold'>My Cart</h3>
                        <BreadCrumb category={location?.pathname?.replace('/', '')?.split('-')?.join(' ')} />
                    </div>
                </div>}

            {currentCart?.length > 0 ?
                <div className={clsx('flex flex-col gap-4 m-auto', location?.pathname === '/member/my-cart' ? 'w-[900px]' : 'w-main')}>
                    <table className='table-auto'>
                        <thead>
                            <tr className='border bg-gray-200 text-gray-800 border-white'>
                                <th className='text-start py-2 pl-2 font-medium'>Product</th>
                                <th className='text-start py-2 pl-5 font-medium'>Price</th>
                                <th className='text-center py-2 font-medium'>Quantity</th>
                                <th className='text-center py-2 font-medium'>Total</th>
                                <th className='text-end py-2 pr-2 font-medium'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentCart.map((el) => (
                                <CartItem el={el} handleChangeQuantities={handleChangeQuantities} key={el._id} defaultQuantity={el?.quantity} />
                            ))}
                        </tbody>
                    </table>
                    <div className='flex justify-between'>
                        <span onClick={() => navigate(`/${path.PRODUCTS}`)} className='flex items-center justify-center font-medium text-xs text-gray-500 cursor-pointer underline underline-offset-2'>Continue Shopping</span>
                        <Link to={`/${path.CHECKOUT}`} className='flex w-[120px] h-[40px] bg-main rounded-md text-white items-center justify-center cursor-pointer'>Check Out</Link>
                    </div>
                </div>
                : <div className={clsx('flex flex-col w-main m-auto items-center justify-center', location?.pathname === '/member/my-cart' ? 'w-[800px]' : 'w-main')}>
                    <img src={cartempty} alt='Cart Empty' className='w-[400px] object-contain' />
                    <span className='mt-[-30px] text-xl font-medium text-[#7A7A7A]'>Cart is empty, let's go shopping</span>
                    <div onClick={() => navigate('/products')} className='border bg-main text-white px-4 py-2 rounded-lg mt-6 cursor-pointer'>Shopping now!</div>
                </div>}

        </div>
    )
}

export default DetailCart   