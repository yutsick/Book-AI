"use client";

import config from '../../../config';
import React, { useState, useEffect } from 'react';


function JoinUs() {
    const { joinUsUrl } = config;

    const [joinUsData, setJoinUsData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(joinUsUrl)
            .then((response) => response.json())
            .then((data) => setJoinUsData(data))
            .catch((error) => {
                console.error('Error fetching Join Us data:', error);
                setError(error.message);
            });
    }, []);
    return joinUsData ? (
        <section className="bg-pink md:bg-white py-[50px]">
            <div className="  w-full max-w-[900px] mx-auto">
                <div className="px-4 max-w-[540px] md:max-w-[100%] mx-auto">
                    <h2 className="text-[30px] md:text-[45px] font-bold text-center mb-6" >{joinUsData.title}</h2>
                    <p className="text-gray text-[16px] md:text-[18px] leading-[23px] md:leading-[27px] mb-6 text-center md:text-left" >{joinUsData.text}</p>
                    <a
                        className="md:mt-6 w-full h-[50px] mx-auto flex justify-center items-center bg-orange text-white font-semibold text-[23px] rounded-[3px] gap-1 shadow-heroBtnShadow group "
                        href="/create-book"
                    >
                        <span className='mb-[2px]'>{joinUsData.buttonText}</span>
                        <span className='group-hover:translate-x-1.5 transition'>
                            <svg className='' width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
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
            </div>
        </section>
    ) : null;
}

export default JoinUs;
