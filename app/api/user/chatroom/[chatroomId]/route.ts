import { ChatRoomModel } from "@/models/ChatRoom/Chatroom.model";
import { MessageModel } from "@/models/Messages/Message.model";
import { UserModel } from "@/models/USER/User.model";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {}
export async function GET(req: NextRequest, res: NextResponse) {}
export async function PATCH(req: NextRequest, res: NextResponse) {}
export async function DELETE(
  req: NextRequest,
  context: { params: { chatroomId: string } }
) {
  try {
    const chatroomId = context.params.chatroomId;

    // Delete the chatroom
    const chatRoom = await ChatRoomModel.findByIdAndDelete(chatroomId);

    // Delete messages associated with the chatroom
    const deleteMessage = await MessageModel.deleteMany({
      chatroomId,
    });

    // Find users associated with the chatroom
    const users = await UserModel.find({
      chatrooms: chatroomId,
    });

    // Remove the chatroom ID from the users' chatrooms array
    for (const user of users) {
      user.chatrooms = user.chatrooms.filter((id) => String(id) !== chatroomId);
      await user.save();
    }

    return Response.json(
      {
        message: "Chatroom and associated data deleted successfully",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(error);
    return Response.json(
      {
        message: "An error occurred while deleting the chatroom",
      },
      {
        status: 500,
      }
    );
  }
}

export async function PUT(req: NextRequest, res: NextResponse) {}
