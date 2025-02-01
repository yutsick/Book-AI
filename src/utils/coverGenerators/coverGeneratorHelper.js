import { generateTemplateCovers } from "./generateTemplateHelper";
import CoverTemplate1 from "@/components/CoversGenerator/CoverTemplate1";
import CoverTemplate2 from "@/components/CoversGenerator/CoverTemplate2";
import CoverTemplate3 from "@/components/CoversGenerator/CoverTemplate3";
import CoverTemplate4 from "@/components/CoversGenerator/CoverTemplate4";
import CoverTemplate5 from "@/components/CoversGenerator/CoverTemplate5";
import CoverTemplate6 from "@/components/CoversGenerator/CoverTemplate6";
import CoverTemplate7 from "@/components/CoversGenerator/CoverTemplate7";
import CoverTemplate8 from "@/components/CoversGenerator/CoverTemplate8";

const templates = {
  1: CoverTemplate1,
  2: CoverTemplate2,
  3: CoverTemplate3,
  4: CoverTemplate4,
  5: CoverTemplate5,
  6: CoverTemplate6,
  7: CoverTemplate7,
  8: CoverTemplate8,
};

export const generateCoverById = async (contextData, templateId = 1) => {
  const CoverComponent = templates[templateId];

  if (!CoverComponent) {
    throw new Error(`Template with ID ${templateId} does not exist.`);
  }

  return await generateTemplateCovers(contextData, CoverComponent);
};
