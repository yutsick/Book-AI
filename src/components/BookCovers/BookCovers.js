
"use client";

import Image from 'next/image';

import config from '../../../config';
import React, { useState, useEffect } from 'react';
import Widgets from './Widgets';
import Slider from '../Slider/Slider';
import Button from '../Button/Button';

const BookCovers = () => {

  const { bookCoversUrl } = config;

  const [coversData, setCoversData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(bookCoversUrl)
      .then((response) => response.json())
      .then((data) => {

        setCoversData(data)
      })
      .catch((err) => {
        console.error('Error fetching Book Covers data:', err);
        setError('Failed to load Book Covers data.');
      });
  }, []);

  const title = coversData?.title;
  const subtitle = coversData?.subtitle;
  const slidesTitle = coversData?.slidesTitle;
  const slidesSubTitle = coversData?.slidesSubTitle;
  const slides = coversData?.slides || [];
  const button = coversData?.button;

  return coversData ? (
    <section className="bg-pink text-white py-11 md:pt-[88px] md:pb-14" id='book-covers'>
      <div className="max-w-[1020px] mx-auto px-4">
        <div className="flex">
          <div className="w-full">
            <h2 className="text-title text-center">
              {title}
            </h2>
            <p className="text-gray font-medium  text-[19px] mt-2 md:mt-2  "
            dangerouslySetInnerHTML={{ __html: subtitle }} 
            >
           
            </p>
          </div>
        </div>

        <div className="mt-11 md:mt-6">
          <h2 className="text-center text-orange font-semibold text-[30px] md:text-[36px]">{slidesTitle}</h2>
        </div>
        <p className="text-gray text-center text-[19px] mt-2 md:mt-0  ">
              {slidesSubTitle}
            </p>

        <div className="mx-auto w-fit mt-6 md:mt-8">
          <div className="grid grid-rows-2 grid-cols-3 gap-x-9 gap-y-6">
            {slides.map((slide) => (
              <div className="" key={slide.id}>
                <img className='w-full h-full object-cover' src={slide.imageUrl} alt="" />
              </div>
            )
            )}
        
          </div>
        </div>

        <div className="mt-[34px] md:mt-[52px]">
          <Button text={button} />
        </div>
      </div>
    </section>
  ) : null;
};

export default BookCovers;
