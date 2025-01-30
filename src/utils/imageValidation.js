export const validateImage = async (file) => {
  const MIN_WIDTH = 2550; // Мінімальна ширина (для 8.5x11")
  const MIN_HEIGHT = 3300; // Мінімальна висота (для 8.5x11")
  const TARGET_DPI = 300; // Мінімальна роздільна здатність у DPI
  const ALLOWED_ASPECT_RATIO = 8.5 / 11; // Співвідношення сторін 8.5:11
  const MIN_SIZE = 100 * 1024; // 100 KB
  const MAX_SIZE = 5 * 1024 * 1024; // 5 MB
  const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/tiff"];

  const checkResolutionAndDPI = (file) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        const width = img.width;
        const height = img.height;

    
        // 📌 Перевірка DPI (припускаючи, що всі зображення 300 DPI)
        const calculatedDPI = width / (8.5 / 300); // Вважаємо DPI для 8.5-дюймової ширини
        if (calculatedDPI < TARGET_DPI) {
          return reject(`The image DPI (${calculatedDPI.toFixed(2)}) is too low. Please upload a 300 DPI image.`);
        }

        // 📌 Перевірка аспектного співвідношення
        const aspectRatio = width / height;
        if (Math.abs(aspectRatio - ALLOWED_ASPECT_RATIO) > 0.02) {
          return reject(`Incorrect aspect ratio (${aspectRatio.toFixed(2)}). The image should match 8.5:11.`);
        }

            // 📌 Перевірка мінімальної роздільної здатності
            if (width < MIN_WIDTH || height < MIN_HEIGHT) {
              return reject(`The image resolution is too low (${width}x${height}). Please upload at least ${MIN_WIDTH}x${MIN_HEIGHT} pixels.`);
            }
    

        resolve(true);
      };
      img.onerror = () => reject("Invalid image file.");
      img.src = URL.createObjectURL(file);
    });
  };

  const checkFileSize = (file) => {
    if (file.size >= MIN_SIZE && file.size <= MAX_SIZE) {
      return true;
    }
    return `File size must be between 100 KB and 5 MB. Your file is ${Math.round(file.size / 1024)} KB.`;
  };

  const checkFileType = (file) => {
    if (ALLOWED_TYPES.includes(file.type)) {
      return true;
    }
    return `Unsupported file type (${file.type}). Please upload JPEG, PNG, or TIFF images.`;
  };

  const checkSharpness = async (file) => {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = new Image();

      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0, img.width, img.height);

        // 🔥 Розрахунок різкості через Sobel оператор
        const imageData = ctx.getImageData(0, 0, img.width, img.height);
        const pixels = imageData.data;
        let sumGradient = 0;

        for (let i = 0; i < pixels.length; i += 4) {
          const gray = 0.299 * pixels[i] + 0.587 * pixels[i + 1] + 0.114 * pixels[i + 2]; // Відтінок сірого
          sumGradient += Math.abs(gray - (pixels[i - 4] || gray)); // Різниця яскравості пікселів
        }

        const sharpnessScore = sumGradient / pixels.length;
        console.log("Sharpness Score:", sharpnessScore);

        if (sharpnessScore < 5) {
          return reject("The image appears blurry. Please use a higher-quality, sharper image.");
        }

        resolve(true);
      };

      img.onerror = () => reject("Invalid image file.");
      img.src = URL.createObjectURL(file);
    });
  };

  try {
    await checkSharpness(file);
    await checkResolutionAndDPI(file);
   

    const sizeValid = checkFileSize(file);
    if (sizeValid !== true) throw new Error(sizeValid);

    const typeValid = checkFileType(file);
    if (typeValid !== true) throw new Error(typeValid);

    return { valid: true };
  } catch (error) {
    return { valid: false, error: error.message || error };
  }
};
