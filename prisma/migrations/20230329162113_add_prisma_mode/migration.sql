-- DropForeignKey
ALTER TABLE "contact" DROP CONSTRAINT "contact_employeeId_fkey";

-- DropForeignKey
ALTER TABLE "employee" DROP CONSTRAINT "employee_departmentId_fkey";

-- DropForeignKey
ALTER TABLE "employee" DROP CONSTRAINT "employee_roleId_fkey";

-- DropForeignKey
ALTER TABLE "employee_job" DROP CONSTRAINT "employee_job_employeeId_fkey";

-- DropForeignKey
ALTER TABLE "employee_job" DROP CONSTRAINT "employee_job_jobId_fkey";

-- DropForeignKey
ALTER TABLE "notify_user" DROP CONSTRAINT "notify_user_notifyId_fkey";

-- DropForeignKey
ALTER TABLE "notify_user" DROP CONSTRAINT "notify_user_uid_fkey";

-- DropForeignKey
ALTER TABLE "salary" DROP CONSTRAINT "salary_employeeId_fkey";

-- DropForeignKey
ALTER TABLE "total_salary" DROP CONSTRAINT "total_salary_employeeId_fkey";

-- DropForeignKey
ALTER TABLE "user" DROP CONSTRAINT "user_employeeId_fkey";

-- DropForeignKey
ALTER TABLE "working_time" DROP CONSTRAINT "working_time_employeeId_fkey";
