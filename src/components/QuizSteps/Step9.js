import React, { useEffect, useContext, useMemo, useRef } from 'react';
import CreateBookContext from '@/contexts/CreateBookContext';
import updateDraft from "@/utils/draftUpdater";
import { debounce, set } from "lodash";
function Step9({ setProgressStep }) {
  const {

    selectedCopies,
    setSelectedCopies,
    selectedCoverIndex,
    setSelectedCoverIndex,
    selectedShippingIndex,
    setSelectedShippingIndex,
    subtotal,
    setSubtotal,
    totalPrice,
    setTotalPrice,
    selectedCover,
    setSelectedCover
  } = useContext(CreateBookContext);


  const cover = [
    {
      title: 'Paperback',
      cost: 39.00
    },
    {
      title: 'Hardcover',
      cost: 59.00
    }
  ];

  const shipping = [
    {
      title: 'Standard Shipping',
      description: '9-14 business days',
      cost: 0.00
    },
    {
      title: 'Expedited Shipping',
      description: '7-10 business days',
      cost: 15.00
    }
  ];

  const debouncedUpdateBookType = useRef(
    debounce((value) => {
      updateDraft("bookType", value);
    }, 500)
  ).current;

  const debouncedUpdateShipping = useRef(
    debounce((value) => {
      updateDraft("shipping", value);
    }, 500)
  ).current;

  useEffect(() => {
    if (selectedCopies && typeof selectedCoverIndex === "number" && typeof selectedShippingIndex === "number") {
      
      
      const baseCopyCost = selectedCoverIndex === 0 ? 20.00 : 30.00;
      const coverCost = cover[selectedCoverIndex]?.cost || 0;
      const copiesCost = selectedCopies > 1 ? (selectedCopies - 1) * baseCopyCost : 0;
      const shippingCost = shipping[selectedShippingIndex]?.cost || 0;

      const calculatedSubtotal = coverCost + copiesCost + shippingCost;
      setSubtotal(calculatedSubtotal); 
      setTotalPrice(calculatedSubtotal);

      localStorage.setItem("selectedCopies", JSON.stringify(selectedCopies));
      localStorage.setItem("selectedCoverIndex", JSON.stringify(selectedCoverIndex));
      localStorage.setItem("selectedCover", JSON.stringify(selectedCover));
      localStorage.setItem("selectedShippingIndex", JSON.stringify(selectedShippingIndex));
      localStorage.setItem("subtotal", JSON.stringify(subtotal));
      localStorage.setItem("totalPrice", JSON.stringify(totalPrice));

    }

  }, [selectedCoverIndex, selectedCopies, selectedShippingIndex]);

  useEffect(() => {
    setProgressStep(7);
  }, [setProgressStep]);


  useEffect(() => {
    const coverTitle = cover[selectedCoverIndex]?.title || '';
    setSelectedCover(coverTitle);
    if (coverTitle) debouncedUpdateBookType(coverTitle);
  }, [selectedCoverIndex]);

  useEffect(() => {
    const shippingTitle = shipping[selectedShippingIndex]?.title || '';
  
    if (shippingTitle) debouncedUpdateShipping(shippingTitle);
  }, [selectedShippingIndex]);


  useEffect(() => {
    return () => {
      debouncedUpdateBookType.cancel();
      debouncedUpdateShipping.cancel();
    };
  }, []);

  const handleDecrease = () => {

    if (selectedCopies > 1) {
      setSelectedCopies(selectedCopies - 1);
    }
  };

  const handleIncrease = () => {

    if (selectedCopies < 15) {
      setSelectedCopies(selectedCopies + 1);
    }
  };

  return (
    <div className="pb-[17px]">
      <div className="text-[30px] font-bold text-center text-orange mb-[26px]">
        Checkout
      </div>
      <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start sm:pb-[20px] pb-[15px]">
        <div>
          <h2 className="field-title mb-[15px]">Choose your cover</h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-[20px] flex-1">
            <div className="flex justify-center gap-[10px]">
              {cover.map((option, index) => (
                <label
                  key={index}
                  className={`xs:w-[165px] w-[145px]  cursor-pointer transition border-[0.3px] border-[#bfbfbf]/50 text-[#6C6C6C] 
          ${selectedCoverIndex === index ?
                      "bg-[#DCDCDC] text-black border-[1px] border-gray"
                      :
                      "hover:bg-[#F0F0F0] bg-white border-[#bcbcbc]"}`}
                  style={{
                    borderWidth: selectedCoverIndex === index ? '1px' : '0.3px',
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
                  <div className="pl-[4px]">
                    <h3 className="text-[17px] font-medium text-black px-[6px] pt-[5px]">{option.title}</h3>
                    <p className="text-black text-[14px] px-[6px] pb-[5px]">{`${option.cost.toFixed(2)}`}</p>
                  </div>
                </label>
              ))}
            </div>

            <div className="flex flex-row md:gap-[8px] gap-[24px] items-center">
              <a
                className="hover:cursor-pointer hover:brightness-110"
                onClick={handleDecrease}
                onMouseDown={(e) => e.preventDefault()}
              >
                <svg className="w-[32px] h-[40px] sm:w-[21px] sm:h-[29px]" viewBox="0 0 21 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="10.5" cy="14.5" r="10.05" stroke="#2B2B2B" strokeWidth="0.9" />
                  <path d="M13.7068 14.0355V15.3636H8.29772V14.0355H13.7068Z" fill="#2B2B2B" />
                </svg>
              </a>
              <div className="text-center">
                <span><strong>{selectedCopies}</strong></span>
                <p>Copies</p>
              </div>
              <a
                className="hover:cursor-pointer hover:brightness-110"
                onClick={handleIncrease}
                onMouseDown={(e) => e.preventDefault()}
              >
                <svg className="w-[32px] h-[40px] sm:w-[21px] sm:h-[29px]" viewBox="0 0 21 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="10.5" cy="15.5" r="10.05" stroke="#2B2B2B" strokeWidth="0.9" />
                  <path d="M10.3231 19.1548V11.1861H11.6754V19.1548H10.3231ZM7.01487 15.8466V14.4943H14.9836V15.8466H7.01487Z" fill="#2B2B2B" />
                </svg>
              </a>
            </div>
          </div>

        </div>
      </div>
      <div className="flex flex-col items-center sm:items-start mt-[30px] sm:pb-[20px] pb-[15px]">
        <div>
          <h2 className="field-title mb-[15px]">Shipping Type</h2>
          <div className="flex items-center justify-center gap-[10px] flex-1">
            {shipping.map((option, index) => (
              <label
                key={index}
                className={`xs:w-[165px] w-[145px] cursor-pointer transition border-[0.3px] border-[#bfbfbf]/50 text-[#6C6C6C] 
                ${selectedShippingIndex === index ?
                    "bg-[#DCDCDC] text-black border-[1px] border-gray"
                    :
                    "hover:bg-[#F0F0F0] bg-white border-[#bcbcbc]"}`}
                style={{
                  borderWidth: selectedShippingIndex === index ? '1px' : '0.3px',
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
                <div className="text-gray inline-block">
                  <div className="text-left p-[8px] inline-block">
                    <h3 className="text-[17px] font-medium text-black">{option.title}</h3>
                    <p className="text-[14px] text-[#6C6C6C] hover:text-[#4b4b4b]">{option.description}</p>
                    <p>{`$${option.cost.toFixed(2)}`}</p>
                  </div>
                </div>
              </label>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-[30px] flex flex-col items-center sm:items-start">
        <div className="max-w-[325px] w-full">
          <div className="mb-[15px]">
            <h2 className="field-title">Order Summary</h2>
            <p className="text-[16px] text-[#727272]">Personalized full length book</p>
          </div>
          <div className=" flex gap-y-[10px] flex-col">
            <div className="flex justify-between">

              <span>Paperback Cover Book:</span>
              <span className="text-right">${(cover[selectedCoverIndex]?.cost || 0).toFixed(2)}</span>
            </div>
            <div className="flex justify-between">

              <span>Additional Copies:</span>
              <span className="text-right">
                ${((selectedCopies-1) * (selectedCoverIndex === 0 ? 20.00 : 30.00)).toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Shipping:</span>
              <span className="text-right">${(shipping[selectedShippingIndex]?.cost || 0).toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <strong><span>Subtotal:</span></strong>
              <strong><span className="text-right">${subtotal.toFixed(2)}</span></strong>
            </div>
          </div>
        </div>
      </div>
    </div >
 
  );
}

export default Step9;
