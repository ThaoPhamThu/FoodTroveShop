import React, { Fragment, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { BreadCrumbBlog } from '../../components';
import { apiGetBlog, apiGetBlogs, apiUpdateDislike, apiUpdateLike } from '../../apis';
import moment from 'moment';
import { GoClock } from "react-icons/go";
import { BiLike, BiDislike } from "react-icons/bi";
import { formatMoney } from '../../ultils/helper';
import DOMPurify from 'dompurify';
import { toast } from 'react-toastify';

const DetailBlog = () => {
    const titleRef = useRef()
    const params = useParams();
    const { current } = useSelector(state => state.user)
    const location = useLocation()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [blog, setBlog] = useState(null);
    const [relatedBlog, setRelateBlog] = useState(null);
    const [currentImage, setCurrentImage] = useState(null);
    const [update, setUpdate] = useState(false)
    const [bid, setBid] = useState(null)
    const [category, setCategory] = useState(null)
    const [title, setTitle] = useState(null)

    useEffect(() => {
        setBid(params.bid)
        setCategory(params.category)
        setTitle(params.titleBlog)
    }, [params]);

    const fetchBlogData = async () => {
        const response = await apiGetBlog(bid);
        if (response.success) {
            setBlog(response?.blog)
            setCurrentImage(response.blog?.imageBlog)
        }
    };

    const fetchBlogs = async () => {
        const response = await apiGetBlogs({ category, sort: '-numberViews', limit: 6 })
        if (response.success) setRelateBlog(response.blogs)
    }

    useEffect(() => {
        if (bid) {
            fetchBlogData();
            fetchBlogs();
        }
        window.scrollTo(0, 0)
        titleRef.current.scrollIntoView({ block: 'center' })
    }, [bid]);

    const handleLike = async () => {
        const response = await apiUpdateLike(blog?._id)
        if (response.success) {
            console.log(blog)
        }
        else toast.error(response.mes)
    }

    const handleDislike = async () => {
        const response = await apiUpdateDislike(blog?._id)
        if (response.success) {

        }
        else toast.error(response.mes)
    }

    return (
        <div className='w-full'>
            <div className="h-[51px] flex justify-center items-center bg-main mb-14">
                <div ref={titleRef} className="w-main flex justify-between  text-white">
                    <h3 className="font-semibold capitalize">Blogs</h3>
                    <BreadCrumbBlog category={category} />
                </div>
            </div>
            <div className='w-main m-auto flex gap-4'>
                <div className='w-[75%] flex flex-col'>
                    <div className=' flex flex-col gap-4 border-b pb-8'>
                        <h2 className='text-3xl font-semibold '>{title}</h2>
                        <div className='flex gap-2 items-center'>
                            <span className='text-main text-sm'>{blog?.author}</span>
                            <span>-</span>
                            <div className='flex gap-1'>
                                <GoClock color='#7A7A7A' />
                                <span className='text-sm text-[#7A7A7A]'>{moment(blog?.createdAt).format('hh:mm, DD/MM/YYYY')}</span>
                            </div>
                            <span className='ml-8 text-sm text-[#7A7A7A]'>{`Views: ${formatMoney(blog?.numberViews)}`}</span>
                        </div>
                        <div className='flex gap-4'>
                            <div onClick={() => handleLike()} className='flex gap-1 items-center text-white bg-blue-500 px-2 py-1 rounded-md cursor-pointer hover:text-black'>
                                <BiLike />
                                <span>{`Like ${blog?.likes?.length}`}</span>
                            </div>
                            <div onClick={() => handleDislike()} className='flex gap-1 items-center text-white bg-gray-400 px-2 py-1 rounded-md cursor-pointer hover:text-main'>
                                <BiDislike />
                                <span>Dislike</span>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col w-full gap-6 mt-8'>
                        <span className='italic text-[#7A7A7A]'>{`(FoodTrove) - ${blog?.subtitle}`}</span>
                        <img src={blog?.imageBlog} className='w-full object-contain ' />
                        <span className='' dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(blog?.subtitle) }}></span>
                    </div>
                </div>
                <div className='w-[25%] flex flex-col gap-4 border h-min p-4'>
                    <span className='text-orange-600 text-lg font-semibold'>{`Reading more in ${category}`}</span>
                    <div className='w-full flex flex-col gap-6'>
                        {relatedBlog?.map((el, index) => (
                            <Fragment>
                                {index === 0 &&
                                    <div onClick={() => navigate(`/blogs/${el?.category}/${el?._id}/${el?.title}`)} className=' flex flex-col gap-2 cursor-pointer'>
                                        <img src={el?.imageBlog} className=' w-full object-cover' />
                                        <div className='flex gap-2'>
                                            <h3 className='text-[#a0a4a8] text-xl font-semibold'>{`${index + 1}.`}</h3>
                                            <div className='text-lg font-semibold'>{el.title}</div>
                                        </div>
                                    </div>}
                                {index !== 0 &&
                                    <div onClick={() => navigate(`/blogs/${el?.category}/${el?._id}/${el?.title}`)} className='w-full flex justify-center gap-2 items-center cursor-pointer border-t pt-4' key={el?._id}>
                                        <div className='flex gap-2 w-[65%] '>
                                            <h3 className='text-[#a0a4a8] text-xl font-semibold'>{`${index + 1}.`}</h3>
                                            <div className='font-semibold text-sm'>{el.title}</div>
                                        </div>
                                        <img src={el?.imageBlog} className='w-[35%] h-[80px] object-cover' />
                                    </div>}
                            </Fragment>

                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DetailBlog