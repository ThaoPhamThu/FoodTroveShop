import React, { useEffect, useState } from 'react'
import { BreadCrumb, Button, Congrat, Paypal } from '../../components'
import { useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { formatMoney, renderStarFromNumber } from '../../ultils/helper'
import { paymentMethod } from '../../ultils/constants'
import { useDispatch } from "react-redux";
import InputForm from '../../components/inputForm'
import { useForm } from 'react-hook-form'
import Select from '../../components/select'
import { getInforUser } from '../../store/users/asyncActions'
import { apiCreateOrders } from '../../apis'
import Swal from 'sweetalert2'
import path from '../../ultils/path'

const Checkout = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const { current, currentCart } = useSelector(state => state.user)
    const [isSuccess, setIsSuccess] = useState(false)
    const { register, formState: { errors }, handleSubmit, setValue, watch } = useForm()
    const payment = watch('paymentMethod')
    const address = watch('address')
    const name = watch('name')
    const phoneNo = watch('phoneNo')
    const noteOrder = watch('noteOrder')
    const payload = {
        orderItems: currentCart,
        totalPrice: currentCart?.reduce((sum, el) => (+el?.price * +el?.quantity) + sum, 0),
        address,
        paymentMethod: payment,
        name, phoneNo, noteOrder
    }
    useEffect(() => {
        setValue('address', current?.address)
    }, [current])

    useEffect(() => {
        if (isSuccess) dispatch(getInforUser())
    }, [isSuccess])

    const handleCreateOrder = async (data) => {
        const response = await apiCreateOrders({ ...payload, status: 'Processing' })

        if (response.success) {
            setIsSuccess(true)
            setTimeout(() => {
                Swal.fire('Congrat!', 'Order successfully!', 'success').then(() => navigate(`/${path.MEMBER}/${path.HISTORY}`)
                )
            }, 500)
        }
    }
    return (
        <div className='w-full mb-16'>
            {isSuccess && <Congrat />}
            <div className="h-[51px] bg-main flex justify-center items-center mb-16">
                <div className="w-main flex justify-between text-white">
                    <h3 className='font-semibold'>Checkout</h3>
                    <BreadCrumb category={location?.pathname?.replace('/', '')?.split('-')?.join(' ')} />
                </div>
            </div>
            <form onSubmit={handleSubmit(handleCreateOrder)} className='w-main m-auto flex flex-col gap-6' >
                <div className='flex gap-6'>
                    <div className='flex flex-col gap-8 w-1/2'>
                        <div className='flex flex-col border rounded-lg p-4'>
                            <div className='flex flex-col gap-2 border-b pb-4'>
                                <span className='text-xl font-semibold'>Summary</span>
                                <div className='flex justify-between'>
                                    <span className='font-normal text-[#7A7A7A] text-sm'>Sub-Total</span>
                                    <span className='font-normal text-sm'>{`${formatMoney(currentCart?.reduce((sum, el) => (+el?.price * +el?.quantity) + sum, 0))} VNĐ`}</span>
                                </div>
                                <div className='flex justify-between'>
                                    <span className='font-normal text-[#7A7A7A] text-sm'>Delivery Charges</span>
                                    <span className='font-normal text-sm'>{`0 VNĐ`}</span>
                                </div>
                            </div>
                            <div className=' flex flex-col gap-4 pt-4'>
                                <div className='flex justify-between pb-2'>
                                    <span className='text-base font-semibold'>Total Amount</span>
                                    <span className='text-base font-semibold'>{`${formatMoney(currentCart?.reduce((sum, el) => (+el?.price * +el?.quantity) + sum, 0))} VNĐ`}</span>
                                </div>
                                {currentCart?.map(el => (
                                    <div className='flex gap-2 items-center' id={el?._id}>
                                        <img src={el.product?.imagesProduct[0]} alt='thumb' className='w-16 h-16 object-cover' />
                                        <div className='flex flex-col gap-1'>
                                            <span className='text-base font-normal'>{el.product?.titleProduct}</span>
                                            <span className="flex">{renderStarFromNumber(el.product?.ratingsProduct, 14)?.map((el, index) => (
                                                <span key={index}>{el}</span>
                                            ))}</span>
                                            {el.product?.saleProduct
                                                ? <div className="flex gap-2 items-center">
                                                    <span className=" text-[#3BB77E] text-base font-normal ">{`${formatMoney(el.product?.finalprice)} VNĐ`}</span>
                                                    <del className="text-[#7A7A7A] text-xs font-normal">{`${formatMoney(el.product?.price)} VNĐ`}</del>
                                                </div>
                                                : <span className='text-base font-normal'>{`${formatMoney(el.product?.price)} VNĐ`}</span>
                                            }
                                        </div>
                                    </div>
                                ))}
                                <div>
                                    <span className='text-sm font-normal'>Add Comments About Your Order</span>
                                    <InputForm
                                        register={register}
                                        errors={errors}
                                        id='noteOrder'
                                        style1='mt-1'
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col w-1/2 gap-6'>
                        <div className='flex flex-col gap-6 border rounded-lg p-4'>
                            <span className='text-xl font-semibold'>Billing Details</span>
                            <div className='flex flex-col gap-6'>
                                <InputForm
                                    label='Name'
                                    register={register}
                                    errors={errors}
                                    id='name'
                                    validate={{ required: 'Name can not empty' }}
                                    defaultValue={current?.name}
                                />
                                <InputForm
                                    label='Phone number'
                                    register={register}
                                    errors={errors}
                                    id='phoneNo'
                                    validate={{
                                        required: true,
                                        pattern: {
                                            value: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4}$/gm,
                                            message: "invalid phone number"
                                        }
                                    }}
                                    defaultValue={`0${current?.phoneNumber}`}
                                />
                                <InputForm
                                    label='Address'
                                    register={register}
                                    errors={errors}
                                    id='address'
                                    validate={{ required: 'Address can not empty' }}
                                    placaholder={'Type here...'}
                                />

                            </div>
                        </div>
                        <div className='flex flex-col gap-4 border rounded-lg p-4'>
                            <span className='text-xl font-semibold'>Payment Method</span>
                            <span className='text-sm font-base text-[#7A7A7A] italic'>Please select the preferred payment method to use on this order.</span>
                            <Select
                                options={paymentMethod?.map(el => ({ code: el.code, value: el.value }))}
                                register={register}
                                id='paymentMethod'
                                validate={{ required: ' Payment Method can not empty' }}
                                style='flex-auto'
                                errors={errors}
                                fullWidth
                            />
                        </div>
                        {!(payment === 'Payment By Paypal') &&
                            <div className='flex justify-end'>
                                <Button type='submit'>Place Order</Button>
                            </div>}
                        {payment === 'Payment By Paypal' &&
                            <div className='w-full m-auto'>
                                <Paypal
                                    payload={payload}
                                    amount={Math.round(+currentCart?.reduce((sum, el) => (+el?.price * +el?.quantity) + sum, 0) / 23000)}
                                    setIsSuccess={setIsSuccess}
                                />
                            </div>}
                    </div>
                </div>


            </form>

        </div>
    )
}

export default Checkout