import { env } from "@config";
import { IUser } from "@types";
import { catchAsync, getUploadImageSignature } from "@utils";
import { Request, Response } from "express";
import httpStatus from "http-status";

export const createTrip = catchAsync(
  async (_req: Request, _res: Response) => {},
);

export const getTripImageUploadSignature = catchAsync(
  async (req: Request, res: Response) => {
    const user = req.user as IUser;
    const timestamp = Math.round(Date.now() / 1000);
    const folder = "trips";
    const public_id = `trip_${user.id}_${timestamp}`;

    const signature = getUploadImageSignature({
      timestamp,
      folder,
      public_id,
      resource_type: "image",
      upload_preset: "trip_images_signed",
    });

    return res.status(httpStatus.OK).json({
      success: true,
      data: {
        timestamp,
        signature,
        folder,
        public_id,
        resource_type: "image",
        api_key: env.CLOUDINARY_KEY,
        cloud_name: env.CLOUDINARY_CLOUD_NAME,
        upload_preset: "trip_images_signed",
      },
    });
  },
);
