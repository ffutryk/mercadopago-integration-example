/*
  Warnings:

  - You are about to drop the `payments` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "payments" DROP CONSTRAINT "payments_order_uid_fkey";

-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "payment_status" "PaymentStatus" NOT NULL DEFAULT 'PENDING';

-- DropTable
DROP TABLE "payments";
