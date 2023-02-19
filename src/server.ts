import express, { Request, Response } from "express";
import http from "http";
import { Server } from "socket.io";
import type { ISocket } from "./types/common";

const PORT = 5000;

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.get("/", (_req: Request, res: Response) => {
  res.json({ status: 200, message: "Server is running" });
});

io.on("connection", (socket: ISocket) => {});

server.listen(PORT, () => {
  console.log(`listening on http://localhost:${PORT}`);
});
