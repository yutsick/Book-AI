"use client";

import config from '../../../config';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const BurgerMenu = () => {
  const { menuUrl } = config;

  const [headerData, setHeaderData] = useState(null);
  const [error, setError] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    fetch(menuUrl)
      .then((response) => response.json())
      .then((data) => setHeaderData(data))
      .catch((err) => {
        console.error('Error fetching Menu data:', err);
        setError('Failed to load menu data.');
      });
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  if (error) return <div>{error}</div>;
  if (!headerData) return <div>Loading...</div>;

  return (
    <>
      <button className="cursor-pointer hidden md:block mr-9" onClick={toggleMenu} aria-label="Toggle menu">
        <svg width="30" height="23" viewBox="0 0 30 23" fill="none" xmlns="http://www.w3.org/2000/svg">
          <line y1="1.5" x2="30" y2="1.5" stroke="black" strokeWidth="3" />
          <line y1="11.5" x2="30" y2="11.5" stroke="black" strokeWidth="3" />
          <line y1="21.5" x2="30" y2="21.5" stroke="black" strokeWidth="3" />
        </svg>
      </button>
      <button className="cursor-pointer md:hidden mr-[10px]" onClick={toggleMenu} aria-label="Toggle menu">
        <svg width="17" height="13" viewBox="0 0 17 13" fill="none" xmlns="http://www.w3.org/2000/svg">
          <line y1="1.1763" x2="16.474" y2="1.1763" stroke="black" strokeWidth="1.6474" />
          <line y1="6.66751" x2="16.474" y2="6.66751" stroke="black" strokeWidth="1.6474" />
          <line y1="12.159" x2="16.474" y2="12.159" stroke="black" strokeWidth="1.6474" />
        </svg>

      </button>

      <div
        className={`fixed inset-0 bg-black transition-opacity duration-300 z-[100] ${menuOpen ? 'opacity-40 visible' : 'opacity-0 invisible'
          }`}
        onClick={toggleMenu}
      ></div>

      <div
        className={`fixed top-0 right-0 h-full max-h-[660px] w-60 md:w-[350px] bg-[#f7f2eb] transition-transform duration-300 ease-in-out z-[200] ${menuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
      >
        <div className="flex justify-between py-3 px-4">
          <button onClick={toggleMenu} aria-label="Close menu" className='hidden md:block'>
            <svg width="24" height="22" viewBox="0 0 24 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <line x1="2.70711" y1="1.29289" x2="22.7071" y2="21.2929" stroke="#424242" strokeWidth="2" />
              <line x1="1.29289" y1="21.2929" x2="21.2929" y2="1.29289" stroke="#424242" strokeWidth="2" />
            </svg>
          </button>
          <button onClick={toggleMenu} aria-label="Close menu" className='md:hidden'>
            <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <line x1="1.38891" y1="0.611091" x2="12.3889" y2="11.6111" stroke="#424242" strokeWidth="1.1" />
              <line x1="0.611091" y1="11.6111" x2="11.6111" y2="0.611091" stroke="#424242" strokeWidth="1.1" />
            </svg>
          </button>
          <div className="relative md:w-[85px] md:h-[30px] w-[56px] h-[20px]">
            <Image src="/images/main-logo.svg" layout="fill" objectFit="cover" alt="Book Tailor Logo" priority={true} />
          </div>
        </div>

        <div className="flex flex-col items-center mt-12 space-y-4">
          {headerData.links.map((link, index) => (
            <React.Fragment key={index}>
              <a href={link.href} className="text-[17px] md:text-[20px] font-bold text-[#4A4949]" style={{ fontFamily: "var(--font-)" }} onClick={toggleMenu}>{link.text}</a>
              <hr className="w-[95px] md:w-[117px] border-t border-[#6F6F6F]" />
            </React.Fragment>
          ))}
        </div>

        <div className="absolute bottom-14 left-4 flex flex-col gap-3">
          {headerData.footerLinks.map((link, index) => (
            <a key={index} href={link.href} className="text-[#4A4949] text-[11px] md:text-[16px]" style={{ fontFamily: "var(--font-poppins)" }}>{link.text}</a>
          ))}
        </div>
      </div>
    </>
  );
};

export default BurgerMenu;