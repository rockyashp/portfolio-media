import { PhotoItem } from './types';

// Production-ready static paths pointing to `public/images/Gallery`.
// Ensure you copy `src/assets/images/Gallery/*` -> `public/images/Gallery/` before deploying.
const fileOrder = [
  '1772388273855.jpg',
  '20250516_134804656_iOS.jpg',
  'DSCF0126.jpg',
  'DSCF0133.jpg',
  'DSCF0561.jpg',
  'DSCF0579.jpg',
  'DSCF0750.jpg',
  'DSCF0756.jpg',
  'DSC_0128-Enhanced-NR.jpg',
  'DSC_0129-Enhanced-NR.jpg',
  'DSC_0360-Enhanced-NR.jpg',
  'IMG_0099.jpg',
  'IMG_20250430_210238737_HDR (1).jpg',
  'IMG_20250624_133520542_HDR.jpg',
  'IMG_20250906_212412850_HDR.jpg',
  'IMG_20250906_212513910_HDR.jpg',
  'IMG_20250924_182020085_HDR.jpg',
  'IMG_20251223_064748119_HDR.jpg',
  'IMG_20251223_065653639_HDR.jpg',
  'IMG_20260119_073329076_HDR (1).jpg',
  'IMG_20260227_173105100_HDR.jpg',
  'IMG_20260414_181052679_HDR.jpg',
  'IMG_20260415_095511_056.webp',
  'IMG_20260601_084143850_HDR_AE.jpg',
  'IMG_20260602_204801142.jpg',
  'IMG_20260611_070159825_HDR_AE.jpg',
  'IMG_20260611_072811354_HDR_AE.jpg',
  'IMG_20260611_080948176_AE (2).jpg',
  'PXL_20251102_131527242.MV.jpg',
  'YP--3.jpg',
  'YP--7.jpg',
  'YP-.jpg',
  'YP-0059.jpg',
  'YP-01 (17).jpg',
  'YP-01 (18).jpg',
  'YP-01 (19).jpg',
  'YP-01 (22).jpg',
  'YP-01 (25).jpg',
  'YP-0172.jpg',
  'YP-0224-39.jpg',
  'YP-0793.jpg',
  'YP-1757.jpg',
  'YP-1788.jpg',
  '_DSC1340.jpg',
];

export const portfolioPhotos: PhotoItem[] = fileOrder.map((fileName, idx) => {
  const url = `/images/Gallery/${fileName}`;
  return { id: `g${idx + 1}`, imageUrl: url };
});
