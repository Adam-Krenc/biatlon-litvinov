import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export { cloudinary };

export function getThumbnailUrl(url: string, width = 400): string {
  // Transform Cloudinary URL to generate a thumbnail
  return url.replace("/upload/", `/upload/w_${width},c_fill,q_auto,f_auto/`);
}
