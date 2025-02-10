import { domToBlob } from "modern-screenshot";
import { createRoot } from "react-dom/client";
import { createPortal } from "react-dom";

export const generateTemplateCovers = async (contextData, CoverComponent) => {
  return new Promise((resolve, reject) => {
    const hiddenContainer = document.createElement("div");


    hiddenContainer.style.position = "absolute";
  hiddenContainer.style.top = "-9999px"; 
  hiddenContainer.style.left = "-9999px";


    hiddenContainer.style.pointerEvents = "none"; 
     

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
          createPortal(<CoverComponent key={type + Date.now()}  type={type} data={contextData} />, wrapper)
        );

        setTimeout(async () => {
          await waitForImages(wrapper);
          resolve(wrapper);
        }, 1200);
      });
    };

    const waitForRender = (element, timeout = 1000) => {
      return new Promise((resolve) => {
        const start = Date.now();
    
        const checkRender = () => {
          const rect = element.getBoundingClientRect();
          const computedStyle = window.getComputedStyle(element);
          const isVisible = computedStyle.visibility !== "hidden" && computedStyle.opacity !== "0";
    
          if (rect.width > 0 && rect.height > 0 && isVisible) {
            return resolve();
          }і
    
          if (Date.now() - start > timeout) {
            console.warn("⏳ Render timeout! Continuing...");
            return resolve();
          }
    
          requestAnimationFrame(checkRender);
        };
    
        requestAnimationFrame(() => {
          requestAnimationFrame(checkRender);
        });
      });
    };
    
    const generateImage = async (element, attempt = 1) => {
      try {
        const restoreGrayscale = fixGrayscaleBeforeScreenshot(element); 

        const isMobile = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);
        const isIOS = /iPhone|iPad/i.test(navigator.userAgent);
        if (isIOS) {

          await waitForImages(element); 
          await waitForRender(element); 
          await new Promise((resolve) => setTimeout(resolve, 500));  
        }
        
        

        await new Promise((resolve) => requestAnimationFrame(resolve));
        const blob = await domToBlob(element, {
          scale: isMobile ? 1 : 4, 

          cacheBust: false,
          useBlob: true,
          useCORS: true,
        });

       

        restoreGrayscale(); 

        return blob ? URL.createObjectURL(blob) : null; // 🔥 Blob URL
        // return dataUrl;
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
        document.body.removeChild(hiddenContainer);
      }
    })();
  });
};
