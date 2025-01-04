"use client";

import config from '../../../config';
import Accordion from '../Accordeon/Accordeon';
import React, { useState, useEffect } from "react";

function FAQ() {

    const { faqUrl } = config;

    const [faqData, setFaqData] = useState(null);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      fetch(faqUrl)
        .then((response) => response.json())
        .then((data) => {
  
          setFaqData(data)
        })
        .catch((err) => {
          console.error('Error fetching FAQ data:', err);
          setError('Failed to load FAQ data.');
        });
    }, []);
  return faqData ? (
    <>
    <div className="bg-pink pt-[37px] pb-[77px] md:pt-[77px] md:pb-[47px] px-4" id='faq'>
      <h2 className="text-title text-center">{faqData.title}</h2>
      <div>
          <Accordion data={faqData.items}/>
      </div>
    </div>
    </>
  ) : null;
}

export default FAQ
