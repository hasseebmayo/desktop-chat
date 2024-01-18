import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

async function s3BucketService() {
  const client = new S3Client({
    region: "eu-north-1",
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY!,
      secretAccessKey: process.env.AWS_SECRET_KEY!,
    },
  });
  return client;
}

export async function uploadFileToS3({
  key,
  body,
}: {
  key: string;
  body: any;
}) {
  const s3Client = await s3BucketService();
  try {
    const params = {
      Bucket: "desktop-chat", // Replace with your actual bucket name
      Key: key,
      Body: body,
    };

    const command = new PutObjectCommand(params);
    const response = await s3Client.send(command);

    // The URL of the uploaded object can be constructed using the bucket name and key
    const objectUrl = `https://${params.Bucket}.s3.amazonaws.com/${params.Key}`;

    return objectUrl;
  } catch (error) {
    console.error("Error uploading file to S3:", error);
    throw error;
  }
}
