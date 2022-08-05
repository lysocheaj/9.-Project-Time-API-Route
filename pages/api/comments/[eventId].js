function handler(req, res) {
  const { text, email, name } = req.body;
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
      id: new Date().toISOString(),
      text,
      name,
      email,
    };

    console.log('newcomment', newComments);
    res.status(201).json({ message: "added comments.", comment: newComments });
  }

  if (req.method === "GET") {
    const dummyList = [
      { id: "c1", name: "Sochea", text: "My comment" },
      { id: "c2", name: "Sothy", text: "BB comment" },
    ];
    res.status(200).json({ comments: dummyList });
  }
}

export default handler;
