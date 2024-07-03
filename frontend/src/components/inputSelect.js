import React, { memo } from 'react'

const InputSelect = ({ value, changeValue, options }) => {
    return (
        <select className='p-2 border border-gray-700 w-full text-sm' value={value} onChange={e => changeValue(e.target.value)}>
            <option value=''>Choose</option>
            {options?.map(el => (
                <option key={el.id} value={el.value}>{el.text}</option>
            ))}
        </select>
    )
}

export default memo(InputSelect)