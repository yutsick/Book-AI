import React, { useState, useCallback, useEffect, useRef } from "react";
import Cropper from "react-easy-crop";
import getCroppedImg from "@/utils/cropImage";

const useScreenWidth = () => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return screenWidth;
};


const ImageCropperModal = ({ 
  imageSrc, 
  onClose, 
  onSave, 
  cropperData, 
  templateId, 
  swiperSize, 
  modalRef, 
  selectedTemplate, 
  setSelectedTemplate  
}) => {


  
  const defaultCrop = { x: 0, y: 0 };
  const defaultZoom = 1.5;

  const savedCrop = selectedTemplate?.crop || defaultCrop;
  const savedZoom = selectedTemplate?.zoom ?? defaultZoom;



  const [crop, setCrop] = useState(savedCrop);
  const [zoom, setZoom] = useState(savedZoom);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [imageURL, setImageURL] = useState(null);

  const selectedTemplateData = cropperData.find(
    (item) => Number(item.id) === Number(templateId)
  );



  
  if (!selectedTemplateData) return null;

  const { top, bottom, left, width, height, mobTop, mobLeft, mobWidth, mobHeight, mobBottom, radius, rounded } = selectedTemplateData;

  const isMobile = window.innerWidth <= 768;
  const [cropWidth, setCropWidth] = useState(isMobile ? mobWidth : width);
  const [cropHeight, setCropHeight] = useState(isMobile ? mobHeight : height);
  const [cropTop, setCropTop] = useState(mobTop);
  const [cropBottom, setCropBottom] = useState(mobBottom);
  const [cropLeft, setCropLeft] = useState(mobLeft);

  const { width: swiperWidth, height: swiperHeight } = swiperSize;

  const initialSwiperWidth = 280;
  const initialSwiperHeight = 420;

  const screenWidth = useScreenWidth();
const dynamicWidth = screenWidth >= 465 ? 488 : screenWidth - 46;

  useEffect(() => {
    const updateSize = () => {
      if (isMobile) {
        const scaleFactorWidth = swiperWidth / initialSwiperWidth;
        const scaleFactorHeight = swiperHeight / initialSwiperHeight;

        setCropWidth(mobWidth * scaleFactorWidth);
        setCropHeight(mobHeight * scaleFactorHeight);
        setCropTop(mobTop ? mobTop * scaleFactorHeight : undefined);
        setCropBottom(mobBottom ? mobBottom * scaleFactorHeight : undefined);
        setCropLeft(mobLeft ? mobLeft * scaleFactorWidth : undefined);
      } else {
        setCropWidth(width);
        setCropHeight(height);
        setCropTop(top);
        setCropBottom(bottom);
        setCropLeft(left);
      }
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, [swiperWidth, swiperHeight, width, height, mobWidth, mobHeight, top, bottom, left, mobTop, mobBottom, mobLeft]);

  const styles = isMobile
  ? {
      left: cropLeft != null ? `${cropLeft}px` : "50%",
      transform: cropLeft != null ? "none" : "translateX(-50%)",
      top: cropTop != null ? `${cropTop}px` : undefined,
      bottom: cropBottom != null ? `${cropBottom}px` : undefined,
      width: cropWidth,
      height: cropHeight,
      borderRadius: radius ? "50%" : "0",
    }
  : {
      top: cropTop != null ? `${cropTop}px` : undefined,
      bottom: cropBottom != null ? `${cropBottom}px` : undefined,
      left: cropLeft != null ? `${cropLeft}px` : undefined,
      width: cropWidth != null ? `${cropWidth}px` : undefined,
      height: cropHeight != null ? `${cropHeight}px` : undefined,
    };


    

  useEffect(() => {
    if (!imageSrc) return;

    if (imageSrc instanceof File) {
      const blobURL = URL.createObjectURL(imageSrc);
      setImageURL(blobURL);
      return () => URL.revokeObjectURL(blobURL);
    } else {
      setImageURL(imageSrc);
    }

  }, [imageSrc]);


 
  
  useEffect(() => {
    if (imageURL) {
      const img = new Image();
      img.src = imageURL;
      img.onload = () => setIsImageLoaded(true);
    }
  }, [imageURL]);

  useEffect(() => {
    setCrop(savedCrop);
    setZoom(savedZoom);
  }, [templateId]);

  const onCropComplete = useCallback((_, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleCropSave = async () => {
    if (!croppedAreaPixels || !imageURL) return;
    const croppedImage = await getCroppedImg(imageURL, croppedAreaPixels);
  
    onSave(croppedImage, { ...crop }, zoom);
    onClose();
  };
  

  return (
    <div
      className="absolute top-0 flex justify-center items-center z-50"
      style={{
        width: `${swiperWidth}px`,
        height: "100%",
      }}
    >
      <div ref={modalRef} className="w-full h-full relative">
        {isImageLoaded ? (
          <div className="absolute" style={styles}>
            <Cropper
              image={imageURL}
              crop={crop}
              zoom={zoom}
              minZoom={0.6}
              maxZoom={3}
              aspect={1}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
              objectFit="contain"
              restrictPosition={false}
              cropSize={{ width: cropWidth, height: cropHeight }}
              cropShape={radius ? "round" : "rect"}
              style={{
                containerStyle: {
                  borderRadius: rounded ? "8px" :  radius ? "50%" : "0",
                  transform: rounded ? "rotate(3.5deg)" : "none",
                },
              }}
            />
          </div>
        ) : (
          <p className="text-gray-500">Loading image...</p>
        )}

        <div className={`flex items-center justify-between md:px-4 px-2 md:gap-5 gap-3 bg-white bottom-[-60px] md:bottom-[-68px] left-1/2 -translate-x-1/2 md:-ml-1 absolute h-[60px] md:h-[68px]`}
        style={{ width: dynamicWidth }}>
          <div className="flex items-center gap-2 md:gap-5 flex-1">
            <div className="hidden md:block font-bold text-black">Zoom:</div>
            <input
              id="zoom-slider"
              type="range"
              min={0.6}
              max={3}
              step={0.01}
              value={zoom}
              onChange={(e) => setZoom(Number(e.target.value))}
              className="w-full h-[6.5px] bg-zinc-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-orange accent-orange "
            />
          </div>

          <div className="flex gap-2 justify-between text-[10.5px] md:text-[15px] text-white font-semibold">
            <button className="bg-orange w-[51px] md:w-[70px] h-[23px] md:h-[27px] flex justify-center items-center rounded-[3px]" onClick={handleCropSave} disabled={!isImageLoaded}>
              Save
            </button>
            <button className="bg-[#868686] w-[51px] md:w-[70px] h-[23px] md:h-[27px] flex justify-center items-center rounded-[3px]" onClick={onClose}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageCropperModal;
