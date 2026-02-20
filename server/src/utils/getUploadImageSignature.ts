import { cloudinary, env } from "@config";

interface UploadImageSignatureInput {
  timestamp: number;
  folder: string;
  public_id: string;
  resource_type: string;
  upload_preset?: string;
}

const getUploadImageSignature = (input: UploadImageSignatureInput) => {
  const signature = cloudinary.utils.api_sign_request(
    {
      timestamp: input.timestamp,
      folder: input.folder,
      public_id: input.public_id,
    },
    env.CLOUDINARY_SECRET,
  );

  return signature;
};

export default getUploadImageSignature;
