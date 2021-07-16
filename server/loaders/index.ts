import Logger from './logger';
import koaLoader from './koa';
import { MongoDBConnection } from './mongo-connection';

export default async ({ koaApp }) => {
  // Test databese connection
  await MongoDBConnection.getConnection();
  Logger.info('✌️ DB loaded and connected!');

  Logger.info('✌️ Dependency Injector loaded');

  await koaLoader({ app: koaApp });
  Logger.info('✌️ Koa loaded');
};
