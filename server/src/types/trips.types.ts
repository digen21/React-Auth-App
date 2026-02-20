import { Types } from "mongoose";

export enum TripStatus {
  CONFIRMED = "CONFIRMED",
  COMPLETED = "COMPLETED",
  INACTIVE = "INACTIVE",
  PLANNING = "PLANNING",
}

export enum TripType {
  GROUP = "GROUP",
  SPLIT = "SPLIT",
}

interface ITrips {
  createdBy?: Types.ObjectId;
  members?: Types.ObjectId[];
  name: string;
  source: string;
  destination: string;
  startDate: Date;
  endDate: Date;
  type: string;
  initialBudget?: number;
  tripImageUrl?: string;
  status?: TripStatus;
}

export type ITripDoc = ITrips &
  Document & {
    createdAt: Date;
    updatedAt: Date;
    __v: number;
  };

export type FilterTrips = Partial<ITrips>;

export default ITrips;
