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
                className="absolute left-[-340px] top-[-20px] md:top-[-140px] w-[900px] h-full md:w-[1150px] md:h-[900px]"
                style={{
                    backgroundImage: `url(${chooseData.backgroundUrl})`,
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center'
                }}>

            </div>
            <div className="relative w-full max-w-[1200px] py-[40px] md:py-[50px]  mx-auto">
                <h2 className="text-gray text-[30px] md:text-[45px] font-bold text-gray text-center md:text-right mb-[60px] mr-[10px]">{chooseData.title}</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[25px] gap-y-[20px] md:gap-y-[35px] auto-rows-fr justify-items-center max-w-[870px] w-full mx-auto px-4">
                    {chooseData.cards.map((card, index) => (
                        <ChooseCard
                            card={card}
                            key={index}
                        />
                    ))}
                </div>
            </div>
        </section>
    ) : null;
}


export default Choose;
