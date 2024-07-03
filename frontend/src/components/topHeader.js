import React, { memo, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import path from '../ultils/path';
import { getInforUser } from '../store/users/asyncActions';
import { useDispatch, useSelector } from 'react-redux';
import icons from '../ultils/icons';
import { logout, clearMessage } from '../store/users/userSlice';
import Swal from 'sweetalert2';

const { AiOutlineLogout } = icons;

const TopHeader = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLoggedIn, current, mes } = useSelector(state => state.user);
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
    return (
        <div className='h-[38px] w-full bg-gray-200 flex items-center justify-center'>
            <div className='w-main flex items-center justify-between text-xs text-gray-800'>
                <span>ORDER ONLINE OR CALL US (+1800) 123 4567</span>
                <div>
                    {isLoggedIn && current
                        ? <div className='flex gap-4 text-sm items-center'>
                            <span>{`Welcome, ${current?.name}`}</span>
                            <span onClick={() => dispatch(logout())} className='hover:rounded-full hover:bg-gray-200 hover:text-main p-2 cursor-pointer'><AiOutlineLogout size={18} /></span>
                        </div>
                        : <Link to={`/${path.LOGIN}`} className=' hover:text-gray-800'>Sign In or Create Acount</Link>}
                </div>
            </div>
        </div>
    )
}

export default memo(TopHeader)