import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

// GET SINGLE POST
export const GET = async (
  req: Request,
  { params }: { params: { slug: string } }
) => {
  const { slug } = params;

  try {
    const post = await prisma.post.findUnique({
      where: { slug },
      include: { user: true },
    });

    const responseBody = JSON.stringify(post);
    const responseOptions = { status: 200 };
    return new NextResponse(responseBody, responseOptions);
  } catch (error) {
    console.log(error);
    const errorMessage = JSON.stringify({ message: "Something went wrong" });
    const errorResponseOptions = { status: 500 };
    return new NextResponse(errorMessage, errorResponseOptions);
  }
};
