import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { prisma } from "@/libs/prisma";
import getTools from "./getTools";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { message: "You must be logged in to contribute" },
      { status: 401 }
    );
  }

  const { repoLink } = await req.json();
  const orgName = repoLink.split("/")[3];
  const repoName = repoLink.split("/")[4];

  try {
    const response = await fetch(
      `https://api.github.com/repos/${orgName}/${repoName}`,
      {
        headers: {
          Authorization: `token ${process.env.GITHUB_TOKEN}`,
          "User-Agent": "Devfound",
        },
      }
    );
    if (!response.ok) {
      return NextResponse.json(
        { message: "Failed to process contribution" },
        { status: 500 }
      );
    }

    const goodFirstIssues = await fetch(
      `https://api.github.com/repos/${orgName}/${repoName}/issues?labels=good%20first%20issue`,
      {
        headers: {
          Authorization: `token ${process.env.GITHUB_TOKEN}`,
          "User-Agent": "Devfound",
        },
      }
    );

    if (!goodFirstIssues.ok) {
      return NextResponse.json(
        { message: "Failed to get good first issues" },
        { status: 500 }
      );
    }

    const languages = await fetch(
      `https://api.github.com/repos/${orgName}/${repoName}/languages`,
      {
        headers: {
          Authorization: `token ${process.env.GITHUB_TOKEN}`,
          "User-Agent": "Devfound",
        },
      }
    );

    if (!languages.ok) {
      return NextResponse.json(
        { message: "Failed to get languages" },
        { status: 500 }
      );
    }
    const data = await response.json();
    const goodFirstIssuesData = await goodFirstIssues.json();
    const languagesData = await languages.json();
    const { frameworks, tools } = await getTools(
      orgName,
      repoName,
      data.default_branch
    );

    const repoDetails = {
      title: data.name,
      about: data.description,
      avatar: data.owner.avatar_url,
      stars: data.stargazers_count,
      forks: data.forks_count,
      url: data.html_url,
      issues: data.open_issues_count,
      goodFirstIssues: goodFirstIssuesData.length,
      postedBy: session.userId,
      languages: languagesData,
      frameworks: frameworks,
      tools: tools,
    };

    await prisma.repo.create({
      data: repoDetails,
    });

    return NextResponse.json(repoDetails, { status: 200 });
  } catch (error) {
    console.error("Error in contributing to the repo", error);
    return NextResponse.json(
      { message: "Failed to process contribution" },
      { status: 500 }
    );
  }
}
