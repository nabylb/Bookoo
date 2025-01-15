const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

const sizes = [16, 32, 48, 120, 128, 256, 512];
const inputSvg = path.join(__dirname, "../public/assets/bookoo-logo.svg");
const outputDir = path.join(__dirname, "../public/assets");

async function generateIcons() {
	// Ensure output directory exists
	if (!fs.existsSync(outputDir)) {
		fs.mkdirSync(outputDir, { recursive: true });
	}

	// Generate icons for each size
	for (const size of sizes) {
		await sharp(inputSvg)
			.resize(size, size)
			.png()
			.toFile(path.join(outputDir, `icon${size}.png`));

		console.log(`Generated icon${size}.png`);
	}
}

generateIcons().catch(console.error);
