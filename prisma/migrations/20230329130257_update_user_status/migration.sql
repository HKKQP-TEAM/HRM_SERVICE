/*
 Warnings:
 - You are about to drop the column `contactId` on the `employee` table. All the data in the column will be lost.
 - You are about to drop the column `createdBy` on the `user` table. All the data in the column will be lost.
 - You are about to drop the column `lastLogin` on the `user` table. All the data in the column will be lost.
 - You are about to drop the column `status` on the `user` table. All the data in the column will be lost.
 - You are about to drop the column `updatedBy` on the `user` table. All the data in the column will be lost.
 */

-- DropForeignKey

ALTER TABLE "user" DROP CONSTRAINT "user_employeeId_fkey";

-- DropIndex

DROP INDEX "contact_employeeId_key";

-- DropIndex

DROP INDEX "employee_contactId_key";

-- AlterTable

ALTER TABLE "employee" DROP COLUMN "contactId";

-- AlterTable

ALTER TABLE
    "user" DROP COLUMN "createdBy",
    DROP COLUMN "lastLogin",
    DROP COLUMN "status",
    DROP COLUMN "updatedBy",
ADD
    COLUMN "disabledAt" TIMESTAMP(3),
ADD
    COLUMN "emailVerifiedAt" TIMESTAMP(3),
ADD
    COLUMN "lastActivity" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN
    "employeeId" DROP NOT NULL;

-- DropEnum

DROP TYPE "UserStatus";

-- AddForeignKey

ALTER TABLE "user"
ADD
    CONSTRAINT "user_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "employee"("id") ON DELETE
SET NULL ON UPDATE CASCADE;