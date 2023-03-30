/*
  Warnings:

  - Made the column `roleId` on table `employee` required. This step will fail if there are existing NULL values in that column.
  - Made the column `departmentId` on table `employee` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "employee" DROP CONSTRAINT "employee_departmentId_fkey";

-- DropForeignKey
ALTER TABLE "employee" DROP CONSTRAINT "employee_roleId_fkey";

-- AlterTable
ALTER TABLE "employee" ALTER COLUMN "roleId" SET NOT NULL,
ALTER COLUMN "departmentId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "employee" ADD CONSTRAINT "employee_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employee" ADD CONSTRAINT "employee_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "department"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
