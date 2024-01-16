import bcrypt from "bcryptjs";
import { UserModel } from "@/models/USER/User.model";
import { DBConnection } from "../DBConnection/DBconnection";

DBConnection();
export async function loginHandler({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  try {
    const user = await UserModel.findOne({ email });
    if (user) {
      const decode = bcrypt.compare(user.password, password);
      if (!decode) {
        return null;
      }
      return user;
    }
  } catch (error) {
    return null;
  }
}
