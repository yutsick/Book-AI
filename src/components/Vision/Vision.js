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
        <section className="pt-[40px] md:pt-[50px] w-full max-w-[1000px] mx-auto px-4">
            <div className="bg-white md:bg-pink rounded-[10px] grid md:grid-cols-2 border-0 md:border-[0.7px]  border-black/10">
                <div className="p-0 md:p-4 px-0 md:px-4 mb-4 md:mb-0">
                    <h2 className="text-center text-gray mb-4 text-[30px] md:text-[45px] font-bold">{visionData.title}</h2>
                    <p className="text-gray text-[16px] leading-[23px] md:leading-[27px]">
                        {visionData.text}
                    </p>
                </div>
                    <img
                        src={visionData.imageUrl}
                        alt={visionData.alt}
                        className="w-full h-full object-cover"
                    />
            </div>
        </section>
    ) : null;
}

export default Vision;
