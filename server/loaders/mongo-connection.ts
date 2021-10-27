
import { Db, MongoClient } from 'mongodb';
import config from '../config';

export class MongoDBConnection {
    private static isConnected = false;
    private static db: Db;

    public static async getConnection(): Promise<Db> {
        if (this.isConnected) {
            return this.db;
        } else {
            return this.connect();
        }
    }

    private static async connect(): Promise<Db> {
        if (!config.databaseUser || !config.databasePass) {
            throw new Error(`⚠️  Couldn't find database user and/or password in .env file  ⚠️`);
        }
        try {
            const connection = await MongoClient.connect(config.databaseURL, {
                useUnifiedTopology: true,
                auth: {
                    user: config.databaseUser,
                    password: config.databasePass
                }
            });
            this.db = connection.db(config.databaseName);
            this.isConnected = true;
            return this.db;
        } catch (error) {
            console.error('Error database connection', error);
            throw error;
        }
    }
}
