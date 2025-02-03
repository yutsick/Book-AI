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

        const blob = await htmlToImage.toBlob(element, {
          backgroundColor: "white", // ✅ Уникнення проблем з прозорістю на iOS
          pixelRatio: Math.max(2, window.devicePixelRatio * scaleFactor), // ✅ Висока якість
          width: element.offsetWidth * scaleFactor, // ✅ Подвоєна ширина
          height: element.offsetHeight * scaleFactor, // ✅ Подвоєна висота
          // cacheBust: true, // ✅ Запобігання кешуванню
          style: {
            transform: `scale(${scaleFactor})`,
            transformOrigin: "top left",
            width: `${element.offsetWidth}px`,
            height: `${element.offsetHeight}px`,
          },
        });

        // ✅ Перетворення `Blob` у Base64 для iOS
        const dataUrl = await blobToBase64(blob);

        return dataUrl;
      } catch (error) {
        console.error("❌ html-to-image rendering error:", error);
        return null;
      }
    };

    // ✅ Функція конвертації Blob → Base64
    const blobToBase64 = (blob) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
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
