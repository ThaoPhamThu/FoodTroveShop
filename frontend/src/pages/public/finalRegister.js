import React, { useEffect } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import path from '../../ultils/path'
import Swal from 'sweetalert2'

const FinalRegister = () => {
    const { status } = useParams()
    const navigate = useNavigate()
    useEffect(() => {
        if (status === 'failed') Swal.fire('Oop!', 'Resgister account failed!', 'error').then(() => {
            navigate(`/${path.LOGIN}`)
        })

        if (status === 'success') Swal.fire('Congratication!', 'Resgister account successfully!', 'success').then(() => {
            navigate(`/${path.LOGIN}`)
        })
    }, [])
    return (
        <div className='h-screen w-screen bg-gray-100'></div>
    )
}

export default FinalRegister