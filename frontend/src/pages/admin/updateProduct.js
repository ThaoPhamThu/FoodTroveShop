import React, { memo, useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { InputForm, Select, Button, Loading } from '../../components';
import { useForm } from 'react-hook-form'
import MarkdownEditor from '../../components/markdownEditor';
import { getBase64, validate } from '../../ultils/helper';
import { toast } from 'react-toastify';
import { brandsProduct } from '../../ultils/constants';
import { showModal } from '../../store/app/appSlice';
import { apiUpdateProduct } from '../../apis/product';

const UpdateProduct = ({ editProduct, render, setEditProduct }) => {
    const { categories } = useSelector(state => state.app);
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors }, reset, watch } = useForm();

    const [payload, setPayload] = useState({
        descriptionProduct: ''
    });

    const [preview, setPreview] = useState({
        imagesProduct: []
    });

    useEffect(() => {
        reset({
            titleProduct: editProduct?.titleProduct || '',
            subTitle: editProduct?.subTitle || '',
            price: editProduct?.price || 0,
            saleProduct: editProduct?.saleProduct || 0,
            stock: editProduct?.stock || 0,
            weightProduct: editProduct?.weightProduct || '',
            category: editProduct?.category || '',
            brand: editProduct?.brand || ''
        })
        setPayload({ descriptionProduct: editProduct?.descriptionProduct })
        setPreview({
            imagesProduct: editProduct?.imagesProduct || []
        })
    }, [editProduct])

    const [invalidFields, setInvalidFields] = useState([])

    const changeValue = useCallback((e) => {
        setPayload(e)
    }, [payload]);

    const handlePreview = async (files) => {
        const imagesPreview = []
        for (let file of files) {
            if (file.type !== 'image/png' && file.type !== 'image/jpeg') {
                toast.warning('File not supported!')
                return
            }
            const toBase64 = await getBase64(file)
            imagesPreview.push(toBase64)
        }

        setPreview(prev => ({ ...prev, imagesProduct: imagesPreview }))
    };

    useEffect(() => {
        if (watch('imagesProduct') instanceof FileList && watch('imagesProduct').length > 0) handlePreview(watch('imagesProduct'))
    }, [watch('imagesProduct')]);

    const handleUpdateProduct = async (data) => {
        const invalids = validate(payload, setInvalidFields)
        if (invalids === 0) {
            if (data.category) data.category = categories?.find(el => el.title === data.category)?.title
            const finalPayload = { ...data, ...payload }
            const formData = new FormData()
            for (let i of Object.entries(finalPayload)) formData.append(i[0], i[1])
            if (finalPayload.imagesProduct) {
                const imagesProduct = finalPayload?.imagesProduct?.length === 0 ? preview.imagesProduct : finalPayload.imagesProduct
                for (let image of imagesProduct) formData.append('imagesProduct', image)
            }
            dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }))
            const response = await apiUpdateProduct(formData, editProduct._id)
            dispatch(showModal({ isShowModal: false, modalChildren: null }))
            console.log(response)
            if (response.success) {
                toast.success(response.mes)
                render()
                setEditProduct(null)
            } else toast.error(response.mes)
        }

    }
    return (
        <div className='w-full flex flex-col gap-4'>
            <div className='p-4 border-b w-full flex justify-between items-center'>
                <h1 className='text-3xl font-bold tracking-tight'>Update products</h1>
                <span onClick={() => setEditProduct(null)} className='text-main hover:underline cursor-pointer'>Cancel</span>
            </div>
            <div className='p-4'>
                <form onSubmit={handleSubmit(handleUpdateProduct)}>
                    <InputForm
                        label='Name product'
                        register={register}
                        errors={errors}
                        id='titleProduct'
                        validate={{ required: 'Name product can not empty' }}
                        fullWidth
                        placaholder='Name new product' />

                    <InputForm
                        label='Tilte product'
                        register={register}
                        errors={errors}
                        id='subTitle'
                        style='mt-6'
                        validate={{ required: 'Title product can not empty' }}
                        fullWidth
                        placaholder='Title new product' />

                    <div className='w-full my-6 flex gap-4'>
                        <InputForm
                            label='Price'
                            register={register}
                            errors={errors}
                            id='price'
                            validate={{ required: 'Price can not empty' }}
                            style='flex-auto'
                            placaholder='Price new product'
                            type='number' />
                        <InputForm
                            label='Sale'
                            register={register}
                            errors={errors}
                            id='saleProduct'
                            validate={{ required: 'Sale product can not empty' }}
                            style='flex-auto'
                            placaholder='Sale product'
                            type='number' />
                        <InputForm
                            label='Quantity'
                            register={register}
                            errors={errors}
                            id='stock'
                            validate={{ required: 'Quantity product can not empty' }}
                            style='flex-auto'
                            placaholder='Quantity new product'
                            type='number' />
                        <InputForm
                            label='Weight'
                            register={register}
                            errors={errors}
                            id='weightProduct'
                            validate={{ required: 'Weight product can not empty' }}
                            style='flex-auto'
                            placaholder='Weight new product' />
                    </div>
                    <div className='w-full my-6 flex gap-4'>
                        <Select
                            label='Category'
                            options={categories?.map(el => ({ code: el.title, value: el.title }))}
                            register={register}
                            id='category'
                            validate={{ required: 'Category can not empty' }}
                            style='flex-auto'
                            errors={errors}
                            fullWidth
                        />
                        <Select
                            label='Brand'
                            options={brandsProduct}
                            register={register}
                            id='brand'
                            validate={{ required: 'Brand can not empty' }}
                            style='flex-auto'
                            errors={errors}
                            fullWidth
                        />
                    </div>
                    <MarkdownEditor
                        name='descriptionProduct'
                        changeValue={changeValue}
                        label='Description'
                        invalidFields={invalidFields}
                        setInvalidFields={setInvalidFields}
                        value={payload.descriptionProduct}
                    />
                    <div className='flex flex-col gap-2 mt-8'>
                        <label className='font-semibold' htmlFor='imagesProduct'>Upload images</label>
                        <input
                            type='file'
                            id='imagesProduct'
                            multiple
                            {...register('imagesProduct')}
                        />
                        {errors['imagesProduct'] && <small className='text-xs text-red-500'>{errors['imagesProduct']?.message}</small>}
                    </div>
                    {preview.imagesProduct.length > 0 && <div className=' my-4 flex w-full gap-3 flex-wrap'>
                        {preview.imagesProduct?.map((el, index) => (
                            <div
                                key={index}
                                className='w-fit'
                            >
                                <img src={el} alt='products' className='w-[200px] object-contain' />
                            </div>
                        ))}
                    </div>}
                    <div className='mt-6'>
                        <Button fw type='submit'>Update product</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default memo(UpdateProduct)