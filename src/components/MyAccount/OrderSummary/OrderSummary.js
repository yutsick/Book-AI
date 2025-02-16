import React from "react";

const orders = [
  {
    orderNumber: "#1012025",
    orderDate: "Jan 5, 2025",
    author: "Ashley Brooks",
    bookName: "If Only I Had 25 Hours a Day",
    totalPaid: "$49.99",
    status: "Awaiting Shipment",
  },
  {
    orderNumber: "#1390105",
    orderDate: "Feb 20, 2025",
    author: "Roman Cohen",
    bookName: "It can’t be any worse",
    totalPaid: "$79.99",
    status: "Delivered",
  },
];

const OrdersSummary = () => {
  const headers = [
    "Order Number",
    "Order Date",
    "Author Name",
    "Book Name",
    "Total Paid",
    "Status",
  ];

  const isSingleOrder = orders.length === 1;

  return (
    <div className="w-full md:px-0 px-3">
      <h1 className="text-[30px] md:text-[40px] font-bold text-center mb-5">Orders Summary</h1>

      {/* Desktop */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full border-collapse border border-dark/70">
          <thead className="bg-[#F4F4F4]">
            <tr>
              {headers.map((header, index) => (
                <th key={index} className="min-w-[140px] px-2 py-4 border border-dark/70 text-left font-bold">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={index} className="main-h-[55px] border border-dark/70 text-[15px]">
                <td className=" px-2 py-2 border border-dark/70">{order.orderNumber}</td>
                <td className=" px-2 py-1 border border-dark/70">{order.orderDate}</td>
                <td className=" px-2 py-1 border border-dark/70">{order.author}</td>
                <td className=" px-2 py-1 border border-dark/70">{order.bookName}</td>
                <td className=" px-2 py-1 border border-dark/70">{order.totalPaid}</td>
                <td className=" px-2 py-1 border border-dark/70">{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile */}
      <div className="md:hidden overflow-x-auto">
        <div className={`${isSingleOrder ? "w-full" : "w-max"}`}>
          <table className="border-collapse  w-full">
            <tbody>
              {headers.map((header, rowIndex) => (
                <tr key={rowIndex} className=" border border-dark/70 text-[15px]">
                  <td className=" min-w-[185px] px-2 py-2 font-bold sticky left-0 bg-[#F4F4F4] z-10
  before:absolute before:top-0 before:left-0 before:w-[1px] before:h-full before:bg-dark/70
  after:absolute after:top-0 after:right-0 after:w-[1px] after:h-full after:bg-dark/70">
                    {header}
                  </td>




                  {orders.map((order, colIndex) => (
                    <td
                      key={colIndex}
                      className={`  px-2 py-1 border border-dark/70 ${isSingleOrder ? "w-full" : "max-w-[160px]"
                        }`}
                    >
                      <div className="min-h-[55px] flex items-center">


                        {[
                          order.orderNumber,
                          order.orderDate,
                          order.author,
                          order.bookName,
                          order.totalPaid,
                          order.status,
                        ][rowIndex]}
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default OrdersSummary; 
