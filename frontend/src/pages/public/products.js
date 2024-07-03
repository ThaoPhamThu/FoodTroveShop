import React, { useEffect, useState, useCallback } from "react";
import { useParams, useSearchParams, useNavigate, createSearchParams, useLocation } from "react-router-dom";
import { BreadCrumb, Product, SearchItem, InputSelect, Pagination, InputForm } from "../../components";
import { apiGetProducts } from "../../apis";
import Masonry from 'react-masonry-css';
import { sorts } from '../../ultils/constants';
import { useForm } from "react-hook-form";
import useDebounce from "../../hooks/useDebounce";
import noProduct from '../../assets/no-products.png'

const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1
};

const Products = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const [products, setProducts] = useState(null);
    const [activeClick, setActiveClick] = useState(null);
    const { register, formState: { errors }, watch } = useForm();
    const [params] = useSearchParams()
    const [sort, setSort] = useState('');
    const { category } = useParams();

    const fetchProductsByCategory = async (queries) => {
        if (category && category !== 'products') queries.category = category
        const response = await apiGetProducts(queries);
        if (response.success) setProducts(response)
    }

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
        let param = []
        for (let i of params.entries()) param.push(i)
        const queries = {}
        for (let i of params) queries[i[0]] = i[1]
        let priceQuery = {}
        if (queries.from && queries.to) {
            priceQuery = {
                $and: [
                    { price: { gte: queries.from } },
                    { price: { lte: queries.to } }
                ]
            }
            delete queries.from
            delete queries.to
            delete queries.price
        } else {
            if (queries.from) {
                queries.price = { gte: queries.from }
                delete queries.from
            }
            if (queries.to) {
                queries.price = { lte: queries.to }
                delete queries.to
            }
        }

        fetchProductsByCategory({ ...priceQuery, ...queries })
        window.scrollTo(0, 0)
    }, [params]);

    const changeActiveFilter = useCallback((name) => {
        if (activeClick === name) setActiveClick(null)
        else setActiveClick(name)
    }, [activeClick]);

    const changeValue = useCallback((value) => {
        setSort(value)
    }, [sort])

    useEffect(() => {
        if (sort) {
            navigate({
                pathname: `/${category}`,
                search: createSearchParams({ sort }).toString()
            })
        }
    }, [sort])
    return (
        <div className="w-full">
            <div className="h-[51px] flex justify-center items-center bg-main">
                <div className="w-main flex justify-between  text-white">
                    <h3 className="font-semibold capitalize">{category}</h3>
                    <BreadCrumb category={category} />
                </div>
            </div>
            <div className="w-main boder p-4 flex justify-between mt-8 m-auto">
                <div className="w-2/5 flex-auto flex flex-col gap-3">
                    <span className="font-semibold text-sm ">Filter by</span>
                    <div className="flex items-center gap-4">
                        <SearchItem name='price' activeClick={activeClick} changeActiveFilter={changeActiveFilter} type="input" />
                        <SearchItem name='brand' activeClick={activeClick} changeActiveFilter={changeActiveFilter} />
                    </div>
                </div>
                <div className="w-1/5 flex flex-col gap-3 ">
                    <span className="font-semibold text-sm ">Sort by</span>
                    <div>
                        <InputSelect value={sort} options={sorts} changeValue={changeValue} />
                    </div>
                </div>
                <div className='w-2/5 flex justify-end'>
                    <form className='mt-3 w-[60%]'>
                        <InputForm
                            id='q'
                            register={register}
                            errors={errors}
                            fullWidth
                            placaholder='Search products by title'
                        />
                    </form>
                </div>
            </div>
            {!products?.products?.length > 0 && <div className="flex ic justify-center">
                <img src={noProduct} alt="Can not find product" className="w-[600px] object-contain" />
            </div>}
            <div className="mt-8 w-main m-auto">
                <Masonry
                    breakpointCols={breakpointColumnsObj}
                    className="my-masonry-grid flex mx-[-10px]"
                    columnClassName="my-masonry-grid_column">
                    {products?.products?.map(el => (
                        <Product key={el._id} pid={el.id} productData={el} normal={true} />
                    ))}
                </Masonry>
            </div>
            {products?.products?.length > 0 && <div className="w-main m-auto my-4 flex justify-end">
                <Pagination totalCount={products?.counts} page={8} />
            </div>}
            <div className="w-full h-[100px]"></div>
        </div>
    )
}

export default Products