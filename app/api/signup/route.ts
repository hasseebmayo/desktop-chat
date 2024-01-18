import bcrypt from "bcryptjs";
import { UserModel } from "@/models/USER/User.model";

import { zodUserSchema } from "@/utils/schema/zodUserSchema";
import { DBConnection } from "@/utils/DBConnection/DBconnection";

DBConnection();
export async function POST(req: Request) {
  try {
    const { password, name, email } = await req.json();

    zodUserSchema.parse({ password, name, email });
    const isUserExiest = await UserModel.findOne({
      email,
    });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    if (isUserExiest) {
      return Response.json(
        {
          message: "Username or email is already registered!",
        },
        {
          status: 400,
        }
      );
    }
    const user = await new UserModel({
      password: hashedPassword,
      name,
      email,
    }).save();

    return Response.json({
      message: "Sucessfully registered!",
    });
  } catch (e: any) {
    return Response.json(
      {
        message: e,
      },
      {
        status: 500,
      }
    );
  }
}
