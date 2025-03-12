"use client";

import config from '../../../config';
import ContactInput from "@/components/ContactUs/ContactInput";
import ContactSelect from "@/components/ContactUs/ContactSelect";
import ContactEmail from "@/components/ContactUs/ContactEmail";
import { useEffect, useState, useRef } from 'react';
import Select from 'react-select';

const ContactUS = () => {
    const { contactUsUrl } = config;
    const [contactUsData, setContactUsData] = useState(null);
    const [error, setError] = useState(null);

    const [authorFullName, setAuthorFullName] = useState("");
    const [userInquiry, setUserInquiry] = useState("");
    const [options, setOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState(null);
    const [authorEmail, setAuthorEmail] = useState("");
    const [isValidEmail, setIsValidEmail] = useState(false);
    const [reason, setReason] = useState(null);
    const captchaRef = useRef(null);
    const [captchaToken, setCaptchaToken] = useState(null);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    const sitekey = "0x4AAAAAAA9ma1_QfkrB3HWY";

    const reasons = [
        { label: 'Order Status & Tracking' },
        { label: 'Issue with My Order' },
        { label: 'Editing or Canceling My Order' },
        { label: 'Payment & Billing Questions' },
        { label: 'Technical Support (Website Issues)' },
        { label: 'General Inquiry' },
        { label: 'Partnerships & Business Inquiries' },
        { label: 'Press & Media Requests' },
        { label: 'Feedback & Suggestion' },
    ];

    const states = [
        "Alabama",
        "Alaska",
        "American Samoa",
        "Arizona",
        "Arkansas",
        "California",
        "Colorado",
        "Commonwealth of the Northern Mariana Islands",
        "Connecticut",
        "Delaware",
        "District of Columbia",
        "Florida",
        "Georgia",
        "Guam",
        "Hawaii",
        "Idaho",
        "Illinois",
        "Indiana",
        "Iowa",
        "Kansas",
        "Kentucky",
        "Louisiana",
        "Maine",
        "Maryland",
        "Massachusetts",
        "Michigan",
        "Minnesota",
        "Mississippi",
        "Missouri",
        "Montana",
        "Nebraska",
        "Nevada",
        "New Hampshire",
        "New Jersey",
        "New Mexico",
        "New York",
        "North Carolina",
        "North Dakota",
        "Ohio",
        "Oklahoma",
        "Oregon",
        "Pennsylvania",
        "Puerto Rico",
        "Rhode Island",
        "South Carolina",
        "South Dakota",
        "Tennessee",
        "Texas",
        "United States Virgin Islands",
        "Utah",
        "Vermont",
        "Virginia",
        "Washington",
        "West Virginia",
        "Wisconsin",
        "Wyoming"
    ];

    const stateOptions = states.map((state) => ({
        value: state,
        label: state,
    }));


    useEffect(() => {
        fetch(contactUsUrl)
            .then((response) => response.json())
            .then((data) => setContactUsData(data))
            .catch((error) => {
                console.error('Error fetching Contact Us data:', error);
                setError('Error fetching Contact Us data');
            });
    }, []);

    const handleChange = (selectedOption) => {
        setSelectedOption(selectedOption);
    };

    const handleValidityChange = (isValid) => {
        setIsValidEmail(isValid);
    };

    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
        script.async = true;
        script.onload = () => {
            if (window.turnstile) {
                window.turnstile.render(captchaRef.current, {
                    sitekey,
                    callback: (token) => setCaptchaToken(token),
                });
            }
        };
        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script);
        };
    }, []);

    useEffect(() => {
        const isFormValid = authorFullName && isValidEmail && selectedOption && reason && captchaToken;
        setIsButtonDisabled(!isFormValid);
    }, [authorFullName, isValidEmail, selectedOption, reason, captchaToken]);

    return contactUsData ? (
        <section className="max-w-[740px] w-full mx-auto px-[20px] py-[60px]">
            <h2 className="text-center text-[44px] font-bold text-gray mb-[40px]">{contactUsData.title}</h2>
            <div className="flex justify-center items-center gap-[30px] mb-[40px] flex-col md:flex-row">
                <div className="w-full md:w-1/2">
                    <p className="mb-[10px]">{contactUsData.fullName}</p>
                    <ContactInput
                        placeholder={contactUsData.fullNamePlaceholder}
                        label=""
                        value={authorFullName}
                        onChange={setAuthorFullName}
                        maxLength="64"
                    />
                </div>
                <div className="w-full md:w-1/2">
                    <p className="mb-[10px]">{contactUsData.country}</p>
                    <Select
                        options={stateOptions}
                        value={selectedOption}
                        onChange={handleChange}
                        placeholder={contactUsData.countryPlaceholder}
                        isSearchable
                        classNamePrefix="custom-select"
                        styles={{
                            control: (provided, state) => ({
                                ...provided,
                                borderRadius: '8px',
                                height: '60px',
                                padding: '0.5rem',
                                borderColor: state.isFocused ? '#2B2B2B' : '#2B2B2B',
                                boxShadow: state.isFocused ? 'none' : 'none',
                                fontSize: '16px',
                                border: state.isFocused
                                    ? '1px solid #2B2B2B'
                                    : '1px solid #2B2B2B',
                                transition: 'border-color 0.3s ease',
                                '&:hover': {
                                    borderColor: '#2B2B2B',
                                },
                            }),
                            singleValue: (provided) => ({
                                ...provided,
                                fontSize: '17px',
                                color: '#2B2B2B',
                            }),
                            input: (provided) => ({
                                ...provided,
                                fontSize: '17px',
                                color: '#2B2B2B',
                            }),
                            placeholder: (provided) => ({
                                ...provided,
                                fontSize: '17px',
                                color: '#A0A0A0',
                            }),
                            dropdownIndicator: (provided) => ({
                                ...provided,
                                color: '#2B2B2B',
                            }),
                            indicatorSeparator: (provided) => ({
                                ...provided,
                                backgroundColor: 'transparent',
                            }),
                            menu: (provided) => ({
                                ...provided,
                                borderRadius: '8px',
                                fontSize: '17px',
                                padding: '0.5rem',
                                backgroundColor: 'white',
                            }),
                            option: (provided, state) => ({
                                ...provided,
                                backgroundColor: state.isFocused || state.isSelected ? '#F1F1F1' : 'transparent',
                                color: state.isFocused || state.isSelected ? '#2B2B2B' : '#2B2B2B',
                                cursor: 'pointer',
                                '&:hover': {
                                    backgroundColor: '#F1F1F1',
                                },
                            }),
                        }}
                    />
                </div>
            </div>
            <div className="mb-[40px]">
                <p className="mb-[10px]">{contactUsData.mail}</p>
                <ContactEmail
                    placeholder={contactUsData.mailPlaceholder}
                    title=""
                    label=""
                    value={authorEmail}
                    onChange={setAuthorEmail}
                    onValidityChange={handleValidityChange}
                    height="60px"
                    placeholderSize="16px"
                />
            </div>
            <div className="mb-[40px]">
                <p className="mb-[10px]">{contactUsData.reason}</p>
                <ContactSelect
                    title=""
                    className="w-full "
                    options={reasons}
                    value={reason}
                    onChange={setReason}
                    placeholder={contactUsData.reasonPlaceholder}
                />
            </div>
            <div className="mb-[40px]">
                <p className="mb-[10px]">{contactUsData.help}</p>
                <ContactInput
                    placeholder={contactUsData.helpPlaceholder}
                    label=""
                    value={userInquiry}
                    onChange={setUserInquiry}
                    setIsButtonDisabled={setIsButtonDisabled}
                    height="123px"
                    isTextArea="true"
                />
                <p className="mb-[10px] text-[14px] text-gray">{contactUsData.helpNote}</p>
            </div>

            <div className="mb-[40px]">
                <div ref={captchaRef} className="flex justify-center items-center w-full max-w-xs mx-auto" data-theme="light" ></div>
            </div>

            <a
                className={`w-full max-w-[280px] w-full h-[50px] mx-auto flex justify-center items-center bg-orange text-white font-semibold text-[23px] rounded-[3px] gap-1 shadow-heroBtnShadow group ${isButtonDisabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''}`}
                href="#"
                onClick={(e) => {
                    if (isButtonDisabled) e.preventDefault();
                }}
            >
                <span className="mb-[2px]">{contactUsData.buttonText}</span>
                <span className={`${isButtonDisabled ? 'transform-none' : 'group-hover:translate-x-1.5'} transition-all`}>
                    <svg className="" width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
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
            </a>
        </section>
    ) : null;
};

export default ContactUS;
