import React, { memo } from "react";
import clsx from 'clsx'
const InputField = ({ value, setValue, nameKey, type, invalidFields, setInvalidFields, style, fullWidth, placeholder, isHideLabel }) => {
    return (
        <div className={clsx('mb-4 flex flex-col', fullWidth && 'w-full')}>
            {!isHideLabel && <label
                className="text-[14px]"
                htmlFor={nameKey}>{nameKey.slice(0, 1).toUpperCase() + nameKey.slice(1)}</label>}
            <input
                type={type || 'text'}
                className={clsx('px-4 py-2 w-[250px]  rounded-md border my-2 placeholder:text-sm placeholder:italic outline-none', style)}
                placeholder={placeholder || nameKey.slice(0, 1).toUpperCase() + nameKey.slice(1)}
                value={value}
                onChange={e => setValue(prev => ({ ...prev, [nameKey]: e.target.value }))}
                onFocus={() => setInvalidFields && setInvalidFields([])}>
            </input>

            {invalidFields?.some(el => el.name === nameKey) && <small className="text-main italic">{invalidFields.find(el => el.name == nameKey)?.mes}</small>}

        </div>
    )
}

export default memo(InputField)