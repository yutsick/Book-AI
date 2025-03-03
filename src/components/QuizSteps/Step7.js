import React, { useEffect, useState, useContext, useRef } from "react";
import { generateCoverById } from "@/utils/coverGenerators/coverGeneratorHelper";
import CoverSlider from "../CoverSlider/CoverSlider";
import ImageCropperModal from "@/components/ImageCropper/ImageCropperModal";
import CreateBookContext from "@/contexts/CreateBookContext";
import CreateGenreContext from "@/contexts/CreateGenreContext";

import usePraises from "@/hooks/usePraises";

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
  { id: 1, top: null, bottom: 173, left: 0, width: 350, height: 355, mobBottom: 140, mobLeft: 0, mobWidth: 280, mobHeight: 280 },
  { id: 2, top: null, bottom: 0, left: 0, width: 350, height: 420, mobTop: 0, mobBottom: 0.01, mobLeft: 0, mobWidth: 280, mobHeight: 350 },
  { id: 3, top: null, bottom: 10, left: 12, width: 327, height: 325, mobTop: null, mobBottom: 8, mobLeft: 0, mobWidth: 260, mobHeight: 260 },
  { id: 4,  top: 125, left: 78, width: 195, height: 195, mobTop: null, mobBottom: 175, mobLeft: 0, mobWidth: 155, mobHeight: 155, rounded: true  },
  { id: 5, top: null, bottom: 0, left: 0, width: 350, height: 527, mobTop: null, mobBottom: 0.01, mobLeft: 0, mobWidth: 280, mobHeight: 420 },
  { id: 6, top: 0, bottom: null, left: 0, width: 350, height: 330, mobTop: 0, mobLeft: 0, mobWidth: 280, mobHeight: 265 },
  { id: 7, top: null, bottom: 90, left: 60, width: 230, height: 248, mobTop: null, mobBottom: 70, mobLeft: 0, mobWidth: 190, mobHeight: 200, radius: true },
  { id: 8, top: null, bottom: 0, left:140,  width: 212, height: 200, mobTop: null, mobBottom: 0.01, mobLeft: 130, mobWidth: 152, mobHeight: 160 },
]
function Step7 ({ setProgressStep, setIsButtonDisabled }) {
  const {
    authorName,
    selectedGender,
    authorImage,
    processedAuthorImage,
    croppedImage,
    setCroppedImage,
    selectedTemplate,
    setSelectedTemplate
  } = useContext(CreateBookContext);

  const { selectedTopic, selectedSubTopic} = useContext(CreateGenreContext);

  const [selectedCover, setSelectedCover] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isRendered, setIsRendered] = useState(false);
  const [isCropperOpen, setIsCropperOpen] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  const [swiperSize, setSwiperSize] = useState({ width: 0, height: 0 });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef(null);

  const { praises, loading: praisesLoading } = usePraises();

  const [currentSlide, setCurrentSlide] = useState(0);
  const swiperInstance = useRef(null);

  const isMobile = () => /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);

  useEffect(() => {
    setProgressStep(5);
  }, [setProgressStep]);

  useEffect(() => {
    if (croppedImage && !praisesLoading ) {
      fetchGeneratedCover(selectedTemplate.templateId || 1);
    }
  }, [croppedImage, praisesLoading]);

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

    if (praisesLoading) {
      console.warn("⏳ Waiting for praises...");
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
        croppedImage, 
        praises
      };

      const cover = await generateCoverById(contextData, templateId);
      setSelectedCover(cover);

      setSelectedTemplate((prevTemplate) => ({
       
        ...prevTemplate,
        templateId,
        front: cover.frontCover,
        back: cover.backCover,
        spine: cover.spineCover,
        

      }));

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
      reader.onload = () => {
        setImageSrc(""); 
        setTimeout(() => setImageSrc(reader.result), 10);
      };
      reader.readAsDataURL(croppedImage);
    } else {
      setImageSrc("");
      setTimeout(() => setImageSrc(croppedImage), 10);
    }
  }, []);
  
  const handleCropSave = (newCroppedImage, crop, zoom) => {
    setCroppedImage(newCroppedImage);
  
    setSelectedTemplate((prevTemplate) => ({
      ...prevTemplate,
      crop: crop ?? prevTemplate.crop,  
      zoom: zoom ?? prevTemplate.zoom,  
    }));
  
    setIsCropperOpen(false);
    setIsModalOpen(false);
  };
  
  
  return (
    <>
      <div className={`relative w-full mt-4 md:mt-2 md:px-2 flex flex-col items-center md:items-start md:flex-row ${loading && !isRendered ? "md:justify-center" : "md:justify-end"  }  md:gap-24 `}>

        {isCropperOpen && (
          <div
            className="absolute inset-0 bg-black md:left-2 h-full md:right-2 bg-opacity-50 z-40"
            onClick={() => {
              setIsCropperOpen(false);
              setIsModalOpen(false);
            }}
          />
        )}

        {/* Slider */}
        <div className=" max-w-[350px] w-full flex justify-center items-center relative max-h-[420px] md:max-h-[648px]">

          {/* Modal crop window */}
          {isCropperOpen && selectedTemplate.templateId && (
            <>

              <ImageCropperModal
                ref={modalRef}
                imageSrc={imageSrc}
                cropperData={cropperData}
                swiperSize={swiperSize}
                templateId={selectedTemplate?.templateId}
                selectedTemplate={selectedTemplate || {}}
                setSelectedTemplate={setSelectedTemplate}
                onClose={() => {

                  setIsCropperOpen(false);
                  setIsModalOpen(false);
                }}
                onSave={(newCroppedImage, crop, zoom) =>
                  handleCropSave(newCroppedImage, crop, zoom)
                }
              />
            </>
          )}
          {loading ? (
            <div className="w-full flex justify-center items-center relative md:h-[648px]"
              style={{ height: swiperSize.height ? `${swiperSize.height}px` : "auto" }}
            >
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-amber-600 border-opacity-50"></div>
            </div>
          ) : selectedCover ? (
            <CoverSlider 
              selectedCover={selectedCover} 
              setSwiperSize={setSwiperSize} 
              swiperInstance={swiperInstance} 
            />
          ) : (
            <p>No cover selected</p>
          )}
        </div>
          {/* Button for the modal mobile*/}
      {isRendered && isMobile() && (
        <div className={`relative z-20 flex justify-center md:max-w-[350px] md:ml-[60px] transition-all duration-300 ${isModalOpen ? "mt-16" : "mt-4"
          }`}>
          <button
            className="text-[10px] font-semibold  text-[#2b2b2b] h-6 box-content w-[100px] flex items-center justify-center border-[0.4px] rounded-[3px] bg-[#ECECEC] border-[#2b2b2b] cursor-pointer"
            onClick={() => {
              setIsCropperOpen(true);
              setIsModalOpen(true);
              swiperInstance.current.slideTo(0); 
              
            }}
          >
            Adjust Image
            <span className="ml-2">
              <img src="images/icon-image-adjustment.svg" alt="" className="h-3"/>
            </span>
          </button>
        </div>
      )}
        {/* Previews list */}
        {isRendered && (
          <div className={` 
            mt-4
            md:mt-0 flex md:grid grid-cols-2 grid-rows-4 gap-4 w-full md:w-auto 
            h-[135px] md:h-auto overflow-x-auto md:overflow-visible whitespace-nowrap scrollbar-visible`}
          >
            {previewTemplates.map((preview) => (
              <div className="w-[90px] md:w-[79px] md:mt-[0.5px] flex-shrink-0 md:h-auto h-[130px]" key={preview.id}>
                <img
                  src={preview.src}
                  alt={preview.alt}
                  className="w-full pb-1 md:p-0 h-full md:h-auto cursor-pointer"
                  onClick={() => fetchGeneratedCover(preview.id)}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Button for the modal desktop*/}
      {isRendered && !isMobile() && (
        <div className={`relative z-20 flex justify-center md:max-w-[350px] md:ml-[60px] transition-all duration-300 ${isModalOpen ? "mt-14" : "mt-2"
          }`}>
          <button
            className="text-[12px] shadow-sm font-semibold text-[#2b2b2b] h-8 box-content w-[120px] flex items-center justify-center border-[0.4px] rounded-[3px]  border-[#2b2b2b] cursor-pointer bg-[#ECECEC]"
            onClick={() => {
              setIsCropperOpen(true);
              setIsModalOpen(true);
              swiperInstance.current.slideTo(0); 
            }}
          >
            Adjust Image
            <span className="ml-2">
              <img src="images/icon-image-adjustment.svg" alt="" className="h-4"/>
            </span>
          </button>
        </div>
      )}
    </>
  );
};

export default Step7;
