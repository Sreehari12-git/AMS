/*
  Warnings:

  - You are about to drop the column `attendance_type` on the `Attendance` table. All the data in the column will be lost.
  - You are about to drop the column `check_in` on the `Attendance` table. All the data in the column will be lost.
  - You are about to drop the column `check_out` on the `Attendance` table. All the data in the column will be lost.
  - You are about to drop the column `location_name` on the `Attendance` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Attendance" DROP COLUMN "attendance_type",
DROP COLUMN "check_in",
DROP COLUMN "check_out",
DROP COLUMN "location_name",
ADD COLUMN     "clockIn" TIMESTAMP(3),
ADD COLUMN     "clockOut" TIMESTAMP(3),
ADD COLUMN     "duration" TEXT,
ADD COLUMN     "leaveType" TEXT,
ADD COLUMN     "totalHours" DOUBLE PRECISION,
ALTER COLUMN "day" DROP NOT NULL,
ALTER COLUMN "day" SET DATA TYPE TEXT,
ALTER COLUMN "status" SET DEFAULT 'ABSENT';
