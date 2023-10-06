import prisma from "@/utils/connect";
import { NextResponse } from "next/server";
import { getAuthSession } from "@/utils/auth";

interface QueryOptions {
  take: number;
  skip: number;
  where: {
    catSlug?: string;
    slug?: {
      in: string[];
    };
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
  const popular = searchParams.get("popular");
  const postSlugs = searchParams.getAll("postSlug");

  const POST_PER_PAGE = 4;

  const query: QueryOptions = {
    take: POST_PER_PAGE,
    skip: POST_PER_PAGE * (page - 1),
    where: {},
    orderBy: {
      createdAt: "desc",
    },
  };

  if (page) {
    query.orderBy = {
      views: "desc",
    };
  }

  if (cat) {
    query.where.catSlug = cat;
  }

  if (popular === "true") {
    query.orderBy = {
      views: "desc",
    };
  }

  if (postSlugs.length > 0) {
    query.where.slug = {
      in: postSlugs,
    };
  }

  try {
    const [posts, count] = await prisma.$transaction([
      prisma.post.findMany({
        ...query,
        include: { user: true },
      }),
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
