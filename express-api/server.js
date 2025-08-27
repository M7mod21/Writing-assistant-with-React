import express from "express";
import cors from "cors";

const app = express();

// تفعيل CORS
app.use(cors());

// للسماح بقراءة بيانات JSON
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello Backend!");
});

app.post("/send-data", (req, res) => {
  console.log(req.body);
  res.json({ message: "Data received successfully!" });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
