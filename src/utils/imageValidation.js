export const validateImage = async (file) => {
  const MIN_WIDTH = 300;
  const MIN_HEIGHT = 300;
  const MIN_PIXELS = 300000;
  const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/tiff"];
  const ERROR_PHRASE = "For the best cover quality, use a higher-resolution image"; 

  if (!ALLOWED_TYPES.includes(file.type)) {
    return { valid: false, errorType: "unsupported_type", error: "Unsupported file type. Please upload an image in JPEG, PNG, or TIFF format." };
  }

  const checkResolution = (file) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const reader = new FileReader();

      reader.onload = () => {
        img.onload = () => {
          const width = img.width;
          const height = img.height;
          const sizeInMB = file.size / (1024 * 1024);

          if (width < MIN_WIDTH || height < MIN_HEIGHT) {
            reject({ errorType: "low_resolution", error: "Your image is smaller than 300x300. We recommend using a larger image for better cover quality" });
            return;
          }

          resolve({ width, height, sizeInMB });
        };

        img.onerror = () => reject({ errorType: "invalid_image", error: ERROR_PHRASE });
        img.src = reader.result;
      };

      reader.onerror = () => reject({ errorType: "invalid_file", error: "Error loading image." });
      reader.readAsDataURL(file);
    });
  };

  const classifyImageQuality = (width, height, sizeInMB) => {
    const totalPixels = width * height;
    if (totalPixels < MIN_PIXELS) {
      return { valid: false, errorType: "low_quality", error: ERROR_PHRASE };
    }

    const sizePerMegapixel = (sizeInMB * 1_000_000) / totalPixels;
    return sizePerMegapixel >= 0.045 ? { valid: true } : { valid: false, errorType: "low_quality", error: ERROR_PHRASE };
  };

  try {
    const { width, height, sizeInMB } = await checkResolution(file);

    const qualityResult = classifyImageQuality(width, height, sizeInMB);
    if (!qualityResult.valid) {
      throw qualityResult;
    }

    return { valid: true };
  } catch (error) {
    return { valid: false, errorType: error.errorType || "unknown", error: error.error || ERROR_PHRASE };
  }
};
