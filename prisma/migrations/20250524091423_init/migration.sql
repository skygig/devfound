-- CreateTable
CREATE TABLE "User" (
    "userId" TEXT NOT NULL,
    "languages" JSONB NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "StarredRepo" (
    "repoUrl" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "StarredRepo_pkey" PRIMARY KEY ("repoUrl","userId")
);

-- CreateTable
CREATE TABLE "Repo" (
    "url" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "about" TEXT NOT NULL,
    "avatar" TEXT NOT NULL,
    "stars" INTEGER NOT NULL,
    "forks" INTEGER NOT NULL,
    "issues" INTEGER NOT NULL,
    "goodFirstIssues" INTEGER NOT NULL,
    "postedBy" TEXT,
    "ycBatch" INTEGER,
    "frameworks" TEXT[],
    "tools" TEXT[],
    "languages" JSONB NOT NULL,

    CONSTRAINT "Repo_pkey" PRIMARY KEY ("url")
);

-- AddForeignKey
ALTER TABLE "StarredRepo" ADD CONSTRAINT "StarredRepo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
