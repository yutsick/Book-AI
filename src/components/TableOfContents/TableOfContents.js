import React from "react";

const TableOfContents = ({ contents }) => {
  return (
    <div className="pb-4 md:pt-12 md:pb-6 w-full">
      <div className="text-center text-[#404040]">
        <h1 className="text-[24px] font-bold mb-2">Contents</h1>
        <p className="text-base">240 pages</p>
      </div>
      <div className="mt-6 space-y-6">
        {contents.map((item, index) => (
          <div key={index} className="flex flex-col overflow-hidden">
            <p className="font-medium text-[#2B2B2B] w-[calc(100%-50px)] text-[17px]">{item.chapter}</p>
            <div className="flex items-end justify-between w-full">
              <div className="relative overflow-hidden flex-1">
            
                <div className="text-[15px] leading-[19px] text-black/75 break-words pr-2 relative after:content-['............................................................................................................................................................................................................'] after:text-[#7D7A78] after:ml-1 after:absolute after:whitespace-nowrap after:overflow-hidden "> {item.title}</div>
               
              </div>
              <span className="flex-shrink-0 text-[#7D7A78] text-[15px] text-right w-[30px]">
                {item.page}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableOfContents;
