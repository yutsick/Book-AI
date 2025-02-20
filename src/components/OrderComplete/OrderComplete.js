"use client";

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

                        <h2 className="text-[23px] md:text-[34px] leading-[23px] md:leading-[38px] font-semibold text-gray mb-[20px] text-center flex relative justify-center items-center gap-2 sm:gap-2 xs:gap-4" >
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

                    <p className="text-[15px] md:text-[20px] leading-[18px] md:leading-[28px] font-semibold text-gray text-center">{orderCompleteData.description}</p>
                    <div className="max-w-[427px] max-h-[270px] mx-auto my-[25px]">
                        <img className="rounded-[30px] md:rounded-[40px]" src={orderCompleteData.imageUrl} alt={orderCompleteData.alt} />
                    </div>
                    <p className="text-[15px] md:text-[20px] leading-[26px] md:leading-[38px] text-gray text-center font-semibold">
                        {orderCompleteData.text}<span className="inline-block ml-2 relative top-[5px]">
                            <img
                                className="max-w-[19px] md:max-w-[26px] max-h-[19px] md:max-h-[26px] object-contain"
                                src={orderCompleteData.reactionUrl}
                                alt={orderCompleteData.reactionAlt}
                            />
                        </span>
                    </p>
                </div>
            </div>
        </section>
    ) : null;
};

export default OrderComplete;
