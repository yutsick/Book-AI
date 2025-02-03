import { domToPng } from 'modern-screenshot';
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
        root.render(
          createPortal(<CoverComponent type={type} data={contextData} />, wrapper)
        );

        setTimeout(async () => {
          await waitForImages(wrapper);
          resolve(wrapper);
        }, 500);
      });
    };

    const generateImage = async (element) => {
      try {
        const dataUrl = await domToPng(element, {
          scale: 2, // Висока якість
          backgroundColor: "white", // Уникаємо проблем із прозорістю
          cacheBust: false, // Уникнення проблем із кешуванням
          useBlob: false, // Дозволяє отримати Base64 напряму
          useCORS: true, // Підтримка зображень з інших доменів
        });

        return dataUrl;
      } catch (error) {
        console.error("❌ modern-screenshot rendering error:", error);
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
