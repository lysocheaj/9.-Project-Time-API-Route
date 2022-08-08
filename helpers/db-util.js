import { MongoClient } from "mongodb";

export async function ConnectDatabase(dbname) {
  const client = await MongoClient.connect(
    "mongodb+srv://sochea:mjPOGEawydCfThTG@cluster0.daiqd60.mongodb.net/" +
      dbname +
      "?retryWrites=true&w=majority"
  );
  return client;
}

export async function InsertDocument(client, collection, document) {
  const db = client.db(); // connect db name newsletter
  await db.collection(collection).insertOne(document); // create a table name emails and insert query email to it
}

export async function getAllDocuments(client, collection, sort) {
    const db = client.db();
    const ducuments = await db
      .collection(collection) // connect to db table
      .find() // fetch all comments
      .sort(sort) // sort as descending order
      .toArray(); // and convert result to array

    return ducuments;
}
