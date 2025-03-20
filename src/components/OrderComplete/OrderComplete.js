"use client";

import Link from 'next/link';
import Image from "next/image";
import config from '../../../config';
import { useEffect, useState } from 'react';

const OrderComplete = () => {
    const { orderCompleteUrl } = config;
    const [orderCompleteData, setOrderCompleteData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(orderCompleteUrl)
            .then((response) => response.json())
            .then((data) => setOrderCompleteData(data))
            .catch((error) => {
                console.error('Error fetching Order Complete data:', error);
                setError(error.message);
            });
    }, []);

    return orderCompleteData ? (
        <section className="bg-pink mt-4">
            <div className="max-w-[890px] mx-auto py-[40px] md:py-[60px]">
                <div className="px-[18px]">
                    <div className="flex justify-center">
                        <h2 className="text-[24px] md:text-[24px] leading-[23px] md:leading-[26px] font-semibold text-gray mb-[20px] text-center flex relative justify-center items-center gap-2 sm:gap-2 xs:gap-4" >
                            <svg className="sm:mt-0 mt-[-20px] w-[34px] h-[34px] md:w-[47px] md:h-[47px]" viewBox="0 0 53 54" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="26.2677" cy="27.0001" r="26.2677" fill="#EAAC00" />
                                <path d="M10.875 28.8347L21.3058 39.647" stroke="white" strokeWidth="5.97861" strokeLinecap="round" />
                                <path d="M42.1235 17.9422L22.0665 39.0763" stroke="white" strokeWidth="5.97861" strokeLinecap="round" />
                                <rect x="42.9648" y="19.126" width="1.52047" height="27.6651" transform="rotate(43.4258 42.9648 19.126)" fill="#EAD483" />
                                <path d="M42.5461 14.9779C42.9385 15.0131 43.3155 15.1471 43.642 15.3674L44.065 15.6528L44.1796 15.757C44.6601 16.1938 44.9857 16.775 45.1073 17.4129L45.1073 18.0045L45.0879 18.3249C45.0798 18.4599 45.054 18.5933 45.0113 18.7217L44.92 18.9964L44.7648 19.3055L44.6093 19.6163L44.3762 19.9272L43.7545 20.5489L42.6665 21.7146L41.5548 20.6085L42.819 18.828C42.9214 18.6838 42.9765 18.5112 42.9765 18.3343C42.9765 18.1536 42.9544 17.9736 42.9109 17.7983L42.8881 17.7067C42.844 17.5293 42.7873 17.3553 42.7185 17.186L41.8108 14.9537L42.2776 14.9538L42.5461 14.9779Z" fill="#EAD483" />
                                <path d="M24.0156 39.1597L25.0632 40.2236L23.8588 41.455L23.004 42.0767L22.5543 42.3265C22.3883 42.4187 22.2123 42.4916 22.0298 42.5438L21.7605 42.6207L20.75 42.6207L24.0156 39.1597Z" fill="#EAD483" />
                            </svg>
                            <span className="sm:w-full w-[214px] block " >
                                {orderCompleteData.heading}
                            </span>
                        </h2>
                    </div>

                    <p className="text-[16px] leading-[24px] font-semibold text-gray text-center">
                        {orderCompleteData.description}
                    </p>
                    <ul className="flex justify-center items-end md:items-end gap-x-[9px] sm:gap-x-[10px] gap-y-[35px] md:gap-y-[45px] mt-[40px] mb-[25px] md:mb-[45px] opacity-90">
                        <li>
                            <Image
                                src={orderCompleteData.processingUrl}
                                alt={orderCompleteData.processingAlt}
                                width={70}
                                height={70}
                                className="w-full max-w-[45px] sm:max-w-[100px] md:max-w-[100px] h-auto mx-auto"
                            />
                            <div className="text-[15px] sm:text-[17px] md:text-[17px] font-bold text-[#606061] mt-[10px] text-center">
                                {orderCompleteData.processingText}
                            </div>
                        </li>
                        <li className="w-full max-w-[30px] sm:max-w-[50px] md:max-w-[100px] h-[3px] sm:h-[4px] bg-[#606061] rounded-[5px] my-auto"></li>
                        <li>
                            <Image
                                src={orderCompleteData.printingUrl}
                                alt={orderCompleteData.printingAlt}
                                width={80}
                                height={80}
                                className="w-full max-w-[50px] sm:max-w-[110px] md:max-w-[110px] h-auto mx-auto"
                            />
                            <div className="text-[15px] sm:text-[18px] md:text-[17px] font-bold text-[#606061] mt-[12px] text-center">
                                {orderCompleteData.printingText}
                            </div>
                        </li>
                        <li className="w-full max-w-[30px] sm:max-w-[50px] md:max-w-[100px] h-[3px] sm:h-[4px] bg-[#606061] rounded-[5px] my-auto"></li>
                        <li>
                            <Image
                                src={orderCompleteData.shippingUrl}
                                alt={orderCompleteData.shippingAlt}
                                width={100}
                                height={100}
                                className="w-full max-w-[70px] sm:max-w-[130px] md:max-w-[130px] h-auto mx-auto"
                            />
                            <div className="text-[15px] sm:text-[18px] md:text-[17px] font-bold text-[#606061] mt-[2px] text-center">
                                {orderCompleteData.shippingText}
                            </div>
                        </li>

                    </ul>
                </div>
                <Link
                    className="w-full max-w-[260px] sm:max-w-[355px] h-[50px] mx-auto flex justify-center items-center bg-orange text-white font-semibold text-[16px] sm:text-[18px] rounded-[3px] gap-1 shadow-heroBtnShadow group ]"
                    href="/my-account"
                >
                    <span className='mb-[2px]'>{orderCompleteData.buttonText}</span>
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
                </Link>
            </div>
        </section>
    ) : null;
};

export default OrderComplete;
