"use client";

import config from '../../../config';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const OrderStatusInfo = () => {
    const { orderStatusInfoUrl } = config;
    const [orderStatusInfoData, setOrderStatusInfoData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(orderStatusInfoUrl)
            .then((response) => response.json())
            .then((data) => setOrderStatusInfoData(data))
            .catch((error) => {
                console.error('Error fetching Order Status Info data:', error);
                setError(error.message);
            });
    }, []);

    return orderStatusInfoData ? (
        <section className="w-full h-full " style={{
            background: "linear-gradient(211.86deg, #E1E0E1 7.41%, rgba(189, 219, 227, 0) 41.47%, #EBC0C4 90.12%), linear-gradient(255.39deg, #CFDEE2 11.92%, rgba(247, 188, 173, 0.87) 41.9%, rgba(189, 219, 227, 0.84) 60.13%)"
        }}>
            <div className="max-w-[1050px] mx-auto py-[40px] md:py-[60px]">
                <h2 className="text-[20px] md:text-[24px] font-bold text-gray text-center max-w-[540px] md:max-w-[660px] mx-auto">
                    {orderStatusInfoData.title}
                </h2>

                <ul className="flex justify-center items-end md:items-end gap-x-[9px] sm:gap-x-[25px] gap-y-[35px] md:gap-y-[45px] mt-[40px] mb-[40px] md:mb-[60px] opacity-80">
                    <li>
                        <img
                            src={orderStatusInfoData.processingUrl}
                            alt={orderStatusInfoData.processingAlt}
                            className=" w-full max-w-[50px] sm:max-w-[100px] md:max-w-[120px] h-auto mx-auto"
                        />
                        <div className="text-[15px] sm:text-[18px] md:text-[23px] font-bold text-[#606061] mt-[15px] text-center" >{orderStatusInfoData.processingText}</div>
                    </li>
                    <li className="w-full max-w-[30px] sm:max-w-[50px] md:max-w-[100px] h-[3px] sm:h-[4px] bg-[#606061] rounded-[5px] my-auto"></li>
                    <li>
                        <img
                            src={orderStatusInfoData.printingUrl}
                            alt={orderStatusInfoData.printingAlt}
                            className=" w-full max-w-[60px] sm:max-w-[110px] md:max-w-[130px] h-auto mx-auto"
                        />
                        <div className="text-[15px] sm:text-[18px] md:text-[23px] font-bold text-[#606061] mt-[15px] text-center" >{orderStatusInfoData.printingText}</div>
                    </li>
                    <li className="w-full max-w-[30px] sm:max-w-[50px] md:max-w-[100px] h-[3px] sm:h-[4px] bg-[#606061] rounded-[5px] my-auto"></li>
                    <li>
                        <img
                            src={orderStatusInfoData.shippingUrl}
                            alt={orderStatusInfoData.shippingAlt}
                            className=" w-full max-w-[80px] sm:max-w-[130px] md:max-w-[150px] h-auto mx-auto"
                        />
                        <div className="text-[15px] sm:text-[18px] md:text-[23px] font-bold text-[#606061] text-center" >{orderStatusInfoData.shippingText}</div>
                    </li>
                </ul>

                <a
                    className="w-full max-w-[260px] sm:max-w-[355px] h-[50px] mx-auto flex justify-center items-center bg-orange text-white font-semibold text-[16px] sm:text-[18px] rounded-[3px] gap-1 shadow-heroBtnShadow group ]"
                    href=""
                >

                    <span className='mb-[2px]'>{orderStatusInfoData.buttonText}</span>
                    <span className='group-hover:translate-x-1.5 transition'>
                        <svg className="w-[16px] h-[11px] md:w-[18px] md:h-[13px]" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_0_615)">
                                <path fillRule="evenodd" clipRule="evenodd" d="M1.82983 0.670075C2.29032 0.209585 3.03692 0.209585 3.49741 0.670073L9.61156 6.78422C9.83269 7.00535 9.95692 7.30528 9.95692 7.618C9.95692 7.93074 9.83269 8.23067 9.61156 8.4518L3.49741 14.5659C3.03692 15.0265 2.29032 15.0265 1.82983 14.5659C1.36934 14.1054 1.36934 13.3589 1.82983 12.8984L7.11019 7.618L1.82983 2.33765C1.36934 1.87716 1.36934 1.13056 1.82983 0.670075Z" fill="white" />
                                <path fillRule="evenodd" clipRule="evenodd" d="M8.9938 0.670075C9.45429 0.209585 10.2009 0.209585 10.6614 0.670073L16.7755 6.78422C16.9966 7.00535 17.1208 7.30528 17.1208 7.618C17.1208 7.93074 16.9966 8.23067 16.7755 8.4518L10.6614 14.5659C10.2009 15.0265 9.45429 15.0265 8.9938 14.5659C8.53332 14.1054 8.53332 13.3589 8.9938 12.8984L14.2742 7.618L8.9938 2.33765C8.53332 1.87716 8.53332 1.13056 8.9938 0.670075Z" fill="white" />
                            </g>
                            <defs>
                                <clipPath id="clip0_0_615">
                                    <rect width="17.0323" height="15.7221" fill="white" transform="translate(0.648438 0.193359)" />
                                </clipPath>
                            </defs>
                        </svg>

                    </span>
                </a>
            </div>
        </section >
    ) : null;
};

export default OrderStatusInfo;
