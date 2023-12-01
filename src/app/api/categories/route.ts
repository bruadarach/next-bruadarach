import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const categories = await prisma.category.findMany();
    const responseBody = JSON.stringify(categories);
    return new NextResponse(responseBody, { status: 200 });
  } catch (error) {
    console.log(error);
    const errorMessage = JSON.stringify({
      message: "An unexpected error occurred.",
    });
    return new NextResponse(errorMessage, { status: 500 });
  }
};
