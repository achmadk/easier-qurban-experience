-- CreateEnum
CREATE TYPE "QurbanRegistrationStates" AS ENUM ('REGISTERED', 'CANCELLED', 'ARRIVED', 'SLAUGHTERING', 'SLAUGHTERED', 'SKINNING', 'MEAT_CUTTING', 'MEAT_DELIVERING', 'MEAT_DELIVERED');

-- CreateTable
CREATE TABLE "roles" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),
    "version" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "phone_number" TEXT,
    "image" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),
    "version" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_role" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "role_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),
    "version" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "user_role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mosques" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),
    "version" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "mosques_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mosque_user" (
    "id" TEXT NOT NULL,
    "mosque_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),
    "version" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "mosque_user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "qurban_events" (
    "id" TEXT NOT NULL,
    "year_execution" INTEGER NOT NULL,
    "date_execution" TIMESTAMP(3),
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),
    "version" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "qurban_events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mosque_qurban_event" (
    "id" TEXT NOT NULL,
    "mosque_id" TEXT NOT NULL,
    "qurban_event_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),
    "version" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "mosque_qurban_event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "qurban_event_committee" (
    "id" TEXT NOT NULL,
    "qurban_event_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "role_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),
    "version" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "qurban_event_committee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "qurban_event_citizen" (
    "id" TEXT NOT NULL,
    "qurban_event_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),
    "version" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "qurban_event_citizen_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sacrificial_animals" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "minimal_age" INTEGER NOT NULL,
    "maximal_user" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),
    "version" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "sacrificial_animals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "qurban_registration" (
    "id" TEXT NOT NULL,
    "qurban_event_id" TEXT NOT NULL,
    "sacrificial_animal_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),
    "version" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "qurban_registration_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "qurban_registration_participant" (
    "id" TEXT NOT NULL,
    "qurban_registration_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),
    "version" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "qurban_registration_participant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "qurban_registration_status" (
    "id" TEXT NOT NULL,
    "qurban_registration_id" TEXT NOT NULL,
    "status" "QurbanRegistrationStates" NOT NULL DEFAULT 'REGISTERED',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),
    "version" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "qurban_registration_status_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "roles_id_key" ON "roles"("id");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_phone_number_key" ON "users"("phone_number");

-- CreateIndex
CREATE UNIQUE INDEX "users_id_key" ON "users"("id");

-- CreateIndex
CREATE INDEX "user_role_user_id_idx" ON "user_role"("user_id");

-- CreateIndex
CREATE INDEX "user_role_role_id_idx" ON "user_role"("role_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_role_id_key" ON "user_role"("id");

-- CreateIndex
CREATE UNIQUE INDEX "mosques_name_key" ON "mosques"("name");

-- CreateIndex
CREATE INDEX "mosque_user_mosque_id_idx" ON "mosque_user"("mosque_id");

-- CreateIndex
CREATE INDEX "mosque_user_user_id_idx" ON "mosque_user"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "qurban_events_id_key" ON "qurban_events"("id");

-- CreateIndex
CREATE INDEX "mosque_qurban_event_mosque_id_idx" ON "mosque_qurban_event"("mosque_id");

-- CreateIndex
CREATE INDEX "mosque_qurban_event_qurban_event_id_idx" ON "mosque_qurban_event"("qurban_event_id");

-- CreateIndex
CREATE UNIQUE INDEX "mosque_qurban_event_id_key" ON "mosque_qurban_event"("id");

-- CreateIndex
CREATE INDEX "qurban_event_committee_qurban_event_id_idx" ON "qurban_event_committee"("qurban_event_id");

-- CreateIndex
CREATE INDEX "qurban_event_committee_user_id_idx" ON "qurban_event_committee"("user_id");

-- CreateIndex
CREATE INDEX "qurban_event_committee_role_id_idx" ON "qurban_event_committee"("role_id");

-- CreateIndex
CREATE UNIQUE INDEX "qurban_event_committee_id_key" ON "qurban_event_committee"("id");

-- CreateIndex
CREATE INDEX "qurban_event_citizen_qurban_event_id_idx" ON "qurban_event_citizen"("qurban_event_id");

-- CreateIndex
CREATE INDEX "qurban_event_citizen_user_id_idx" ON "qurban_event_citizen"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "qurban_event_citizen_id_key" ON "qurban_event_citizen"("id");

-- CreateIndex
CREATE UNIQUE INDEX "sacrificial_animals_id_key" ON "sacrificial_animals"("id");

-- CreateIndex
CREATE INDEX "qurban_registration_qurban_event_id_idx" ON "qurban_registration"("qurban_event_id");

-- CreateIndex
CREATE INDEX "qurban_registration_sacrificial_animal_id_idx" ON "qurban_registration"("sacrificial_animal_id");

-- CreateIndex
CREATE UNIQUE INDEX "qurban_registration_id_key" ON "qurban_registration"("id");

-- CreateIndex
CREATE INDEX "qurban_registration_participant_qurban_registration_id_idx" ON "qurban_registration_participant"("qurban_registration_id");

-- CreateIndex
CREATE INDEX "qurban_registration_participant_user_id_idx" ON "qurban_registration_participant"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "qurban_registration_participant_id_key" ON "qurban_registration_participant"("id");

-- CreateIndex
CREATE INDEX "qurban_registration_status_qurban_registration_id_idx" ON "qurban_registration_status"("qurban_registration_id");

-- CreateIndex
CREATE UNIQUE INDEX "qurban_registration_status_id_key" ON "qurban_registration_status"("id");

-- AddForeignKey
ALTER TABLE "user_role" ADD CONSTRAINT "user_role_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_role" ADD CONSTRAINT "user_role_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mosque_user" ADD CONSTRAINT "mosque_user_mosque_id_fkey" FOREIGN KEY ("mosque_id") REFERENCES "mosques"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mosque_user" ADD CONSTRAINT "mosque_user_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mosque_qurban_event" ADD CONSTRAINT "mosque_qurban_event_mosque_id_fkey" FOREIGN KEY ("mosque_id") REFERENCES "mosques"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mosque_qurban_event" ADD CONSTRAINT "mosque_qurban_event_qurban_event_id_fkey" FOREIGN KEY ("qurban_event_id") REFERENCES "qurban_events"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "qurban_event_committee" ADD CONSTRAINT "qurban_event_committee_qurban_event_id_fkey" FOREIGN KEY ("qurban_event_id") REFERENCES "qurban_events"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "qurban_event_committee" ADD CONSTRAINT "qurban_event_committee_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "qurban_event_committee" ADD CONSTRAINT "qurban_event_committee_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "qurban_event_citizen" ADD CONSTRAINT "qurban_event_citizen_qurban_event_id_fkey" FOREIGN KEY ("qurban_event_id") REFERENCES "qurban_events"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "qurban_event_citizen" ADD CONSTRAINT "qurban_event_citizen_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "qurban_registration" ADD CONSTRAINT "qurban_registration_qurban_event_id_fkey" FOREIGN KEY ("qurban_event_id") REFERENCES "qurban_events"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "qurban_registration" ADD CONSTRAINT "qurban_registration_sacrificial_animal_id_fkey" FOREIGN KEY ("sacrificial_animal_id") REFERENCES "sacrificial_animals"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "qurban_registration_participant" ADD CONSTRAINT "qurban_registration_participant_qurban_registration_id_fkey" FOREIGN KEY ("qurban_registration_id") REFERENCES "qurban_registration"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "qurban_registration_participant" ADD CONSTRAINT "qurban_registration_participant_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "qurban_registration_status" ADD CONSTRAINT "qurban_registration_status_qurban_registration_id_fkey" FOREIGN KEY ("qurban_registration_id") REFERENCES "qurban_registration"("id") ON DELETE CASCADE ON UPDATE CASCADE;
