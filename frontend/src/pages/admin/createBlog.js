import React, { useCallback, useState, useEffect } from 'react';
import { InputForm, Select, Button, MarkdownEditor, Loading } from '../../components';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { validate, getBase64 } from '../../ultils/helper';
import { toast } from 'react-toastify';
import { showModal } from '../../store/app/appSlice'
import { apiCreateBlog, apiGetBlogCategories } from '../../apis';

const CreateBlog = () => {
    const dispatch = useDispatch();
    const { register, formState: { errors }, reset, handleSubmit, watch } = useForm()
    const [payload, setPayload] = useState({
        description: ''
    })
    const [preview, setPreview] = useState({
        imageBlog: null
    })
    const [invalidFields, setInvalidFields] = useState([])
    const [categories, setCategories] = useState(null);
    const changeValue = useCallback((e) => {
        setPayload(e)
    }, [payload])

    const fetchBlogsCategory = async () => {
        const response = await apiGetBlogCategories();
        if (response.success) setCategories(response)
    }

    const handlePreview = async (file) => {
        const toBase64 = await getBase64(file)
        setPreview(prev => ({ ...prev, imageBlog: toBase64 }))
    }

    useEffect(() => {
        fetchBlogsCategory()
    }, [])


    useEffect(() => {
        if (watch('imageBlog')) handlePreview(watch('imageBlog')[0])
    }, [watch('imageBlog')])

    const handleCreateBlog = async (data) => {
        const invalids = validate(payload, setInvalidFields)
        if (invalids === 0) {
            if (data.category) data.category = categories?.categories?.find(el => el._id === data.category)?.title
            const finalPayload = { ...data, ...payload }
            const formData = new FormData()
            for (let i of Object.entries(finalPayload)) formData.append(i[0], i[1])
            if (finalPayload.imageBlog) {
                formData.append('imageBlog', finalPayload.imageBlog[0])
            }
            dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }))
            const response = await apiCreateBlog(formData)
            dispatch(showModal({ isShowModal: false, modalChildren: null }))
            console.log(response)
            if (response.success) {
                toast.success(response.mes)
                reset()
                setPayload({
                    description: ''
                })
                setPreview({
                    imageBlog: ''
                })
            } else toast.error(response.mes)
        }

    }

    return (
        <div className='w-full'>
            <h1 className='h-[75px] flex justify-between items-center text-3xl font-bold px-4 border-b'>
                <span>Create new blog</span>
            </h1>
            <div className='p-4'>
                <form onSubmit={handleSubmit(handleCreateBlog)}>
                    <InputForm
                        label='Title blog'
                        register={register}
                        errors={errors}
                        id='title'
                        validate={{ required: 'Title blog can not empty' }}
                        fullWidth
                        placaholder='Title new blog' />

                    <InputForm
                        label='Subtitle blog'
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
                            options={categories?.categories?.map(el => ({ code: el._id, value: el.title }))}
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
                    />
                    <div className='flex flex-col gap-2 mt-8'>
                        <label className='font-semibold' htmlFor='imageBlog'>Upload image</label>
                        <input
                            type='file'
                            id='imageBlog'
                            {...register('imageBlog', { required: 'Need fill' })}
                        />
                        {errors['imageBlog'] && <small className='text-xs text-red-500'>{errors['imageBlog']?.message}</small>}
                    </div>
                    {preview.imageBlog && <div className=' my-4 flex w-full gap-3 flex-wrap'>
                        <img src={preview?.imageBlog} alt='blogs' className='w-[200px] object-contain' />
                    </div>}
                    <div className='mt-6'>
                        <Button fw type='submit'>Create new product</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateBlog