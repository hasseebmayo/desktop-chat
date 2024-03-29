import mongoose, { Document, Model, ObjectId, Schema } from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser {
  name: string;
  password: string;
  email: string;
  phoneNo: string;
  chatrooms: ObjectId[];
  about: string;
  profile_img: string;
  requests: ObjectId[];
}

interface UserDocument extends IUser, Document {}

const userSchema: Schema<UserDocument> = new mongoose.Schema({
  name: {
    required: true,
    type: String,
    trim: true,
  },
  email: {
    required: true,
    type: String,
    unique: true,
    trim: true,
    lowercase: true,
  },
  profile_img: {
    type: String,
  },
  chatrooms: {
    type: [
      {
        ref: "Chatroom",
        type: Schema.Types.ObjectId,
      },
    ],
    default: [],
  },
  password: {
    required: true,
    type: String,
    trim: true,
    lowercase: true,
    minlength: 5,
  },
  about: {
    type: String,
    trim: true,
    default: "About.....",
  },
  requests: [
    {
      type: Schema.ObjectId,
      ref: "Users",
    },
  ],
});

// userSchema.pre("save", async function (next) {
//   const user = this as UserDocument;
//   if (!user.isModified("password")) {
//     return next();
//   }
//   const salt = await bcrypt.genSalt(10);
//   const hashedPassword = await bcrypt.hash(user.password, salt);
//   user.password = hashedPassword;
//   next();
// });

export const UserModel: Model<UserDocument> =
  mongoose.models.Users || mongoose.model<UserDocument>("Users", userSchema);
