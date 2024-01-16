import mongoose, { Document, ObjectId, Schema } from "mongoose";

export interface IMessage {
  chatroomId: ObjectId;
  senderId: ObjectId;
  message: string;
}
interface IModel extends IMessage, Document {}
const messageSchema: Schema = new mongoose.Schema<IMessage>(
  {
    chatroomId: {
      ref: "Chatroom",
      type: mongoose.Schema.ObjectId,
      required: true,
    },
    senderId: {
      ref: "Users",
      type: mongoose.Schema.ObjectId,
      required: true,
    },
    message: {
      type: String,
      trim: true,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const MessageModel =
  mongoose.models.Messages || mongoose.model<IModel>("Messages", messageSchema);
