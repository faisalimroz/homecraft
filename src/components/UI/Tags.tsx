import { useCategoriesNameQuery } from '@/redux/api/categoryApi';
import Link from 'next/link';
import React from 'react';

const Tags = () => {
    const {data}:any = useCategoriesNameQuery(undefined);
 
    const categories = data?.data;
    // console.log(categories)

    return (
        <div>
              <div className="mb-6">
              <h4 className="text-lg font-semibold mb-4">Tags</h4>
              <ul className="flex flex-wrap space-x-2">
                {
                    categories?.map((category:any)=>{
                        return (
                            <li key={category?.id}>
                            <Link
                              href={`/blogs?categoryId=${category?.id}`}
                              className=" bg-[#f8fcfd] hover:bg-[#4f46e5] text-sm text-gray-700 hover:text-white px-3 py-3 rounded"
                            >
                             {category?.name}
                            </Link>
                          </li>
                        )
                    })
                }
              
                
              </ul>
            </div>
        </div>
    );
};

export default Tags;