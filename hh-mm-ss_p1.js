const hhmmss = require('hh-mm-ss');

// fromMs(ms, format)
// Generate formatted string from time in miliseconds

// 秒数を時分秒形式に変換する例
const seconds = 3661; // 3661秒は1時間1分1秒
const seconds2 = 3661000; // 3661000ミリ秒

// 秒数から時分秒に変換
// const formattedTime = hhmmss.fromSeconds(seconds);
const formattedTime2 = hhmmss.fromMs(seconds2);

// console.log(formattedTime); // '1:01:01' (実行結果は異なる場合があります)
console.log(formattedTime2);
