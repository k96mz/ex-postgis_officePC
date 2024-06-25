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
  stdio: ['pipe', 'pipe', 'inherit'],
});

// 親プロセスから子プロセスにデータを送信します
child.stdin.write('Hello, world!\n');

// 子プロセスからの出力を処理します
child.stdout.on('data', data => {
  console.log(`子プロセスからの出力: ${data}`);
});

// 子プロセスの終了を処理します
child.on('close', code => {
  console.log(`子プロセスが終了しました。終了コード: ${code}`);
});

/*
// PowerShellコマンドを実行
const ls = spawn('powershell.exe', [
  '-Command',
  'Get-ChildItem',
  // 'C:\\Users\\astro\\Documents\\GitHub\\ex-postgis_officePC',
  'C:\\Users\\Koji.Osumi\\Desktop\\Practice\\ex-postgis_officePC',
]);

// 標準出力を監視
ls.stdout.on('data', data => {
  console.log(`stdout: ${data}`);
});

// 標準エラー出力を監視
ls.stderr.on('data', data => {
  console.error(`stderr: ${data}`);
});

// プロセスの終了を監視
ls.on('close', code => {
  console.log(`子プロセスの終了コード: ${code}`);
});

// エラーハンドリング
ls.on('error', err => {
  console.error(`Failed to start subprocess: ${err.message}`);
});
*/
