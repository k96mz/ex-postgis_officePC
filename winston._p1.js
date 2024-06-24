const config = require('config');
const winston = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');
const logDir = config.get('logDir');

winston.configure({
  level: 'silly',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new DailyRotateFile({
      filename: `${logDir}/application-%DATE%.log`,
      datePattern: 'YYYY-MM-DD',
      maxSize: '20m',
      maxFiles: '14d',
    }),
  ],
});

winston.info('This is an informational message.');
