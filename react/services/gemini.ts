
import { GoogleGenAI } from "@google/genai";
import { HeadshotConfig, TemplateType, BackgroundType, ExpressionType, GlassesType } from "../types";

export const generateProfessionalHeadshot = async (
  base64Image: string,
  config: HeadshotConfig
): Promise<string> => {
  // Fix: Strictly follow the guideline to obtain API key from process.env.API_KEY and use named parameter initialization.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const templateDescription = {
    [TemplateType.FRONT_SMILING]: "a professional front-facing corporate headshot, shoulders up, looking directly into the lens. Maintain the exact facial bone structure of the subject.",
    [TemplateType.HAND_TO_CHIN]: "a professional and sophisticated contemplative pose with the subject's actual hand resting naturally on the chin.",
    [TemplateType.CEO_SIDE_PROFILE]: "a dynamic 45-degree angle side profile corporate portrait. Match the subject's unique jawline and profile."
  }[config.template];

  const backgroundDescription = {
    [BackgroundType.STUDIO]: `in a professional studio with a cinematic spotlight halo.`,
    [BackgroundType.PLAIN]: `against a solid ${config.backgroundColor} studio backdrop.`,
    [BackgroundType.OFFICE]: `inside a realistic, modern corporate office.`
  }[config.backgroundType];

  const prompt = `
    TASK: Generate a high-resolution professional corporate 1:1 portrait.
    IDENTITY: Subject is a perfect digital twin of source. Realistic pores and skin texture.
    POSE: ${templateDescription}.
    EXPRESSION: ${config.expression === ExpressionType.SMILE ? 'authentic smile' : 'neutral'}.
    EYEWEAR: ${config.glasses === GlassesType.NONE ? 'no glasses' : 'wearing ' + config.glasses}.
    ENVIRONMENT: ${backgroundDescription}.
    CLOTHING: Sharp tailored suit jacket. ${config.hasTie ? 'With formal tie.' : 'No tie.'}
    MONOCHROME: ${config.isMonochrome ? 'Yes' : 'No'}.
  `.trim();

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [
        { inlineData: { data: base64Image.split(',')[1], mimeType: 'image/jpeg' } },
        { text: prompt },
      ],
    },
    config: { imageConfig: { aspectRatio: "1:1" } }
  });

  // Fix: iterate through parts to correctly extract the generated image.
  const part = response.candidates?.[0]?.content?.parts.find(p => p.inlineData);
  if (part?.inlineData) return `data:image/png;base64,${part.inlineData.data}`;
  throw new Error("Generation failed.");
};