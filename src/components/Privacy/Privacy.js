"use client";

import config from '../../../config';
import React, { useState, useEffect } from 'react';


function Privacy() {
    const { privacyUrl } = config;

    const [privacyData, setPrivacyData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(privacyUrl)
            .then((response) => response.json())
            .then((data) => setPrivacyData(data))
            .catch((error) => {
                console.error('Error fetching Story data:', error);
                setError(error.message);
            });
    }, []);
    return privacyData ? (
        <section className="bg-pink mt-4">
            <div className="max-w-[800px] mx-auto py-[35px] px-[20px]">
                <h2 className="text-[44px] text-center font-bold mb-[35px]">{privacyData.title}</h2>

                <div className="space-y-[30px]">
                    <div>
                        <h3 className="text-[16px] font-bold mb-1">{privacyData.effectiveTitle}</h3>
                        <p>{privacyData.effectiveText}</p>
                    </div>

                    {privacyData.sections.map((section, index) => (
                        <div key={index} className=" text-[16px]">
                            <h3 className=" font-bold mb-[1px]">{index + 1}. {section.title}</h3>
                            <p className="text-gray leading-[25px] mb-[3px]">{section.content}</p>

                            {section.items && section.items.length > 0 ? (
                                <div className="text-gray ml-[15px] leading-[23px]">
                                    {section.items.map((item, itemIndex) => (
                                        <ul className="mb-[7px]" key={itemIndex}>
                                            {item.type ? `${item.type}.` : ''} {item.title}
                                            {item.subItems.map((subItem, subItemIndex) => (
                                                <li key={subItemIndex} className="ml-[30px] list-disc">{subItem}</li>
                                            ))}
                                        </ul>
                                    ))}
                                </div>
                            ) : section.subSections && section.subSections.length > 0 ? (
                                <ul className="text-gray ml-[25px]  leading-[23px] space-y-[3px]">
                                    {section.subSections.map((subSection, subSectionIndex) => (
                                        <li key={subSectionIndex} className="list-disc">{subSection}</li>
                                    ))}
                                </ul>
                            ) : null}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    ) : null;
}

export default Privacy;
