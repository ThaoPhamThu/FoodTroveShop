import React, { useState, useCallback, useEffect } from "react";
import { InputField, Button, Loading, BreadCrumb } from '../../components';
import logo from '../../assets/logo.jpg';
import { apiRegister, apiLogin, apiForgotPassword, apiFinalRegister } from "../../apis/user";
import Swal from 'sweetalert2';
import { useNavigate, useSearchParams, useLocation } from "react-router-dom";
import path from "../../ultils/path";
import { login } from '../../store/users/userSlice';
import { showModal } from '../../store/app/appSlice'
import { useDispatch } from "react-redux";
import { validate } from '../../ultils/helper';
import { IoMdArrowRoundBack } from "react-icons/io";
import { toast } from "react-toastify";

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const [payload, setPayload] = useState({
        email: '',
        password: '',
        name: '',
        phoneNumber: ''
    });
    const [isVerifiedEmail, setIsVerifiedEmail] = useState(false)
    const [isForgotPassword, setIsForgotPassword] = useState(false)
    const [invalidFields, setInvalidFields] = useState([]);
    const [isRegister, setIsRegister] = useState(false);
    const [searchParams] = useSearchParams()
    const resetPayload = () => {
        setPayload({
            email: '',
            password: '',
            name: '',
            phoneNumber: ''
        })
    };
    const [token, setToken] = useState('')
    const [email, setEmail] = useState('')
    useEffect(() => {
        resetPayload()
    }, [isRegister])
    const handleForgotPassword = async () => {
        const response = await apiForgotPassword({ email })
        if (response.success) {
            toast.success(response.mes)
        } else toast.info(response.message)
    }
    const handleSubmit = useCallback(async () => {
        const { name, phoneNumber, ...data } = payload;

        const invalids = isRegister ? validate(payload, setInvalidFields) : validate(data, setInvalidFields);
        if (invalids === 0) {
            if (isRegister) {
                dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }))
                const response = await apiRegister(payload);
                dispatch(showModal({ isShowModal: false, modalChildren: null }))
                if (response.success) {
                    setIsVerifiedEmail(true)

                } else Swal.fire('Oops!', response.message, 'error')

            } else {
                const rs = await apiLogin(data);
                if (rs.success) {
                    dispatch(login({ isLoggedIn: true, token: rs.token, userData: rs.user }))
                    searchParams.get('redirect') ? navigate(searchParams.get('redirect')) : navigate(`/${path.HOME}`)
                } else Swal.fire('Login failed, please try again!', rs.message, 'error')
            }
        }
    }, [payload, isRegister])

    const finalRegister = async () => {
        const response = await apiFinalRegister(token)
        console.log(response)
        if (response.success) {
            Swal.fire('Congratulations!', response.mes, 'success').then(() => {
                setIsRegister(false);
                resetPayload();
            })
        } else Swal.fire('Oops!', response.message, 'error')
        setIsVerifiedEmail(false)
        setToken('')
    }
    return (
        <div className="w-full mb-16 relative ">
            {isForgotPassword &&
                <div className="h-[51px] bg-main flex justify-center items-center mb-16">
                    <div className="w-main flex justify-between text-white">
                        <h3 className='font-semibold capitalize'>Forgot password</h3>
                        <BreadCrumb category={location?.pathname?.replace('/', '')?.split('-')?.join(' ')} />
                    </div>
                </div>}
            {isRegister &&
                <div className="h-[51px] bg-main flex justify-center items-center mb-16">
                    <div className="w-main flex justify-between text-white">
                        <h3 className='font-semibold capitalize'>Register </h3>
                        <BreadCrumb category={location?.pathname?.replace('/', '')?.split('-')?.join(' ')} />
                    </div>
                </div>}
            {!isForgotPassword && !isRegister &&
                <div className="h-[51px] bg-main flex justify-center items-center mb-16">
                    <div className="w-main flex justify-between text-white">
                        <h3 className='font-semibold capitalize'>{location?.pathname?.replace('/', '')?.split('-')?.join(' ')}</h3>
                        <BreadCrumb category={location?.pathname?.replace('/', '')?.split('-')?.join(' ')} />
                    </div>
                </div>}
            <div className="w-[400px] m-auto relative">
                {isVerifiedEmail &&
                    <div className="absolute  top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,0.7)] z-50 flex flex-col items-center justify-center ">
                        <div className="bg-white p-8 rounded-md">
                            <h4 className="">Please check your mail and enter code:</h4>
                            <input
                                type="text"
                                value={token}
                                onChange={e => setToken(e.target.value)}
                                className="p-2 border rounded-md outline-none" />
                            <button
                                type="button"
                                className="px-4 py-2 bg-main text-white font-semibold rounded-md ml-4"
                                onClick={finalRegister}>
                                Submit
                            </button>
                        </div>
                    </div>}
                {isForgotPassword &&
                    <div className="absolute top-0 left-0 right-0 bottom-0 bg-white z-50 flex justify-center items-center">
                        <div className="flex flex-col gap-4 border p-4 items-center ">
                            <img src={logo} className=" w-[130px] object-contain" />
                            <div className="flex gap-4 pb-2">
                                <div onClick={() => setIsForgotPassword(false)} className="cursor-pointer"><IoMdArrowRoundBack color='red' size={24} /></div>
                                <div className="flex flex-col gap-4">
                                    <span className="text-lg font-normal text-center ">Enter your email</span>
                                    <div className="flex flex-col w-full">
                                        <input
                                            placeholder="Type here..."
                                            type="text" id="email"
                                            className="px-4 py-2 w-[300px] outline-none"
                                            value={email}
                                            onChange={e => setEmail(e.target.value)} />
                                    </div>
                                    <div>
                                        <Button fw handleOnClick={handleForgotPassword}>Submit</Button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>}
                <div className=" p-6 bg-white flex flex-col items-center rounded-md border">
                    <img src={logo} className=" w-[130px] object-contain mb-4" />
                    {isRegister && <InputField
                        value={payload.name}
                        setValue={setPayload}
                        nameKey='name'
                        invalidFields={invalidFields}
                        setInvalidFields={setInvalidFields}
                    />}
                    {isRegister && <InputField
                        value={payload.phoneNumber}
                        setValue={setPayload}
                        nameKey='phoneNumber'
                        invalidFields={invalidFields}
                        setInvalidFields={setInvalidFields}
                    />}
                    <InputField
                        value={payload.email}
                        setValue={setPayload}
                        nameKey='email'
                        invalidFields={invalidFields}
                        setInvalidFields={setInvalidFields}
                    />
                    <InputField
                        value={payload.password}
                        setValue={setPayload}
                        nameKey='password'
                        type='password'
                        invalidFields={invalidFields}
                        setInvalidFields={setInvalidFields}
                    />
                    <Button handleOnClick={handleSubmit}
                        fw>
                        {isRegister ? 'Register' : 'Login'}

                    </Button>
                    <div className="flex items-center justify-between my-w w-full mt-2">
                        {!isRegister &&
                            <span
                                className="text-blue-500 hover:underline cursor-pointer "
                                onClick={() => setIsForgotPassword(true)}>
                                Forgot your password?</span>}
                        {isRegister &&
                            <span
                                className="text-blue-500 hover:underline cursor-pointer "
                                onClick={() => navigate(`/`)}>
                                Go Home?</span>}
                        <div >
                            {!isRegister && <span
                                className="text-blue-500 hover:underline cursor-pointer mt-4"
                                onClick={() => { setIsRegister(true) }}
                            >Create Acount</span>}
                            {isRegister && <span
                                className="text-blue-500 hover:underline cursor-pointer mt-2"
                                onClick={() => { setIsRegister(false) }}
                            >Sign in</span>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login