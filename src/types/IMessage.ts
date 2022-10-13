import { IUser } from "./IUser";

export interface IMessage {
  _id: string;
  user: IUser;
  message: string;
  created: Date;
  updated: Date;
}
