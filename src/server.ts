import express, { Request, Response } from "express";
import http from "http";
import { Server } from "socket.io";
import type { ISocket, IUser } from "./types/common";

const PORT = 5000;

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.get("/", (_req: Request, res: Response) => {
    res.json({ status: 200, message: "Server is running" });
});

io.on("connection", (socket: ISocket) => {
    socket.on("join", ({ username }) => {
        socket.username = username;
        console.log("someone joined", username);
    });

    socket.on("disconnect", () => {
        console.log(`${socket.username} has left the chat`);
    });
});

server.listen(PORT, () => {
    console.log(`listening on http://localhost:${PORT}`);
});
