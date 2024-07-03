import React, { memo, Fragment, useState } from 'react';
import { memberSidebar } from '../ultils/constants';
import { Link, NavLink } from 'react-router-dom';
import clsx from 'clsx';
import { useSelector, useDispatch } from 'react-redux';
import logo from '../assets/logo.jpg';

const activedStyle = 'px-4 py-2 flex items-center gap-2 text-gray-200 bg-gray-500 '
const notActivedStyle = 'px-4 py-2 flex items-center gap-2 text-gray-700 hover:bg-gray-400'
const MemberSidebar = () => {
    const [actived, setActived] = useState([])
    const { current } = useSelector(state => state.user)
    const dispatch = useDispatch()
    return (
        <div className=' bg-white h-full'>
            <div className='flex items-center justify-center py-4'>
                <h3 className='font-medium text-3xl text-orange-500'>My Account</h3>
            </div>
            <div className='w-full flex flex-col gap-2 items-center justify-center py-4'>
                <img src={current?.avatar} alt='logo' className='w-16 h-16 object-cover rounded-full' />
                <span>{current?.name}</span>
            </div>
            <div>
                {memberSidebar.map(el => (
                    <Fragment key={el.id}>
                        <NavLink
                            to={el.path}
                            className={({ isActive }) => clsx(isActive && activedStyle, !isActive && notActivedStyle)}>
                            <span>{el.icon}</span>
                            <span>{el.text}</span>
                        </NavLink>
                    </Fragment>
                ))}
            </div>
            <Link to={'/'} className='flex justify-center items-center p-4 gap-2 mt-[300px]'>
                <img src={logo} alt='logo' className='w-[150px] object-contain' />
            </Link>
        </div>
    )
}

export default memo(MemberSidebar)