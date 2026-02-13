-- CreateTable
CREATE TABLE "Enroll" (
    "id" SERIAL NOT NULL,
    "email" TEXT,
    "name" TEXT,
    "phone" TEXT,

    CONSTRAINT "Enroll_pkey" PRIMARY KEY ("id")
);
