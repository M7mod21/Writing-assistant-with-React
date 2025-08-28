export default function handler(req, res) {
  if (req.method === "GET") {
    res.status(200).send("Hello Backend!");
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
