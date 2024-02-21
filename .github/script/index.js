const fs = require("fs");
const numeral = require("numeral");

fetch("https://meteorclient.com/api/stats")
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        if (!data.downloads) {
            throw new Error("Invalid response data.");
        }
        const downloadCount = parseInt(data.downloads, 10);
        const downloadString = numeral(downloadCount).format('0.0a');

        return fs.promises.readFile("../templates/README_TEMPLATE.md", "utf-8")
            .then(template => {
                const formatted = template.replace("%METEOR_DOWNLOADS%", downloadString);
                return fs.promises.writeFile("../../README.md", formatted, 'utf-8');
            });
    })
    .then(() => {
        console.log("README.md successfully updated.");
    })
    .catch(error => {
        console.error("Error:", error);
    });
