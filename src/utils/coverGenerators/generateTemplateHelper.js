import * as htmlToImage from 'html-to-image';
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

    const createAndRender = async (type) => {
      return new Promise((resolve) => {
        const wrapper = document.createElement("div");
        wrapper.style.backgroundColor = "#F9F6EB";
        wrapper.style.width = "431px";
        wrapper.style.height = "648px";
        hiddenContainer.appendChild(wrapper);

        const root = createRoot(wrapper);
        root.render(createPortal(<CoverComponent type={type} data={contextData} />, wrapper));

        setTimeout(async () => {
          await waitForImages(wrapper);
          resolve(wrapper);
        }, 500);
      });
    };


    const generateImage = async (element) => {
      try {
        const scaleFactor = 2; // Масштаб у 2 рази
    
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
    
        // Встановлюємо розміри з подвоєним масштабом
        canvas.width = element.offsetWidth * scaleFactor;
        canvas.height = element.offsetHeight * scaleFactor;
    
        const dataUrl = await htmlToImage.toCanvas(element, {
          backgroundColor: "white", // Запобігає проблемам з прозорістю на iOS
          pixelRatio: scaleFactor, // Висока якість
          width: canvas.width, 
          height: canvas.height,
        });
    
        ctx.drawImage(dataUrl, 0, 0); // Малюємо зображення на Canvas
        return canvas.toDataURL("image/png"); // Отримуємо Base64 PNG
      } catch (error) {
        console.error("❌ html-to-image rendering error:", error);
        return null;
      }
    };
    
    

    // ✅ Функція конвертації Blob → Base64
   

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
        document.body.removeChild(hiddenContainer);
      }
    })();
  });
};
