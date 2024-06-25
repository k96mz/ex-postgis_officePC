const Queue = require('better-queue');

// キューの作成
let q = new Queue(function (input, cb) {
  // ジョブの処理
  // inputはキューに追加されたジョブのデータを表し、cbはジョブが完了したときに呼び出すコールバック関数です。
  console.log('Processing:', input);
  setTimeout(() => {
    // cb(null, input);
    cb(null, 'test');
    // ジョブの処理が正常に完了したことをキューシステムに通知します。
    // null: エラーが発生していないことを示します。
    // input: ジョブの処理結果として、入力データをそのまま返しています。
  }, 1000);
});

// ジョブの追加
q.push(1);
q.push(2);
q.push(3);

q.on('task_finish', function (taskId, result) {
  console.log(`Job ${taskId} finished with result ${result}`);
  //task_finishイベントはジョブが完了したときに発生し、ジョブのIDと結果を受け取ります。この例では、ジョブが完了したことをコンソールに表示します。
});

q.on('drain', function () {
  console.log('All jobs have been processed');
  // drainイベントはキュー内のすべてのジョブが処理されたときに発生し、すべてのジョブが処理されたことをコンソールに表示します。
});
