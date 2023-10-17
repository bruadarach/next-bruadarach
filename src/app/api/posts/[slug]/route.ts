import prisma from "@/utils/connect";
import { NextResponse } from "next/server";
import { getAuthSession } from "@/utils/auth";
import { revalidatePath } from "next/cache";

// GET SINGLE POST
export const GET = async (
  req: Request,
  { params }: { params: { slug: string } }
) => {
  const { slug } = params;

  try {
    const post = await prisma.post.update({
      where: { slug },
      data: { views: { increment: 1 } },
      include: { user: true },
    });

    const responseBody = JSON.stringify(post);
    const responseOptions = { status: 200 };
    // 글을 업데이트하고 나서 해당 페이지를 다시 렌더링하기 위해 revalidatePath 사용
    revalidatePath(`/posts/${post.slug}`, "page");
    return new NextResponse(responseBody, responseOptions);
  } catch (error) {
    console.log(error);
    const errorMessage = JSON.stringify({ message: "Something went wrong" });
    const errorResponseOptions = { status: 500 };
    return new NextResponse(errorMessage, errorResponseOptions);
  }
};

// DELETE POST
export const DELETE = async (
  req: Request,
  { params }: { params: { slug: string } }
) => {
  const { slug } = params;

  const session = await getAuthSession();

  if (!session) {
    return new NextResponse(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
    });
  }

  try {
    const post = await prisma.post.delete({ where: { slug } });

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

// EDIT POST
export const PUT = async (
  req: Request,
  { params }: { params: { slug: string } }
) => {
  const { slug } = params;

  const session = await getAuthSession();

  if (!session) {
    return new NextResponse(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
    });
  }

  try {
    const body = await req.json();

    const post = await prisma.post.update({
      where: { slug },
      data: {
        ...body,
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
