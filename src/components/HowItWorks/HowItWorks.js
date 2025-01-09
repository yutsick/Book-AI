"use client";

import config from '../../../config';
import React, { useState, useEffect } from 'react';
import WorkCard from './WorkCard';


function HowItWorks() {
  const { howItWorksUrl } = config;

  const [worksData, setWorksData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(howItWorksUrl)
      .then((response) => response.json())
      .then((data) => setWorksData(data))
      .catch((err) => {
        console.error('Error fetching How It Works data:', err);
        setError('Failed to load How It Works data.');
      });
  }, []);
  return worksData?.cards?.length ? (
    <div>
      <div className="w-full max-w-[1260px] mx-auto px-10 section-py" id="how-it-works">
        <h2 className="text-title text-center">{worksData.title}</h2>
        <div className="mt-12 md:mt-[72px] grid grid-cols-1 lg:grid-cols-3 gap-y-[20px] justify-items-center max-w-[1140px] w-full mx-auto md:px-8">
          {worksData.cards.map((card, index) => (
            <React.Fragment key={index}>
              <WorkCard
                card={card}
                stepNumber={index + 1}
              />
              {index < worksData.cards.length - 1 && (
                <div className="md:hidden mx-auto">
                  <svg width="37" height="33" viewBox="0 0 37 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3.20399 14.3884L36.4333 14.3887L19.9333 29.3882L3.20399 14.3884Z" fill="#FF9854" fillOpacity="0.42" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M36.0179 14.9602C37.1825 15.9627 37.1825 17.5882 36.0179 18.5907L20.5545 31.902C19.9952 32.3835 19.2366 32.6539 18.4457 32.6539C17.6548 32.6539 16.8962 32.3835 16.3369 31.902L0.873558 18.5907C-0.291168 17.5882 -0.291168 15.9627 0.873558 14.9602C2.03828 13.9576 3.44902 14.8882 4.61371 15.8907L18.4457 28.3904L32.6137 15.8904C33.7783 14.8878 34.8533 13.9576 36.0179 14.9602Z" fill="#FF9854" />
                  </svg>
                </div>
              )}
            </React.Fragment>
          ))}


        </div>
      </div>

    </div>
  ) : null;
}

export default HowItWorks
