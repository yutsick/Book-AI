import React, { useEffect, useContext, useState } from 'react';
import CustomDropdown from "@/components/FormsElements/CustomDropdown";
import CreateBookContext from '@/contexts/CreateBookContext';
import GenreContext from '@/contexts/CreateGenreContext';

function Step9({ setProgressStep }) {
  const { selectedTemplate, authorName } = useContext(CreateBookContext);
  const [selectedCopies, setSelectedCopies] = useState({ value: 1, label: "1", price: 0 });
  const [selectedCoverIndex, setSelectedCoverIndex] = useState(0);
  const [selectedShippingIndex, setSelectedShippingIndex] = useState(0);

  const cover = [
    {
      title: 'Paperback',
      materials: 'Soft, Casual & Portable',
      img: '/images/create-book/bg/coverCard1.png',
      cost: 39.00
    },
    {
      title: 'Paperback',
      materials: 'Sturdy, Durable & Premium',
      img: '/images/create-book/bg/coverCard2.png',
      cost: 59.00
    }
  ];

  const copies = [
    { value: 1, label: "1", price: 0 },
    { value: 2, label: "2", price: 20 },
    { value: 3, label: "3", price: 40 },
    { value: 4, label: "4", price: 60 },
    { value: 5, label: "5", price: 80 },
  ];

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

  const { selectedTopic } = useContext(GenreContext);

  const handleChange = (option) => {
    setSelectedCopies(option);
  };

  const handleCoverChange = (index) => {
    setSelectedCoverIndex(index);
  };

  const handleShippingChange = (index) => {
    setSelectedShippingIndex(index);
  };

  useEffect(() => {
    setSelectedCoverIndex(0);
    setProgressStep(7);
  }, [setProgressStep]);

  // Расчет стоимости
  const coverCost = cover[selectedCoverIndex].cost;
  const copiesCost = selectedCopies ? selectedCopies.price : 0;
  const shippingCost = shipping[selectedShippingIndex].cost;

  const subtotal = coverCost * selectedCopies?.value + copiesCost;
  const totalPrice = subtotal + shippingCost;

  return (
    <div className="pb-[65px]">
      <div className="text-[30px] font-bold text-center text-orange mb-[32px]">
        Checkout
      </div>
      <div className="flex items-center justify-center gap-4 flex-1 md:gap-12 mt-6 mb-[70px]">
        {selectedTemplate?.front ? (
          <div
            className="relative"
            style={{
              width: "155px",
              height: "203px",
              "--bookWidth": "175px",
              "--bookHeight": "273px",
              "--spineWidth": "27px",
              perspective: "1000px",
              backgroundColor: 'transparent'
            }}
          >
            <div
              className="relative transform-style-3d"
              style={{
                transform: "rotateY(-30deg)",
                transformOrigin: "center center -25px",
                transformStyle: ' preserve-3d'
              }}
            >
              <img
                src={selectedTemplate.front}
                alt="Book Cover"
                style={{
                  transform: "translateZ(0)",
                  boxShadow: "0 0 25px #999",
                }}
              />
            </div>
          </div>
        ) : (
          <p className="text-gray-500 mt-4">No cover selected</p>
        )}
        <div className="flex flex-col text-center text-[18px] w-2/3 md:w-auto">
          <div className="text-[#2B2B2B] md:text-[24px] font-bold">
            {selectedTopic}
          </div>
          <div className="text-[#2B2B2B] md:text-[22px] font-bold">
            by <span className='italic'>{authorName}</span>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-start gap-[45px] pb-[65px] border-b border-[#ADADAD]">
        <div>
          <h2 className="text-center text-[24px] font-bold mb-[20px]">Type of cover</h2>
          <div className="flex items-center justify-center gap-[35px] flex-1">
            {cover.map((option, index) => (
              <label
                key={index}
                className={`rounded-[2px] cursor-pointer transition-all duration-200 border
                  ${selectedCoverIndex === index ? 'border-gray text-gray border-[1.5px] bg-[#E5E5E5]' : 'border-[#6C6C6C] text-[#6C6C6C] border-[1px] bg-[rgba(255,255,255,0.6)]'}
                  hover:border-gray hover:text-gray`}
                style={{
                  width: '125px',
                  height: 'auto',
                  boxShadow: selectedCoverIndex === index ? '0 0 10px rgba(0, 0, 0, 0.2)' : 'none',
                }}
              >
                <input
                  type="radio"
                  name="cover"
                  value={option.title}
                  checked={selectedCoverIndex === index}
                  onChange={() => handleCoverChange(index)}
                  className="hidden"
                />
                <div className="text-center">
                  <h3 className="text-black font-semibold text-[17px] px-[3px] py-[2px]">{option.title}</h3>
                  <p className="text-[14px] px-[3px] py-[2px]">{option.materials}</p>
                  <img src={option.img} alt={option.title} className="w-full h-auto" />
                  <p className="text-[14px] px-[3px] py-[2px]">{`$${option.cost.toFixed(2)}`}</p>
                </div>
              </label>
            ))}
          </div>
        </div>
        <span className="inline-block w-px h-[184px] bg-[#ADADAD] my-auto"></span>
        <div>
          <h2 className="text-center text-[24px] font-bold mb-[20px]">Number Of Copies</h2>
          <CustomDropdown
            title=""
            options={copies}
            value={selectedCopies}
            onChange={handleChange}
            placeholder="Select an option"
            afterFocusPlaceholder="Number of copies"
          />
        </div>
      </div>
      <div className="flex flex-col justify-center items-start mt-[30px] pb-[65px] border-b border-[#ADADAD]">
        <h2 className="text-left text-[24px] font-bold mb-[20px]">Shipping Type</h2>
        <div className="flex items-center justify-center gap-[35px] flex-1">
          {shipping.map((option, index) => (
            <label
              key={index}
              className={`rounded-[2px] cursor-pointer transition-all duration-200 border
                ${selectedShippingIndex === index ? 'border-gray text-gray border-[1.5px] bg-[#E5E5E5]' : 'border-[#6C6C6C] text-[#6C6C6C] border-[1px] bg-[rgba(255,255,255,0.6)]'}
                hover:border-gray hover:text-gray`}
              style={{
                width: '206px',
                height: 'auto',
                boxShadow: selectedShippingIndex === index ? '0 0 10px rgba(0, 0, 0, 0.2)' : 'none',
              }}
            >
              <input
                type="radio"
                name="shipping"
                value={option.title}
                checked={selectedShippingIndex === index}
                onChange={() => handleShippingChange(index)}
                className="hidden"
              />
              <div className="text-center flex items-end text-gray">
                <div className="text-left pl-[8px] pt-[8px] pb-[8px]">
                  <h3 className=" font-semibold text-[17px]">{option.title}</h3>
                  <p className="text-[14px] text-[#6C6C6C]">{option.description}</p>
                </div>
                <div className="text-[14px] pr-[8px] pt-[8px] pb-[8px] text-gray">
                  <p>{`$${option.cost.toFixed(2)}`}</p>
                </div>
              </div>
            </label>
          ))}
        </div>
      </div>
      <div className="mt-[30px]">
        <div className="mb-[15px]">
          <h2 className="text-[24px] text-gray font-bold">Order Summary</h2>
          <span className="text-[16px] text-[#727272] ">Personalize full-length book - Paperback cover</span>
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
        <span className="text-[13px] text-[#727272] ">*Final total may vary based on your shipping address and applicable taxes</span>
      </div>
    </div>
  );
}

export default Step9;
