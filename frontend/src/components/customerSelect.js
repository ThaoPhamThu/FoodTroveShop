import React, { memo } from 'react'
import Select from 'react-select';
import clsx from 'clsx'

const CustomerSelect = ({ label, placeholder, onChange, options = [], value, className, wrapClassname, defaultValue }) => {
    return (
        <div className={clsx(wrapClassname)}>
            {label && <h3 className='font-medium'>{label}</h3>}
            <Select
                placeholder={placeholder}
                options={options}
                value={value}
                defaultValue={defaultValue}
                isSearchable
                onChange={val => onChange(val)}
                formatOptionLabel={(option) => (
                    <div className='flex text-black items-center gap-2'>
                        <span>{option.label}</span>
                    </div>
                )}
                className={{ control: () => clsx('border-2 py-1', className) }} />
        </div>
    )
}

export default memo(CustomerSelect)