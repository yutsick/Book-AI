"use client";

import config from '../../../config';
import React, { useState, useEffect } from 'react';
import HighLightCard from './HighLightCard';


function HighLights() {
  const { highLightUrl } = config;

  const [highLightsData, setHighLightsData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${highLightUrl}`)
      .then((response) => response.json())
      .then((data) => setHighLightsData(data))
      .catch((err) => {
        console.error('Error fetching How It Works data:', err);
        setError('Failed to load How It Works data.');
      });
  }, []);
  return highLightsData ? (
    <div>
      <div className="w-full max-w-[1260px] mx-auto px-10 md:px-4 section-py" id="highlights">
        <h2 className="text-title text-center">{highLightsData.title}</h2>
        <div className=" grid grid-cols-1 lg:grid-cols-3 gap-x-2 gap-y-[20px] justify-items-center max-w-[1040px] w-full mx-auto">
          {highLightsData.cards.map((card, index) => (
            <HighLightCard
              card={card}
              key={index}
            />
          )
          )}

        </div>
      </div>

    </div>
  ) : null;
}

export default HighLights
