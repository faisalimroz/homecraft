"use client";
import BreadcrumbBar from "@/components/UI/BreadcrumbBar";
import Comment from "@/components/UI/Comment";
import CommentCard from "@/components/UI/CommentCard";
import LatestNews from "@/components/UI/LatestNews";
import Loader from "@/components/UI/Loader";
import SimilarArticle from "@/components/UI/SimilarArticle";
import Tags from "@/components/UI/Tags";
import { useBlogQuery } from "@/redux/api/blogApi";
import Link from "next/link";
import React from "react";


const Main = ({id}:any) => {
  const { data, isLoading } = useBlogQuery(id);
  const blog = data?.data;
  const categoryId = blog?.categoryId;
  // console.log(categoryId);

  if (isLoading) {
    return <Loader />;
  }
  return (
    <div>
     
      <div className="mx-auto px-6 md:px-[7rem] py-6">
        <div className="flex flex-wrap lg:flex-nowrap pb-4">
          <div className="lg:w-2/3 w-full mb-8 lg:mb-0 md:h-[1560px] overflow-y-auto scrollbar-hide">
            <div className="mb-6">
              <p className="inline-block bg-[#f8fcfd] hover:bg-[#4f46e5] text-sm text-[#4f46e5] hover:text-white px-3 py-3 rounded my-4">
                {blog?.category?.categoryName}
              </p>

              <h3 className="text-3xl font-bold mb-4">{blog?.title}</h3>
              <div className="flex items-center space-x-4 text-gray-500 mb-4">
                <span>
                  <i className="feather-calendar mr-1"></i>{" "}
                  {new Date(blog?.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
                <div className="flex items-center space-x-2">
                  <img
                    src={blog?.provider?.profileImg[0]}
                    alt="Post Author"
                    className="w-8 h-8 rounded-full"
                  />
                  <span>{blog?.provider?.role}</span>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <img
                className="w-full h-auto md:h-[400px] rounded-lg mb-4"
                src={blog?.blogImg[0]}
                alt="Post Image"
              />
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p className="text-justify">{blog?.content}</p>
              </div>
            </div>

            <Tags />

            <CommentCard blogId={id} />

            <Comment blogId={id} />
          </div>

          <div className="lg:w-1/3 w-full lg:pl-8 md:h-[1560px] overflow-y-auto scrollbar-hide">
            <div className=" bg-[#f8fcfd] p-4 rounded-lg shadow-sm mb-6 mt-4">
              <h4 className="text-2xl font-semibold mb-6">About Me</h4>
              <img
                src={blog?.provider?.profileImg[0]}
                alt="User"
                className="w-full h-auto md:h-[250px]  rounded-lg mb-4"
              />
              <p className="text-gray-700 mb-6 text-justify">
               {blog?.provider?.bio}
              </p>
              <Link
                href={`/provider-details/${blog?.provider?.id}`}
                className="text-indigo-600 border border-indigo-600 bg-white hover:bg-indigo-600 hover:text-white inline-flex  items-center justify-center px-4 py-2 rounded-md text-md border border-[#4f46e5]"
              >
                About Author
              </Link>
            </div>

            <SimilarArticle categoryId={categoryId} blogId={id} />

            <LatestNews blogId={id} />

            <div className=" bg-[#f8fcfd] p-4 rounded-lg shadow-sm">
              <h4 className="text-lg font-semibold mb-4">Archives</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    href={{
                      pathname: "/blogs",
                      query: {
                        month: new Date(blog?.createdAt).toLocaleDateString(
                          "en-US",
                          { month: "long" }
                        ),
                        year: new Date(blog?.createdAt).toLocaleDateString(
                          "en-US",
                          { year: "numeric" }
                        ),
                      },
                    }}
                    className="text-gray-500 hover:underline"
                  >
                    {new Date(blog?.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                    })}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
