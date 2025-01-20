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
        </div>

      </div>
    </div>
  )
}

export default Step6
