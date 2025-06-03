import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { prisma } from "@/libs/prisma";
import { authOptions } from "@/libs/authOptions";
import fetchUserData from "@/app/api/user-data/fetchUserData";

export const GET = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.userId) {
    return NextResponse.json(
      {
        message: "Invalid request, user must be logged in!",
      },
      { status: 403 }
    );
  }

  try {
    const user = await prisma.user.findUnique({
      where: { userId: session.userId! },
    });
    if (user) {
      return NextResponse.json({ ...user }, { status: 200 });
    }

    const { languages, starredRepos, frameworks, tools } = await fetchUserData(
      session.userId!
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
