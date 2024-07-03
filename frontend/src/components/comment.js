import React, { memo } from 'react';
import moment from 'moment';
import { renderStarFromNumber } from '../ultils/helper'

const Comment = ({ avatar, name = 'Anonymous', comment, updatedAt, rating }) => {
    return (
        <div className='flex gap-4'>
            <div className=' flex-none'>
                <img src={avatar} alt='avatar' className='w-[25px] h-[25px] object-cover rounded-full' />
            </div>
            <div className='flex flex-col flex-auto '>
                <div className='flex items-center justify-between'>
                    <h3 className='font-semibold '>{name}</h3>
                    <span className='text-xs italic'>{moment(updatedAt)?.fromNow()}</span>
                </div>
                <div className='flex flex-col gap-2 pl-4 text-sm mt-4 boder border-gray-300 py-2 bg-gray-100'>
                    <span className='flex items-center gap-3'>
                        <span className='font-semibold'>Vote:</span>
                        <span className='flex items-center gap-1'>{renderStarFromNumber(rating)?.map((el, index) => (
                            <span key={index}>{el}</span>
                        ))}</span>
                    </span>
                    <span className='flex gap-2'>
                        <span className='font-semibold'>Comment:</span>
                        <span className='flex items-center gap-1'>{comment}</span>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default memo(Comment)