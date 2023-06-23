-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Tasks" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "due_date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME,
    "completed_at" DATETIME
);
INSERT INTO "new_Tasks" ("completed_at", "created_at", "description", "due_date", "id", "title", "updated_at") SELECT "completed_at", "created_at", "description", coalesce("due_date", CURRENT_TIMESTAMP) AS "due_date", "id", "title", "updated_at" FROM "Tasks";
DROP TABLE "Tasks";
ALTER TABLE "new_Tasks" RENAME TO "Tasks";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
