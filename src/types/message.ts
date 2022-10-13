import { IUser } from "./user";

export interface IMessage {
  _id: string;
  user: IUser;
  message: string;
  created: string;
}
