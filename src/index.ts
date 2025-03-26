import { PrismaClient } from "@prisma/client";
import express from "express";

const app = express();
const port = 3000;
app.use(express.json());

const prisma = new PrismaClient();

app.get("/", async (req, res) => {
  const users = await prisma.user.findMany();
  res.json({
    users,
  });
});

app.post("/user", async (req, res) => {
  console.log(req.body);
  const { username, password } = req.body;
  const user = await prisma.user.create({
    data: {
      username,
      password,
    },
  });
  res.json({
    user,
  });
});

app.listen(port, (err) => {
  if (!err) {
    console.log("successfully connected to post ", port);
  } else {
    console.log("Error occured", err);
  }
});
