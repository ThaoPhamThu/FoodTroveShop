import DOMPurify from 'dompurify'
import moment from 'moment'
import React, { memo } from 'react'

const Blog = ({ blog }) => {
    return (
        <div className='flex flex-col gap-4 mb-8'>
            <img src={blog?.imageBlog} className='w-full h-[455px] object-cover rounded-md' />
            <div className='flex flex-col gap-2'>
                <div className='flex gap-2'>
                    <span className='text-main font-semibold text-[15px]'>{`By ${blog?.author}`}</span>
                    <span className='font-semibold text-[15px] text-[#7A7A7A]'>/</span>
                    <span className='font-semibold text-[15px] text-[#7A7A7A]'>{`Date-${moment(blog?.createdAt).format('DD, MM, YYYY')}`}</span>
                </div>
                <h3 className='font-bold text-[#2B2B2D] text-[32px]'>{blog?.title}</h3>
                <div className='text-sm font-normal text-[#7A7A7A]' dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(blog?.subtitle) }}></div>
            </div>
        </div>
    )
}

export default memo(Blog)