
import { GoogleGenAI } from "@google/genai";
import { HeadshotConfig, TemplateType, BackgroundType, ExpressionType, GlassesType } from "../types";

export const generateProfessionalHeadshot = async (
  base64Image: string,
  config: HeadshotConfig
): Promise<string> => {
  // Always initialize with named parameter and use process.env.API_KEY directly.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const templateDescription = {
    [TemplateType.FRONT_SMILING]: "a professional front-facing corporate headshot, shoulders up, looking directly into the lens. Maintain the exact facial bone structure of the subject.",
    [TemplateType.HAND_TO_CHIN]: "a professional and sophisticated contemplative pose with the subject's actual hand resting naturally on the chin.",
    [TemplateType.CEO_SIDE_PROFILE]: "a dynamic 45-degree angle side profile corporate portrait. CRITICAL: Match the subject's unique jawline, nose bridge, and facial profile exactly as seen in the source image."
  }[config.template];

  const backgroundDescription = {
    [BackgroundType.STUDIO]: `in a professional photography studio. Textured charcoal or grey backdrop with a cinematic spotlight halo hitting the center directly behind the subject's head.`,
    [BackgroundType.PLAIN]: `against a solid, professional ${config.backgroundColor} studio backdrop with subtle realistic vignetting and natural film grain.`,
    [BackgroundType.OFFICE]: `inside a realistic, modern corporate office interior. Soft-focus office partitions, indoor plants, and warm interior lighting.`
  }[config.backgroundType];

  const glassesText = {
    [GlassesType.NONE]: "without any glasses",
    [GlassesType.WAYFARER]: "wearing high-quality, realistic Classic Wayfarer glasses",
    [GlassesType.ROUND]: "wearing high-quality, realistic Round Minimalist glasses",
    [GlassesType.RECTANGULAR]: "wearing modern, sophisticated frameless rectangular glasses with thin, minimal metal arms.",
    [GlassesType.CAT_EYE]: "wearing high-quality, realistic Chic Cat-eye glasses",
    [GlassesType.AVIATOR]: "wearing high-quality, realistic Professional Aviator glasses"
  }[config.glasses];

  const clothingStyle = `dressed in premium professional business attire. A sharp tailored suit jacket. ${config.hasTie ? 'With a formal silk tie.' : 'Modern open-neck shirt look with no tie.'}`;

  const prompt = `
    TASK: Generate a high-resolution, professional corporate 1:1 square portrait.
    
    IDENTITY LOCK:
    - The subject in the output MUST be a perfect digital twin of the person in the source photo. 
    - Maintain exact jawline width, neck circumference, and cheekbone structure. 
    - Do NOT widen or change the face shape.
    
    RAW PHOTOGRAPHY FINISH:
    - NO plastic skin. Render realistic pores, fine facial hair, and authentic film grain.
    - Sharp focus on the eyes, natural depth of field with soft bokeh.
    
    COMPOSITION & STYLING:
    - Pose: ${templateDescription}.
    - Expression: ${config.expression === ExpressionType.SMILE ? 'an authentic corporate smile' : 'a professional neutral expression'}.
    - Eyewear: ${glassesText}.
    - Environment: ${backgroundDescription}.
    - Clothing: ${clothingStyle}.
    - Color Grade: ${config.isMonochrome ? 'Fine-art black and white' : 'Natural professional skin tones'}.
    
    TECHNICAL: 1:1 Aspect Ratio square crop. Close-up portrait.
  `.trim();

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              data: base64Image.split(',')[1],
              mimeType: 'image/jpeg',
            },
          },
          { text: prompt },
        ],
      },
      config: {
        imageConfig: {
          aspectRatio: "1:1"
        }
      }
    });

    // Correct way to iterate through parts to find the generated image.
    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }

    throw new Error("Generation failed. Please try again.");
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};