const { spawn } = require('child_process');

// 子プロセスのスクリプトを作成します
const childScript = `
  process.stdin.on('data', (data) => {
    const input = data.toString().trim();
    const reversed = input.split('').reverse().join('');
    process.stdout.write(reversed + '\\n');
  });
`;

// 子プロセスを作成して、標準入出力を設定します
const child = spawn('node', ['-e', childScript], {
  // -e オプションは、指定したスクリプトを直接実行するためのもの
  stdio: ['pipe', 'pipe', 'inherit'],
  // ['pipe', 'pipe', 'inherit'] はそれぞれ標準入力、標準出力、標準エラー出力の設定です。ここでは、親プロセスと子プロセスの間で標準入力と標準出力をパイプし、標準エラー出力を親プロセスに継承させています
});

// 親プロセスから子プロセスにデータを送信します
child.stdin.write('Hello, world!\n');
// console.log(child.stdin);
console.log(child.stdin._writableState);
console.log(child.stdin._writableState.length);

// 子プロセスからの出力を処理します
child.stdout.on('data', data => {
  console.log(`子プロセスからの出力: ${data}`);
});

// 子プロセスの終了を処理します
child.on('close', code => {
  console.log(`子プロセスが終了しました。終了コード: ${code}`);
});

/*
const { spawn } = require('child_process');

// PowerShellコマンドを実行
const ls = spawn('powershell.exe', [
  '-Command',
  'Get-ChildItem',
  // 'C:\\Users\\astro\\Documents\\GitHub\\ex-postgis_officePC',
  'C:\\Users\\Koji.Osumi\\Desktop\\Practice\\ex-postgis_officePC',
]);
//　第二引数はコマンドに渡す引数の配列。

// 標準出力を監視
ls.stdout.on('data', data => {
  // 子プロセスの標準出力 (stdout) にデータが出力されるたびにそのデータを受け取ります。
  console.log(`stdout: ${data}`);
});

// 標準エラー出力を監視
ls.stderr.on('data', data => {
  // 子プロセスの標準エラー出力 (stderr) にデータが出力されるたびにそのデータを受け取ります
  console.error(`stderr: ${data}`);
});

// プロセスの終了を監視
ls.on('close', code => {
  console.log(`子プロセスの終了コード: ${code}`);
  // code が 0 であれば、プロセスが正常に終了したことを意味し、非 0 であれば、何らかのエラーが発生したことを意味します。
});

// エラーハンドリング
ls.on('error', err => {
  // 子プロセスの起動に失敗した場合に呼び出されるコールバック関数を設定します。
  console.error(`Failed to start subprocess: ${err.message}`);
});
*/
