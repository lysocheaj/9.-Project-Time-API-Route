import { ConnectDatabase, InsertDocument } from "../../helpers/db-util";

async function handler(req, res) {
  if (req.method === "POST") {
    const userEmail = req.body.email;

    if (!userEmail || !userEmail.includes("@")) {
      res.status(422).json({ message: "Invalid email address!" });
      return;
    }

    let client;
    try {
      client = await ConnectDatabase("events"); // establish connection
    } catch (error) {
      res.status(500).json({ message: "Connecting to database failed!" });
      return;
    }

    try {
      console.log("email: ", userEmail);
      await InsertDocument(client, "newsletter", { email: userEmail });
      res.status(201).json({ message: "Signed up!" });

      client.close(); // disconnect between client and db
    } catch (error) {
      res.status(500).json({ message: "Insert document failed!" });
      return;
    }
  }
}

export default handler;
