export interface ExifData {
  camera: string;
  lens: string;
  focalLength: string;
  aperture: string;
  shutterSpeed: string;
  iso: number;
  location: string;
  date: string;
}

export interface PhotoItem {
  id: string;
  title?: string;
  category?: 'Portraits' | 'Landscapes' | 'Street' | 'Architecture';
  imageUrl: string;
  exif?: ExifData;
  description?: string;
}

export interface CameraParams {
  focalLength: number; // in mm, e.g. 28 to 90
  aperture: number; // f-number, e.g. 1.2 to 16
  iso: number; // ISO value, e.g. 100 to 6400
}
