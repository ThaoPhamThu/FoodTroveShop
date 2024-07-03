import React from 'react'
import { useSelector } from 'react-redux'
import { Product } from '../../components'

const Wishlist = () => {
    const { current } = useSelector(state => state.user)

    return (
        <div className='w-full relative px-4'>
            <header className='py-4 border-b border-b-blue-200'>
                <div className='text-3xl font-semibold'>My wishlist</div>
            </header>
            <div className='p-4 w-full grid grid-cols-3 gap-4'>
                {current?.wishlist?.map(el => (
                    <div key={el._id} className='bg-white rounded-md drop-shadow flex flex-col pt-3 gap-0'>
                        <Product
                            productData={el}
                            className='bg-white'
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Wishlist