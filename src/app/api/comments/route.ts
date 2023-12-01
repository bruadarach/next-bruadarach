import { getAuthSession } from "@/utils/auth";
import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const postSlug = searchParams.get("postSlug");

  try {
    if (!postSlug) {
      const errorMessage = JSON.stringify({ message: "Missing postSlug" });
      return new NextResponse(errorMessage, { status: 400 });
    }

    const comments = await prisma.comment.findMany({
      where: {
        ...(postSlug && { postSlug }),
      },
      include: { user: true },
    });

    const responseBody = JSON.stringify(comments);
    const responseOptions = { status: 200 };
    return new NextResponse(responseBody, responseOptions);
  } catch (error) {
    console.log(error);
    const errorMessage = JSON.stringify({
      message: "An unexpected error occurred.",
    });
    const errorResponseOptions = { status: 500 };
    return new NextResponse(errorMessage, errorResponseOptions);
  }
};

export const POST = async (req: Request) => {
  const session = await getAuthSession();

  if (!session) {
    const errorMessage = JSON.stringify({ message: "Unauthorized" });
    return new NextResponse(errorMessage, { status: 401 });
  }

  try {
    const body = await req.json();

    const comment = await prisma.comment.create({
      data: {
        ...body,
        userEmail: session.user?.email || "",
      },
    });

    const responseBody = JSON.stringify(comment);
    const responseOptions = { status: 200 };
    return new NextResponse(responseBody, responseOptions);
  } catch (error) {
    console.log(error);
    const errorMessage = JSON.stringify({
      message: "An unexpected error occurred.",
    });
    const errorResponseOptions = { status: 500 };
    return new NextResponse(errorMessage, errorResponseOptions);
  }
};
