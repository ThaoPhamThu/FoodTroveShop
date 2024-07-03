import React, { useState } from 'react'
import { BreadCrumb, Button } from '../../components'
import { useLocation, useParams } from 'react-router-dom'
import logo from '../../assets/logo.jpg';
import { apiResetPassword } from '../../apis';
import { toast } from 'react-toastify';

const ResetPassword = () => {
    const location = useLocation()
    const [password, setPassword] = useState('')

    const { token } = useParams()

    const handleResetPassword = async () => {
        const response = await apiResetPassword({ password, token })
        if (response.success) {
            toast.success(response.mes)
        } else toast.info(response.message)
    }
    return (
        <div className='w-full mb-16'>
            <div className="h-[51px] bg-main flex justify-center items-center mb-16">
                <div className="w-main flex justify-between text-white">
                    <h3 className='font-semibold capitalize'>Reset password</h3>
                    <BreadCrumb category={location?.pathname?.replace('/', '')?.split('-')?.join(' ')} />
                </div>
            </div>
            <div className=" bg-white flex justify-center items-center">
                <div className='flex flex-col p-4 gap-2 border items-center'>
                    <img src={logo} className=" w-[130px] object-contain" />
                    <div className="flex gap-4 p-4">
                        <div className="flex flex-col gap-4">
                            <span className="text-lg font-normal text-center ">Enter your new password</span>
                            <div className="flex flex-col w-full">
                                <input
                                    placeholder="Type here..."
                                    type="text" id="email"
                                    className="px-4 py-2 w-[300px] outline-none"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)} />
                            </div>
                            <div>
                                <Button fw handleOnClick={handleResetPassword}>Submit</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ResetPassword