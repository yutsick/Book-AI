import React from 'react';

function ChooseCard({ card }) {
    return (
        <div className="bg-[#E5EAEE] py-[25px] px-[30px] rounded-[20px] shadow-chooseShadow">
            <h3 className="text-gray text-center font-semibold text-[16px] md:text-[20px] mb-2 md:mb-4" >{card.title}</h3>
            <p className="text-gray" >{card.description}</p>
        </div>
    )
}

export default ChooseCard;