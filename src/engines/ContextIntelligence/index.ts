export interface ContextSuggestion {
  type: 'hydration' | 'stock_low' | 'renewal' | 'appointment' | 'travel';
  priority: 'low' | 'medium' | 'high';
  messageKey: string;
  data?: Record<string, string | number>;
}

export const ContextIntelligenceEngine = {
  getSuggestions: async (): Promise<ContextSuggestion[]> => {
    console.log('[ContextIntelligence] stub — getting suggestions');
    return [];
  },
  checkWeather: async (): Promise<{ temperature: number; isHot: boolean }> => {
    return { temperature: 20, isHot: false };
  },
  checkStockLevels: async (): Promise<string[]> => {
    return [];
  },
};
