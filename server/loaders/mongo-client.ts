import { Db, ObjectID } from 'mongodb';
import { injectable } from 'inversify';
import { MongoDBConnection } from './mongo-connection';

@injectable()
export class MongoDBClient {

  constructor() {
  }

  public async getDb() {
    return MongoDBConnection.getConnection();
  }

}
