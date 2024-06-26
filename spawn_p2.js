const { spawn } = require('child_process');

const child = spawn(
  'node',
  [
    '-e', // -e オプションは、指定したスクリプトを直接実行するためのもの

    `
  process.stdin.on('data', (data) => {
    process.stdout.write(data.toString().toUpperCase());
  });
`,
    //　第二引数はコマンドに渡す引数の配列。
    // 受け取ったdataをここで改変している。これが子プロセス。
  ],
  { stdio: ['pipe', 'inherit', 'inherit'] }
);

// 親プロセスから子プロセスにデータを送信。これが子プロセスの標準入力に書き込まれる。
child.stdin.write('Hello, child process!\n');

// 子プロセスからの出力を親プロセスで受け取る
// child.stdout.on('data', data => {
//   console.log(`Child process output: ${data}`);
// });
// 受け取った子プロセスの出力を改変。これが親プロセスの出力。

/*
const { spawn } = require('child_process');

const child = spawn('node', ['-e', `
  console.log("Hello from child process!");
`], { stdio: 'inherit' });
*/

/*
const { spawn } = require('child_process');

const child = spawn('node', ['-e', `
  console.log("Hello from child process!");
`], { stdio: 'inherit' });
*/

/*
const ls = spawn('powershell.exe', [
  '-Command',
  // 'Get-ChildItem',
  'Get-ChildItem',
  'C:\\Users\\Koji.Osumi\\Desktop\\Practice\\ex-postgis_officePC',
]);

ls.stdout.on('data', data => {
  console.log(`stdout: ${data}`);
});

ls.stderr.on('data', data => {
  console.log(`stderr: ${data}`);
});

ls.on('close', code => {
  console.log(`子プロセスの終了: ${code}`);
});
*/
