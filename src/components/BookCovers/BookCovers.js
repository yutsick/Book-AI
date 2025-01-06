
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
  const widgets = coversData?.widgets || [];
  const mainImageUrl = coversData?.mainImageUrl;
  const featureText = coversData?.featureText;
  const slidesTitle = coversData?.slidesTitle;
  const slides = coversData?.slides || [];
  const button = coversData?.button;

  return coversData ? (
    <section className="bg-pink text-white py-11 md:pt-[88px] md:pb-14" id='book-covers'>
      <div className="max-w-[1020px] mx-auto px-4">
        <div className="flex">
          <div className="md:w-2/3 w-full">
            <h2 className="text-title">
              {title}
            </h2>
            <p className="text-gray font-medium  text-[19px] mt-2 md:mt-8  ">
              {subtitle}
            </p>


            <Widgets widgets={widgets} />



          </div>

          <div className="md:w-1/3 hidden md:block">
            <div className="flex justify-center">
              <Image
                src={mainImageUrl}
                alt="Example of a book cover"
                width={256}
                height={375}

              />
            </div>
          </div>
        </div>
        <div className="mt-6 md:mt-[52px] text-[#323738]/75  text-[16px] md:text-[19px] font-semibold flex gap-2">
          <span>
            <Image
              src="/images/star-covers.png"
              width={32}
              height={32}
              alt='star icon'
            />
          </span>
          <span className='text-gray'> {featureText} </span>

        </div>


        <div className="mt-11 md:mt-6">
          <h2 className="text-title !font-medium text-center">{slidesTitle}</h2>
        </div>

        <div className="h-[250px] mt-4">
          <div className="relative mx-auto max-w-[90%] md:max-w-[70%]  mt-6 md:mt-8">
            <Slider
              slides={slides}
              breakpoints={{
                0: { slidesPerView: 1.8, spaceBetween: 10 },
                425: { slidesPerView: 2.5, spaceBetween: 15 },
                625: { slidesPerView: 3.2, spaceBetween: 20 },
                976: { slidesPerView: 4, spaceBetween: 20 },
              }}
              imageSizes={{
                width: 165,
                height: 250
              }}
              imageClasses={"rounded-md"}
            />
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
