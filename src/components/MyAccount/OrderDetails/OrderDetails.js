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
    <div className="w-full bg-[#F9F6EB] shadow-detailsShadow p-4 md:pt-4 md:pr-3 md:pb-[68px] ">
      <h1 className="text-xl md:text-[23px] font-bold text-center mb-6">
        Details for Order #{orderDetails.orderId}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:px-24 text-dark">
        {/* Ordered Item */}
        <div className="flex-1 ">
          <h2 className="font-semibold text-base md:text-[18px] mb-2">Ordered Item</h2>
          <div className="flex items-center gap-2 text-base leading-[22px]">
            <img
              src={orderDetails.orderedItem.image}
              alt="Book Cover"
              className="w-16 h-auto md:w-24 max-w-[72px]"
            />
            <p className="min-w-[50px]">x {orderDetails.orderedItem.quantity}</p>
            <div className="w-fit text-[14px] md:text-base">
              <p className="font-semibold">{orderDetails.orderedItem.author}</p>
              <p className="italic leading-[18px] font-medium">{orderDetails.orderedItem.title}</p>
              
            </div>
          </div>
        </div>

        {/* Payment Summary */}
        <div className="flex-1 md:mt-0 md:ml-28">
          <h2 className="font-semibold text-base md:text-[18px] mb-4">Payment Summary</h2>
          <div className="">
            {Object.entries(orderDetails.paymentSummary).map(([key, value]) => (
              <div key={key} className="flex justify-between text-dark/70 font-medium text-[13px]">
                <span className="capitalize">{key.replace(/([A-Z])/g, " $1")}</span>
                <span>{value}</span>
              </div>
            ))}
          </div>
          <button className="mt-2 py-0 px-2 w-auto border-2 border-dark/50 font-medium rounded-md text-dark/70 text-[13px] ">
            View My Receipt
          </button>
        </div>
      </div>

      <hr className="my-6 md:mx-32 border-0 h-[0.5px] bg-dark/50" />

      <div className=" w-full leading-[17px] md:mt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">

          <div className="md:pl-24 leading-[27px]">
            <h2 className="font-semibold text-base md:text-[18px] text-dark ">Order date</h2>
            <p className="text-[14px] md:text-base text-dark font-medium">Jan 5, 2025</p>
            <h2 className="md:mt-10 font-semibold text-base md:text-[18px] text-dark  ">Status</h2>
            <p className="text-[14px] md:text-base text-dark font-medium">Processing</p>


            <div className="text-left">
              <h2 className="md:mt-9 mt-6 font-semibold text-base md:text-[18px] text-dark">Need More Copies?</h2>
              <p className="mb-4 text-[14px] md:text-base text-dark font-medium">
                Place a new order if you’d like more copies of your book!
              </p>
              <button className="py0 px-2 border border-black w-auto bg-orange text-white font-semibold rounded">
                Reorder My Book &raquo;
              </button>
            </div>
          </div>
              <hr className="md:hidden my-1 border-0 h-[0.5px] bg-dark/50" />
          <div>
            <div className="md:pr-8 gap-[11px] flex flex-col md:ml-28">
              <div className="flex justify-between">
                <h2 className="font-semibold text-base md:text-[18px] leading-[27px] text-dark  flex items-center">
                  Shipment Information
                </h2>
                <button>

                <img src="images/icon-edit.svg" alt="" />
                </button>
              </div>
              <div className="text-[13px] font-semibold text-dark">
                <p className="">Recipient Name</p>
                <p className="text-dark/70">Ashley Brook</p>
              </div>
              <div className="text-[13px] font-semibold text-dark">
                <p className="">Address</p>
                <p className="text-dark/70">123 Main Street, New York, NY, 10001</p>
              </div>
              <div className="text-[13px] font-semibold text-dark">
                <p className="text-dark">Shipping Method</p>
                <p className="text-dark/70">Standard</p>
              </div>
          
              <h2 className="text-center md:text-left font-semibold text-base md:text-[18px] text-dark md:mt-[10px] ">Delivery Status update</h2>
           
            </div>
            <div className="md:-mt-6">
                 <ProgressBar
                progressStep={1.5}
                currentStep={1}
                totalSteps={4}
                stepsName={stepsName}
                isMobile={false}
                myAccount={true}
              />
            </div>
          </div>
        </div>
      </div>



    </div>
  );
};

export default OrderDetails;
