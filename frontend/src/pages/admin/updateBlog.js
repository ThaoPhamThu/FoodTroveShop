import React, { memo, useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { InputForm, Select, Button, Loading } from '../../components';
import { useForm } from 'react-hook-form'
import MarkdownEditor from '../../components/markdownEditor';
import { getBase64, validate } from '../../ultils/helper';
import { toast } from 'react-toastify';
import { showModal } from '../../store/app/appSlice';
import { apiGetBlogCategories, apiUpdateBlog } from '../../apis';

const UpdateBlog = ({ editBlog, render, setEditBlog }) => {
    const [categories, setCategories] = useState(null);
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors }, reset, watch } = useForm();

    const [payload, setPayload] = useState({
        descriptionProduct: ''
    });

    const [preview, setPreview] = useState({
        imageBlog: null
    });
    const fetchBlogsCategory = async () => {
        const response = await apiGetBlogCategories();
        if (response.success) setCategories(response)
    }

    useEffect(() => {
        fetchBlogsCategory()
    }, [])

    useEffect(() => {
        reset({
            title: editBlog?.title || '',
            subtitle: editBlog?.subtitle || '',
            category: editBlog?.category || '',
        })
        setPayload({ description: editBlog?.description })
        setPreview({
            imageBlog: editBlog?.imageBlog || ''
        })
    }, [editBlog])

    const [invalidFields, setInvalidFields] = useState([])

    const changeValue = useCallback((e) => {
        setPayload(e)
    }, [payload]);

    const handlePreview = async (file) => {
        const toBase64 = await getBase64(file)

        setPreview(prev => ({ ...prev, imageBlog: toBase64 }))
    };

    useEffect(() => {
        if (watch('imageBlog') instanceof FileList && watch('imageBlog').length > 0) handlePreview(watch('imageBlog')[0])
    }, [watch('imageBlog')]);

    const handleUpdateBlog = async (data) => {
        const invalids = validate(payload, setInvalidFields)
        if (invalids === 0) {
            if (data.category) data.category = categories?.categories?.find(el => el.title === data.category)?.title
            const finalPayload = { ...data, ...payload }
            const formData = new FormData()
            for (let i of Object.entries(finalPayload)) formData.append(i[0], i[1])
            if (finalPayload.imageBlog) formData.append('imageBlog', finalPayload?.imageBlog?.length === 0 ? preview.imageBlog[0] : finalPayload.imageBlog[0])
            dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }))
            const response = await apiUpdateBlog(formData, editBlog._id)
            dispatch(showModal({ isShowModal: false, modalChildren: null }))
            if (response.success) {
                toast.success(response.mes)
                render()
                setEditBlog(null)
            } else toast.error(response.mes)
        }
    }
    console.log(editBlog.category)
    return (
        <div className='w-full flex flex-col gap-4'>
            <div className='p-4 border-b w-full flex justify-between items-center'>
                <h1 className='text-3xl font-bold tracking-tight'>Update blogs</h1>
                <span onClick={() => setEditBlog(null)} className='text-main hover:underline cursor-pointer'>Cancel</span>
            </div>
            <div className='p-4'>
                <form onSubmit={handleSubmit(handleUpdateBlog)}>
                    <InputForm
                        label='Title blog'
                        register={register}
                        errors={errors}
                        id='title'
                        validate={{ required: 'Title blog can not empty' }}
                        fullWidth
                        placaholder='Name new product' />

                    <InputForm
                        label='Tilte blog'
                        register={register}
                        errors={errors}
                        id='subtitle'
                        style='mt-6'
                        validate={{ required: 'Subtitle blog can not empty' }}
                        fullWidth
                        placaholder='Subtitle new blog' />

                    <div className='w-full my-6 flex gap-4'>
                        <Select
                            label='Category'
                            options={categories?.categories?.map(el => ({ code: el.title, value: el.title }))}
                            register={register}
                            id='category'
                            validate={{ required: 'Category can not empty' }}
                            style='flex-auto'
                            errors={errors}
                            fullWidth
                        />
                    </div>
                    <MarkdownEditor
                        name='description'
                        changeValue={changeValue}
                        label='Description'
                        invalidFields={invalidFields}
                        setInvalidFields={setInvalidFields}
                        value={payload.description}
                    />
                    <div className='flex flex-col gap-2 mt-8'>
                        <label className='font-semibold' htmlFor='imageBlog'>Upload images</label>
                        <input
                            type='file'
                            id='imageBlog'
                            {...register('imageBlog')}
                        />
                        {errors['imageBlog'] && <small className='text-xs text-red-500'>{errors['imageBlog']?.message}</small>}
                    </div>
                    {preview.imageBlog && <div className=' my-4 flex w-full gap-3 flex-wrap'>
                        <img src={preview.imageBlog} alt='blogs' className='w-[200px] object-contain' />
                    </div>}
                    <div className='mt-6'>
                        <Button fw type='submit'>Update blog</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default memo(UpdateBlog)