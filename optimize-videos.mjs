import { execFile } from "child_process";
import ffmpegPath from "ffmpeg-static";
import fs from "fs";
import path from "path";

const inputFolder = "./public/images/public/videos";
const outputFolder = "./public/images/optimized-videos";

const videos = [
  "sinner_pokematch.mp4",
  "alcaraz_pokematch.mp4",
  "sabalenka_pokematch.mp4",
  "andreeva_pokematch.mp4"
];

if (!fs.existsSync(outputFolder)) {
  fs.mkdirSync(outputFolder, { recursive: true });
}

function optimizeVideo(file) {
  return new Promise((resolve, reject) => {
    const input = path.join(inputFolder, file);
    const output = path.join(outputFolder, file);

    console.log(`🎥 Optimisation de ${file}...`);

    execFile(
      ffmpegPath,
      [
        "-y",
        "-i", input,
        "-vf", "scale='min(1920,iw)':-2",
        "-r", "30",
        "-c:v", "libx264",
        "-preset", "medium",
        "-crf", "23",
        "-pix_fmt", "yuv420p",
        "-an",
        "-movflags", "+faststart",
        output
      ],
      (error) => {
        if (error) {
          console.error(`❌ Erreur avec ${file}`);
          reject(error);
          return;
        }

        console.log(`✅ ${file} terminé`);
        resolve();
      }
    );
  });
}

for (const video of videos) {
  await optimizeVideo(video);
}

console.log("\n🎉 LES 4 VIDÉOS SONT OPTIMISÉES !");