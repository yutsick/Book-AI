import React from "react";
import ProgressBar from "@/components/ProgressBar/ProgressBar";

const orderDetails = {
  orderId: "1012025",
  orderedItem: {
    image: "images/my-account/book-cover.png",
    title: "If Only I Had 25 Hours a Day",
    author: "Ashley Brooks",
    quantity: 1,
  },
  paymentSummary: {
    productPrice: "$39.99",
    delivery: "$5.00",
    tax: "$2.56",
    total: "$49.99",
  },
  orderDate: "Jan 5, 2025",
  status: "Processing",
  shipmentAddress: {
    recipientName: "Ashley Brook",
    address: "123 Main Street, New York, NY, 10001",
    method: "Standard",
  },
  deliveryStatus: [
    { label: "Book Printed", completed: true },
    { label: "Shipped to Carrier", completed: false },
    { label: "In Transit", completed: false },
    { label: "Delivered", completed: false },
  ],
};

const stepsName = [
  "Book Printed ",
  "Shipped to Carrier",
  "In Transit",
  "Delivered"
];

const OrderDetails = () => {
  return (
    <div className="w-full bg-[#F9F6EB] shadow-detailsShadow  pt-4 pr-3 pb-[68px] pl-[102px]">
      <h1 className="text-xl md:text-2xl font-bold text-center mb-6">
        Details for Order #{orderDetails.orderId}
      </h1>

      {/* Контейнер для мобільної і десктопної версії */}
      <div className="flex flex-col md:flex-row md:gap-8">
        {/* Ordered Item */}
        <div className="flex-1">
          <h2 className="font-bold text-lg mb-2">Ordered Item</h2>
          <div className="flex items-center gap-4">
            <img
              src={orderDetails.orderedItem.image}
              alt="Book Cover"
              className="w-16 h-auto md:w-24 rounded-md shadow-md"
            />
            <div>
              <p className="font-bold">{orderDetails.orderedItem.author}</p>
              <p>{orderDetails.orderedItem.title}</p>
              <p className="text-gray-500">x {orderDetails.orderedItem.quantity}</p>
            </div>
          </div>
        </div>

        {/* Payment Summary */}
        <div className="flex-1 mt-6 md:mt-0">
          <h2 className="font-bold text-lg mb-2">Payment Summary</h2>
          <div>
            {Object.entries(orderDetails.paymentSummary).map(([key, value]) => (
              <div key={key} className="flex justify-between">
                <span className="capitalize">{key.replace(/([A-Z])/g, " $1")}</span>
                <span>{value}</span>
              </div>
            ))}
          </div>
          <button className="mt-4 py-2 px-4 w-full md:w-auto bg-gray-500 text-white rounded shadow hover:bg-gray-600">
            View My Receive
          </button>
        </div>
      </div>

      <hr className="my-6" />
      <div class=" w-full">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div>
            <h2 class="font-bold text-lg mb-2">Order date</h2>
            <p>Jan 5, 2025</p>
            <h2 class="font-bold text-lg mt-4 mb-2">Status</h2>
            <p>Processing</p>


            <div class="text-center md:text-left">
              <h2 class="font-bold text-lg mb-2">Reorder</h2>
              <p class="mb-4">
                Add more copies to your existing order or create a new order for the same book.
              </p>
              <button class="py-2 px-4 w-full md:w-auto bg-orange text-white font-bold rounded shadow hover:bg-orange-600">
                Reorder My Book &raquo;
              </button>
            </div>
          </div>


          <div>
            <h2 class="font-bold text-lg mb-2 flex items-center">
              Shipment Address
              <span class="ml-2 cursor-pointer text-gray-500">✏️</span>
            </h2>
            <p class="font-bold">Ashley Brook</p>
            <p>123 Main Street, New York, NY, 10001</p>
            <p>Standard</p>
            <div>
              <h2 class="font-bold text-lg mb-4">Delivery Status update</h2>
              <ProgressBar
                progressStep={1}
                currentStep={2}
                totalSteps={4}
                stepsName={stepsName}
                isMobile={false}
              />
            </div>
          </div>
        </div>





        <hr class="my-6" />



      </div>



    </div>
  );
};

export default OrderDetails;
