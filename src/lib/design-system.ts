// Typography hierarchy
export const TYPOGRAPHY = {
  // Page-level typography
  pageTitle: "text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight",
  pageSubtitle: "text-lg md:text-xl text-gray-600 max-w-3xl",
  
  // Section-level typography
  sectionTitle: "text-2xl md:text-3xl font-semibold text-gray-900",
  sectionSubtitle: "text-base md:text-lg text-gray-600",
  
  // Card-level typography
  cardTitle: "text-xl font-semibold text-gray-900",
  cardSubtitle: "text-base text-gray-700",
  cardDescription: "text-sm text-gray-600",
  
  // Body text
  bodyLarge: "text-lg text-gray-700",
  body: "text-base text-gray-700",
  bodySmall: "text-sm text-gray-600",
  caption: "text-xs text-gray-500",
  
  // Special
  gradientText: "bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent",
} as const;

// Spacing system (8px grid)
export const SPACING = {
  xs: "2",    // 8px
  sm: "4",    // 16px
  md: "6",    // 24px
  lg: "8",    // 32px
  xl: "12",   // 48px
  "2xl": "16", // 64px
  "3xl": "20", // 80px
} as const;

// Card hierarchy
export const CARD_STYLES = {
  // Primary - Most important actions/content
  primary: "border-2 border-purple-400 bg-gradient-to-br from-white to-purple-50 shadow-xl hover:shadow-2xl transition-all",
  
  // Secondary - Supporting content
  secondary: "border-2 border-gray-200 bg-white shadow-md hover:shadow-lg transition-all",
  
  // Tertiary - Background/subtle content
  tertiary: "border border-gray-200 bg-gray-50 hover:bg-gray-100 transition-all",
  
  // Elevated - Special featured content
  elevated: "border-3 border-purple-400 bg-gradient-to-br from-white via-purple-50/50 to-pink-50/30 shadow-2xl",
} as const;

// Button hierarchy
export const BUTTON_STYLES = {
  // Primary CTA - Only 1 per page
  primary: "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all",
  
  // Secondary CTA - Max 2-3 per page
  secondary: "border-2 border-purple-300 text-purple-700 hover:bg-purple-50 transition-all",
  
  // Tertiary - Unlimited
  tertiary: "text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all",
} as const;

// Helper function to apply typography
export const getTypography = (variant: keyof typeof TYPOGRAPHY) => {
  return TYPOGRAPHY[variant];
};

// Helper function to get spacing
export const getSpacing = (size: keyof typeof SPACING, type: 'p' | 'py' | 'px' | 'pt' | 'pb' | 'pl' | 'pr' | 'gap' | 'm' | 'my' | 'mx' | 'mt' | 'mb' | 'ml' | 'mr') => {
  return `${type}-${SPACING[size]}`;
};

// Helper function to apply card style
export const getCardStyle = (variant: keyof typeof CARD_STYLES) => {
  return CARD_STYLES[variant];
};
