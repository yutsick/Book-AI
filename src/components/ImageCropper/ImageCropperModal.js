import React, { useState, useCallback, useEffect } from "react";
import Cropper from "react-easy-crop";
import getCroppedImg from "@/utils/cropImage";

const ImageCropperModal = ({ imageSrc, onClose, onSave }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [imageURL, setImageURL] = useState(null);

  useEffect(() => {
    if (!imageSrc) return;

    if (imageSrc instanceof File) {
      // ✅ Використовуємо `URL.createObjectURL(file)` для створення blob URL
      const blobURL = URL.createObjectURL(imageSrc);
      setImageURL(blobURL);

      // Очистка URL при розмонтуванні компонента
      return () => URL.revokeObjectURL(blobURL);
    } else {
      setImageURL(imageSrc); // Якщо вже URL або base64
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-5 rounded-md w-[320px] flex flex-col items-center relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-2xl"
          onClick={onClose}
        >
          ✖
        </button>

        <h2 className="text-lg font-semibold mb-3">Adjust Your Image</h2>

        {isImageLoaded ? (
          <div className="relative w-[250px] h-[250px] bg-gray-200">
            <Cropper
              image={imageURL} // ✅ Використовуємо об'єктний URL
              crop={crop}
              zoom={zoom}
              aspect={1}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
            />
          </div>
        ) : (
          <p className="text-gray-500">Loading image...</p>
        )}

        <div className="mt-4 flex gap-4">
          <button className="bg-gray-500 text-white py-2 px-4 rounded-md" onClick={onClose}>
            Cancel
          </button>
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded-md"
            onClick={handleCropSave}
            disabled={!isImageLoaded}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageCropperModal;
