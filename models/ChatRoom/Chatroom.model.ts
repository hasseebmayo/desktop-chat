import mongoose, { Document, ObjectId, Schema } from "mongoose";

interface IMessage extends Document {
  members: ObjectId[];
}
interface IModel extends IMessage {}
const messageSchema: Schema = new mongoose.Schema<IMessage>(
  {
    members: [
      {
        ref: "Users",
        type: Schema.ObjectId,
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const ChatRoomModel =
  mongoose.models.Chatroom || mongoose.model<IModel>("Chatroom", messageSchema);
