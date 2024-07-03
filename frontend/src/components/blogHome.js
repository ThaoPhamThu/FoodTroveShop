import React, { memo, useEffect, useState } from 'react'
import { BlogCard } from '.';
import { apiGetBlogs } from '../apis/blog';

const BlogHome = () => {
    const [blogs, setBlogs] = useState(null);

    const fetchBlogs = async () => {
        const response = await apiGetBlogs({ limit: 3, page: 1 });

        if (response?.success) setBlogs(response.blogs);
    };

    useEffect(() => {
        fetchBlogs();
    }, []);

    return (
        <div className="w-main ">
            <h3 className="text-[20px] font-semibold py-[15px] border-b-2 border-main">BLOGS</h3>
            <div className="flex flex-wrap mt-[15px] mx-[-10px]">
                {blogs?.map((el) => (
                    <BlogCard bid={el._id} key={el._id} author={el.author} category={el.category} image={el.imageBlog} title={el.title} />
                ))}
            </div>
        </div>
    )
}


export default memo(BlogHome)