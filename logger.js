import winston from 'winston';

const logger = new (winston.Logger)({
  transports: [
    // colorize the output to the console
    new (winston.transports.Console)({
      timestamp: Date.now(),
      colorize: true,
      level: process.env.NODE_ENV === 'test' ? [] : 'info'
    })
  ]
});

export default logger;
