import { MongoClient } from 'mongodb';

const connectionString = 'mongodb://admin:admin@localhost:27017';
const dbName = 'test';

let client: MongoClient;

export const getDb = async () => {
    client = await MongoClient.connect(connectionString);
    return client.db(dbName);
}

export const dbClose = () => client.close();