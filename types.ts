
export enum TemplateType {
  FRONT_SMILING = 'Front-Facing Smiling',
  HAND_TO_CHIN = 'Hand-to-Chin Pose',
  CEO_SIDE_PROFILE = 'CEO Side-Profile'
}

export enum ExpressionType {
  SMILE = 'Smiling',
  NEUTRAL = 'Neutral'
}

export enum BackgroundType {
  STUDIO = 'Studio Portrait',
  PLAIN = 'Plain Color',
  OFFICE = 'Office Setting'
}

export enum GlassesType {
  NONE = 'None',
  WAYFARER = 'Classic Wayfarer',
  ROUND = 'Round Minimalist',
  RECTANGULAR = 'Modern Rectangular',
  CAT_EYE = 'Chic Cat-eye',
  AVIATOR = 'Professional Aviator'
}

export interface HeadshotConfig {
  template: TemplateType;
  expression: ExpressionType;
  glasses: GlassesType;
  backgroundType: BackgroundType;
  backgroundColor: string;
  isMonochrome: boolean;
  hasTie: boolean;
}

export interface GenerationResult {
  imageUrl: string;
  prompt: string;
}
