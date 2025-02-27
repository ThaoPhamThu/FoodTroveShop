import React, { memo } from 'react';
import usePagination from '../hooks/usePagination';
import { PagiItem } from './';
import { useSearchParams } from 'react-router-dom';

const Pagination = ({ totalCount, page }) => {
    const [params] = useSearchParams();
    const pagination = usePagination(totalCount, +params.get('page') || 1, page);
    const range = () => {
        const currentPage = +params.get('page');
        const pageSize = +page || 8;
        const start = Math.min(((currentPage - 1) * pageSize) + 1, totalCount);
        const end = Math.min(currentPage * pageSize, totalCount)
        return `${start} - ${end}`
    }
    console.log(Math.min(page, totalCount))
    return (
        <div className='flex w-full justify-between items-center'>
            {!(+params.get('page')) ? <span className='text-sm italic'>{`Show results ${Math.min(totalCount, 1)} - ${Math.min(page, totalCount)} of ${totalCount}`}</span> : ''}
            {(+params.get('page')) ? <span className='text-sm italic'>{`Show results ${range()}   of ${totalCount}`}</span> : ''}

            <div className='flex items-center'>
                {pagination?.map(el => (
                    <PagiItem key={el}>
                        {el}
                    </PagiItem>
                ))}
            </div>
        </div>
    )
}

export default memo(Pagination)