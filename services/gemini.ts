
import { GoogleGenAI } from "@google/genai";
import { HeadshotConfig, TemplateType, BackgroundType, ExpressionType, GlassesType } from "../types";

export const generateProfessionalHeadshot = async (
  base64Image: string,
  config: HeadshotConfig
): Promise<string> => {
  // Fix: Use process.env.API_KEY directly as per guidelines.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const templateDescription = {
    [TemplateType.FRONT_SMILING]: "a professional front-facing corporate headshot, shoulders up, looking directly into the lens. Maintain the exact facial bone structure of the subject.",
    [TemplateType.HAND_TO_CHIN]: "a professional and sophisticated contemplative pose with the subject's actual hand resting naturally on the chin.",
    [TemplateType.CEO_SIDE_PROFILE]: "a dynamic 45-degree angle side profile corporate portrait. Match the subject's unique jawline exactly."
  }[config.template];

  const backgroundDescription = {
    [BackgroundType.STUDIO]: `in a professional studio with a cinematic spotlight halo hitting the center backdrop.`,
    [BackgroundType.PLAIN]: `against a solid, professional ${config.backgroundColor} studio backdrop.`,
    [BackgroundType.OFFICE]: `inside a realistic, modern high-end corporate office interior.`
  }[config.backgroundType];

  const glassesText = {
    [GlassesType.NONE]: "without glasses",
    [GlassesType.WAYFARER]: "wearing Classic Wayfarer glasses",
    [GlassesType.ROUND]: "wearing Round Minimalist glasses",
    [GlassesType.RECTANGULAR]: "wearing Modern Rectangular glasses",
    [GlassesType.CAT_EYE]: "wearing Chic Cat-eye glasses",
    [GlassesType.AVIATOR]: "wearing Professional Aviator glasses"
  }[config.glasses];

  const clothingStyle = `dressed in premium professional business attire. A sharp tailored suit jacket. ${config.hasTie ? 'With a formal silk tie.' : 'Modern open-neck shirt.'}`;

  const prompt = `
    TASK: Generate a high-resolution professional corporate 1:1 portrait.
    IDENTITY: The subject MUST be a perfect digital twin of the source image. Realistic skin pores, fine facial hair, and authentic textures.
    POSE: ${templateDescription}.
    EXPRESSION: ${config.expression === ExpressionType.SMILE ? 'authentic corporate smile' : 'professional neutral'}.
    EYEWEAR: ${glassesText}.
    ENVIRONMENT: ${backgroundDescription}.
    CLOTHING: ${clothingStyle}.
    MONOCHROME: ${config.isMonochrome ? 'Fine-art black and white photography' : 'Natural professional skin tones'}.
    TECHNICAL: 1:1 Aspect Ratio, Sharp focus on eyes.
  `.trim();

  try {
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

    // Fix: Correctly iterate through candidates and parts to find the image part.
    const part = response.candidates?.[0]?.content?.parts.find(p => p.inlineData);
    if (part?.inlineData) return `data:image/png;base64,${part.inlineData.data}`;
    throw new Error("Generation failed.");
  } catch (error) {
    console.error("Gemini Error:", error);
    throw error;
  }
};