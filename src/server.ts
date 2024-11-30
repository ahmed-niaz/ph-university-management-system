import mongoose from 'mongoose';
import app from './app';
import config from './config';

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
