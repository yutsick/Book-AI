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
  return (
    <div className="w-full">
      <h1 className="text-xl md:text-2xl font-bold text-center mb-6">Orders Summary</h1>
      
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border border-gray-300 text-left font-bold sticky left-0 bg-gray-100">
                Order Number
              </th>
              <th className="px-4 py-2 border border-gray-300 text-left">Order Date</th>
              <th className="px-4 py-2 border border-gray-300 text-left">Author Name</th>
              <th className="px-4 py-2 border border-gray-300 text-left">Book Name</th>
              <th className="px-4 py-2 border border-gray-300 text-left">Total Paid</th>
              <th className="px-4 py-2 border border-gray-300 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={index} className="even:bg-gray-50">
                <td className="px-4 py-2 border border-gray-300 font-bold sticky left-0 bg-white">
                  {order.orderNumber}
                </td>
                <td className="px-4 py-2 border border-gray-300">{order.orderDate}</td>
                <td className="px-4 py-2 border border-gray-300">{order.author}</td>
                <td className="px-4 py-2 border border-gray-300">{order.bookName}</td>
                <td className="px-4 py-2 border border-gray-300">{order.totalPaid}</td>
                <td className="px-4 py-2 border border-gray-300">{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersSummary;
