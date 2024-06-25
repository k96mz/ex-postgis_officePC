const prettysize = require('prettysize');

// ファイルサイズをバイトで指定する例
const fileSize = 123456789; // 123.46 MB
const fileSize2 = 888123456789; // 888 MB

// プリティサイズに変換
const pretty = prettysize(fileSize);
const pretty2 = prettysize(fileSize2);

console.log(pretty); // '117.74 MB' (実行結果は異なる場合があります)
console.log(pretty2); // '827.1 GB' (実行結果は異なる場合があります)
