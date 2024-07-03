import React, { memo } from 'react';
import useBreadcrumbs from 'use-react-router-breadcrumbs';
import { Link } from 'react-router-dom';
import { IoIosArrowForward } from "react-icons/io";


const BreadCrumbBlog = ({ category }) => {
    const routes = [

        { path: "/blogs", breadcrumb: "Blogs" },
        { path: "/", breadcrumb: "Home" },
        { path: "/blogs/:category", breadcrumb: category },

    ]
    const breadcrumb = useBreadcrumbs(routes);
    return (
        <div className='text-sm flex items-center gap-1'>
            {breadcrumb?.filter(el => !el.match.route === false).map(({ match, breadcrumb }, index, self) => (
                <Link className='flex gap-1 items-center hover:text-gray-800' key={match.pathname} to={match.pathname}>
                    <span className='capitalize'>{breadcrumb}</span>
                    {index !== self.length - 1 && <IoIosArrowForward />}
                </Link>
            ))}
        </div>
    )
}

export default memo(BreadCrumbBlog)