import moment from 'moment'
import React, { Fragment, useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { createSearchParams, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { apiCancelOrder, apiGetDetailOrder, apiGetUserOrders } from '../../apis'
import { useForm } from 'react-hook-form'
import useDebounce from '../../hooks/useDebounce'
import { InputForm } from '../../components'
import Pagination from '../../components/pagination'
import clsx from 'clsx';
import { formatMoney } from '../../ultils/helper'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'
import orderEmpty from '../../assets/orderempty.png'

const History = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const [params] = useSearchParams();
    const [orders, setOrders] = useState(null)
    const [orderDetail, setOrderDetail] = useState(null)
    const [counts, setCounts] = useState(0);
    const [update, setUpdate] = useState(false)
    const { current } = useSelector(state => state.user)
    const [isView, setIsView] = useState(false)
    const { register, formState: { errors }, watch } = useForm();

    const queryDebounce = useDebounce(watch('q'), 800)

    const render = useCallback(() => {
        setUpdate(!update)
    }, [update])
    const fetchOrders = async (params) => {
        const response = await apiGetUserOrders({ ...params, sort: '-createdAt', limit: process.env.REACT_APP_LIMIT })
        if (response.success) {
            setCounts(response.counts)
            setOrders(response.orders)
        }
    };
    useEffect(() => {
        if (queryDebounce) {
            navigate({
                pathname: location.pathname,
                search: createSearchParams({ q: queryDebounce }).toString()
            })
        } else navigate({
            pathname: location.pathname,
        })
    }, [queryDebounce]);
    useEffect(() => {
        const searchParams = Object.fromEntries([...params])
        fetchOrders(searchParams)
    }, [params, update])

    const handleView = async (oid) => {
        const response = await apiGetDetailOrder(oid)
        console.log(response)
        if (response.success) {
            setOrderDetail(response.order)
            setIsView(true)
        }
    }

    const handleCancelOrder = async (oid) => {
        Swal.fire({
            title: 'Are you sure...?',
            text: 'Are you sure cancel this order?',
            icon: 'warning',
            showCancelButton: true
        }).then(async (rs) => {
            if (rs.isConfirmed) {
                const response = await apiCancelOrder(oid)
                if (response.success) toast.success(response.mes)
                else toast.error(response.mes)
                render()
            }
        })
    }
    return (
        <div className=' flex flex-col gap-6 w-full px-4'>
            {orders?.length > 0
                ? <Fragment>
                    {isView
                        ? <header className='flex justify-between py-4 border-b border-b-blue-200'>
                            <div className='text-3xl font-semibold'>Order Histories</div>
                            <div onClick={() => setIsView(false)} className='text-lg font-normal bg-blue-500 cursor-pointer text-white p-2 rounded-lg'>Return</div>
                        </header>
                        : <header className='py-4 border-b border-b-blue-200'>
                            <div className='text-3xl font-semibold'>Order Histories</div>
                        </header>}
                    <div className='flex flex-col gap-4 relative'>
                        {isView && <div className='absolute flex flex-col gap-12 bg-gray-100 h-screen w-full'>
                            <div className='flex flex-col border border-blue-500'>
                                <span className='p-4 text-lg font-semibold text-blue-600 italic'>Customer information</span>
                                <table className='table-auto'>
                                    <thead>
                                        <tr className='border bg-sky-900 text-white border-white'>
                                            <th className='text-center py-2'>Email</th>
                                            <th className='text-center py-2'>Customer name</th>
                                            <th className='text-center py-2'>Phone number</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className='border-b border-white'>
                                            <td className='text-center py-2'>{current?.email}</td>
                                            <td className='text-center py-2'>{current?.name}</td>
                                            <td className='text-center py-2'>{`0${current?.phoneNumber}`}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className='flex flex-col border border-blue-500'>
                                <span className='p-4 text-lg font-semibold text-blue-600 italic'>Shipping information</span>
                                <table className='table-auto'>
                                    <thead>
                                        <tr className='border bg-sky-900 text-white border-white'>
                                            <th className='text-center py-2'>Recipient's name</th>
                                            <th className='text-center py-2'>Address</th>
                                            <th className='text-center py-2'>Phone number</th>
                                            <th className='text-center py-2'>Note</th>
                                            <th className='text-center py-2'>Payment methods</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className='border-b border-white'>
                                            <td className='text-center py-2'>{orderDetail?.shippingInfor?.name}</td>
                                            <td className='text-center py-2'>{orderDetail?.shippingInfor?.address}</td>
                                            <td className='text-center py-2'>{`0${orderDetail?.shippingInfor?.phoneNo}`}</td>
                                            <td className='text-center py-2'>{orderDetail?.noteOrder ? orderDetail?.noteOrder : 'No notes'}</td>
                                            <td className='text-center py-2'>{orderDetail?.paymentMethod}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className='flex flex-col border border-blue-500'>
                                <div className='flex justify-between'>
                                    <span className='p-4 text-lg font-semibold text-blue-600 italic'>{`Order details code ${orderDetail?.orderCode}`}</span>
                                    <span className={clsx('p-4 text-base font-medium',
                                        orderDetail?.orderStatus === 'Processing' && 'text-blue-500',
                                        orderDetail?.orderStatus === 'Processed-Delivered' && 'text-green-500',
                                        orderDetail?.orderStatus === 'Successful Delivery' && 'text-purple-500',
                                        orderDetail?.orderStatus === 'Cancelled' && 'text-red-500')}>{orderDetail?.orderStatus}
                                    </span>
                                </div>
                                <table className='table-auto'>
                                    <thead>
                                        <tr className='border bg-sky-900 text-white border-white'>
                                            <th className='text-center py-2'>Product</th>
                                            <th className='text-center py-2'>Quantity</th>
                                            <th className='text-center py-2'>Unit price</th>
                                            <th className='text-center py-2'>Total price</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orderDetail?.orderItems?.map(el => (
                                            <tr className='border-b border-white' key={el._id}>
                                                <td className='flex gap-2 items-center pl-2 py-2 '>
                                                    <div className='p-1 border'><img src={el.product?.imagesProduct[0]} alt='thumb' className='w-12 h-12 object-cover' /></div>
                                                    <div className='flex flex-col '>
                                                        <span>{el.product?.titleProduct}</span>
                                                        <span className='text-xs italic'>{el.product?.weightProduct}</span>
                                                    </div>
                                                </td>
                                                <td className='text-center py-2'>{el?.quantity}</td>
                                                <td className='text-center py-2'>{`${formatMoney(el?.price)} VNĐ`}</td>
                                                <td className='text-center py-2'>{`${formatMoney(el?.price * el?.quantity)} VNĐ`}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <div className='flex gap-2 p-4 items-center'>
                                    <span className='text-base font-medium'>Total:</span>
                                    <span className='text-main text-lg '>{`${formatMoney(orderDetail?.totalPrice)} VNĐ`}</span>
                                </div>
                            </div>
                        </div>}
                        <div className='flex justify-end items-center w-full'>
                            <form className='w-[45%]'>
                                <InputForm
                                    id='q'
                                    register={register}
                                    errors={errors}
                                    fullWidth
                                    placaholder='Search orders by status, order code...'
                                />
                            </form>
                        </div>
                        <table className='table-auto w-full'>
                            <thead className=''>
                                <tr className='border bg-gray-200 text-gray-800 border-white'>
                                    <th className='text-center py-2  font-medium'>#</th>
                                    <th className='text-center py-2  font-medium'>Order Code</th>
                                    <th className='text-center py-2 font-medium'>Order Date</th>
                                    <th className='text-center py-2 font-medium'>Order Status</th>
                                    <th className='text-center py-2 font-medium'>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders?.map((el, index) => (
                                    <tr className='border-b border-gray-300' key={el._id}>
                                        <td className='text-center py-2 text-[#7A7A7A]'>{((+params.get('page') > 1 ? (+params.get('page') - 1) : 0) * process.env.REACT_APP_LIMIT) + index + 1}</td>
                                        <td className='text-center py-2 text-[#7A7A7A]'>{el?.orderCode}</td>
                                        <td className='text-center py-2 text-[#7A7A7A]'>{moment(el?.createdAt).format('hh:mm DD-MM-YYYY')}</td>
                                        <td
                                            className={clsx('text-center py-2',
                                                el?.orderStatus === 'Processing' && 'text-blue-500',
                                                el?.orderStatus === 'Processed-Delivered' && 'text-green-500',
                                                el?.orderStatus === 'Successful Delivery' && 'text-purple-500',
                                                el?.orderStatus === 'Cancelled' && 'text-red-500')}>{el?.orderStatus}</td>
                                        <td className='flex flex-col items-center gap-2 py-2'>
                                            <span onClick={() => handleView(el._id)} className='bg-blue-500 text-white py-2 px-4 rounded-lg cursor-pointer'>View Order</span>
                                            {el?.orderStatus === 'Processing' && <span onClick={() => handleCancelOrder(el._id)} className='bg-main text-white p-2 rounded-lg cursor-pointer'>Cancel Order</span>}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className='w-full flex justify-end my-6'>
                        <Pagination totalCount={counts} />
                    </div>
                </Fragment>
                : <Fragment>
                    <header className='py-4 border-b border-b-blue-200'>
                        <div className='text-3xl font-semibold'>Order Histories</div>
                    </header>
                    <div className='flex flex-col items-center justify-center'>
                        <img src={orderEmpty} alt='Cart Empty' className='w-[400px] object-contain' />
                        <span className='mt-4 text-xl font-medium text-[#7A7A7A]'>There are no orders yet</span>
                    </div>
                </Fragment>}

        </div>
    )
}

export default History