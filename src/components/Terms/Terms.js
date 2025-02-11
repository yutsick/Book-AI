"use client";

import config from '../../../config';
import React, { useState, useEffect } from 'react';


function Terms() {
    const { termsUrl } = config;

    const [termsData, setTermsData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(termsUrl)
            .then((response) => response.json())
            .then((data) => setTermsData(data))
            .catch((error) => {
                console.error('Error fetching Story data:', error);
                setError(error.message);
            });
    }, []);
    return termsData ? (
        <section className="bg-pink mt-4">
            <div className="max-w-[800px] mx-auto py-[35px] px-[20px]">
                <h2 className="text-[44px] text-center font-bold mb-[35px]">{termsData.title}</h2>

                <div className="space-y-[30px]">
                    <div>
                        <h3 className="text-[16px] font-bold mb-1">{termsData.effectiveTitle}</h3>
                        <p>{termsData.effectiveText}</p>
                    </div>

                    {termsData.sections.map((section, index) => (
                        <div key={index} className="text-[16px] text-gray">
                            <h3 className=" font-bold mb-[3px]">{index + 1}. {section.title}</h3>
                            <p className=" leading-[25px] mb-[4px]">{section.content}</p>
                            {section.subSections && section.subSections.length > 0 && (
                                <ul className="ml-[25px] leading-[23px] space-y-[8px]">
                                    {section.subSections.map((subItem, subIndex) => (
                                        <li key={subIndex} className="list-disc">{subItem}</li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            );
        </section>
    ) : null;
}

export default Terms;
