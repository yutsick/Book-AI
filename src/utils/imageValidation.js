export const validateImage = async (file) => {
  const MIN_PIXELS = 300000; // 300,000 pixels
  const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/tiff"]; 


  const checkFileType = (file) => {
    if (!ALLOWED_TYPES.includes(file.type)) {
      return `Unsupported file type (${file.type}). Please upload JPEG, PNG, or TIFF images.`;
    }
    return true;
  };

 
  const classifyImageQuality = (width, height, sizeInMB) => {
    const totalPixels = width * height;

   
    if (totalPixels < MIN_PIXELS) {
      return "Low quality: Image resolution is too low (< 300,000 pixels).";
    }

   
    const sizePerMegapixel = (sizeInMB * 1_000_000) / totalPixels;

    
    if (sizePerMegapixel >= 0.1) {
      return "High quality"; 
    } else {
      return "Low quality: Image is heavily compressed (ρ < 0.1).";
    }
  };

  // Resolution
  const checkResolution = (file) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        const width = img.width;
        const height = img.height;
        const sizeInMB = file.size / (1024 * 1024); 
        resolve({ width, height, sizeInMB });
      };
      img.onerror = () => reject("Invalid image file.");
      img.src = URL.createObjectURL(file);
    });
  };

  try {
    // File type
    const typeValid = checkFileType(file);
    if (typeValid !== true) throw new Error(typeValid);

    // Resolution
    const { width, height, sizeInMB } = await checkResolution(file);

    // Quality
    const qualityMessage = classifyImageQuality(width, height, sizeInMB);
    if (qualityMessage.startsWith("Low quality")) {
      throw new Error(qualityMessage);
    }

    // ✅ Success
    return { valid: true };
  } catch (error) {
    return { valid: false, error: error.message || error };
  }
};
