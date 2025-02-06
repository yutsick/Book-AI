import React, { useEffect, useState, useContext } from "react";
import { generateCoverById } from "@/utils/coverGenerators/coverGeneratorHelper";
import CoverSlider from "../CoverSlider/CoverSlider";
import ImageCropperModal from "@/components/ImageCropper/ImageCropperModal";
import CreateBookContext from "@/contexts/CreateBookContext";
import CreateGenreContext from "@/contexts/CreateGenreContext";

const previewTemplates = [
  { id: 1, src: "images/create-book/previews/front1.png", alt: "Template 1" },
  { id: 2, src: "images/create-book/previews/front2.png", alt: "Template 2" },
  { id: 3, src: "images/create-book/previews/front3.png", alt: "Template 3" },
  { id: 4, src: "images/create-book/previews/front4.png", alt: "Template 4" },
  { id: 5, src: "images/create-book/previews/front5.png", alt: "Template 5" },
  { id: 6, src: "images/create-book/previews/front6.png", alt: "Template 6" },
  { id: 7, src: "images/create-book/previews/front7.png", alt: "Template 7" },
  { id: 8, src: "images/create-book/previews/front8.png", alt: "Template 8" }
];

const cropperData = [
  {id:1, top:null, bottom:80, left:8, width:431, height:340},
  {id:2, top:null, bottom:215, left:8, width:431, height:433},
  {id:3, top:null, bottom:90, left:78, width:300, height:360},
  {id:4, top:0, bottom:null, left:8, width:431, height:405},
  {id:5, top:null, bottom:0, left:8, width:431, height:648},
  {id:6, top:null, bottom:113, left:85, width:278, height:302, radius: true},
  {id:7, top:null, bottom:113, left:85, width:278, height:302, radius: true},
  {id:8, top:null, bottom:12, left:20, width:407, height:400} 
]

const Step7 = ({ setProgressStep, setIsButtonDisabled }) => {
  const {
    authorName,
    authorImage,
    processedAuthorImage,
    croppedImage,
    setCroppedImage,
    selectedTemplate,
    setSelectedTemplate
  } = useContext(CreateBookContext);

  const { selectedTopic, selectedSubTopic } = useContext(CreateGenreContext);

  const [selectedCover, setSelectedCover] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isRendered, setIsRendered] = useState(false);
  const [isCropperOpen, setIsCropperOpen] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);

  useEffect(() => {
    setProgressStep(5);
  }, [setProgressStep]);


  useEffect(() => {
    if (croppedImage) {
      fetchGeneratedCover(selectedTemplate.templateId || 1);
    }
  }, [croppedImage]);

  useEffect(() => {
    setIsButtonDisabled(!croppedImage || loading);
    return () => {
      setIsButtonDisabled(false);
    };
  }, [setIsButtonDisabled, croppedImage, loading]);

  const fetchGeneratedCover = async (templateId) => {
    if (!croppedImage) {
      console.warn("⚠️ Waiting for `croppedImage`...");
      return;
    }

    setLoading(true);
    try {
      const contextData = {
        authorName,
        selectedTopic,
        selectedSubTopic,
        authorImage,
        processedAuthorImage,
        croppedImage
      };

      const cover = await generateCoverById(contextData, templateId);
      setSelectedCover(cover);

      setSelectedTemplate({
        templateId,
        front: cover.frontCover,
        back: cover.backCover,
        spine: cover.spineCover
      });

      if (!isRendered) setIsRendered(true);
    } catch (error) {
      console.error("❌ Error generating cover:", error);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    if (croppedImage && croppedImage instanceof File) {
      const reader = new FileReader();
      reader.onload = () => setImageSrc(reader.result);
      reader.readAsDataURL(croppedImage);
    } else {
      setImageSrc(croppedImage);
    }
  }, []);


  return (
    <>
      <div className="relative w-full mt-4 md:px-2 flex flex-col items-center md:flex-row justify-between">
        {/* Slider */}
        <div className="max-w-[431px] w-full flex justify-center items-center relative h-[420px] md:h-[648px]">
          {loading ? <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-amber-600 border-opacity-50"></div> : selectedCover ? <CoverSlider selectedCover={selectedCover} /> : <p>No cover selected</p>}
        </div>

        {/* Previews list */}
        {isRendered && (
          <div className="mt-4 md:mt-0 flex md:grid grid-cols-2 grid-rows-4 gap-4 w-full md:w-auto 
            h-[135px] md:h-auto overflow-x-auto md:overflow-visible whitespace-nowrap">
            {previewTemplates.map((preview) => (
              <div className="w-[90px]   flex-shrink-0 md:h-auto h-[130px] " key={preview.id}>
                <img
                  src={preview.src}
                  alt={preview.alt}
                  className="w-full h-auto cursor-pointer"
                  onClick={() => fetchGeneratedCover(preview.id)}
                />
              </div>
            ))}
          </div>

        )}

        {/* Modal crop window */}
        {isCropperOpen && imageSrc && (
          <ImageCropperModal
            cropperData={cropperData}
            templateId={selectedTemplate.templateId}
            imageSrc={imageSrc}
            onClose={() => setIsCropperOpen(false)}
            onSave={(newCroppedImage) => {
              setCroppedImage(newCroppedImage);
              setIsCropperOpen(false);
            }}
          />
        )}
      </div>

      {/* Button for the modal */}
      {isRendered && (
        <div className="flex justify-center md:max-w-[425px] md:pl-2">
          <button
            className="mt-8 md:mt-4 text-[14px] font-medium bg-[#EAAC0026] text-black shadow-md h-6 box-content w-[170px] flex items-center justify-center border rounded-[3px] border-[#878787] cursor-pointer"
            onClick={() => setIsCropperOpen(true)}
          >
            Adjust the Image
            <span className="ml-2">
              <img src="images/icon-image-adjustment.svg" alt="" />

            </span>
          </button>
        </div>
      )}
    </>
  );
};

export default Step7;
