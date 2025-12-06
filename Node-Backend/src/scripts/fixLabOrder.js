// src/scripts/fixLabOrder.js
import prisma from "../config/db.js"; // one level up from scripts → config

const fixLabOrder = async () => {
  try {
    console.log("🔄 Updating lab displayOrder values...");

    const labs = await prisma.lab.findMany({
      orderBy: { id: "asc" },
    });

    if (labs.length === 0) {
      console.log("No labs found in database.");
      return;
    }

    for (let i = 0; i < labs.length; i++) {
      await prisma.lab.update({
        where: { id: labs[i].id },
        data: { displayOrder: i + 1 },
      });
      console.log(`✅ Lab "${labs[i].title}" → displayOrder set to ${i + 1}`);
    }

    console.log("\n✅ All labs now have proper sequential displayOrder values!");
  } catch (err) {
    console.error("❌ Error fixing lab order:", err);
  } finally {
    await prisma.$disconnect();
  }
};

fixLabOrder();
