// Generates PWA icons from the existing app logo using sharp.
// Run: node scripts/generate-pwa-icons.mjs
import sharp from "sharp";

const SOURCE = "src/app/icon.png";

async function main() {
  // Transparent square icons (purpose: any)
  await sharp(SOURCE)
    .resize(192, 192, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile("public/icon-192.png");

  await sharp(SOURCE)
    .resize(512, 512, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile("public/icon-512.png");

  // Maskable icon: logo at ~70% inside a white safe-zone, padded to 512x512.
  // 358 + 77 padding on each side = 512.
  await sharp(SOURCE)
    .resize(358, 358, { fit: "contain", background: { r: 255, g: 255, b: 255, alpha: 1 } })
    .extend({ top: 77, bottom: 77, left: 77, right: 77, background: { r: 255, g: 255, b: 255, alpha: 1 } })
    .flatten({ background: { r: 255, g: 255, b: 255 } })
    .png()
    .toFile("public/icon-512-maskable.png");

  console.log("PWA icons written to public/: icon-192.png, icon-512.png, icon-512-maskable.png");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
