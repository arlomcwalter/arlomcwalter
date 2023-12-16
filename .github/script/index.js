const fs = require("fs");
const numeral = require("numeral");

const response = await fetch("https://meteorclient.com/api/stats");
if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

const data = await response.json();
if (!data.downloads) throw new Error("Invalid response data.");

const downloadCount = parseInt(data.downloads, 10);
const downloadString = numeral(downloadCount).format('0.0a');

const template = fs.readFileSync("../templates/README_TEMPLATE.md", "utf-8");
const formatted = template.replace("%METEOR_DOWNLOADS%", downloadString);

fs.writeFileSync("../../README.md", formatted, 'utf-8');
