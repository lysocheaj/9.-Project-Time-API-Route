function handler(req, res) {
  if (req.method === "POST") {
    const userEmail = req.boday.email;

    if (!userEmail || !userEmail.includes("@")) {
      res.status(422).json({ message: "Invalid emial address!" });
      return;
    }

    console.log("email: ", userEmail);
    res.status(201).json({ message: "Signed up!" });
  }
}

export default handler;
