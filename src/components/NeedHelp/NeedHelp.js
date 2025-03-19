"use client";

import config from '../../../config';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

function NeedHelp() {
    const { needHelpUrl } = config;

    const [needHelpData, setNeedHelpData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(needHelpUrl)
            .then((response) => response.json())
            .then((data) => setNeedHelpData(data))
            .catch((error) => {
                console.error('Error fetching Need Help data:', error);
                setError(error.message);
            });
    }, []);
    return needHelpData ? (
        <section className="w-full max-w-[840px] pb-[40px] md:pb-[60px] pt-[20px] md:pt-[40px] mx-auto px-[18px]">
            <div className="mb-[60px]" >
                <h2 className="font-bold text-[20px] md:text-[24px] leading-[26px] mb-[10px] text-gray" >{needHelpData.title}</h2>
                <p className="text-gray font-medium text-[16px] mb-[12px]">{needHelpData.text1}</p>
                <Link
                    className="w-full max-w-[165px] h-[32px] flex justify-center items-center border-[1px] border-gray text-[#464646] font-medium text-[15px] rounded-[3px] gap-1 group ] transition hover:bg-gray hover:text-white"
                    href="/contact-us"
                >

                    <span className='mb-[2px]'>{needHelpData.buttonText1}</span>
                    <span className='group-hover:translate-x-1.5 transition'>
                        <svg className="w-[14px] h-[11px] md:w-[16px] md:h-[13px] hover:text-white" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_0_615)">
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M1.82983 0.670075C2.29032 0.209585 3.03692 0.209585 3.49741 0.670073L9.61156 6.78422C9.83269 7.00535 9.95692 7.30528 9.95692 7.618C9.95692 7.93074 9.83269 8.23067 9.61156 8.4518L3.49741 14.5659C3.03692 15.0265 2.29032 15.0265 1.82983 14.5659C1.36934 14.1054 1.36934 13.3589 1.82983 12.8984L7.11019 7.618L1.82983 2.33765C1.36934 1.87716 1.36934 1.13056 1.82983 0.670075Z"
                                    fill="black"
                                    className="group-hover:fill-white"
                                />
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M8.9938 0.670075C9.45429 0.209585 10.2009 0.209585 10.6614 0.670073L16.7755 6.78422C16.9966 7.00535 17.1208 7.30528 17.1208 7.618C17.1208 7.93074 16.9966 8.23067 16.7755 8.4518L10.6614 14.5659C10.2009 15.0265 9.45429 15.0265 8.9938 14.5659C8.53332 14.1054 8.53332 13.3589 8.9938 12.8984L14.2742 7.618L8.9938 2.33765C8.53332 1.87716 8.53332 1.13056 8.9938 0.670075Z"
                                    fill="black"
                                    className="group-hover:fill-white"
                                />
                            </g>
                            <defs>
                                <clipPath id="clip0_0_615">
                                    <rect width="17.0323" height="15.7221" fill="black" transform="translate(0.648438 0.193359)" />
                                </clipPath>
                            </defs>
                        </svg>

                    </span>
                </Link>
            </div>
            <div>
                <p className="text-gray font-medium text-[16px] mb-[18px] text-center md:text-start" >{needHelpData.text2}</p>
                <div className=" flex justify-center md:justify-start">
                    <Link
                        className="w-full max-w-[220px] h-[32px] flex justify-center items-center border border-gray text-[#464646] font-medium text-[15px] rounded-[3px] gap-1 group transition hover:bg-gray hover:text-white"
                        href="/"
                    >

                        <span className='mb-[2px]'>{needHelpData.buttonText2}</span>
                        <span className='group-hover:translate-x-1.5 transition'>
                            <svg className="w-[14px] h-[11px] md:w-[16px] md:h-[13px] hover:text-white" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clipPath="url(#clip0_0_615)">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M1.82983 0.670075C2.29032 0.209585 3.03692 0.209585 3.49741 0.670073L9.61156 6.78422C9.83269 7.00535 9.95692 7.30528 9.95692 7.618C9.95692 7.93074 9.83269 8.23067 9.61156 8.4518L3.49741 14.5659C3.03692 15.0265 2.29032 15.0265 1.82983 14.5659C1.36934 14.1054 1.36934 13.3589 1.82983 12.8984L7.11019 7.618L1.82983 2.33765C1.36934 1.87716 1.36934 1.13056 1.82983 0.670075Z" fill="black"
                                        className="group-hover:fill-white" />
                                    <path fillRule="evenodd" clipRule="evenodd" d="M8.9938 0.670075C9.45429 0.209585 10.2009 0.209585 10.6614 0.670073L16.7755 6.78422C16.9966 7.00535 17.1208 7.30528 17.1208 7.618C17.1208 7.93074 16.9966 8.23067 16.7755 8.4518L10.6614 14.5659C10.2009 15.0265 9.45429 15.0265 8.9938 14.5659C8.53332 14.1054 8.53332 13.3589 8.9938 12.8984L14.2742 7.618L8.9938 2.33765C8.53332 1.87716 8.53332 1.13056 8.9938 0.670075Z" fill="black"
                                        className="group-hover:fill-white" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_0_615">
                                        <rect width="17.0323" height="15.7221" fill="black" transform="translate(0.648438 0.193359)" />
                                    </clipPath>
                                </defs>
                            </svg>

                        </span>
                    </Link>
                </div>
            </div>
        </section>
    ) : null;
}

export default NeedHelp;
