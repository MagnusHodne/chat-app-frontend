import { IMessage } from "./IMessage";

export interface IChatResponse {
  action: string;
  message: IMessage;
}
