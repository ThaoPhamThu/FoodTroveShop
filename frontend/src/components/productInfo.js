import React, { memo, useState } from 'react'
import { VoteBar, Button, Ratings, Comment } from './';
import { renderStarFromNumber } from '../ultils/helper';
import { apiCreateReview } from '../apis';
import { useDispatch, useSelector } from 'react-redux';
import { showModal } from '../store/app/appSlice';
import Swal from 'sweetalert2';
import path from '../ultils/path';
import { useNavigate } from 'react-router-dom';
import DOMPurify from 'dompurify';

const ProductInfo = ({ totalRatings, reviews, nameProduct, productId, rerender, description }) => {
    const [activedTab, setActivedTab] = useState(1);
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { isLoggedIn } = useSelector(state => state.user)

    const [payload, setPayload] = useState({
        comment: '',
        score: ''
    })

    const handleSubmitRatings = async ({ comment, score }) => {
        if (!comment || !score || !productId) {
            alert('Please vote before click submit')
            return
        }
        await apiCreateReview({ rating: score, comment, productId, updatedAt: Date.now() });
        dispatch(showModal({ isShowModal: false, modalChildren: null }))
        rerender()
    }

    const handleVoteNow = () => {
        if (!isLoggedIn) {
            Swal.fire({
                text: 'Login to vote',
                cancelButtonText: 'Cancel',
                confirmButtonText: 'Go login',
                title: 'Oops!',
                showCancelButton: true
            }).then((rs) => {
                if (rs.isConfirmed) navigate(`/${path.LOGIN}`)
            })
        } else {
            dispatch(showModal({
                isShowModal: true,
                modalChildren: <Ratings nameProduct={nameProduct} handleSubmitRatings={handleSubmitRatings} />
            }))
        }
    }
    return (
        <div className=''>
            <div className='flex flex-col my-8 w-main border'>
                <span className='py-2 px-6 cursor-pointer font-semibold bg-white border-b'>
                    DESCRIPTION
                </span>
                <div className='w-full px-6 pt-4 pb-8 text-[#7A7A7A] border-b' dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(description) }}>
                    {/* {description} */}
                </div>
            </div>

            <div className=' flex flex-col my-8 w-main border'>
                <span className='py-2 px-6 cursor-pointer font-semibold bg-white ' >
                    REVIEWS
                </span>
                <div className='flex '>
                    <div className='flex-4 flex flex-col border border-red-700 items-center justify-center'>
                        <span className='font-semibold text-3xl'>{`${totalRatings}/5`}</span>
                        <span className='flex items-center gap-1'>{renderStarFromNumber(totalRatings)?.map((el, index) => (
                            <span key={index}>{el}</span>
                        ))}</span>
                        <span className='text-sm'>{`${reviews?.length} reviews and comments`}</span>
                    </div>
                    <div className='flex-6  border flex flex-col gap-2 p-4'>
                        {Array.from(Array(5).keys()).reverse().map(el => (
                            <VoteBar
                                key={el}
                                number={el + 1}
                                ratingTotal={reviews?.length}
                                ratingCount={reviews?.filter(i => i.rating === el + 1)?.length} />
                        ))}
                    </div>
                </div>
                <div className='flex flex-col p-4 items-center justify-center text-sm gap-2'>
                    <span>Do you review this product?</span>
                    <Button
                        handleOnClick={handleVoteNow} >
                        Vote now!
                    </Button>
                </div>
                <div className='flex flex-col gap-6 mb-6 px-4'>
                    {reviews?.map(el => (
                        <Comment
                            key={el._id}
                            rating={el.rating}
                            updatedAt={el.updatedAt}
                            comment={el.comment}
                            name={el.user?.name}
                            avatar={el.user?.avatar} />
                    ))}
                </div>
            </div>

        </div>
    )
}

export default memo(ProductInfo)