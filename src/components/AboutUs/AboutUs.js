"use client";

import config from '../../../config';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const AboutUs = () => {
    const { aboutUsUrl } = config;
    const [aboutUsData, setAboutUsData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(aboutUsUrl)
            .then((response) => response.json())
            .then((data) => setAboutUsData(data))
            .catch((error) => {
                console.error('Error fetching About Us data:', error);
                setError(error.message);
            });
    }, []);

    return aboutUsData ? (
        <section className="bg-pink mt-4">
            <div className="flex flex-col md:flex-row items-center justify-between px-2 lg:px-0 py-[40px] md:py-[50px] max-w-[860px] mx-auto gap-4">
                <div className="flex flex-col md:w-[550px] mx-4 md:mx-0">
                    <h1 className="text-gray font-semibold mb-2 md:text-left text-center">{aboutUsData.heading}</h1>
                    <div className="md:hidden block relative w-[261px] h-[261px] md:ml-[30px] mx-auto mb-[20px]">
                        <Image
                            src={aboutUsData.imageUrl}
                            alt={aboutUsData.alt}
                            layout="fill"
                            objectFit="cover"
                            className=" w-full max-w-[300px] lg:max-w-[340px] h-auto object-cover rounded-[3px]"
                        />
                    </div>
                    <p className="text-gray font-normal text-[18px] w-full sm:max-w-[580px]">{aboutUsData.description}</p>
                </div>

                <div className="md:block hidden relative w-[261px] h-[261px] md:ml-[30px]">
                    <Image
                        src={aboutUsData.imageUrl}
                        alt={aboutUsData.alt}
                        layout="fill"
                        objectFit="cover"
                        className="w-full max-w-[300px] lg:max-w-[340px] h-auto object-cover rounded-[3px]"
                    />
                </div>

            </div>
        </section>
    ) : null;
};

export default AboutUs;
