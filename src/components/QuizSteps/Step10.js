import React, { useEffect, useContext, useState } from 'react';
import CreateBookContext from '@/contexts/CreateBookContext';
import BookPreview from '../BookPreview/BookPreview';
import GenreContext from '@/contexts/CreateGenreContext';

function Step10({ setProgressStep }) {
    const {
        authorName,
        selectedTemplate,
    } = useContext(CreateBookContext);

    const { selectedTopic, selectedSubTopic } = useContext(GenreContext);


    useEffect(() => {
        setProgressStep(8);
    }, [setProgressStep]);

    return (
        <div className="">
            <div className="mt-[30px] pb-[30px]">
                <h2 className="text-[24px] text-gray font-bold text-center">Order Summery</h2>
                <p className="text-[16px] text-[#727272] text-center">Personalize full length book - paperback cover </p>
            </div>
            <div className="mb-[30px] ">
                <BookPreview
                    selectedTemplate={selectedTemplate}
                    selectedTopic={selectedTopic}
                    selectedSubTopic={selectedSubTopic}
                    authorName={authorName}
                    hideButton="true"
                />
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
