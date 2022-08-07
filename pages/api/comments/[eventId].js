import { MongoClient } from "mongodb";

async function handler(req, res) {
  const { text, email, name } = req.body;
  const eventId = req.query.eventId;

  const client = await MongoClient.connect(
    "mongodb+srv://sochea:mjPOGEawydCfThTG@cluster0.daiqd60.mongodb.net/events?retryWrites=true&w=majority"
  );

  if (req.method === "POST") {
    if (
      !email.includes("@") ||
      !text ||
      text.trim() === "" ||
      !name ||
      name.trim() === ""
    ) {
      res.status(422).json({ message: "Invalid input" });
      return;
    }

    const newComments = {
      // id: new Date().toISOString(),
      eventId,
      text,
      name,
      email,
    };

    const db = client.db();
    const result = await db.collection("comments").insertOne(newComments);

    newComments.id = result.insertedId;

    console.log("newcomment", newComments);
    res.status(201).json({ message: "added comments.", comment: newComments });
  }

  if (req.method === "GET") {
    const db = client.db();
    const ducuments = await db
      .collection("comments") // connect to db table
      .find() // fetch all comments
      .sort({ _id: -1 }) // sort as descending order
      .toArray(); // and result to array

    console.log("ducuments", ducuments);
    res.status(200).json({ comments: ducuments });
  }

  client.close();
}

export default handler;
