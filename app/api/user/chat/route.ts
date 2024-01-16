import { MessageModel } from "@/models/Messages/Message.model";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const { senderId, chatroomId, message } = await req.json();
    const chat = await new MessageModel({
      senderId,
      chatroomId,
      message,
    }).save();
    return NextResponse.json({
      message: "Message is sent Successfully!",
      data: chat,
    });
  } catch (error) {
    return NextResponse.json({
      message: "Server Internal Error",
      error,
    });
  }
}
export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const { searchParams } = new URL(req.url);
    const chatroomId = searchParams.get("chatroomId");
    const chats = await MessageModel.find({ chatroomId });

    return Response.json({
      message: "Chat Id Revieved",
      data: chats,
    });
  } catch (error) {
    console.log(error);
    NextResponse.json({
      message: "Interval Server Error",
      error,
    });
  }
}
export async function PATCH(req: NextRequest, res: NextResponse) {}
export async function DELETE(req: NextRequest, res: NextResponse) {}
export async function PUT(req: NextRequest, res: NextResponse) {}
