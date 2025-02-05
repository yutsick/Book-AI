"use client";

import config from '../../../config';
import React, { useState, useEffect } from 'react';


function Vision() {
    const { visionUrl } = config;

    const [visionData, setVisionData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(visionUrl)
            .then((response) => response.json())
            .then((data) => setVisionData(data))
            .catch((error) => {
                console.error('Error fetching Vision data:', error);
                setError(error.message);
            });
    }, []);
    return visionData ? (
        <div className="py-[40px] md:py-[60px] w-full max-w-[1000px] mx-auto p-4">
            <div className="bg-white md:bg-pink rounded-[10px] grid md:grid-cols-2 gap-4 border-0 md:border-[0.7px]  border-black/10">
                <div className="flex flex-col items-center justify-start p-4">
                    <h2 className="text-gray mb-4 text-[30px] md:text-[45px] font-bold">{visionData.title}</h2>
                    <p className="text-gray text-[16px] md:text-[18px] leading-[23px] md:leading-[27px]">
                        {visionData.text}
                    </p>
                </div>
                <img
                    src={visionData.imageUrl}
                    alt={visionData.alt}
                    className="w-full h-full object-cover"
                />
            </div>
        </div>
    ) : null;
}

export default Vision;
