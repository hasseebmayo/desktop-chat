import { NextResponse, NextRequest } from "next/server";
import { auth } from "../../auth/[...nextauth]/auth";
import { UserModel } from "@/models/USER/User.model";
import { DBConnection } from "@/utils/DBConnection/DBconnection";
import path from "path";
import { writeFile } from "fs/promises";
import { uploadFileToS3 } from "@/utils/s3Bucket/S3Bucket";
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
export async function PATCH(req: NextRequest, res: NextResponse) {
  try {
    const session: any = await auth();
    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type");
    if (session?.user) {
      const user = await UserModel.findById(session?.user?.id!);

      if (type == "name") {
        const { name } = await req.json();

        if (user) {
          // Ensure that user.name is not undefined before assigning
          if (user.name !== undefined) {
            user.name = name;
            user.save();
          }
        }

        return Response.json(
          {
            message: "Name is updated successfully!",
            data: user,
          },
          {
            status: 200,
          }
        );
      }
      if (type == "about") {
        const { about } = await req.json();

        if (user) {
          // Ensure that user.name is not undefined before assigning
          if (user.name !== undefined) {
            user.about = about;
            user.save();
          }
        }

        return Response.json(
          {
            message: "About is updated successfully!",
            data: user,
          },
          {
            status: 200,
          }
        );
      }
      if (type == "file") {
        const formData = await req.formData();

        const file: any = formData.get("file");
        if (!file) {
          return NextResponse.json(
            { error: "No files received." },
            { status: 400 }
          );
        }
        const buffer = Buffer.from(await file.arrayBuffer());
        const filename = Date.now() + file.name.replaceAll(" ", "_");

        const uploadedFile = await uploadFileToS3({
          key: filename,
          body: buffer,
        });
        if (user) {
          // Ensure that user.name is not undefined before assigning
          if (user.name !== undefined) {
            user.profile_img = uploadedFile;
            user.save();
          }
        }
        return Response.json(
          {
            message: "Profile is changed sucessfully!",
          },
          {
            status: 200,
          }
        );
      }
    } else {
      return NextResponse.json(
        {
          message: "You are not authorized",
        },
        { status: 401 }
      );
    }
  } catch (error) {
    // Handle the error appropriately
    console.log(error);
  }
}

export async function DELETE(req: NextRequest, res: NextResponse) {}
export async function PUT(req: NextRequest, res: NextResponse) {}
