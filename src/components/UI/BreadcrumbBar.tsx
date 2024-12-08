import React from 'react';

const BreadcrumbBar = ({header,name,subtitle}:any) => {
  return (
    <div className="breadcrumb-bar bg-[#f8fcfd] py-4 main">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center">
          <h2 className="text-4xl font-bold mb-2"> {header}</h2>
          <nav aria-label="breadcrumb">
            <ol className="flex space-x-2 text-gray-500">
           {name && <>  <li>
                <a href="index.html" className="hover:text-gray-700">Home</a>
                <span className="mx-2">/</span>
              </li> 
              <li>
                <span aria-current="page">{name}</span>
              </li></>}
              {subtitle &&   <li className="text-gray-700">
                <span className="mx-2">/</span>
                <span aria-current="page">{subtitle}</span>
              </li>}
            
            </ol>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default BreadcrumbBar;
