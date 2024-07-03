import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, InputForm } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import { apiUpdateInfor, apiUpdatePassword } from '../../apis/user'
import { getInforUser } from '../../store/users/asyncActions'
import { toast } from 'react-toastify'
import { IoIosArrowForward } from "react-icons/io";
import { MdOutlineCancel } from "react-icons/md";

const Personal = () => {
  const { register, formState: { errors }, handleSubmit, reset } = useForm()
  const { current } = useSelector(state => state.user)
  const dispatch = useDispatch()
  const [editElm, setEditElm] = useState(null);
  const [isResetPassword, setIsResetPassword] = useState(false)
  useEffect(() => {
    reset({
      name: current?.name,
      email: current?.email,
      phoneNumber: `0${current?.phoneNumber}`,
      address: current?.address

    })
  }, []);

  const handleUpdatePassword = async (data) => {
    const response = await apiUpdatePassword({ oldPassword: data?.oldPassword, newPassword: data?.newPassword })
    if (response.success) {
      dispatch(getInforUser())
      toast.success('Reset password successfully!')
      setIsResetPassword(false)
      reset()
    } else toast.error('Some thing wrong, please try again!')

  }

  const handleUpdateInfo = async (data) => {
    const formData = new FormData()
    if (data.avatar.length > 0) formData.append('avatar', data.avatar[0])
    delete data.avatar
    for (let i of Object.entries(data)) formData.append(i[0], i[1])

    const response = await apiUpdateInfor(formData)
    if (response.success) {
      dispatch(getInforUser())
      toast.success(response.mes)
      setEditElm(null)
    } else toast.error(response.mes)

  }
  return (
    <div className='w-full relative px-4'>
      {isResetPassword &&
        <div className='flex absolute right-0 top-0 left-0 bottom-0 items-center justify-center bg-[rgba(0,0,0,0.7)]'>
          <div className='bg-white flex flex-col px-8 py-8 rounded-lg w-[350px] gap-2'>
            <div onClickCapture={() => setIsResetPassword(false)} className='flex justify-end cursor-pointer'>
              <MdOutlineCancel size={20} />
            </div>
            <div className='flex items-center gap-2 '>
              <span className='text-[#7A7A7A]'>{current?.name}</span>
              <span className='text-[#7A7A7A] '>*</span>
              <span className='text-[#7A7A7A]'>FoodTrove</span>
            </div>
            <span className='text-xl font-semibold'>Reset password</span>
            <form onSubmit={handleSubmit(handleUpdatePassword)} className='flex flex-col mt-[-15px]'>
              <InputForm
                register={register}
                errors={errors}
                id='oldPassword'
                validate={{ required: 'Old password can not empty' }}
                placaholder={'Current password'}
                style1='rounded-md'
              />
              <InputForm
                register={register}
                errors={errors}
                id='newPassword'
                validate={{ required: 'New password can not empty' }}
                placaholder={'New password'}
                style1='rounded-md mt-1'
              />
              <div className='mt-[-10px]'>
                <Button fw type='submit'>Reset password</Button>
              </div>
            </form>
          </div>
        </div>}
      <header className='flex justify-between py-4 border-b border-b-blue-200'>
        <div className='text-3xl font-semibold'>Information</div>
        <div className='flex'>
          {editElm?._id === current._id
            ? <div
              onClick={() => setEditElm(null)}
              className='w-[200px] h-[36px] bg-main rounded-md items-center justify-center flex text-white cursor-pointer'>
              Cancel
            </div>
            : <div
              onClick={() => setEditElm(current)}
              className='w-[200px] h-[36px] bg-main rounded-md items-center justify-center flex text-white cursor-pointer'>
              Edit Information
            </div>
          }
        </div>

      </header>

      <form onSubmit={handleSubmit(handleUpdateInfo)} className='w-3/5 mx-auto py-8 flex flex-col gap-4'>
        {editElm?._id === current._id
          ? <div className='flex items-center justify-center gap-2'>
            <label htmlFor='file'><img src={current.avatar} alt='avatar' className='w-[200px] h-[200px] rounded-full object-cover' /></label>
            <input type='file' id='file' {...register('avatar')} hidden />
          </div>
          : <div className='flex items-center justify-center gap-2'>
            <img src={current.avatar} alt='avatar' className='w-[200px] h-[200px] rounded-full object-cover' />
          </div>}

        {editElm?._id === current._id
          ? <InputForm
            label='Name'
            register={register}
            errors={errors}
            id='name'
            validate={{ required: 'Name  can not empty' }}
          />
          : <InputForm
            label='Name'
            register={register}
            errors={errors}
            id='name'
            disabled={true}
          />}
        {editElm?._id === current._id
          ? <InputForm
            label='Email address'
            register={register}
            errors={errors}
            id='email'
            validate={{
              required: 'Email can not empty',
              pattern: {
                value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                message: "Email address invalid"
              }
            }} />
          : <InputForm
            label='Email address'
            register={register}
            errors={errors}
            id='email'
            disabled={true}
          />}
        {editElm?._id === current._id
          ? <InputForm
            label='Phone Number'
            register={register}
            errors={errors}
            id='phoneNumber'
            validate={{
              required: 'Phone number can not empty',
              pattern: {
                value: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4}$/gm,
                message: 'Phone invalid'
              }
            }}
          />
          : <InputForm
            label='Phone Number'
            register={register}
            errors={errors}
            id='phoneNumber'
            disabled={true}
          />}

        <div className='flex items-center gap-2'>
          <span className='font-medium'>Account status:</span>
          <span>{current?.isBlocked ? 'Blocked' : 'Active'}</span>
        </div>
        <div className='flex items-center gap-2'>
          <span className='font-medium'>Role:</span>
          <span className='capitalize'>{current?.role}</span>
        </div>
        {!editElm && <div onClick={() => setIsResetPassword(true)} className='flex items-center border-black border justify-between bg-white p-4 rounded-md hover:bg-gray-200 cursor-pointer'>
          <span className='font-medium '>Reset password</span>
          <IoIosArrowForward />
        </div>}
        {editElm && <Button type='submit' fw>Update</Button>}
      </form>
    </div>
  )
}

export default Personal