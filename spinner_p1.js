const config = require('config');
const Spinner = require('cli-spinner').Spinner;
const spinnerString = config.get('spinnerString');

// デフォルトのスピナー文字列を設定
// Spinner.setDefaultSpinnerString('|/-\\');
Spinner.setDefaultSpinnerString(spinnerString);

// 新しいスピナーインスタンスを作成
// const spinner = new Spinner('processing.. %s');
const spinner = new Spinner();

spinner.setSpinnerTitle('moduleKeysInProgress.join   ');

// スピナーを開始
spinner.start();

// 3秒後にスピナーを停止
setTimeout(() => {
  spinner.stop();
  console.log('Done');
}, 3000);
