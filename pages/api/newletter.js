import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const userEmail = req.body.email;

    if (!userEmail || !userEmail.includes("@")) {
      res.status(422).json({ message: "Invalid email address!" });
      return;
    }

    const client = await MongoClient.connect(
      "mongodb+srv://sochea:mjPOGEawydCfThTG@cluster0.daiqd60.mongodb.net/events?retryWrites=true&w=majority"
    );

    const db = client.db(); // connect db name newsletter
    await db.collection("newsletter").insertOne({ email: userEmail }); // create a table name emails and insert query email to it
    client.close(); // disconnect between client and db

    // .then((client) => {
    //   const db = client.db(); // connect db name newsletter
    //   db.collection("emails").insertOne({ email: userEmail}); // create a table name emails and insert query email to it
    // });

    console.log("email: ", userEmail);
    res.status(201).json({ message: "Signed up!" });
  }
}

export default handler;
