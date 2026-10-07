import fs from "fs";

const filePath = "./src/App.jsx";

let code = fs.readFileSync(filePath, "utf8");

code = code.replace(
  /\/images\/([^"'?]+\.(?:png|jpg|jpeg))/gi,
  (match, filename) => {
    const name = filename.replace(/\.(png|jpg|jpeg)$/i, ".webp");
    return `/images/optimized/${name}`;
  }
);

fs.writeFileSync(filePath, code);

console.log("🎉 Les chemins des images ont été mis à jour !");