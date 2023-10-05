import prisma from "@/utils/connect";
import { NextResponse } from "next/server";
import { getAuthSession } from "@/utils/auth";

export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const page = searchParams.get("page") as unknown as number;
  const cat = searchParams.get("cat") as unknown as string;

  const POST_PER_PAGE = 4;

  const query = {
    take: POST_PER_PAGE,
    skip: POST_PER_PAGE * (page - 1),
    where: {
      ...(cat && { catSlug: cat }),
    },
  };

  try {
    const [posts, count] = await prisma.$transaction([
      prisma.post.findMany(query),
      prisma.post.count({
        where: query.where,
      }),
    ]);
    return new NextResponse(JSON.stringify({ posts, count }), { status: 200 });
  } catch (error) {
    console.log(error);
    const errorMessage = JSON.stringify({ message: "Something went wrong" });
    return new NextResponse(errorMessage, { status: 500 });
  }
};

// CREATE A POST
export const POST = async (req: Request) => {
  const session = await getAuthSession();

  if (!session) {
    const errorMessage = JSON.stringify({ message: "Unauthorized" });
    return new NextResponse(errorMessage, { status: 401 });
  }

  try {
    const body = await req.json();
    const post = await prisma.post.create({
      data: {
        ...body,
        userEmail: session.user?.email || "",
      },
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
