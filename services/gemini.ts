
import { GoogleGenAI } from "@google/genai";
import { HeadshotConfig, TemplateType, BackgroundType, ExpressionType, GlassesType } from "../types";

export const generateProfessionalHeadshot = async (
  base64Image: string,
  config: HeadshotConfig
): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  const templateDescription = {
    [TemplateType.FRONT_SMILING]: "a professional front-facing corporate headshot, shoulders up, looking directly into the lens. Maintain the exact facial bone structure of the subject.",
    [TemplateType.HAND_TO_CHIN]: "a professional and sophisticated contemplative pose with the subject's actual hand resting naturally on the chin.",
    [TemplateType.CEO_SIDE_PROFILE]: "a dynamic 45-degree angle side profile corporate portrait. CRITICAL: Match the subject's unique jawline, nose bridge, and facial profile exactly as seen in the source image."
  }[config.template];

  const backgroundDescription = {
    [BackgroundType.STUDIO]: `in a professional photography studio. Textured charcoal or grey backdrop with a cinematic spotlight halo hitting the center directly behind the subject's head.`,
    [BackgroundType.PLAIN]: `against a solid, professional ${config.backgroundColor} studio backdrop with subtle realistic vignetting and natural film grain.`,
    [BackgroundType.OFFICE]: `inside a realistic, modern corporate office interior. Soft-focus office partitions, indoor plants, and warm interior lighting. NO city skylines or skyscrapers—purely a genuine indoor executive workspace.`
  }[config.backgroundType];

  const glassesText = {
    [GlassesType.NONE]: "without any glasses",
    [GlassesType.WAYFARER]: "wearing high-quality, realistic Classic Wayfarer glasses",
    [GlassesType.ROUND]: "wearing high-quality, realistic Round Minimalist glasses",
    [GlassesType.RECTANGULAR]: "wearing modern, sophisticated frameless rectangular glasses with thin, minimal metal arms. The lenses are completely rimless.",
    [GlassesType.CAT_EYE]: "wearing high-quality, realistic Chic Cat-eye glasses",
    [GlassesType.AVIATOR]: "wearing high-quality, realistic Professional Aviator glasses"
  }[config.glasses];

  const clothingStyle = `dressed in premium professional business attire. A sharp tailored suit jacket. ${config.hasTie ? 'With a formal silk tie.' : 'Modern open-neck shirt look with no tie.'}`;

  // Hyper-focused prompt on Identity Lock and Proportional Fidelity
  const prompt = `
    TASK: Generate a high-resolution, professional corporate 1:1 square portrait.
    
    IDENTITY LOCK & PROPORTIONAL FIDELITY (CRITICAL):
    - SPLITTING IMAGE: The person in the output MUST be a perfect digital twin of the person in the source photo. 
    - NO FACIAL WIDENING: Do NOT make the face wider or fatter than the source. Maintain the exact jawline width, neck circumference, and cheekbone structure. 
    - PROPORTION MATCH: The head-to-shoulder ratio must match the source exactly. Do not "fill out" the subject. If the subject is lean, they must remain lean.
    - SMILING LOGIC: When smiling, only the mouth and eye-corners (crow's feet) should move. The overall width of the face and head MUST NOT CHANGE. Avoid the "fat-cheeked" AI smile look.
    - ANATOMICAL ACCURACY: Preserve unique eye shape, brow arch, nose bridge width, and chin shape. Match the subject's unique skin tone and ethnicity perfectly.
    
    RAW PHOTOGRAPHY FINISH (AVOID 3D/SMOOTH LOOK):
    - NO plastic skin. NO airbrushed textures. NO "uncanny valley" 3D-render smoothness.
    - Render realistic high-end photography textures: visible skin pores, fine facial hair, natural skin oils, and authentic film grain.
    - Sharp focus on the pupils, natural depth of field with soft bokeh.
    
    COMPOSITION & STYLING:
    - Pose: ${templateDescription}.
    - Expression: ${config.expression === ExpressionType.SMILE ? 'an authentic, warm, approachable corporate smile that maintains the subject\'s original facial silhouette' : 'a calm, authoritative, and professional neutral expression'}.
    - Eyewear: ${glassesText}.
    - Environment: ${backgroundDescription}.
    - Clothing: ${clothingStyle}.
    - Lighting: Cinematic 3-point studio lighting with high dynamic range.
    - Color Grade: ${config.isMonochrome ? 'High-contrast fine-art black and white, professional silver halide texture' : 'Natural professional skin tones, realistic color depth'}.
    
    TECHNICAL:
    - 1:1 Aspect Ratio square crop.
    - Close-up portrait, framing from top of head to middle of chest.
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
