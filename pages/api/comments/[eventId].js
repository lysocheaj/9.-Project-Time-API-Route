import {
  ConnectDatabase,
  InsertDocument,
  getAllDocuments,
} from "../../../helpers/db-util";

async function handler(req, res) {
  const { text, email, name } = req.body;
  const eventId = req.query.eventId;

  let client;
  try {
    client = await ConnectDatabase("events");
  } catch {
    res.status(500).json({ message: "Failed connecting to DB!" });
    return;
  }

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

    // insert data to DB
    try {
      const result = await InsertDocument(client, "comments", newComments);
      newComments._id = result.insertedId;

      console.log("newcomment", newComments);
      res
        .status(201)
        .json({ message: "added comments.", comment: newComments });
    } catch {
      res.status(500).json({ message: "Insert document failed!" });
    }
  }

  if (req.method === "GET") {
    try {
      const ducuments = await getAllDocuments(client, "comments", { _id: -1 });
      console.log("ducuments", ducuments);
      
      res.status(200).json({ comments: ducuments });
    } catch {
      res.status(500).json({ message: "Failed fetching all comments!" });
    }
  }

  client.close();
}

export default handler;
