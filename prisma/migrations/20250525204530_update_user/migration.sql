/*
  Warnings:

  - You are about to drop the `StarredRepo` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "StarredRepo" DROP CONSTRAINT "StarredRepo_userId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "frameworks" TEXT[],
ADD COLUMN     "starredRepos" TEXT[],
ADD COLUMN     "tools" TEXT[];

-- DropTable
DROP TABLE "StarredRepo";
