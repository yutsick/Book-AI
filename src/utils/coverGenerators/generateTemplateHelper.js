import { domToPng } from "modern-screenshot";
import { createRoot } from "react-dom/client";
import { createPortal } from "react-dom";

export const generateTemplateCovers = async (contextData, CoverComponent) => {
  return new Promise((resolve, reject) => {
    const hiddenContainer = document.createElement("div");
    hiddenContainer.style.position = "absolute";
    hiddenContainer.style.width = "431px";
    hiddenContainer.style.height = "648px";
    hiddenContainer.style.top = "-9999px";
    hiddenContainer.style.left = "-9999px";
    document.body.appendChild(hiddenContainer);

    const waitForImages = async (element) => {
      const images = element.querySelectorAll("img");
      const promises = Array.from(images).map(
        (img) =>
          new Promise((resolve, reject) => {
            if (img.complete) {
              resolve();
            } else {
              img.onload = () => resolve();
              img.onerror = (err) => reject(err);
            }
          })
      );
      await Promise.all(promises);
    };

    const fixGrayscaleBeforeScreenshot = (element) => {
      if (element.classList.contains("CoverTemplate5")) {
        const grayscaleElements = element.querySelectorAll("[data-disable-grayscale]");

        grayscaleElements.forEach((el) => {
          el.dataset.originalFilter = el.style.filter; 
          el.style.filter = "none";
        });

        return () => {
          grayscaleElements.forEach((el) => {
            el.style.filter = el.dataset.originalFilter || "grayscale(100%)";
          });
        };
      }
      return () => {}; 
    };

    const createAndRender = async (type) => {
      return new Promise((resolve) => {
        const wrapper = document.createElement("div");
        wrapper.style.backgroundColor = "#F9F6EB";
        wrapper.style.width = "431px";
        wrapper.style.height = "648px";
        hiddenContainer.appendChild(wrapper);

        const root = createRoot(wrapper);
        root.render(
          createPortal(<CoverComponent type={type} data={contextData} />, wrapper)
        );

        setTimeout(async () => {
          await waitForImages(wrapper);
          resolve(wrapper);
        }, 1200);
      });
    };
    const disableLazyLoading = (element) => {
      const images = element.querySelectorAll("img");
      images.forEach((img) => {
        img.loading = "eager";  // Примусовий рендер без Lazy Loading
        img.decoding = "sync";  // Синхронне декодування
        if (!img.complete) {
          img.src = img.src;  // Примусове оновлення src (деякі браузери можуть "пропускати" рендер)
        }
      });
    };
    
    const forceLoadImages = async (element) => {
      const images = element.querySelectorAll("img");
      for (const img of images) {
        if (!img.complete || img.naturalWidth === 0) {
          console.warn(`🔄 Force reloading image: ${img.src}`);
          img.src = img.src;  // Примусове оновлення
          await new Promise((resolve) => setTimeout(resolve, 100)); // Невелика затримка для безпеки
        }
      }
    };
    
   
  
    
    
    const generateImage = async (element, attempt = 1) => {
      try {
        const restoreGrayscale = fixGrayscaleBeforeScreenshot(element); 

        disableLazyLoading(wrapper);
      
        await waitForImages(wrapper);
        await forceLoadImages(wrapper);

        const dataUrl = await domToPng(element, {
          scale: 4,
          cacheBust: false,
          useBlob: false,
          useCORS: true,
        });

        restoreGrayscale(); 

        return dataUrl;
      } catch (error) {

        console.error(`❌ Cover rendering error (attempt ${attempt}):`, error);

        if (attempt < 3) { 
          console.warn(`🔄 Retrying screenshot (attempt ${attempt + 1})...`);
          return generateImage(element, attempt + 1);
        }

        return null;
      }
    };

    (async () => {
      try {
        const frontElement = await createAndRender("front");
        const spineElement = await createAndRender("spine");
        const backElement = await createAndRender("back");

        const covers = {
          frontCover: await generateImage(frontElement),
          spineCover: await generateImage(spineElement),
          backCover: await generateImage(backElement),
        };

        resolve(covers);
      } catch (error) {
        reject(error);
      } finally {
        // document.body.removeChild(hiddenContainer);
      }
    })();
  });
};
