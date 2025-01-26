export const validateImage = async (file) => {
  const checkResolution = (file) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        if (img.width >= 1024 && img.height >= 768) {
          resolve(true);
        } else {
          reject("The image you uploaded is low quality and may not look great on your book’s cover. We recommend uploading a higher-resolution photo for the best results");
        }
      };
      img.onerror = () => reject("Invalid image file.");
      img.src = URL.createObjectURL(file);
    });
  };

  const checkFileSize = (file) => {
    const minSize = 100 * 1024; // 100 KB
    const maxSize = 5 * 1024 * 1024; // 5 MB
    if (file.size >= minSize && file.size <= maxSize) {
      return true;
    }
    return `File size must be between 100 KB and 5 MB. Your file is ${Math.round(
      file.size / 1024
    )} KB.`;
  };

  const checkFileType = (file) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (allowedTypes.includes(file.type)) {
      return true;
    }
    return `Unsupported file type (${file.type}). Please upload JPEG, PNG, or WebP images.`;
  };

  try {
    await checkResolution(file);
    const sizeValid = checkFileSize(file);
    if (sizeValid !== true) throw new Error(sizeValid);

    const typeValid = checkFileType(file);
    if (typeValid !== true) throw new Error(typeValid);

    return { valid: true };
  } catch (error) {
    return { valid: false, error: error.message || error }; 
  }
};
