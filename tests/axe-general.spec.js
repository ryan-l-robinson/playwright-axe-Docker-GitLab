const { test } = require('@playwright/test');
const AxeBuilder = require('@axe-core/playwright').default;
const fs = require('fs');

test.describe('Test all public pages', () => {
  test('Report on automatically detectable violations', async ({ page }) => {

    // This job assumes that a file exists here, with one URL per line
    const lines = fs.readFileSync('/opt/playwright/tests/urls.txt', 'utf8').split('\n');

    for (const line of lines) {
      if (line.startsWith("http")) {
        await page.goto(line.trim());
        const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
        if (accessibilityScanResults.violations.length > 0) {

          updateFile("/opt/playwright/results/axe-violations.json", [
            {
              url: line,
              violations: accessibilityScanResults.violations
            }
          ]).then((message) => {
            console.log(message);
          });
        }
      }
    }
  });

});

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