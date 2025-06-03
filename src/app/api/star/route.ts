import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { prisma } from "@/libs/prisma";
import { authOptions } from "@/libs/authOptions";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const { repoLink, toUnstar } = await req.json();

  if (!session?.userId || !repoLink || toUnstar === undefined) {
    return NextResponse.json(
      {
        message:
          "Invalid request, required repoLink, toUnstar and user must be logged in!",
      },
      { status: 400 }
    );
  }

  const orgName = repoLink.split("/")[3];
  const repoName = repoLink.split("/")[4];

  try {
    const user = await prisma.user.findUnique({
      where: { userId: session.userId! },
      select: {
        starredRepos: true,
      },
    });

    if (!toUnstar && user?.starredRepos.includes(repoLink)) {
      return NextResponse.json(
        { message: "Repo already starred!" },
        { status: 400 }
      );
    }

    if (toUnstar && !user?.starredRepos.includes(repoLink)) {
      return NextResponse.json(
        { message: "Repo not starred!" },
        { status: 400 }
      );
    }

    const response = await fetch(
      `https://api.github.com/user/starred/${orgName}/${repoName}`,
      {
        method: toUnstar ? "DELETE" : "PUT",
        headers: {
          Authorization: `token ${session.access_token}`,
          Accept: "application/vnd.github+json",
        },
      }
    );

    let newStarredRepos = user?.starredRepos;
    if (toUnstar) {
      newStarredRepos = newStarredRepos?.filter((repo) => repo !== repoLink);
    } else {
      newStarredRepos?.push(repoLink);
    }

    await prisma.user.update({
      where: { userId: session.userId! },
      data: {
        starredRepos: newStarredRepos,
      },
    });

    if (response.ok) {
      return NextResponse.json(
        { message: "Operation successful!" },
        { status: 200 }
      );
    } else {
      const error = await response.json();
      throw new Error(error.message);
    }
  } catch (err) {
    console.error("Unable to star the repo", repoLink, err);
    return NextResponse.json(
      { message: "Unable to star the repo" },
      { status: 500 }
    );
  }
}
