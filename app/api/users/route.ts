import { NextResponse, NextRequest } from "next/server";
import { auth } from "../auth/[...nextauth]/auth";
import { UserModel } from "@/models/USER/User.model";

export async function POST(req: NextRequest, res: NextResponse) {}
export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const session: any = await auth();
    if (session?.user) {
      const token = session?.user;
      const currentUser = await UserModel.findById(token.id);
      // Filtering User which are not added with the current Active User
      const notAddedUsers = await UserModel.find({
        _id: { $ne: currentUser?._id },
        chatrooms: { $nin: currentUser?.chatrooms },
      });
      return NextResponse.json({
        message: "Users",
        data: notAddedUsers,
      });
    } else {
      return NextResponse.json(
        {
          message: "You are not authorized!",
        },
        {
          status: 401,
        }
      );
    }
  } catch (error) {
    console.log(error);
  }
}
export async function PATCH(req: NextRequest, res: NextResponse) {}
export async function DELETE(req: NextRequest, res: NextResponse) {}
export async function PUT(req: NextRequest, res: NextResponse) {}
