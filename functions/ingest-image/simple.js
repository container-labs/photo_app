import fs from 'fs';
import getExif from './getExif.js';

const testDirectory = '/test-photos';

fs.readdirSync(testDirectory).forEach(async (fileName) => {
  const imageData = await getExif(`${testDirectory}/${fileName}`);
  console.log(imageData);
});
