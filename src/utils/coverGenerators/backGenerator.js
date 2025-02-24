import { f } from "html2pdf.js";
import JsBarcode from "jsbarcode";

export const generateBookBackCover = ({ author, praises, metaColor, website, fontSize=12 }) => {
  //  EAN-13 
  const barcodeValue = "558462162004"; 

  // Barcode Base64
  const barcodeCanvas = document.createElement("canvas");
  JsBarcode(barcodeCanvas, barcodeValue, { format: "EAN13" });

  const barcodeSrc = barcodeCanvas.toDataURL("image/png");

  return (
    <div className="relative w-full h-full px-9 pt-14 pb-8  flex flex-col justify-between">
      {/* Testimonials */}
      <div className="space-y-5 px-9">
        {praises.slice(0, 5).map((praise, index) => (
          <div key={index} className="">
            <p 
            className={`text-[${fontSize}px] font-semibold `}
            style={{ 
              lineHeight: `${fontSize*1.25}px`,
            }}
            >“{praise.text}”</p>
            <p className="mt-1.5 text-[10px] text-right italic">{praise.source}</p>
          </div>
        ))}
      </div>
      <div className="flex justify-between items-end">
        {/* Meta data */}
        <div className="flex flex-col gap-1"
        style={{ color: metaColor }}>
          <div className="flex flex-col gap-0 text-[13px] leading-[13px] ">
            <div className="font-medium  ">Visitus at</div>
            <div className="font-bold  ">{website}</div>
          </div>
          <img src="images/main-logo.svg" alt="" className="w-[105px]"/>

          {/* <p className="">{author}</p> */}
        </div>

        {/* Barcode */}
        <div className="mt-4">
          <img src={barcodeSrc} alt="ISBN Barcode" className="h-[62px]" />
        </div>
      </div>
    </div>
  );
};
