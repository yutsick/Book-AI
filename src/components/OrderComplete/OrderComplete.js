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
                        <h2 className="text-[23px] md:text-[34px] leading-[23px] md:leading-[38px] font-semibold text-gray mb-[20px] inline-flex items-center gap-2 xs:gap-3">
                            <svg className="w-[34px] h-[34px] md:w-[47px] md:h-[47px]" viewBox="0 0 53 54" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="26.2677" cy="27.0001" r="26.2677" fill="#EAAC00" />
                                <path d="M10.875 28.8347L21.3058 39.647" stroke="white" strokeWidth="5.97861" strokeLinecap="round" />
                                <path d="M42.1235 17.9422L22.0665 39.0763" stroke="white" strokeWidth="5.97861" strokeLinecap="round" />
                            </svg>
                            {orderCompleteData.heading}
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
