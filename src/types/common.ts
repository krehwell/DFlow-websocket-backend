import type { Socket } from "socket.io";

export interface ISocket extends Socket {
    username?: string;
}

export interface IUser {
    id: string;
    username: string;
    isTyping?: boolean;
}
