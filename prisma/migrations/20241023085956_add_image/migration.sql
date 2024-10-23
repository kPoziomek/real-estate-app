/*
  Warnings:

  - You are about to drop the column `images` on the `Listing` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "ImageCredit" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "link" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Image" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "url" TEXT NOT NULL,
    "creditId" INTEGER NOT NULL,
    "listingId" INTEGER,
    CONSTRAINT "Image_creditId_fkey" FOREIGN KEY ("creditId") REFERENCES "ImageCredit" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Image_listingId_fkey" FOREIGN KEY ("listingId") REFERENCES "Listing" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Listing" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "area" REAL NOT NULL,
    "rooms" INTEGER NOT NULL,
    "city" TEXT,
    "propertyType" TEXT NOT NULL,
    "listingType" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Listing_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Listing" ("area", "city", "createdAt", "description", "id", "listingType", "price", "propertyType", "rooms", "title", "updatedAt", "userId") SELECT "area", "city", "createdAt", "description", "id", "listingType", "price", "propertyType", "rooms", "title", "updatedAt", "userId" FROM "Listing";
DROP TABLE "Listing";
ALTER TABLE "new_Listing" RENAME TO "Listing";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
