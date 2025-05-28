import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { prisma } from "@/libs/prisma";
import { authOptions } from "@/libs/authOptions";
import fetchUserData from "@/app/api/user-data/fetchUserData";

export const GET = async (req: NextRequest) => {
  const session = await getServerSession(authOptions);
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId || !session) {
    return NextResponse.json(
      {
        message: "Invalid request, required userId and user must be logged in!",
      },
      { status: 403 }
    );
  }

  try {
    const user = await prisma.user.findUnique({
      where: { userId },
    });
    if (user) {
      return NextResponse.json({ ...user }, { status: 200 });
    }

    const { languages, starredRepos, frameworks, tools } = await fetchUserData(
      userId
    );

    await prisma.user.create({
      data: {
        userId: session.userId!,
        name: session.user?.name ?? "Anonymous",
        languages,
        starredRepos,
        frameworks,
        tools,
      },
    });

    return NextResponse.json(
      { languages, starredRepos, frameworks, tools },
      { status: 200 }
    );
  } catch (err) {
    console.error("Unable to fetch user details", err);
    return NextResponse.json(
      { message: "Server Side Error." },
      { status: 500 }
    );
  }
};
