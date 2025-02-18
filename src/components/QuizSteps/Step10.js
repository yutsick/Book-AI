import React, { useEffect, useContext, useState } from 'react';
import CreateBookContext from '@/contexts/CreateBookContext';
import GenreContext from '@/contexts/CreateGenreContext';

function Step10({ setProgressStep }) {
    const {
        authorName,
        selectedCopies,
        selectedShippingIndex,
        subtotal,
        totalPrice,
    } = useContext(CreateBookContext);

    const { selectedTopic } = useContext(GenreContext);


    useEffect(() => {
        setProgressStep(8);
    }, [setProgressStep]);

    const shipping = [
        {
            title: 'Free Shipping',
            description: 'Delivered in 10-14 business days',
            img: '/images/create-book/bg/coverCard1.png',
            cost: 0.00
        },
        {
            title: 'Express Shipping',
            description: 'Delivered in 3-5 business days',
            img: '/images/create-book/bg/coverCard2.png',
            cost: 15.00
        }
    ];

    return (
        <div className="">
            <div className="mt-[30px] pb-[65px]">
                <div className="mb-[15px]">
                    <h2 className="text-[24px] text-gray font-bold text-center">Order Summary</h2>
                    <p className="text-[16px] text-[#727272] text-center">Personalize full-length book - Paperback cover</p>
                </div>
                <p>
                    <strong>Book Title:</strong> {selectedTopic} <br />
                    <strong>Author Name:</strong> {authorName} <br />
                    <strong>Format:</strong> Paperback <br />
                    <strong>Page Count:</strong> 240 Pages <br />
                    <strong>Quantity:</strong> {selectedCopies?.value} <br />
                    <strong>Subtotal:</strong> ${subtotal.toFixed(2)} <br />
                    <strong>Shipping:</strong> {shipping[selectedShippingIndex].title} <br />
                    <strong>Total Price:</strong> ${totalPrice.toFixed(2)}*
                </p>
            </div>
            <div className="relative w-full aspect-[7/4]">
                <iframe
                    className="absolute top-0 left-0 w-full h-full"
                    src="URL_HERE"
                    allow="payment"
                    title="Payment"
                ></iframe>
            </div>


        </div>
    );
}

export default Step10;
