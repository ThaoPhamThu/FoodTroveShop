import React, { memo, useRef, useEffect, useState } from 'react';
import logo from '../assets/logo.jpg';
import { ratings } from '../ultils/constants';
import { AiFillStar } from 'react-icons/ai';
import { Button } from './';

const Ratings = ({ nameProduct, handleSubmitRatings }) => {
    const modalRef = useRef()
    const [chooseScore, setChooseScore] = useState(null);
    const [comment, setComment] = useState('');

    useEffect(() => {
        modalRef.current.scrollIntoView({ block: 'center', behavior: 'smooth' })
    }, [])
    return (
        <div onClick={e => e.stopPropagation()} ref={modalRef} className='bg-white w-[700px] p-4 flex flex-col gap-4 items-center justify-center'>
            <img src={logo} alt='logo' className='w-[300px] my-8 object-contain' />
            <h2 className='text-center text-medium text-lg'>{`Voting product ${nameProduct}`}</h2>
            <textarea
                className='form-textarea w-full border border-[#64B496] placeholder:italic placeholder:text-xs placeholder:text-gray-500'
                placeholder='Type something...'
                value={comment}
                onChange={e => setComment(e.target.value)}></textarea>
            <div className='w-full flex flex-col gap-4 '>
                <p>How do you like about this product?</p>
                <div className='flex justify-center gap-4 items-center'>
                    {ratings.map(el => (
                        <div
                            key={el.id}
                            className='w-[100px] bg-gray-200 cursor-pointer rounded-md p-4 flex items-center justify-center flex-col gap-2'
                            onClick={() => setChooseScore(el.id)}>
                            {(Number(chooseScore) && chooseScore >= el.id) ? <AiFillStar color='orange' /> : <AiFillStar color='gray' />}
                            <span>{el.text}</span>
                        </div>
                    ))}
                </div>
            </div>
            <Button handleOnClick={() => handleSubmitRatings({ comment, score: chooseScore })} fw>Submit</Button>
        </div>
    )
}

export default memo(Ratings)