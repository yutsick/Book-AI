import React, { useState, useCallback, useEffect } from "react";
import Cropper from "react-easy-crop";
import getCroppedImg from "@/utils/cropImage";

const ImageCropperModal = ({ imageSrc, onClose, onSave, cropperData, templateId }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1.5);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [imageURL, setImageURL] = useState(null);
const selectedTemplate  = cropperData.find((item) => item.id === templateId);
const {top, bottom, left, width, height,  radius} = selectedTemplate;
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

  const onCropComplete = useCallback((_, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleCropSave = async () => {
    if (!croppedAreaPixels || !imageURL) return;
    const croppedImage = await getCroppedImg(imageURL, croppedAreaPixels);
    onSave(croppedImage);
    onClose();
  };

  return (
    <div className="absolute h-full inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className=" w-full h-full relative">
        {isImageLoaded ? (
          <div
          className={`absolute  `}
          style={{
            ...(top !== null && { top: `${top}px` }),
            ...(bottom !== null && { bottom: `${bottom}px` }),
            ...(left !== null && { left: `${left}px` }),
            ...( { width: `${width}px` }),
            ...({ height: `${height}px` }),
          }}
          
        >
        
            <Cropper
              image={imageURL}
              crop={crop}
              zoom={zoom}
              minZoom={0.6} 
              maxZoom={3}
              aspect={1}
              onCropChange={setCrop}
              onZoomChange={(z) => setZoom(Math.max(1, z))} 
              onCropComplete={onCropComplete}
              objectFit= "contain"
              restrictPosition={false}
              cropSize={{ width, height}} 
              cropShape= {radius ? "round" : "rect"}
              style={{ 
                containerStyle: {
                  borderRadius: radius ? "50%" : "0",
                }
               }}

            />
          </div>
        ) : (
          <p className="text-gray-500">Loading image...</p>
        )}
      <div className="flex flex-col bg-white p-4 right-0 absolute w-[250px] h-[200px]">
      <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-2xl"
          onClick={onClose}
        >
          ✖
        </button>
      <h2 className="text-lg font-semibold mb-3">Adjust Your Image</h2>
        <div className="flex items-centerflex-col gap-2 mt-4">
          
          <label htmlFor="zoom-slider" className="text-sm text-gray-500">
            Zoom:
          </label>
          <input
            id="zoom-slider"
            type="range"
            min={0.6} 
            max={3}
            step={0.01}
            value={zoom}
            onChange={(e) => setZoom(Math.max(0.6, Number(e.target.value)))}
            className="w-full h-1 bg-zinc-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-orange accent-orange"
          />
        </div>

        <div className="mt-4 flex gap-4">
          <button className="bg-black/30 text-gray py-2 px-4 rounded-md" onClick={onClose}>
            Cancel
          </button>
          <button
            className="bg-orange text-white py-2 px-4 rounded-md"
            onClick={handleCropSave}
            disabled={!isImageLoaded}
          >
            Save
          </button>
        </div>
        </div>
      </div>
    </div>
  );
};

export default ImageCropperModal;
