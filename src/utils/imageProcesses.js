export const trimTransparentPixels = async (imageBlob) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = URL.createObjectURL(imageBlob);
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
  
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const { data, width, height } = imageData;
  
        let top = null, bottom = null, left = null, right = null;
  
        for (let y = 0; y < height; y++) {
          for (let x = 0; x < width; x++) {
            const alpha = data[(y * width + x) * 4 + 3];
            if (alpha !== 0) {
              if (top === null) top = y;
              bottom = y;
              if (left === null || x < left) left = x;
              if (right === null || x > right) right = x;
            }
          }
        }
  
        if (top === null || left === null || right === null || bottom === null) {
          resolve(null);
          return;
        }
  
        const trimmedWidth = right - left + 1;
        const trimmedHeight = bottom - top + 1;
  
        const trimmedCanvas = document.createElement('canvas');
        trimmedCanvas.width = trimmedWidth;
        trimmedCanvas.height = trimmedHeight;
  
        const trimmedCtx = trimmedCanvas.getContext('2d');
        trimmedCtx.drawImage(canvas, left, top, trimmedWidth, trimmedHeight, 0, 0, trimmedWidth, trimmedHeight);
  
        trimmedCanvas.toBlob((blob) => {
          resolve(blob);
        }, 'image/png');
      };
    });
  };

  export const resizeImage = async (file, maxWidth, maxHeight) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        let { width, height } = img;
        let scaleFactor = Math.min(maxWidth / width, maxHeight / height, 1);

        if (scaleFactor < 1) {
          width = Math.round(width * scaleFactor);
          height = Math.round(height * scaleFactor);
        }

        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d", { alpha: true });
        canvas.width = width;
        canvas.height = height;

        ctx.drawImage(img, 0, 0, width, height);
        canvas.toBlob((blob) => {
          const resizedFile = new File([blob], "resized-image.png", { type: "image/png" });
          resolve(resizedFile);
        }, "image/png", 0.8);
      };
    });
  };

  // Author image preview creation
  export const createPreview = async (file, maxWidth = 1024) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = URL.createObjectURL(file);
  
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
  
        const scaleFactor = Math.min(maxWidth / img.width, 1);
        const width = img.width * scaleFactor;
        const height = img.height * scaleFactor;
  
        canvas.width = width;
        canvas.height = height;
  
        // Якісне згладжування
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";
        ctx.drawImage(img, 0, 0, width, height);
  
        canvas.toBlob((blob) => {
          const previewUrl = URL.createObjectURL(blob);
          resolve(previewUrl); 
        }, "image/jpeg", 0.9);
      };
  
      img.onerror = (err) => {
        console.error("Preview creation error:", err);
        resolve(null);
      };
    });
  };
  