import updateDraft from "@/utils/draftUpdater";
import { debounce } from "lodash";

export const createImageUrl = (blob) => {
  if (blob instanceof Blob || blob instanceof File) {
    return URL.createObjectURL(blob);
  }

  if (typeof blob === "string") {
    return blob;
  }

  return null;
};


export const prepareImages = ({ authorImage, croppedImage, selectedTemplate }) => {
  return {
    cover: selectedTemplate.front || "",
    side: selectedTemplate.spine || "",
    back: selectedTemplate.back || "",
    originalPhoto: createImageUrl(authorImage),
    backgroundRemovePhoto: createImageUrl(croppedImage),
  };
};


export const debouncedImageUpdate = debounce((authorImage, croppedImage, selectedTemplate) => {
  const images = prepareImages({ authorImage, croppedImage, selectedTemplate });

  updateDraft("images", images);
}, 500);
