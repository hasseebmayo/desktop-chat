import { ChatRoomModel } from "@/models/ChatRoom/Chatroom.model";
import { UserModel } from "@/models/USER/User.model";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const { members } = await req.json();
    const isChatRoomExiest = await ChatRoomModel.findOne({ members });
    if (isChatRoomExiest) {
      return NextResponse.json(
        {
          message: "Chat room exiests",
        },
        {
          status: 400,
        }
      );
    }
    const chatroom = await new ChatRoomModel({
      members,
    }).save();
    const updateResult = await UserModel.updateMany(
      { _id: { $in: members } },
      { $push: { chatrooms: chatroom._id } }
    );
    return NextResponse.json(
      {
        message: "Chatroom Created",
        data: chatroom,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Internal Server Error",
        error,
      },
      {
        status: 500,
      }
    );
  }
}

export async function GET(req: NextRequest, res: NextResponse) {}
export async function PATCH(req: NextRequest, res: NextResponse) {}
export async function DELETE(req: NextRequest, res: NextResponse) {}
export async function PUT(req: NextRequest, res: NextResponse) {}
