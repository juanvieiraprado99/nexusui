export type SignatureOutputFormat = 'base64-png' | 'base64-svg' | 'svg';

export interface SignaturePoint {
  x: number;
  y: number;
}

export type SignatureStroke = SignaturePoint[];
