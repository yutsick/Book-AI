import { drawTemplate1 } from "./coverHelpers/template1Helper";
import { drawTemplate2 } from "./coverHelpers/template2Helper";

export const generateCoverDesign = async (template, type, contextData) => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  canvas.width = type === "spine" ? 100 : 600;
  canvas.height = 800;

  // Викликаємо відповідний хелпер
  switch (template) {
    case "template1":
      await drawTemplate1(ctx, canvas, contextData); // Асинхронний виклик
      break;
    case "template2":
      await drawTemplate2(ctx, canvas, contextData); // Асинхронний виклик
      break;
    default:
      throw new Error(`Unknown template: ${template}`);
  }

  return canvas.toDataURL("image/png");
};
