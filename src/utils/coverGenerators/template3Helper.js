import html2canvas from "html2canvas";
import { createRoot } from "react-dom/client";
import CoverTemplate3 from "@/components/CoversGenerator/CoverTemplate3";

export const generateTemplate3Covers = async (contextData, template) => {
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
            img.onload = resolve;
            img.onerror = (err) => {
              console.error("Error loading image:", err, img.src);
              reject(err);  
            };
          }
        })
    );
    await Promise.all(promises);
  };
  
  

  const createAndRender = async (type) => {
    // Створюємо обгортку для компонента
    const wrapper = document.createElement("div");
    wrapper.style.backgroundColor = "#F9F6EB";
    hiddenContainer.appendChild(wrapper);
  
    // Рендеримо компонент у wrapper
    const root = createRoot(wrapper);
    root.render(<CoverTemplate3 type={type} data={contextData} />);
  
    // Чекаємо, поки React завершить рендеринг
    await new Promise((resolve) => setTimeout(resolve, 100));
  
    // Чекаємо, поки зображення в компоненті завантажаться
    await waitForImages(wrapper);


    // Повертаємо готовий DOM-елемент
    return wrapper;
  };
  

  try {
    const frontElement = await createAndRender("front");
    
    const spineElement = await createAndRender("spine");
    const backElement = await createAndRender("back");

    const generateImage = async (element) => {

      return await html2canvas(element, {
        allowTaint: true,
        useCORS: true,
        scale: 2,
        logging: true,
      }).then((canvas) => canvas.toDataURL("image/png"));
    };

    const frontCover = await generateImage(frontElement);

    const spineCover = await generateImage(spineElement);
    const backCover = await generateImage(backElement);

    return { frontCover, spineCover, backCover };
  } finally {
    document.body.removeChild(hiddenContainer);
  }
};
