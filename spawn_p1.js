const { spawn } = require('child_process');

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
