import sharp from "sharp";
import fs from "fs";
import path from "path";

const inputFolder = "./public/images";
const outputFolder = "./public/images/optimized";

const extensions = [".png", ".jpg", ".jpeg"];

if (!fs.existsSync(outputFolder)) {
  fs.mkdirSync(outputFolder, { recursive: true });
}

const files = fs.readdirSync(inputFolder);

for (const file of files) {
  const ext = path.extname(file).toLowerCase();

  if (!extensions.includes(ext)) continue;

  const inputPath = path.join(inputFolder, file);
  const outputName = path.basename(file, ext) + ".webp";
  const outputPath = path.join(outputFolder, outputName);

  try {
    await sharp(inputPath)
      .webp({ quality: 82 })
      .toFile(outputPath);

    console.log(`✅ ${file} → ${outputName}`);
  } catch (error) {
    console.error(`❌ Erreur avec ${file}`, error);
  }
}

console.log("\n🎉 Toutes les images ont été optimisées !");