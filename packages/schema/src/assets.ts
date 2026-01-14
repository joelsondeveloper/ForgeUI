export type AssetType = 'image' | 'vector' | 'font' | 'video' | 'lottie';

export type AssetDefinition = {
  id: string;
  type: AssetType;
  name: string;
  meta: {
    alt?: string;
    width?: number;
    height?: number;
    mimeType: string;
    duration?: number;
    aspectRatio?: number;
    extension: string;
  };
  origin: 'local' | 'remote';
  source: {
    previewUrl: string;
    exportPath: string;
    remoteUrl?: string;
  };
};