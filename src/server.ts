import express, { Request, Response } from "express";
import http from "http";
import { Server } from "socket.io";
import type { ISocket, IUser } from "./types/common";

// SERVER INITIALIZATION
const PORT = 5000;

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.get("/", (_req: Request, res: Response) => {
    res.json({ status: 200, message: "Server is running" });
});

// USERS HANDLER
class Users {
    private users: IUser[];
    constructor() {
        this.users = [];
    }

    public addUser(user: IUser) {
        console.log(user.username, "has joined the chat");
        this.users.push(user);
    }

    public removeUser(user: IUser) {
        console.log(user.username, "has left the chat");
        this.users = this.users.filter(u => u.id !== user.id);
    }
}

const users = new Users();

// SOCKET HANDLER
io.on("connection", (socket: ISocket) => {
    socket.on("join", ({ username }) => {
        socket.username = username;
        const newUser: IUser = { username, id: socket.id };
        users.addUser(newUser);
    });

    socket.on("disconnect", () => {
        const user: IUser = { username: socket.username as string, id: socket.id };
        users.removeUser(user);
    });
});

server.listen(PORT, () => {
    console.log(`listening on http://localhost:${PORT}`);
});
