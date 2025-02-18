import React, { useEffect, useContext, useMemo } from 'react';
import CustomDropdown from "@/components/FormsElements/CustomDropdown";
import CreateBookContext from '@/contexts/CreateBookContext';
import GenreContext from '@/contexts/CreateGenreContext';

function Step9({ setProgressStep }) {
  const {
    selectedTemplate,
    authorName,
    selectedCopies,
    setSelectedCopies,
    selectedCoverIndex,
    setSelectedCoverIndex,
    selectedShippingIndex,
    setSelectedShippingIndex,
    subtotal,
    setSubtotal,
    totalPrice,
    setTotalPrice
  } = useContext(CreateBookContext);


  const cover = [
    {
      title: 'Paperback',
      materials: 'Soft, Casual & Portable',
      img: '/images/create-book/bg/coverCard1.png',
      cost: 39.00
    },
    {
      title: 'Hardcover',
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

  const subtotalAndTotalPrice = useMemo(() => {
    if (selectedCopies && typeof selectedCoverIndex === "number" && typeof selectedShippingIndex === "number") {
      const coverCost = cover[selectedCoverIndex]?.cost || 0;
      const copiesCost = selectedCopies?.price || 0;
      const shippingCost = shipping[selectedShippingIndex]?.cost || 0;

      const newSubtotal = coverCost * selectedCopies?.value + copiesCost;
      const newTotalPrice = newSubtotal + shippingCost;

      return { newSubtotal, newTotalPrice };
    }
    return { newSubtotal: 0, newTotalPrice: 0 };
  }, [selectedCoverIndex, selectedCopies, selectedShippingIndex]);

  useEffect(() => {
    setSubtotal(subtotalAndTotalPrice.newSubtotal);
    setTotalPrice(subtotalAndTotalPrice.newTotalPrice);
  }, [subtotalAndTotalPrice, setSubtotal, setTotalPrice]);

  useEffect(() => {
    setProgressStep(7);
  }, [setProgressStep]);

  return (
    <div className="pb-[17px]">
      <div className="text-[30px] font-bold text-center text-orange mb-[32px]">
        Checkout
      </div>
      <div className="flex items-center  justify-center gap-4 flex-1 md:gap-12 mt-6 mb-[80px] md:mb-[110px]">

        {selectedTemplate?.front ? (

          <div
            className="relative"
            style={{
              width: "155px",
              height: "193px",
              "--bookWidth": "155px",
              "--bookHeight": "253px",
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
              {/* Front page */}
              <img
                className=""
                style={{
                  transform: "translateZ(0)",
                  boxShadow: "0 0 25px #999",

                }}
                src={selectedTemplate.front}
                alt="Book Cover"
              />

              {/* Pages */}
              <div
                className="absolute z-1 bg-white"
                style={{
                  width: "var(--spineWidth)",
                  height: "100%",
                  transformOrigin: "left",
                  transform: "rotateY(60deg)",
                  borderTop: "1px solid rgba(0, 0, 0, 0.08)",
                  borderBottom: "1px solid rgba(0, 0, 0, 0.08)",
                  top: '0',
                  right: '-24px',
                  boxShadow: "16px 0px 10px #eaeaea",
                }}
              >
                <div
                  className="absolute w-full h-full"
                  style={{
                    background: "linear-gradient(-90deg, transparent 60%, rgba(0, 0, 0, 0.2))",
                  }}
                ></div>
              </div>

              {/* Back */}
              <div
                className="absolute z-4 mt-1"
                style={{
                  width: "8px",
                  transform: "",
                  transformOrigin: "",
                  right: '-25px',
                  top: '0',
                  height: 'calc(100% - 8px)',
                  opacity: '0.7'
                }}
              >
                <img
                  src={selectedTemplate.spine}
                  alt="Spine"
                  className="w-full h-full"
                />

              </div>


            </div>
          </div>


        ) : (
          <p className="text-gray-500 mt-4">No cover selected</p>
        )}
        <div className="flex flex-col text-center text-[18px]  w-2/3 md:w-auto">
          <div className="text-[#2B2B2B] md:text-[24px] font-bold">
            {selectedTopic}
          </div>
          <div className="text-[#2B2B2B] md:text-[22px] font-bold">
            by <span className='italic'>{authorName}</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-center items-center md:items-start gap-[0] md:gap-[45px] pb-[65px]  relative 
  after:content-[''] after:h-[1px] after:bg-[#ADADAD] after:absolute after:bottom-0 
  after:w-[285px] after:left-1/2 after:-translate-x-1/2 
  md:after:w-full md:after:left-0 md:after:translate-x-0">
        <div className="border-b border-[#ADADAD] md:border-none pb-[65px] md:pb-[0]">
          <h2 className="text-center text-[24px] font-bold mb-[20px]">Type of cover</h2>
          <div className="flex items-center justify-center gap-[35px] flex-1">
            {cover.map((option, index) => (
              <label
                key={index}
                className={`rounded-[3px] cursor-pointer transition border-[#6C6C6C] border-[0.5px] text-[#6C6C6C] border
                  ${selectedCoverIndex === index ? "bg-[#DCDCDC] hover:bg-[#DCDCDC] text-black border-[1px] shadow-worksShadow border-gray" : "bg-white bg-opacity-60 hover:bg-[#F0F0F0] border-[#bcbcbc]"}
                  `}
                style={{
                  borderWidth: selectedCoverIndex === index ? '1px' : '0.5px',
                  width: '125px',
                  height: 'auto',
                }}
              >
                <input
                  type="radio"
                  name="cover"
                  value={option.title}
                  checked={selectedCoverIndex === index}
                  onChange={() => setSelectedCoverIndex(index)}
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
        <span className="hidden md:inline-block w-px h-[184px] bg-[#ADADAD] my-auto"></span>
        <div className="mt-[30px] md:mt-[0]">
          <h2 className="text-center text-[24px] font-bold mb-[20px]">Number Of Copies</h2>
          <CustomDropdown
            title=""
            options={copies}
            value={selectedCopies}
            onChange={(value) => setSelectedCopies(value)}
            placeholder="Select an option"
            afterFocusPlaceholder="Number of copies"
          />
        </div>
      </div>
      <div className="flex flex-col justify-center items-center md:items-start mt-[30px] pb-[65px] relative 
  after:content-[''] after:h-[1px] after:bg-[#ADADAD] after:absolute after:bottom-0 
  after:w-[285px] after:left-1/2 after:-translate-x-1/2 
  md:after:w-full md:after:left-0 md:after:translate-x-0">


        <h2 className="text-left text-[24px] font-bold mb-[20px]">Shipping Type</h2>
        <div className="flex items-center justify-center flex-col md:flex-row  gap-[35px] flex-1">
          {shipping.map((option, index) => (
            <label
              key={index}
              className={`rounded-[3px] cursor-pointer transition border-[#6C6C6C] border-[0.5px] text-[#6C6C6C] border
                ${selectedShippingIndex === index ? "bg-[#DCDCDC] hover:bg-[#DCDCDC] text-black border-[1px] shadow-worksShadow border-gray" : "bg-white bg-opacity-60 hover:bg-[#F0F0F0] border-[#bcbcbc]"}
                `}
              style={{
                borderWidth: selectedShippingIndex === index ? '1px' : '0.5px',
                width: '206px',
                height: 'auto',
              }}
            >
              <input
                type="radio"
                name="shipping"
                value={option.title}
                checked={selectedShippingIndex === index}
                onChange={() => setSelectedShippingIndex(index)}
                className="hidden"
              />
              <div className="text-center flex items-end text-gray">
                <div className="text-left pl-[8px] pt-[8px] pb-[8px]">
                  <h3 className=" font-semibold text-[17px]">{option.title}</h3>
                  <p className="text-[14px] text-[#6C6C6C] hover:text-[#4b4b4b]">{option.description}</p>
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
          <p className="text-[16px] text-[#727272] ">Personalized Full-Length Book – Tailored to Your Story</p>
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
        <p className="text-[13px] text-[#727272] ">*Final total may vary based on your shipping address and applicable taxes</p>
      </div>
    </div>
  );
}

export default Step9;
