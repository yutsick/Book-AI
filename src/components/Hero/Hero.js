"use client";

import config from '../../../config';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const Hero = () => {
  const { heroUrl } = config;
  const [heroData, setHeroData] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    fetch(heroUrl)
      .then((response) => response.json())
      .then((data) => setHeroData(data))
      .catch((error) => console.error('Error fetching Hero data:', error));
      setError('Error fetching Hero data');
  }, []);

  return heroData ? (
    <section className="flex items-center justify-between px-2 lg:px-0 py-8 md:pb-[32px] bg-white max-w-[910px] mx-auto flex-col md:flex-row gap-2  ">
      <div className="md:flex-1 w-full md:w-auto">
        <h1 className=" font-bold text-orange md:leading-[52px] font-roboto md:font-inter">
          {heroData.heading}
          <p className='text-[#2B2B2B]'>{heroData.subHeading}</p>
        </h1>
        <p className="mt-2 text-[18px] text-[#2B2B2B]">
          {heroData.description}
        </p>
        <div className="relative  w-[287px] h-[255px] mx-auto my-7 md:hidden">
          <Image
            src={heroData.imageUrl}
            alt="Hero Image"
            layout='fill'
            objectFit='cover'
          />
        </div>
        <button className="md:mt-6 w-full max-w-[330px] md:w-[238px] h-[50px] mx-auto flex justify-center items-center bg-orange text-white text-lg font-semibold text-[19px] md:text-[23px] rounded-[3px] hover:scale-105 transition gap-1 shadow-heroBtnShadow group">
          <span>{heroData.buttonText}</span>
          <span className='group-hover:translate-x-2 transition'>
            <svg className='mt-1' width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_0_615)">
                <path fillRule="evenodd" clipRule="evenodd" d="M1.82983 0.670075C2.29032 0.209585 3.03692 0.209585 3.49741 0.670073L9.61156 6.78422C9.83269 7.00535 9.95692 7.30528 9.95692 7.618C9.95692 7.93074 9.83269 8.23067 9.61156 8.4518L3.49741 14.5659C3.03692 15.0265 2.29032 15.0265 1.82983 14.5659C1.36934 14.1054 1.36934 13.3589 1.82983 12.8984L7.11019 7.618L1.82983 2.33765C1.36934 1.87716 1.36934 1.13056 1.82983 0.670075Z" fill="white" />
                <path fillRule="evenodd" clipRule="evenodd" d="M8.9938 0.670075C9.45429 0.209585 10.2009 0.209585 10.6614 0.670073L16.7755 6.78422C16.9966 7.00535 17.1208 7.30528 17.1208 7.618C17.1208 7.93074 16.9966 8.23067 16.7755 8.4518L10.6614 14.5659C10.2009 15.0265 9.45429 15.0265 8.9938 14.5659C8.53332 14.1054 8.53332 13.3589 8.9938 12.8984L14.2742 7.618L8.9938 2.33765C8.53332 1.87716 8.53332 1.13056 8.9938 0.670075Z" fill="white" />
              </g>
              <defs>
                <clipPath id="clip0_0_615">
                  <rect width="17.0323" height="15.7221" fill="white" transform="translate(0.648438 0.193359)" />
                </clipPath>
              </defs>
            </svg>

          </span>
        </button>
        <div className="mt-4 md:mt-8 text-[#323738] md:text-[17px] text-[13px] font-semibold leading-[17px] justify-center flex items-center gap-1">
          <div className="flex items-center gap-1">
            <span className='italic mt-1'>Rated Excellent</span> 
            <span className='mt-1'>On</span>
          </div>
          <span>
          < Image
          src='/images/trustpilot-logo.svg'
          alt='Trustpilot Raiting'
          width={88}
          height={22}
          />
          </span>
          < Image
          src='/images/trustpilot.svg'
          alt='Trustpilot Raiting'
          width={138}
          height={26}
          />
            
         
          </div>
      </div>
      <div className="relative md:w-[312px] md:h-[312px] hidden md:block">
        <Image
          src={heroData.imageUrl}
          alt="Hero Image"
          layout='fill'
          objectFit='cover'
        />
      </div>
    </section>
  ) : null;
};

export default Hero;
