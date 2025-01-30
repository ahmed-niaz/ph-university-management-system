import mongoose from 'mongoose';
import app from './app';
import config from './config';
import { query } from 'express';

async function server() {
  try {
    await mongoose.connect(config.database_url as string);
    app.listen(config.port, () => {
      console.log(
        `ph university management system server is running ${config.port}`,
      );
    });
  } catch (err) {
    console.log(err);
  }
}

server();

// // unhandled Rejection [asynchronous]

// process.on('unhandledRejection', () => {
//   console.log(`(●'◡'●) unhandled Rejection is detected, shutting down..`);

//   if (server) {
//     server.close(() => {
//       process.exit(1);
//     });
//   }
//   process.exit(1);
// });

// Promise.reject();

// // uncaught Exception [synchronous]

// process.on('uncaughtException', () => {
//   console.log(`(●'◡'●) uncaught exception is detected, shutting down..`);
//   process.exit(1);
// });


