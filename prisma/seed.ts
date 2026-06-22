import { starterTemplates } from "../src/lib/templates/templates";

async function main() {
  console.log(`Prepared ${starterTemplates.length} in-repo starter templates.`);
  console.log("The Prisma seed is currently documentation-grade until template tables are added.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

