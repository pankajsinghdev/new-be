import { PrismaClient } from "@prisma/client";
import express, { Request, Response } from "express";
import cors from "cors";

const app = express();
const port = 3000;
app.use(express.json());
app.use(cors());

const prisma = new PrismaClient();

app.get("/", async (req: Request, res: Response) => {
  const users = await prisma.user.findMany();
  res.json({
    users,
  });
});

app.post("/user", async (req: Request, res: Response) => {
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

app.listen(port, (err: any) => {
  if (!err) {
    console.log("successfully connected to post ", port);
  } else {
    console.log("Error occured", err);
  }
});
