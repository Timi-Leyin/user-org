// @ts-check
const fs = require('fs');
const path = './dist';

if (fs.existsSync(path)) {
  try {
    fs.rmdirSync(path, { recursive: true });
    console.log(`${path} is deleted`);
  } catch (err) {
    console.error(`Error deleting ${path}: ${err}`);
  }
} else {
  console.error(`${path} does not exist`);
}
