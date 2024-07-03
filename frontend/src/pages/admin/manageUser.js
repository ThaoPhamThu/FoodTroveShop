import React, { useEffect, useState, useCallback } from 'react';
import { apiDeleteUser, apiGetAllUsers, apiUpdateUser } from '../../apis/user';
import moment from 'moment';
import { InputField, Pagination, InputForm, Select, Button } from '../../components';
import useDebounce from '../../hooks/useDebounce';
import { useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import Swal from 'sweetalert2';
import { roles, blockStatus } from '../../ultils/constants';
import clsx from 'clsx';

const ManageUser = () => {
    const [users, setUsers] = useState(null)
    const [queries, setQueries] = useState({
        q: ''
    })
    const [editElm, setEditElm] = useState(null);
    const [update, setUpdate] = useState(false)
    const { handleSubmit, register, formState: { errors }, reset } = useForm({
        email: '',
        name: '',
        role: '',
        phoneNumber: '',
        isBlocked: '',
    });
    const [params] = useSearchParams()
    const fetchUsers = async (params) => {
        const response = await apiGetAllUsers({ ...params, limit: process.env.REACT_APP_LIMIT })
        if (response.success) setUsers(response)
    }

    const render = useCallback(() => {
        setUpdate(!update)
    }, [update])

    const queriesDebounce = useDebounce(queries.q, 800)

    useEffect(() => {
        const queries = Object.fromEntries([...params])
        if (queriesDebounce) params.q = queriesDebounce
        fetchUsers(queries)
    }, [queriesDebounce, params, update])

    const handleUpdate = async (data) => {
        const response = await apiUpdateUser(data, editElm._id)
        if (response.success) {
            setEditElm(null)
            render()
            toast.success(response.mes)
        } else toast.error(response.mes)
    }
    const handleDelete = (uid) => {
        Swal.fire({
            title: 'Are you sure...',
            text: 'Are you ready remove this user',
            showCancelButton: true
        }).then(async (result) => {
            if (result.isConfirmed) {
                const response = await apiDeleteUser(uid)
                if (response.success) {
                    render()
                    toast.success(response.mes)
                } else toast.error(response.mes)
            }
        })

    }
    useEffect(() => {
        if (editElm) reset({
            email: editElm.email,
            name: editElm.name,
            role: editElm.role,
            phoneNumber: `0${editElm.phoneNumber}`,
            isBlocked: editElm.isBlocked,
        })
    }, [editElm])
    return (
        <div className={clsx('w-full', editElm && 'pl-12')}>
            <h1 className='h-[75px] flex justify-between items-center text-3xl font-bold px-4 border-b'>
                <span>Manage users</span>
            </h1>
            <div className='w-full p-4'>
                <div className='flex justify-end py-4'>
                    <InputField
                        nameKey={'q'}
                        value={queries.q}
                        setValue={setQueries}
                        style={'w-[500px]'}
                        placeholder={'Search name or email user...'}
                        isHideLabel
                    />
                </div>
                <form onSubmit={handleSubmit(handleUpdate)}>
                    {editElm && <Button type='submit'>Update</Button>}
                    <table className='table-auto text-left w-full'>
                        <thead className='font-semibold bg-gray-700 text-[13px]  text-center text-white'>
                            <tr className='border border-gray-500'>
                                <th className='px-4 py-2'>#</th>
                                <th className='px-4 py-2'>Email Address</th>
                                <th className='px-4 py-2'>Full Name</th>
                                <th className='px-4 py-2'>Phone Number</th>
                                <th className='px-4 py-2'>Role</th>
                                <th className='px-4 py-2'>Status</th>
                                <th className='px-4 py-2'>Created At</th>
                                <th className='px-4 py-2'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users?.users?.map((el, index) => (
                                <tr key={el._id} className='border border-gray-500'>
                                    <td className='py-2 px-4'>{index + 1}</td>
                                    <td className='py-2 px-4'>{editElm?._id === el._id
                                        ? <InputForm
                                            register={register}
                                            errors={errors}
                                            defaultValue={editElm?.email}
                                            id={'email'}
                                            fullWidth
                                            validate={{
                                                required: true,
                                                pattern: {
                                                    value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                                                    message: "invalid email address"
                                                }
                                            }} />
                                        : <span>{el.email}</span>}</td>
                                    <td className='py-2 px-4'>{editElm?._id === el._id
                                        ? <InputForm
                                            register={register}
                                            errors={errors}
                                            defaultValue={editElm?.name}
                                            id={'name'}
                                            fullWidth
                                            validate={{ required: 'Required fill.' }} />
                                        : <span>{el.name}</span>}</td>
                                    <td className='py-2 px-4'>{editElm?._id === el._id
                                        ? <InputForm
                                            register={register}
                                            errors={errors}
                                            defaultValue={`0${editElm?.phoneNumber}`}
                                            id={'phoneNumber'}
                                            fullWidth
                                            validate={{
                                                required: true,
                                                pattern: {
                                                    value: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4}$/gm,
                                                    message: "invalid phone number"
                                                }
                                            }} />
                                        : <span>{`0${el.phoneNumber}`}</span>}</td>
                                    <td className='py-2 px-4 capitalize'>{editElm?._id === el._id
                                        ? <Select
                                            register={register}
                                            errors={errors}
                                            defaultValue={editElm?.role}
                                            id={'role'}
                                            fullWidth
                                            validate={{ required: true }}
                                            options={roles}
                                        />
                                        : <span>{el.role}</span>}</td>
                                    <td className='py-2 px-4'>{editElm?._id === el._id
                                        ? <Select
                                            register={register}
                                            errors={errors}
                                            defaultValue={editElm?.isBlocked}
                                            id={'isBlocked'}
                                            fullWidth
                                            validate={{ required: true }}
                                            options={blockStatus}
                                        />
                                        : <span>{el.isBlocked ? 'Blocked' : 'Active'}</span>}</td>
                                    <td className='py-2 px-4'>{moment(el.createdAt).format('DD/MM/YYYY')}</td>
                                    <td className='py-2 px-4'>
                                        {editElm?._id === el._id
                                            ? <span onClick={() => setEditElm(null)} className='px-2 text-blue-500 hover:underline cursor-pointer'>Back</span>
                                            : <span onClick={() => setEditElm(el)} className='px-2 text-blue-500 hover:underline cursor-pointer'>Edit</span>
                                        }
                                        <span onClick={() => handleDelete(el._id)} className='px-2 text-orange-600 hover:underline cursor-pointer'>Delete</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </form>

                <div className='w-full flex justify-end '>
                    <Pagination
                        totalCount={users?.counts} page={8} />
                </div>
            </div>

        </div>

    )
}

export default ManageUser