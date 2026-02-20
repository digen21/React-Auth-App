import { Request, Response } from "express";
import httpStatus from "http-status";
import { QueryFilter } from "mongoose";

import { env } from "@config";
import { tripService } from "@services";
import { FilterTrips, IUser } from "@types";
import { catchAsync, getUploadImageSignature, ServerError } from "@utils";

export const createTrip = catchAsync(async (req: Request, res: Response) => {
  const user = req.user as IUser;

  const trip = await tripService.create({
    ...req.body,
    createdBy: user.id,
    members: [user.id],
  });

  if (!trip) {
    throw new ServerError({
      message: "Failed to create trip",
      success: false,
      status: httpStatus.BAD_REQUEST,
    });
  }

  return res.status(httpStatus.CREATED).json({
    success: true,
    message: "Trip created successfully",
    status: httpStatus.CREATED,
    data: trip,
  });
});

export const getTrips = catchAsync(async (req: Request, res: Response) => {
  const user = req.user as IUser;
  const page = Number(req.query.page || 1);
  const limit = Number(req.query.limit || 10);

  const filter: QueryFilter<FilterTrips> = {
    $or: [{ createdBy: user._id }, { members: { $in: [user._id] } }],
  };

  const trips = await tripService.find(filter, {
    page,
    limit,
    populate: [
      {
        path: "createdBy",
        select: "name email",
      },
      {
        path: "members",
        select: "name email",
      },
    ],
    sort: { createdAt: -1 },
    lean: true,
  });

  return res.status(httpStatus.OK).json({
    success: true,
    status: httpStatus.OK,
    data: trips,
  });
});

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

export const updateTrip = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params as { id: string };

  const trip = await tripService.findById(id);

  if (!trip)
    throw new ServerError({
      message: "Trip not found",
      success: false,
      status: httpStatus.NOT_FOUND,
    });

  const updatedTrip = await tripService.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  return res.status(httpStatus.OK).json({
    success: true,
    status: httpStatus.OK,
    data: updatedTrip,
  });
});
