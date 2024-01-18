import bcrypt from "bcryptjs";
import { UserModel } from "@/models/USER/User.model";
import { DBConnection } from "../DBConnection/DBconnection";
import { User } from "next-auth";

DBConnection();

export async function loginHandler({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<User | null> {
  console.log("running inside login handler");
  try {
    const user = await UserModel.findOne({ email });
    console.log(user);
    if (user) {
      // Use await here to wait for the result of bcrypt.compare
      const hashPass = /^\$2y\$/.test(user.password)
        ? "$2a$" + user.password.slice(4)
        : user.password;
      const isPasswordValid = await bcrypt.compare(password, hashPass);
      console.log("User retrieved from the database:", user);
      console.log("Password entered during login:", user.password);
      console.log("Hashed password stored in the database:", hashPass);

      const userAuth: User = {
        id: user._id,
        email: user.email,
        name: user.name,
      };
      console.log(userAuth);
      return userAuth;
    }
  } catch (error) {
    return null;
  }

  // If no user is found, return null
  return null;
}
