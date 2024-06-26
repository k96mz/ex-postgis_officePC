const Queue = require('better-queue');

const processTask = (task, cb) => {
  console.log(`Processing task: ${task.name}`);
  // 以下が実際のタスク処理ロジック
  setTimeout(() => {
    console.log(`Finished processing task: ${task.name}`);
    cb(null, task.name);
    cb();
  }, 2000);
};

const queue = new Queue(processTask);

queue.push({ name: 'Task 1' });
queue.push({ name: 'Task 2' });
queue.push({ name: 'Task 3' });

queue.on('task_finish', (taskId, result) => {
  console.log(`Task ${result} has been processed.`);
});

queue.on('drain', () => {
  console.log('All tasks have been processed.');
});
