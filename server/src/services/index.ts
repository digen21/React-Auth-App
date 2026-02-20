import TokenModel from "@models/tokenModel";
import TripModel from "@models/tripModel";
import { UserModel } from "@models/userModel";
import { ITokenDoc, ITripDoc, IUserDoc } from "@types";
import BaseRepository from "./CommonService";

export const userService = new BaseRepository<IUserDoc>(UserModel);
export const tokenService = new BaseRepository<ITokenDoc>(TokenModel);
export const tripService = new BaseRepository<ITripDoc>(TripModel);
export { Where } from "./CommonService";
