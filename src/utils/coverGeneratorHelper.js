import { generateTemplate1Covers } from "./coverGenerators/template1Helper";
import { generateTemplate2Covers } from "./coverGenerators/template2Helper";
// import { generateTemplate2Covers } from "./coverGenerators/template2Helper";
// Додайте решту темплейтів
// import { generateTemplate8Covers } from "./coverGenerators/template8Helper";

export const generateAllCovers = async (contextData) => {
  
  const templates = [
    generateTemplate1Covers,
    generateTemplate2Covers,
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
