import React, { useEffect, useContext, useState } from 'react';
import CreateBookContext from '@/contexts/CreateBookContext';
import BookPreview from '../BookPreview/BookPreview';
import GenreContext from '@/contexts/CreateGenreContext';
import Checkout from '../Checkout/Checkout';

function Step10({ setProgressStep }) {
  const {
    authorName,
    selectedTemplate,
    selectedCopies, 
    totalPrice      
} = useContext(CreateBookContext);

    const { selectedTopic, selectedSubTopic } = useContext(GenreContext);

    const [returnUrl, setReturnUrl] = useState('');
    const [draftUUID, setDraftUUID] = useState('');

    useEffect(() => {
        setProgressStep(8);

        
        console.log('Context Data:', {
            selectedCopies,
            totalPrice
        });

        if (typeof window !== 'undefined') {
            setReturnUrl(`${window.location.origin}/confirmation`);
            const storedUUID = localStorage.getItem('draftUUID');
            setDraftUUID(storedUUID || '');
        }
    }, [setProgressStep, selectedCopies, totalPrice]);

    return (
        <div>
            <div className="mt-[30px] pb-[30px]">
                <h2 className="field-title text-center">Order Summary</h2>
                <p className="field-desc text-center">Personalize full length book - paperback cover</p>
            </div>
            <div className="mb-[30px]">
                <BookPreview
                    selectedTemplate={selectedTemplate}
                    selectedTopic={selectedTopic}
                    selectedSubTopic={selectedSubTopic}
                    authorName={authorName}
                    hideButton="true"
                />
            </div>
            <div className="relative w-full aspect-[7/4]">
                {(returnUrl && selectedCopies && totalPrice) ? (
                    <Checkout 
                        quantity={selectedCopies} 
                        totalPrice={totalPrice} 
                        returnUrl={returnUrl} 
                        draftUUID={draftUUID}
                    />
                ) : (
                    <div>Waiting for context data...</div>
                )}
            </div>
        </div>
    );
}

export default Step10;
