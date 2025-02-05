"use client";

import config from '../../../config';
import React, { useState, useEffect } from 'react';
import WhatWeDoItem from './WhatWeDoItem';


function WhatWeDo() {
    const { whatWeDoUrl } = config;

    const [whatWeDoData, setWhatWeDoData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(whatWeDoUrl)
            .then((response) => response.json())
            .then((data) => setWhatWeDoData(data))
            .catch((error) => {
                console.error('Error fetching What We Do data:', error);
                setError(error.message);
            });
    }, []);
    return whatWeDoData ? (
        <div className="relative w-full max-w-[950px] py-8 md:py-10 mx-auto">
            <h2 className="text-gray text-[30px] md:text-[45px] text-center font-bold leading-[54px] mb-4">{whatWeDoData.title}</h2>
            <div className="flex flex-col-reverse md:flex-row justify-center items-center gap-6 px-6">
                <div className="">
                    <p className="text-gray text-left mb-4 text-[16px] md:text-[18px] leading-[25px]">{whatWeDoData.description}</p>
                    <ul className="text-gray ml-[25px] flex flex-col gap-5 text-left text-[16px] md:text-[18px] leading-[23px]">
                        {whatWeDoData.items.map((item, index) => (
                            <WhatWeDoItem
                                item={item}
                                key={index}
                            />
                        ))}
                    </ul>
                </div>
                <img
                    src={whatWeDoData.imageUrl}
                    alt={whatWeDoData.alt}
                    className="w-full max-w-[300px] lg:max-w-[340px] h-auto object-cover"
                />
            </div>
        </div>
    ) : null;
}


export default WhatWeDo;
