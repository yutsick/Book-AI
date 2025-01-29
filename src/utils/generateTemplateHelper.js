import html2canvas from "html2canvas";
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
              img.onload = () => {
             
                resolve();
              };
              img.onerror = (err) => {
         
                reject(err);
              };
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

        console.log(`📦 Rendering ${type} with contextData:`, contextData);
        const root = createRoot(wrapper);
        root.render(
          createPortal(<CoverComponent type={type} data={contextData} />, wrapper)
        );


      

        setTimeout(async () => {
          await waitForImages(wrapper);
    
          resolve(wrapper);
        }, 500);
      });
    };

    const generateImage = async (element, type) => {


      // Створюємо клон, щоб html2canvas бачив реальний DOM
      const clone = element.cloneNode(true);
      clone.style.position = "absolute";
      clone.style.left = "0px";
      clone.style.top = "0px";
      clone.style.zIndex = "-9999";
      document.body.appendChild(clone);

      return await html2canvas(clone, {
        allowTaint: true,
        useCORS: true,
        scale: 2,
        logging: true,
        backgroundColor: null, // Фікс для прозорого фону
        removeContainer: true, // Запобігає подвійним DOM-елементам
      }).then((canvas) => {
        document.body.removeChild(clone);
   
        return canvas.toDataURL("image/png");
      });
    };

    (async () => {
      try {
        const frontElement = await createAndRender("front");
        const spineElement = await createAndRender("spine");
        const backElement = await createAndRender("back");

        const covers = {
          frontCover: await generateImage(frontElement, "front"),
          spineCover: await generateImage(spineElement, "spine"),
          backCover: await generateImage(backElement, "back"),
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
