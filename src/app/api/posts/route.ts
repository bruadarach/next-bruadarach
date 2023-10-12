import prisma from "@/utils/connect";
import { NextResponse } from "next/server";
import { getAuthSession } from "@/utils/auth";

interface QueryOptions {
  take: number;
  skip: number;
  where: {
    catSlug?: string;
  };
  orderBy: {
    createdAt?: "asc" | "desc";
    views?: "asc" | "desc";
  };
}

export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1");
  const cat = searchParams.get("cat");
  const featured = searchParams.get("featured");
  const popular = searchParams.get("popular");
  const selected = searchParams.get("selected");

  const POST_PER_PAGE = 4;

  try {
    const query: QueryOptions = {
      take: POST_PER_PAGE,
      skip: POST_PER_PAGE * (page - 1),
      where: {},
      orderBy: {
        createdAt: "desc",
      },
    };

    if (cat) {
      query.where.catSlug = cat;
    }

    let posts = await prisma.post.findMany({
      ...query,
      include: { user: true },
    });

    if (popular === "true") {
      query.orderBy = {
        views: "desc",
      };
    }

    if (featured === "true") {
      const featuredPost = await prisma.post.findMany({
        where: {
          featured: true,
        },
      });
      return new NextResponse(JSON.stringify(featuredPost), { status: 200 });
    }

    if (selected === "true") {
      const selectedPost = await prisma.post.findMany({
        where: {
          selected: true,
        },
      });
      return new NextResponse(JSON.stringify(selectedPost), { status: 200 });
    }

    const count = await prisma.post.count();

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

    const existingPost = await prisma.post.findUnique({
      where: { slug: body.slug },
    });

    if (existingPost) {
      const errorMessage = JSON.stringify({ message: "Duplicate title" });
      return new NextResponse(errorMessage, { status: 400 });
    }

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
