var { test, expect } = require('@playwright/test');
var AxeBuilder = require('@axe-core/playwright').default;
var fs = require('fs');
var { parse } = require('fsp-xml-parser');

// Parse the XML file into a Urlset object
const siteMapPath = "/opt/playwright/sitemap.xml"
const xml = parse(fs.readFileSync(siteMapPath, "utf8"));
const urlset = xml.root.children;

// Loop through each url in the Urlset object and extract its loc value
const locArray: Array<string> = [];
for (const url of urlset) {
  // Get the value of the <loc> tag
  const loc = url.children[0].content;
  // Push it into the array
  locArray.push(loc);
}

for (var url of locArray) {
  test.describe('Axe-core analyze on public pages', () => {
    test(`Looking for accessibility violations on ${url}`, async ({ page }) => {

      await page.goto(url);
      const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

      if (accessibilityScanResults.violations.length > 0) {

        updateFile("/opt/playwright/results/sitemap-violations.json", [
          {
            url: url,
            violations: accessibilityScanResults.violations
          }
        ]).then((message) => {
          console.log(message);
        });
      }

    });

  });
}

const updateFile = async (filePath, data) => {
  try {
    const fileContents = await fs.readFileSync(filePath, {
      encoding: "utf-8",
      flag: "r",
    });

    const fileData = JSON.parse(fileContents);

    const updatedFileData = [...fileData, ...data];

    await fs.writeFileSync(filePath, JSON.stringify(updatedFileData), {
      encoding: "utf-8",
      flag: "w",
    });

    return JSON.stringify(data);
  } catch (error) {
    console.error('Error updating the JSON file:', error);
  }
};