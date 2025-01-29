import React from "react";

const TableOfContents = ({ contents }) => {
  return (
    <div className="py-6">
      {/* Заголовок */}
      <div className="text-center text-[#404040]">
        <h1 className="text-[24px] font-bold mb-2">Contents</h1>
        <p className="text-base">240 pages</p>
      </div>

      {/* Список розділів */}
      <div className="mt-6 space-y-4">
        {contents.map((item, index) => (
          <div
            key={index}
            className="flex items-end justify-between gap-8"
          >
            {/* Назва розділу */}
            <div className="">
              <p className="font-medium text-[#2B2B2B] text-[17px]">{item.chapter}</p>
              <p className="text-black/75 text-[15px]">{item.title}</p>
            </div>

            {/* Лінія */}
            <div className="flex-grow border-t border-dotted border-[#7D7A78] mb-2"></div>

            {/* Номер сторінки */}
            <div className="flex-shrink-0 text-[#7D7A78] mb-0.5 w-[30px] text-right">
              {item.page}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


export default TableOfContents;
