/*
  Warnings:

  - You are about to drop the `_OrganizationRoles` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ProjectRoles` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_TaskRoles` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_TeamRoles` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `categories` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `feature_flags` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `organization_roles` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `organizations` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `priorities` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `project_roles` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `projects` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `statuses` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tags` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `task_roles` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tasks` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `team_roles` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `teams` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `types` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_OrganizationRoles" DROP CONSTRAINT "_OrganizationRoles_A_fkey";

-- DropForeignKey
ALTER TABLE "_OrganizationRoles" DROP CONSTRAINT "_OrganizationRoles_B_fkey";

-- DropForeignKey
ALTER TABLE "_ProjectRoles" DROP CONSTRAINT "_ProjectRoles_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProjectRoles" DROP CONSTRAINT "_ProjectRoles_B_fkey";

-- DropForeignKey
ALTER TABLE "_TaskRoles" DROP CONSTRAINT "_TaskRoles_A_fkey";

-- DropForeignKey
ALTER TABLE "_TaskRoles" DROP CONSTRAINT "_TaskRoles_B_fkey";

-- DropForeignKey
ALTER TABLE "_TeamRoles" DROP CONSTRAINT "_TeamRoles_A_fkey";

-- DropForeignKey
ALTER TABLE "_TeamRoles" DROP CONSTRAINT "_TeamRoles_B_fkey";

-- DropForeignKey
ALTER TABLE "organization_roles" DROP CONSTRAINT "organization_roles_organization_id_fkey";

-- DropForeignKey
ALTER TABLE "organization_roles" DROP CONSTRAINT "organization_roles_role_id_fkey";

-- DropForeignKey
ALTER TABLE "project_roles" DROP CONSTRAINT "project_roles_project_id_fkey";

-- DropForeignKey
ALTER TABLE "project_roles" DROP CONSTRAINT "project_roles_role_id_fkey";

-- DropForeignKey
ALTER TABLE "task_roles" DROP CONSTRAINT "task_roles_role_id_fkey";

-- DropForeignKey
ALTER TABLE "task_roles" DROP CONSTRAINT "task_roles_task_id_fkey";

-- DropForeignKey
ALTER TABLE "team_roles" DROP CONSTRAINT "team_roles_role_id_fkey";

-- DropForeignKey
ALTER TABLE "team_roles" DROP CONSTRAINT "team_roles_team_id_fkey";

-- DropTable
DROP TABLE "_OrganizationRoles";

-- DropTable
DROP TABLE "_ProjectRoles";

-- DropTable
DROP TABLE "_TaskRoles";

-- DropTable
DROP TABLE "_TeamRoles";

-- DropTable
DROP TABLE "categories";

-- DropTable
DROP TABLE "feature_flags";

-- DropTable
DROP TABLE "organization_roles";

-- DropTable
DROP TABLE "organizations";

-- DropTable
DROP TABLE "priorities";

-- DropTable
DROP TABLE "project_roles";

-- DropTable
DROP TABLE "projects";

-- DropTable
DROP TABLE "statuses";

-- DropTable
DROP TABLE "tags";

-- DropTable
DROP TABLE "task_roles";

-- DropTable
DROP TABLE "tasks";

-- DropTable
DROP TABLE "team_roles";

-- DropTable
DROP TABLE "teams";

-- DropTable
DROP TABLE "types";
