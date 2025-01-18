import React, { useEffect, useState } from "react";
import ImageUploader from "@/components/ImageUploader/ImageUploader";

function Step6({ setProgressStep, handleFileChange }) {
  useEffect(() => {
    setProgressStep(4);
  }, [setProgressStep]);

  return (
    <div>
      <div className="w-full mt-2 md:px-6">
        <div className="field-title">
          Upload a photo to personalize your book’s cover.
        </div>
        <div className="field-desc">
          We recommend using a high-quality photo of Yaniv, either a portrait or a full upper body shot.
        </div>
        <div className="w-full flex justify-center mt-5">
          <ImageUploader onFileChange={handleFileChange}/>
{/* 
          <label htmlFor="file-upload" class=" w-[215px] h-[250px] border-2 border-dashed border-gray-300 rounded-md flex flex-col justify-center items-center text-center hover:shadow-md cursor-pointer">
            <div class="text-lg mb-2">📷</div>
            <div class="text-sm text-gray-600">
              Drop your image here or browse
            </div>
            <input id="file-upload" type="file" class="sr-only" />
          </label> */}


        </div>

      </div>
    </div>
  )
}

export default Step6
