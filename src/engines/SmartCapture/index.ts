export type CaptureLevel = 'qr' | 'barcode' | 'ocr_ai' | 'insufficient' | 'not_medication';

export interface CaptureResult {
  level: CaptureLevel;
  confidence: number;
  medication?: {
    name: string;
    dosage?: string;
    laboratory?: string;
    quantity?: number;
    barcode?: string;
    expiryDate?: string;
  };
  error?: string;
}

export const SmartCaptureEngine = {
  scanMedication: async (imageUri: string): Promise<CaptureResult> => {
    console.log('[SmartCapture] stub — imageUri:', imageUri);
    return { level: 'insufficient', confidence: 0 };
  },
  scanQRCode: async (data: string): Promise<CaptureResult> => {
    console.log('[SmartCapture] stub — QR data:', data);
    return { level: 'qr', confidence: 0.99 };
  },
  isMedication: (barcode: string): boolean => {
    return true;
  },
};
