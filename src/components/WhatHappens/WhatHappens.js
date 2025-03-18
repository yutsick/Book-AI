"use client";

import config from '../../../config';
import React, { useState, useEffect } from 'react';
import WhatHappensItem from './WhatHappensItem';


function WhatHappens() {
    const { whatHappensUrl } = config;

    const [whatHappensData, setWhatHappensData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(whatHappensUrl)
            .then((response) => response.json())
            .then((data) => setWhatHappensData(data))
            .catch((error) => {
                console.error('Error fetching What Happens data:', error);
                setError(error.message);
            });
    }, []);
    return whatHappensData ? (
        <section className="w-full max-w-[840px] pt-[40px] md:pt-[60px] pb-[20px] md:pb-[40px] mx-auto px-[18px]">
            <h2 className="text-gray text-[20px] md:text-[24px] leading-[26px] font-bold mb-[5px] md:mb-[15px]">{whatHappensData.title}</h2>
            <p className="text-gray text-[15px] md:text-[16px] leading-[21px] md:leading-[24px] font-medium mb-[15px]">{whatHappensData.description}</p>
            <ul className="flex flex-col gap-y-[15px] ml-[20px] text-gray text-[16px] font-medium">
                {whatHappensData.items.map((item, index) => (
                    <WhatHappensItem
                        item={item}
                        index={index}
                        key={index}
                    />
                ))}
            </ul>
        </section>
    ) : null;
}


export default WhatHappens;
