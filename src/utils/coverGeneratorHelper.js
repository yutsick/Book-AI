import { generateTemplate1Covers } from "./coverGenerators/template1Helper";
import { generateTemplate2Covers } from "./coverGenerators/template2Helper";
import { generateTemplate3Covers } from "./coverGenerators/template3Helper";
import { generateTemplate4Covers } from "./coverGenerators/template4Helper";
import { generateTemplate5Covers } from "./coverGenerators/template5Helper";
import { generateTemplate6Covers } from "./coverGenerators/template6Helper";
import { generateTemplate7Covers } from "./coverGenerators/template7Helper";
import { generateTemplate8Covers } from "./coverGenerators/template8Helper";
// import { generateTemplate2Covers } from "./coverGenerators/template2Helper";
// Додайте решту темплейтів
// import { generateTemplate8Covers } from "./coverGenerators/template8Helper";

export const generateAllCovers = async (contextData) => {
  
  const templates = [
    generateTemplate1Covers,
    generateTemplate2Covers,
    generateTemplate3Covers,
    generateTemplate4Covers,
    generateTemplate5Covers,
    generateTemplate6Covers,
    generateTemplate7Covers,
    generateTemplate8Covers,
    // Додайте решту функцій
    // generateTemplate8Covers,
  ];

  const allCovers = [];

  for (const generateCovers of templates) {


    const covers = await generateCovers(contextData);
    allCovers.push(covers);
  }

  return allCovers;
};
