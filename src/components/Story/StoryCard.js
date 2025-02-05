import React from 'react';


function StoryCard({ card, index, isEven }) {
    const title = card.title;
    const description = card.description;
    const imageUrl = card.imageUrl;
    const altUrl = card.alt;
    const cardColor = card.cardColor;

    return (
        <div className={`flex items-center gap-2 md:gap-12  ${isEven ? "flex-col sm:flex-row ml-auto" : "mr-auto justify-start flex-col sm:flex-row-reverse"}`}>
            <div className="">
                <div style={{ backgroundColor: cardColor }} className="text-gray shadow-storyCardShadow p-4 rounded-full flex justify-center items-center h-[70px] w-[70px] md:h-[80px] md:w-[80px] font-bold text-[35px]">
                    {index + 1}
                </div>
            </div>
            <div style={{ backgroundColor: cardColor }} className={` h-full max-w-[657px] rounded-lg shadow-storyCardShadow relative flex ${isEven ? "sm:flex-row-reverse flex-col" : "sm:flex-row flex-col"}`}>
                <div className="flex justify-center items-center p-3 md:p-5">
                    <img
                        src={imageUrl}
                        alt={altUrl}
                        className="max-w-[80px] h-auto"
                    />
                </div>

                <div className="px-[20px] py-[10px]">
                    <div>
                        <h3 className="text-gray text-[18px] md:text-[20px] font-semibold text-center sm:text-left">{title}</h3>
                        <p className="text-gray mt-2 text-[16px] md:text-[18px] leading-[22px] sm:leading-[27px] text-center sm:text-left">{description}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StoryCard;