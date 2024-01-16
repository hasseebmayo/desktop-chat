import { NextResponse, NextRequest } from "next/server";
import { auth } from "../../auth/[...nextauth]/auth";
import { UserModel } from "@/models/USER/User.model";
import { DBConnection } from "@/utils/DBConnection/DBconnection";
DBConnection();
export async function POST(req: NextRequest, res: NextResponse) {}
export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const session: any = await auth();
    const user = await UserModel.findById(session?.user?.id).select(
      "-password"
    );
    return NextResponse.json(
      {
        message: "User Data",
        data: user,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
  }
}
export async function PATCH(req: NextRequest, res: NextResponse) {}
export async function DELETE(req: NextRequest, res: NextResponse) {}
export async function PUT(req: NextRequest, res: NextResponse) {}
