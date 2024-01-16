import { NextResponse, NextRequest } from "next/server";
import { auth } from "../auth/[...nextauth]/auth";
import { UserModel } from "@/models/USER/User.model";

export async function POST(req: NextRequest, res: NextResponse) {}
export async function GET(req: NextRequest, res: NextResponse) {
  const session: any = await auth();
  console.log();
  if (!session) {
    return NextResponse.json(
      {
        message: "You are not authorized",
      },
      {
        status: 405,
      }
    );
  }
  const userss = await UserModel.find({}).select("-password");
  const filteredUsers = userss.filter((d: any) => d?._id != session?.user?.id);
  return NextResponse.json(
    {
      message: "All users",
      data: filteredUsers,
    },
    {
      status: 200,
    }
  );
}
export async function PATCH(req: NextRequest, res: NextResponse) {}
export async function DELETE(req: NextRequest, res: NextResponse) {}
export async function PUT(req: NextRequest, res: NextResponse) {}
