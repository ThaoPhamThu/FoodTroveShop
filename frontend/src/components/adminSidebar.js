import React, { memo, Fragment, useState } from 'react';
import logo from '../assets/logo-2.jpg';
import { adminSidebar } from '../ultils/constants';
import { NavLink, Link } from 'react-router-dom';
import clsx from 'clsx';
import { AiOutlineCaretDown, AiOutlineCaretRight } from 'react-icons/ai'

const activedStyle = 'px-4 py-2 flex items-center gap-2 text-gray-200 bg-gray-500 '
const notActivedStyle = 'px-4 py-2 flex items-center gap-2 text-gray-200 hover:bg-gray-400'
const AdminSidebar = () => {
    const [actived, setActived] = useState([])
    const handleShowTabs = (tabId) => {
        if (actived.some(el => el === tabId)) setActived(prev => prev.filter(el => el !== tabId))
        else setActived(prev => [...prev, tabId])
    }
    return (
        <div className=' bg-[#F53E32] h-full'>
            <Link to={'/'} className='flex flex-col justify-center items-center p-4 gap-2'>
                <img src={logo} alt='logo' className='w-[200px] object-contain' />
                <small>Admin Workspace</small>
            </Link>
            <div>
                {adminSidebar.map(el => (
                    <Fragment key={el.id}>
                        {el.type === 'SINGLE' && <NavLink
                            to={el.path}
                            className={({ isActive }) => clsx(isActive && activedStyle, !isActive && notActivedStyle)}>
                            <span>{el.icon}</span>
                            <span>{el.text}</span>
                        </NavLink>}

                        {el.type === 'PARENT' && <div onClick={() => handleShowTabs(+el.id)} className='flex flex-col  gap-2 text-gray-200'>
                            <div className='flex items-center justify-between px-4 py-2 hover:bg-gray-400 cursor-pointer'>
                                <div className='flex items-center gap-2'>
                                    <span>{el.icon}</span>
                                    <span>{el.text}</span>
                                </div>
                                {actived.some(id => id === el.id) ? <AiOutlineCaretRight /> : <AiOutlineCaretDown />}
                            </div>
                            {actived.some(id => +id === +el.id) && <div className='flex flex-col'>
                                {el.submenu.map(item => (
                                    <NavLink
                                        key={item.text}
                                        to={item.path}
                                        onClick={e => e.stopPropagation()}
                                        className={({ isActive }) => clsx(isActive && activedStyle, !isActive && notActivedStyle, 'pl-10')}>
                                        {item.text}
                                    </NavLink>
                                ))}
                            </div>}
                        </div>}
                    </Fragment>
                ))}
            </div>
        </div>
    )
}

export default memo(AdminSidebar)