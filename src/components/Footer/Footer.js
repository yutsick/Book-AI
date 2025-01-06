"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import config from '../../../config';

const Footer = () => {
  const { menuUrl } = config;
  const [footerData, setFooterData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(menuUrl)
      .then((response) => response.json())
      .then((data) => setFooterData(data))
      .catch((err) => {
        console.error('Error fetching Menu data:', err);
        setError('Failed to load menu data.');
      });
  }, []);

  return footerData ? (
    <footer className="bg-[#454646] text-white md:py-5 pb-3">
      <div className="max-w-[1260px] px-4 mx-auto flex flex-col  justify-between ">
        {/* Navigation Links */}
        <div className="flex  gap-x-16 px-4 md:px-0">
          <div className="flex flex-col items-center mt-12 space-y-4 ">
            <ul className="space-y-2">
              {footerData.links.map((link, index) => (
                <React.Fragment key={index}>
                  <li><a href={link.href} className="" >{link.text}</a></li>

                </React.Fragment>
              ))}S
            </ul>
          </div>
          <div className="flex flex-col items-center mt-12 space-y-4 ">
            <ul className="space-y-2">
              {footerData.footerLinks.map((link, index) => (
                <React.Fragment key={index}>
                  <li><a href={link.href} className="" >{link.text}</a></li>
                </React.Fragment>
              ))}
            </ul>
          </div>
        </div>



        {/* Divider */}
        <div className="flex items-center mt-[10px]">
          <div className=" w-full  border-t border-[#888888] flex-1"></div>
          <span className="text-sm md:text-base w-fit px-2">© Copyright 2025 Book Tailor</span>
          <div className=" w-full  border-t border-[#888888] flex-1"></div>
        </div>
        {/* Footer Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-end w-full mt-1">

          <div className="mt-4 md:mt-0 hidden md:block">
            <a href="/" className="brand-logo h-[40px] md:h-[67px] w-[97px] md:w-[312px] border-b ">
              <Image
                src="/images/main-logo.svg"
                width={109}
                height={37}
                alt="Book Tailor Logo"
                className=''
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  ) : null;
};

export default Footer;
