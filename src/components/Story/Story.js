"use client";

import config from '../../../config';
import React, { useState, useEffect } from 'react';
import StoryCard from './StoryCard';


function Story() {
    const { storyUrl } = config;

    const [storyData, setStoryData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(storyUrl)
            .then((response) => response.json())
            .then((data) => setStoryData(data))
            .catch((error) => {
                console.error('Error fetching Story data:', error);
                setError(error.message);
            });
    }, []);
    return storyData ? (
        <div className="min-h-screen relative">
            <div
                className="absolute inset-0 bg-gradient-to-b from-white to-[#F0ECE2]"
            ></div>

            <div
                style={{
                    backgroundImage: `url('${storyData.backgroundUrl}')`,
                    backgroundPosition: 'center',
                    backgroundSize: 'contain',
                }}
                className="absolute inset-0 bg-contain bg-center bg-no-repeat hidden md:block"
            ></div>

            <div className="relative z-10 w-full max-w-[950px] mx-auto px-4 md:px-5 py-10">
                <h2 className="text-gray text-center text-[30px] md:text-[45px] leading-[55px] font-semibold mb-10">{storyData.title}</h2>
                <div className="grid grid-cols-1 gap-x-[40px] gap-y-[50px] sm:gap-y-[60px] justify-items-center w-full mx-auto">
                    {storyData.cards.map((card, index) => (
                        <StoryCard
                            card={card}
                            key={index}
                            index={index}
                            isEven={index % 2 === 1}
                        />
                    ))}
                </div>
            </div>
        </div>
    ) : null;
}

export default Story;
