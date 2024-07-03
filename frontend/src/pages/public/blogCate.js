import React, { useEffect, useState } from "react";
import { useParams, useSearchParams, useNavigate, createSearchParams, useLocation } from "react-router-dom";
import { apiGetBlogs } from "../../apis/blog";
import { Pagination, InputForm, BreadCrumbBlog } from "../../components";
import { useForm } from "react-hook-form";
import useDebounce from "../../hooks/useDebounce";
import moment from "moment";

const BlogCate = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const [blogs, setBlogs] = useState(null);
    const { category } = useParams();
    const [params] = useSearchParams()
    const { register, formState: { errors }, watch } = useForm();

    const fetchBlogs = async (queries) => {
        queries.sort = '-createdAt'
        queries.limit = 3
        queries.category = category
        const response = await apiGetBlogs(queries);
        if (response.success) setBlogs(response)
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
        const searchParams = Object.fromEntries([...params])
        fetchBlogs(searchParams)
        window.scrollTo(0, 0)
    }, [params]);
    return (
        <div className="w-full">
            <div className="h-[51px] flex justify-center items-center bg-main mb-14">
                <div className="w-main flex justify-between  text-white">
                    <h3 className="font-semibold capitalize">{category}</h3>
                    <BreadCrumbBlog category={category} />
                </div>
            </div>
            <div className="w-main flex m-auto gap-4">
                <div className="mb-6">
                    <div className="flex justify-end">
                        <InputForm
                            id='q'
                            register={register}
                            errors={errors}
                            style1='w-[500px]'
                            placaholder='Search here...'
                            style='w-[500px]'
                        />
                    </div>

                    <div className='flex flex-col gap-4 mb-8 cursor-pointer' onClick={() => navigate(`/blogs/${blogs?.blogs[0]?.category}/${blogs?.blogs[0]?._id}/${blogs?.blogs[0]?.title}`)}>
                        <img src={blogs?.blogs[0]?.imageBlog} className='w-full h-[455px] object-cover rounded-md' />
                        <div className='flex flex-col gap-2'>
                            <div className='flex gap-2'>
                                <span className='text-main font-semibold text-[15px]'>{`By ${blogs?.blogs[0]?.author}`}</span>
                                <span className='font-semibold text-[15px] text-[#7A7A7A]'>/</span>
                                <span className='font-semibold text-[15px] text-[#7A7A7A]'>{`Date-${moment(blogs?.blogs[0]?.createdAt).format('DD, MM, YYYY')}`}</span>
                            </div>
                            <h3 className='font-bold text-[#2B2B2D] text-[32px]'>{blogs?.blogs[0]?.title}</h3>
                            <div className='text-sm font-normal text-[#7A7A7A]'>{blogs?.blogs[0]?.subtitle}</div>
                        </div>
                    </div>
                    {blogs?.blogs[1] && !blogs?.blogs[2] &&
                        <div onClick={() => navigate(`/blogs/${blogs?.blogs[1]?.category}/${blogs?.blogs[1]?._id}/${blogs?.blogs[1]?.title}`)} className="w-full cursor-pointer flex flex-col gap-4">
                            <img src={blogs?.blogs[1]?.imageBlog} className="w-full h-[455px] object-cover rounded-md" />
                            <div className="flex gap-2">
                                <div className="w-5 h-5 bg-main rounded-full text-white text-center ">
                                    {`->`}
                                </div>
                                <span className="text-[#2B2B2D] font-bold text-base">{blogs?.blogs[1]?.title}</span>
                            </div>

                        </div>}
                    {blogs?.blogs[1] && blogs?.blogs[2] &&
                        <div className="flex gap-4 w-full">
                            <div onClick={() => navigate(`/blogs/${blogs?.blogs[1]?.category}/${blogs?.blogs[1]?._id}/${blogs?.blogs[1]?.title}`)} className="w-1/2 cursor-pointer flex flex-col gap-4">
                                <img src={blogs?.blogs[1]?.imageBlog} className="w-full h-[220px] object-cover rounded-md" />
                                <div className="flex gap-2">
                                    <div className="w-5 h-5 bg-main rounded-full text-white text-center ">
                                        {`->`}
                                    </div>
                                    <span className="text-[#2B2B2D] font-bold text-base">{blogs?.blogs[1]?.title}</span>
                                </div>

                            </div>
                            <div onClick={() => navigate(`/blogs/${blogs?.blogs[2]?.category}/${blogs?.blogs[2]?._id}/${blogs?.blogs[2]?.title}`)} className="w-1/2 cursor-pointer flex flex-col gap-4">
                                <img src={blogs?.blogs[2]?.imageBlog} className="w-full h-[220px] object-cover rounded-md" />
                                <div className="flex gap-2">
                                    <div className="w-5 h-5 bg-main rounded-full text-white text-center">
                                        {`->`}
                                    </div>
                                    <span className="text-[#2B2B2D] font-bold text-base">{blogs?.blogs[2]?.title}</span>
                                </div>
                            </div>
                        </div>}
                </div>
            </div>
            <div className="w-main flex m-auto justify-end">
                <Pagination totalCount={blogs?.counts} page={3} />
            </div>
            <div className="h-[56px]"></div>
        </div>

    )
}

export default BlogCate