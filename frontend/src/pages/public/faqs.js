import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import BreadCrumb from "../../components/breadCrumb";
import image from '../../assets/aboutUs.jpg';
import { faqs } from "../../ultils/constants";
import { AiOutlineCaretDown, AiOutlineCaretRight } from 'react-icons/ai'

const Faq = () => {
    const location = useLocation()
    const [actived, setActived] = useState([])
    const handleShowAns = (ansId) => {
        if (actived.some(el => el === ansId)) setActived(prev => prev.filter(el => el !== ansId))
        else setActived(prev => [...prev, ansId])
    }
    return (
        <div className='w-full mb-16'>
            <div className="h-[51px] bg-main flex justify-center items-center mb-16">
                <div className="w-main flex justify-between text-white">
                    <h3 className='font-semibold'>Faq</h3>
                    <BreadCrumb category={location?.pathname?.replace('/', '')?.split('-')?.join(' ')} />
                </div>
            </div>
            <div className="w-main flex m-auto gap-4">
                <div className="flex flex-col gap-5 w-[50%]">
                    <img src={image} alt="image" className="w-full object-contain" />
                </div>
                <div className="flex flex-col gap-5 w-[50%]">
                    {faqs?.map(el => (
                        <div >
                            <div onClick={() => handleShowAns(+el.id)} className='flex items-center justify-between px-4 py-2 cursor-pointer border rounded-t-md'>
                                <span className='flex items-center gap-2'>{el.text}</span>
                                {actived.some(id => id === el.id) ? <AiOutlineCaretRight /> : <AiOutlineCaretDown />}
                            </div>
                            {actived.some(id => +id === +el.id) && <div className='flex border font-normal text-sm p-4 rounded-b-md text-[#7A7A7A]'>
                                {el.subtext}
                            </div>}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Faq