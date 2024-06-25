const hhmmss = require('hh-mm-ss');

const date = new Date();
console.log(date);

const dateString = new Date().toISOString();
console.log(dateString);

setTimeout(() => {
  const newTime = new Date() - date;
  console.log(newTime);
  console.log(hhmmss.fromMs(newTime));
}, 1000);

let moduleKeysInProgress = ['key1', 'key2', 'key3'];
let moduleKey = 'key2';

moduleKeysInProgress = moduleKeysInProgress.filter(v => !(v === moduleKey));
console.log(moduleKeysInProgress);
