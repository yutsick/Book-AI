export const validateImage = async (file) => {
  const MIN_PIXELS = 300000; // 300,000 pixels
  const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/tiff"];
  const ERROR_PHRASE = "We recommend using a higher-resolution image for the best cover quality"; 

  const checkFileType = (file) => {
    if (!ALLOWED_TYPES.includes(file.type)) {
      return `Unsupported file type. Please upload an image in JPEG, PNG, or TIFF format`;
    }
    return true;
  };

  const classifyImageQuality = (width, height, sizeInMB) => {
    const totalPixels = width * height;

    if (totalPixels < MIN_PIXELS) {
      return 'Your image is smaller than 300x300. We recommend using a larger image for better cover quality';
    }

    const sizePerMegapixel = (sizeInMB * 1_000_000) / totalPixels;

    if (sizePerMegapixel >= 0.1) {
      return "High quality";
    } else {
      return ERROR_PHRASE;
    }
  };

  const checkResolution = (file) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        const width = img.width;
        const height = img.height;
        const sizeInMB = file.size / (1024 * 1024);
        resolve({ width, height, sizeInMB });
      };
      img.onerror = () => reject(ERROR_PHRASE);
      img.src = URL.createObjectURL(file);
    });
  };

  try {
    const typeValid = checkFileType(file);
    if (typeValid !== true) throw new Error(typeValid);

    const { width, height, sizeInMB } = await checkResolution(file);

    const qualityMessage = classifyImageQuality(width, height, sizeInMB);
    if (qualityMessage === ERROR_PHRASE) {
      throw new Error(ERROR_PHRASE);
    }

    return { valid: true };
  } catch (error) {

    return { valid: false, error: error.message || error };
  }
};
