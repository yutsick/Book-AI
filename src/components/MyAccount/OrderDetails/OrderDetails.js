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
    <div className="w-full bg-[#FFFBEE] shadow-detailsShadow pt-5 pb-10 px-4 md:px-10  md:pb-4 border-[0.5px] border-[#A6A6A6] rounded-[3px]">
      <h1 className="text-[18px] font-bold text-center ">
        Order Number: <span className="font-normal">{orderDetails.orderId}</span>
      </h1>

      <div className="mt-4 flex flex-col md:flex-row  justify-between  items-center text-dark">
        {/* Ordered Item */}
        <div className="flex-1 ">
          <div className="flex items-center gap-2 text-base leading-[22px]">
            <img
              src={orderDetails.orderedItem.image}
              alt="Book Cover"
              className="w-14 h-20 md:w-14 md:h-20 max-w-[72px]"
            />
            <p className="min-w-[25px]">x {orderDetails.orderedItem.quantity}</p>
            <div className="w-fit text-[14px] md:text-base">
              <p className="font-medium">{orderDetails.orderedItem.author}</p>
              <p className="leading-[18px] ">{orderDetails.orderedItem.title}</p>

            </div>
          </div>
        </div>
        <div className="text-left  md:max-w-[238px]">
          <p className="mt-4 md:mt-2 mb-2 leading-[14px] text-[15px] md:text-base text-dark  md:leading-[18px]">
            Place a new order if you’d like more copies of your book!
          </p>
          <a className="mt-2 md:mt-6 w-fit md:f-full px-4 md:px-0 max-w-[330px] md:w-[238px] h-[50px] md:mx-auto flex md:justify-center items-center bg-orange text-white font-semibold text-[23px] rounded-[3px] gap-1 shadow-heroBtnShadow group" href="/create-book"><span className="mb-[2px]">Reorder</span>
            <span className="group-hover:translate-x-1.5 transition"><svg className="" width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg"><g clipPath="url(#clip0_0_615)"><path fillRule="evenodd" clipRule="evenodd" d="M1.82983 0.670075C2.29032 0.209585 3.03692 0.209585 3.49741 0.670073L9.61156 6.78422C9.83269 7.00535 9.95692 7.30528 9.95692 7.618C9.95692 7.93074 9.83269 8.23067 9.61156 8.4518L3.49741 14.5659C3.03692 15.0265 2.29032 15.0265 1.82983 14.5659C1.36934 14.1054 1.36934 13.3589 1.82983 12.8984L7.11019 7.618L1.82983 2.33765C1.36934 1.87716 1.36934 1.13056 1.82983 0.670075Z" fill="white"></path><path fillRule="evenodd" clipRule="evenodd" d="M8.9938 0.670075C9.45429 0.209585 10.2009 0.209585 10.6614 0.670073L16.7755 6.78422C16.9966 7.00535 17.1208 7.30528 17.1208 7.618C17.1208 7.93074 16.9966 8.23067 16.7755 8.4518L10.6614 14.5659C10.2009 15.0265 9.45429 15.0265 8.9938 14.5659C8.53332 14.1054 8.53332 13.3589 8.9938 12.8984L14.2742 7.618L8.9938 2.33765C8.53332 1.87716 8.53332 1.13056 8.9938 0.670075Z" fill="white"></path></g><defs><clipPath id="clip0_0_615"><rect width="17.0323" height="15.7221" fill="white" transform="translate(0.648438 0.193359)"></rect></clipPath></defs></svg></span></a>


        </div>

      </div>

      <hr className="my-6 border-0 h-[0.5px] bg-[#AFAFAF]" />

      <div className=" w-full leading-[17px] ">
        <div className="flex flex-col md:flex-row justify-between gap-4 md:gap-6">

          <div className="md-gap-[11px] flex flex-col order-2">

            <h2 className="font-semibold text-[18px] leading-[27px] text-dark  flex items-center">
              Details
            </h2>

            <div className="flex flex-col mt-2 md:mt-5 gap-3">
              <div className=" text-dark flex gap-2">
                <p className=" font-medium">Order date:</p>
                <p className="text-dark/70">Ashley Brook</p>
              </div>
              <div className="text-dark flex gap-2">
                <p className="font-medium">Recipient Name:</p>
                <p className="text-dark/70">Ashley Brook</p>
              </div>
              <div className="text-dark flex gap-2">
                <p className="font-medium">Address:</p>
                <p className="text-dark/70">123 Main Street, New York, NY, 10001</p>
              </div>
              <div className="text-dark flex gap-2">
                <p className="font-medium">Shipping Method:</p>
                <p className="text-dark/70">Standard</p>
              </div>
            </div>


          </div>

          {/* Payment Summary */}
          <div className="flex-[0.8] md:mt-0 order-1 md:order-2">
            <h2 className="font-semibold text-[18px] leading-[27px]">Payment Summary</h2>
            <div className="flex flex-col mt-2 md:mt-5 gap-3">
              {Object.entries(orderDetails.paymentSummary).map(([key, value]) => (
                <div key={key} className="flex justify-between ">
                  <p className="capitalize font-medium">{key.replace(/([A-Z])/g, " $1")}</p>
                  <p className="text-dark/70">{value}</p>
                </div>
              ))}
            </div>
            <button className="mt-4 px-2 py-1 w-auto border-[0.8px] border-dark/50  rounded-[3px] text-dark/70 text-[13px] ">
              View My Receipt
            </button>
          </div>
        </div>
        <div className="">
          <div className="flex flex-col items-center max-w-[390px] mx-auto">
            <h2 className="text-center md:text-left font-semibold text-[18px] leading-[27px] text-dark mt-10 md:mt-[18px] ">Status </h2>
            <div className="w-full -mt-6">
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
