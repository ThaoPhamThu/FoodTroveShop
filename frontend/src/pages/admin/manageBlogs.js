import React, { useCallback, useEffect, useState } from 'react';
import { InputForm, Pagination } from '../../components';
import { useForm } from 'react-hook-form';
import moment from 'moment';
import { useSearchParams, createSearchParams, useNavigate, useLocation } from 'react-router-dom';
import useDebounce from '../../hooks/useDebounce';
import { UpdateBlog } from './';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { apiDeleteBlog, apiGetBlogs } from '../../apis';

const ManageBlogs = () => {
    const [params] = useSearchParams();
    const navigate = useNavigate();
    const location = useLocation();
    const { register, formState: { errors }, handleSubmit, reset, watch } = useForm();
    const [blogs, setBlogs] = useState(null);
    const [counts, setCounts] = useState(0);
    const [editBlog, setEditBlog] = useState(null)
    const [update, setUpdate] = useState(false)

    const render = useCallback(() => {
        setUpdate(!update)
    }, [update])

    const fetchBlogs = async (params) => {
        const response = await apiGetBlogs({ ...params, limit: process.env.REACT_APP_LIMIT })
        if (response.success) {
            setCounts(response.counts)
            setBlogs(response.blogs)
        }
    };

    const queryDebounce = useDebounce(watch('q'), 800)

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
        fetchBlogs(searchParams)
    }, [params, update]);

    const handleDeleteBlog = (bid) => {
        Swal.fire({
            title: 'Are you sure...?',
            text: 'Are you sure delete this blog?',
            icon: 'warning',
            showCancelButton: true
        }).then(async (rs) => {
            if (rs.isConfirmed) {
                const response = await apiDeleteBlog(bid)
                if (response.success) toast.success(response.mes)
                else toast.error(response.mes)
                render()
            }
        })
    }

    return (
        <div className='w-full flex flex-col gap-4 relative'>
            {editBlog && <div className='absolute inset-0 min-h-screen bg-gray-200'>
                <UpdateBlog editBlog={editBlog} render={render} setEditBlog={setEditBlog} />
            </div>}
            <div className='p-4 border-b w-full flex justify-between items-center'>
                <h1 className='text-3xl font-bold tracking-tight'>Manage blogs</h1>
            </div>
            <div className='flex justify-end items-center w-full px-4'>
                <form className='w-[45%]'>
                    <InputForm
                        id='q'
                        register={register}
                        errors={errors}
                        fullWidth
                        placaholder='Search blogs by title'
                    />
                </form>
            </div>
            <table className='table-auto'>
                <thead>
                    <tr className='border bg-sky-900 text-white border-white'>
                        <th className='text-center py-2'>#</th>
                        <th className='text-center py-2'>Thumb</th>
                        <th className='text-center py-2'>Title</th>
                        <th className='text-center py-2'>Category</th>
                        <th className='text-center py-2'>Author</th>
                        <th className='text-center py-2'>Likes</th>
                        <th className='text-center py-2'>Dislikes</th>
                        <th className='text-center py-2'>Views</th>
                        <th className='text-center py-2'>Created At</th>
                        <th className='text-center py-2'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {blogs?.map((el, index) => (
                        <tr className='border-b border-white' key={el._id}>
                            <td>{((+params.get('page') > 1 ? (+params.get('page') - 1) : 0) * process.env.REACT_APP_LIMIT) + index + 1}</td>
                            <td>
                                <img src={el.imageBlog} alt='thumb' className='w-12 h-12 object-cover' />
                            </td>
                            <td className='text-center py-2'>{el.title}</td>
                            <td className='text-center py-2'>{el.category}</td>
                            <td className='text-center py-2'>{el.author}</td>
                            <td className='text-center py-2'>{el.likes?.length}</td>
                            <td className='text-center py-2'>{el.dislikes?.length}</td>
                            <td className='text-center py-2'>{el.numberViews}</td>
                            <td className='text-center py-2'>{moment(el.createdAt).format('DD/MM/YYYY')}</td>
                            <td className='text-center py-2'>
                                <span onClick={() => setEditBlog(el)} className='text-blue-500 hover:underline inline-block cursor-pointer px-1'><FaRegEdit /></span>
                                <span onClick={() => handleDeleteBlog(el._id)} className='text-red-500 hover:underline inline-block cursor-pointer px-1'><RiDeleteBin6Line /></span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className='w-full flex justify-end my-6'>
                <Pagination totalCount={counts} page={8} />
            </div>
        </div>
    )
}

export default ManageBlogs