export default function handler(req, res) {
  if (req.method === "POST") {
    console.log("Data from client:", req.body);
    res.status(200).json({ message: "Data received successfully!" });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
