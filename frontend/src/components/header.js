import React, { Fragment, memo, useEffect, useState } from "react";
import logo from '../assets/logo.jpg';
import icons from '../ultils/icons';
import { Link, useNavigate } from 'react-router-dom';
import path from '../ultils/path';
import { useDispatch, useSelector } from "react-redux";
import { getInforUser } from '../store/users/asyncActions';
import { logout, clearMessage } from "../store/users/userSlice";
import { RiLoginBoxFill } from "react-icons/ri";
import Swal from "sweetalert2";

const { RiPhoneFill, MdEmail, PiHandbagSimpleFill, FaUserAlt } = icons
const Header = () => {
    const { isLoggedIn, current, mes } = useSelector(state => state.user)
    const [isShowOption, setIsShowOption] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        const setTimeOutId = setTimeout(() => {
            if (isLoggedIn) dispatch(getInforUser())
        }, 300)
        return () => {
            clearTimeout(setTimeOutId)
        }
    }, [dispatch, isLoggedIn]);

    useEffect(() => {
        if (mes) Swal.fire('Oops!', mes, 'infor').then(() => {
            dispatch(clearMessage())
            navigate(`/${path.LOGIN}`)
        })
    }, [mes])

    useEffect(() => {
        const handleClickOut = (e) => {
            const profile = document.getElementById('profile')
            if (!profile?.contains(e.target)) setIsShowOption(false)
        }
        document.addEventListener('click', handleClickOut)

        return () => {
            document.removeEventListener('click', handleClickOut)
        }
    }, [])
    return (
        <div className="flex justify-between w-main h-[110px] py-[35px]">
            <Link to={`/${path.HOME}`}>
                <img src={logo} alt="logo" className="w-[234px] object-contain h-[60px]" />
            </Link>
            <div className="flex text-[13px]">
                <div className="flex flex-col px-6 border-r items-center">
                    <span className="flex gap-4 items-center">
                        <RiPhoneFill color="red" />
                        <span className="font-semibold">(+1800) 123 4567</span>
                    </span>
                    <span>Mon-Sat 9:00AM - 8:00PM</span>
                </div>
                <div className="flex flex-col px-6 border-r items-center">
                    <span className="flex gap-4 items-center">
                        <MdEmail color="red" />
                        <span className="font-semibold">FOODTROVESHOP@GMAIL.COM</span>
                    </span>
                    <span>Online Support 24/7</span>
                </div>
                {isLoggedIn && current
                    ? <Fragment>
                        <div onClick={() => navigate(`/${path.DETAIL_CART}`)} className="cursor-pointer flex flex-col items-center px-6 border-r gap-2">
                            <PiHandbagSimpleFill color="red" />
                            <span>{`${current?.cart?.length || 0} item(s)`}</span>
                        </div>
                        {current.role === 'user' && <div
                            className="cursor-pointer flex flex-col items-center justify-center pl-6 gap-2 relative"
                            onClick={() => setIsShowOption(prev => !prev)}
                            id="profile">
                            <FaUserAlt color="red" />
                            <span>{current?.name}</span>

                            {isShowOption && <div onClick={(e) => e.stopPropagation()} className="absolute top-full flex flex-col left-[16px] min-w-[150px] bg-gray-100 border py-2">
                                <Link
                                    className="p-2 w-full hover:bg-sky-100"
                                    to={`/${path.MEMBER}/${path.PERSONAL}`}>Personal
                                </Link>
                                <span onClick={() => dispatch(logout())} className='p-2 w-full hover:bg-sky-100'>Log out</span>
                            </div>}
                        </div>}
                        {current.role === 'admin' && <div
                            className="cursor-pointer flex flex-col items-center justify-center pl-6 gap-2 relative"
                            onClick={() => setIsShowOption(prev => !prev)}
                            id="profile">
                            <FaUserAlt color="red" />
                            <span>{current?.name}</span>

                            {isShowOption && <div onClick={(e) => e.stopPropagation()} className="absolute top-full flex flex-col left-[16px] min-w-[150px] bg-gray-100 border py-2">
                                <Link
                                    className="p-2 w-full hover:bg-sky-100"
                                    to={`/${path.MEMBER}/${path.PERSONAL}`}>Personal
                                </Link>
                                <Link
                                    className="p-2 w-full hover:bg-sky-100"
                                    to={`/${path.ADMIN}/${path.DASHBOARD}`}>Admin Workspace
                                </Link>
                                <span onClick={() => dispatch(logout())} className='p-2 w-full hover:bg-sky-100'>Log out</span>
                            </div>}
                        </div>}
                    </Fragment>
                    : <Link to={`/${path.LOGIN}`} className="cursor-pointer flex flex-col items-center justify-center pl-6 gap-2 relative">
                        <RiLoginBoxFill color="red" />
                        <span>Log in</span>
                    </Link>}
            </div>
        </div>
    )
}

export default memo(Header)