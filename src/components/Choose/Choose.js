"use client";

import config from '../../../config';
import React, { useState, useEffect } from 'react';
import ChooseCard from './ChooseCard';


function Choose() {
    const { chooseUrl } = config;

    const [chooseData, setChooseData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(chooseUrl)
            .then((response) => response.json())
            .then((data) => setChooseData(data))
            .catch((error) => {
                console.error('Error fetching Choose data:', error);
                setError(error.message);
            });
    }, []);
    return chooseData ? (
        <section className="bg-pink relative overflow-hidden pb-0 md:pb-[70px]">
            <div
                className="absolute left-[-340px] top-[-400px] md:top-[-130px] w-[900px] h-full md:w-[1400px] md:h-[930px] bg-bottom md:bg-center pointer-events-none z-[1]"
                style={{
                    backgroundImage: `url(${chooseData.backgroundUrl})`,
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                }}>

            </div>
            <div className="relative w-full max-w-[1200px] pt-[40px] md:pt-[50px] pb-[30px] md:pb-[50px]  mx-auto z-[2]">
                <h2 className="text-gray text-[30px] md:text-[45px] font-bold text-center md:text-right mb-[35px] md:mb-[60px] mr-[10px]">{chooseData.title}</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[25px] gap-y-[20px] md:gap-y-[35px] auto-rows-fr justify-items-center max-w-[870px] w-full mx-auto px-4">
                    {chooseData.cards.map((card, index) => (
                        <ChooseCard
                            card={card}
                            key={index}
                        />
                    ))}
                </div>
            </div>
            <a
                className="relative my-[40px] md:mt-6 max-w-[272px] w-full px-4 bg-orange text-white z-[2] h-[55px] mx-auto flex justify-center items-center font-semibold text-[23px] rounded-[3px] gap-1 shadow-heroBtnShadow group"
                href="/create-book"
            >
                <span className='mb-[2px]'>{chooseData.buttonText}</span>
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
        </section>
    ) : null;
}


export default Choose;
