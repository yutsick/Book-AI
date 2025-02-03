// import html2canvas from "html2canvas";
// import domtoimage from "dom-to-image";
import html2canvas from "@wtto00/html2canvas";


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

    const fixObjectFit = (container) => {
      container.querySelectorAll("img").forEach(img => {
          const style = getComputedStyle(img);
          if (style.objectFit === "contain" || style.objectFit === "cover") {
              // ✅ Створюємо div замість img
              const wrapper = document.createElement("div");
              wrapper.style.width = img.width + "px";
              wrapper.style.height = img.height + "px";
              wrapper.style.backgroundImage = `url("${img.src}")`;
              wrapper.style.backgroundSize = style.objectFit; // "contain" або "cover"
              wrapper.style.backgroundPosition = "center 98%"; // 🔹 Запобігає білим полосам
              wrapper.style.backgroundRepeat = "no-repeat";
              wrapper.style.display = "inline-block";
              wrapper.style.overflow = "hidden"; // 🔹 Уникає межових артефактів
              wrapper.style.borderRadius = "0.1px"; // 🔹 Хак для виправлення артефактів
  
              // ✅ Замінюємо img на div
              img.replaceWith(wrapper);
          }
      });
  };
  
 



   

const generateImage = async (element, type) => {
    // ✅ Клонуємо елемент, щоб уникнути змін у DOM
    const clone = element.cloneNode(true);
    clone.style.position = "absolute";
    clone.style.left = "0px";
    clone.style.top = "0px";
    clone.style.zIndex = "-9999";
    document.body.appendChild(clone);

 

    try {
        
      const canvas = await html2canvas(clone, {
        backgroundColor: null,
        useCORS: true,
        scale: 2,
        logging: false,
        allowTaint: false,
        imageSmoothingEnabled: false,
        style: {
            width: `${clone.offsetWidth}px`, // 🔹 Фіксуємо оригінальні розміри
            height: `${clone.offsetHeight}px`
        }
    });

        const dataUrl = canvas.toDataURL("image/png");

        // ✅ Видаляємо клонований елемент
        document.body.removeChild(clone);

        return dataUrl;
    } catch (error) {
        console.error("❌ html2canvas rendering error:", error);
        document.body.removeChild(clone);
        return null;
    }
};




    // const generateImage = async (element, type) => {
      
    //     const clone = element.cloneNode(true);
    //     clone.style.position = "absolute";
    //     clone.style.left = "0px";
    //     clone.style.top = "0px";
    //     clone.style.zIndex = "-9999";
    //     document.body.appendChild(clone);
    
    //     try {
           
    //         const canvas = await html2canvas(clone, {
    //             backgroundColor: null, 
    //             useCORS: true, 
    //             scale: 4, 
    //             logging: false, 
    //             allowTaint: false, 
    //             imageSmoothingEnabled: false,
    //             width: clone.offsetWidth, 
    //             height: clone.offsetHeight
    //         });
    
    //         const dataUrl = canvas.toDataURL(type === "jpeg" ? "image/jpeg" : "image/png", 1.0);
    
    //         document.body.removeChild(clone);
    
    //         return dataUrl;
    //     } catch (error) {
    //         console.error("❌ html2canvas rendering error:", error);
    //         document.body.removeChild(clone);
    //         return null;
    //     }
    // };
    
    // const generateImage = async (element, type) => {

    //   const clone = element.cloneNode(true);
    //   clone.style.position = "absolute";
    //   clone.style.left = "0px";
    //   clone.style.top = "0px";
    //   clone.style.zIndex = "-9999";
    //   document.body.appendChild(clone);


    //   return await domtoimage.toPng(clone, {
    //     quality: 1, 
    //     bgcolor: "transparent", 
    //     useCORS: true,
    //     width: clone.offsetWidth * 4, 
    //     height: clone.offsetHeight * 4,
    //     style: {
    //       transform: "scale(4)", 
    //       transformOrigin: "top left",
    //       width: `${clone.offsetWidth * 4}px`, 
    //       height: `${clone.offsetHeight * 4}px`,
    //       textRendering: "geometricPrecision",
    //     },
    //   })
    //     .then((dataUrl) => {
    //       document.body.removeChild(clone);
    //       return dataUrl;
    //     })
    //     .catch((error) => {
    //       console.error("❌ Rendering error:", error);
    //       document.body.removeChild(clone);
    //       return null;
    //     });


    // };

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
