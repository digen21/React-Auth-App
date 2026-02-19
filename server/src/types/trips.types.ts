import { Types } from "mongoose";

interface ITrips {
  createdBy?: Types.ObjectId;
  name: string;
  startDate: Date;
  endDate: Date;
  type: string;
  initialBudget?: number;
  tripImageUrl?: string;
}
export default ITrips;
