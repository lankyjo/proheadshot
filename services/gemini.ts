
import { GoogleGenAI } from "@google/genai";
import { HeadshotConfig, TemplateType, BackgroundType, ExpressionType, GlassesType } from "../types";

export const generateProfessionalHeadshot = async (
  base64Image: string,
  config: HeadshotConfig
): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  const templateDescription = {
    [TemplateType.FRONT_SMILING]: "a professional front-facing corporate headshot, shoulders up, looking directly into the lens. Maintain the exact facial structure of the subject.",
    [TemplateType.HAND_TO_CHIN]: "a professional and sophisticated contemplative pose with the subject's actual hand resting naturally on the chin.",
    [TemplateType.CEO_SIDE_PROFILE]: "a dynamic 45-degree angle side profile corporate portrait. CRITICAL: Match the subject's unique jawline, nose bridge, and facial profile exactly as seen in the source image."
  }[config.template];

  const backgroundDescription = {
    [BackgroundType.STUDIO]: `in a professional photography studio. Textured charcoal or grey backdrop with a cinematic spotlight halo hitting the center directly behind the subject's head.`,
    [BackgroundType.PLAIN]: `against a solid, professional ${config.backgroundColor} studio backdrop with subtle realistic vignetting and natural film grain.`,
    [BackgroundType.OFFICE]: `inside a realistic, modern corporate office interior. Soft-focus office partitions, indoor plants, and warm interior lighting. NO city skylines or skyscrapers—purely a genuine indoor executive workspace.`
  }[config.backgroundType];

  const glassesText = config.glasses !== GlassesType.NONE 
    ? `wearing high-quality, realistically rendered ${config.glasses}` 
    : "without any glasses";

  const clothingStyle = `dressed in premium professional business attire. A sharp tailored suit jacket. ${config.hasTie ? 'With a formal silk tie.' : 'Modern open-neck shirt look with no tie.'}`;

  // Enhanced prompt focused on Identity Lock during expressions
  const prompt = `
    TASK: Generate a high-resolution, professional corporate 1:1 square portrait.
    
    IDENTITY LOCK & EXPRESSION MAPPING (HIGHEST PRIORITY):
    - The person in the output MUST be the EXACT SAME person as in the source photo. 
    - IDENTITY PRESERVATION: Use the source image's specific facial landmarks: eye shape, brow bone, nose structure, and chin shape.
    - SMILING LOGIC: If a smile is requested, do NOT use a generic stock smile. Instead, morph the subject's own lips and eyes into an authentic smile that matches their unique facial geometry. 
    - Duchenne smile: Ensure the eyes crinkle naturally in a way that matches the subject's unique eye shape.
    
    RAW PHOTOGRAPHY FINISH (AVOID 3D/SMOOTH LOOK):
    - NO airbrushed skin. NO plastic textures. NO 3D-render appearance.
    - Include realistic imperfections: skin pores, subtle freckles, fine lines, and natural skin texture.
    - 8k raw photography style, sharp focus on the iris, natural depth of field.
    
    COMPOSITION & STYLING:
    - Pose: ${templateDescription}.
    - Expression: ${config.expression === ExpressionType.SMILE ? 'an authentic, warm, approachable corporate smile based strictly on the subject\'s facial features' : 'a calm, authoritative, and professional neutral expression'}.
    - Eyewear: ${glassesText}.
    - Environment: ${backgroundDescription}.
    - Clothing: ${clothingStyle}.
    - Lighting: Cinematic 3-point studio lighting, rim light for separation, soft key light for realistic highlights.
    - Color Grade: ${config.isMonochrome ? 'Fine-art black and white portrait, deep contrast, classic film grain' : 'Natural professional skin tones, vibrant but realistic color palette'}.
    
    TECHNICAL:
    - 1:1 Aspect Ratio square crop.
    - Close-up portrait, framing from head to chest level.
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
