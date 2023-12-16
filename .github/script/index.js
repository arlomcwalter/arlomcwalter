const fs = require("fs");
const numeral = require("numeral");

fetch("https://meteorclient.com/api/stats")
  .then((res) => {
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    return res.json();
  })
  .then((data) => {
    if (!data.downloads) {
      throw new Error("Invalid response data.");
    }

    const downloadCount = parseInt(data.downloads, 10);
    const downloadString = numeral(downloadCount).format('0.0a');

    // Read template file and replace placeholder
    const template = fs.readFileSync("../templates/README_TEMPLATE.md", "utf-8");
    const formatted = template.replace("%METEOR_DOWNLOADS%", downloadString);

    // Write the formatted content to README.md
    fs.writeFileSync("../../README.md", formatted, 'utf-8');
  })
  .catch((error) => {
    console.error('Error:', error.message);
  });