import fs from 'fs';

// recursive function that all the keys in a nested object
const keyify = (obj, prefix = '') => 
  Object.keys(obj).reduce((res, el) => {
    if( typeof obj[el] === 'object' && obj[el] !== null ) {
      return [...res, ...keyify(obj[el], prefix + el + '.')];
    }
    return [...res, prefix + el];
  }, []);

function findDifferentKeysInNDJSONFile(filePath) {
  const uniqueKeys = new Set();

  // Read the NDJSON file line by line
  const fileContents = fs.readFileSync(filePath, 'utf-8');
  const lines = fileContents.split('\n');

  // Parse each line as JSON and extract the keys
  for (const line of lines) {
    if (line.trim() === '') continue; // Skip empty lines
    const obj = JSON.parse(line);
    
    // if (obj['annotations']['1'] === undefined) continue; // Skip lines without annotations
    // there are up to 3 events under obj['annotations']['0']['events']
    // there is only one index under annotations, NOTHING ELSE
    for (const e of obj['annotations']['0']['events']) {
      // const keys = keyify(obj['annotations']['0']);
      const keys = keyify(e);
      for (const key of keys) {
        uniqueKeys.add(key);
      }
    }
  }

  // Convert the Set to an array and return it
  return Array.from(uniqueKeys);
}

// Usage example
const filePath = '/Users/domantas/Documents/cs310/src/lib/data/train.json';
const keys = findDifferentKeysInNDJSONFile(filePath);

// sort keys
keys.sort();
// write to file
console.log(keys);
fs.writeFileSync('keys.txt', keys.join('\n'));
