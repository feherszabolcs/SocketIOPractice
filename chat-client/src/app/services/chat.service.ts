import { Injectable, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { Socket, io } from 'socket.io-client';
import { Message } from '../models/message.model';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private socket!: Socket;
  messages: Message[] = [];

  constructor(private authService: AuthService) {
    this.init();
  }

  sendMessage(message: Message) {
    message.username = this.authService.user?.username;
    this.messages.push(message);
    this.socket.emit('send-message', message);
  }

  joinRoom(room: string) {
    this.socket.emit('join-room', room, (msg: string) =>
      this.messages.push({ content: msg })
    );
    this.messages.splice(1, this.messages.length);
  }

  isMyMessage(message: Message) {
    return message.username == this.authService.user?.username;
  }

  init() {
    if (this.socket) this.socket.disconnect();

    this.socket = io('ws://localhost:3000', {
      auth: {
        token: this.authService.user?.token,
      },
    });

    this.socket.on('connect', () => {
      this.messages.push({
        content: `You connected with id: ${this.socket.id}`,
      });
    });

    this.socket.on('recieve-message', (data: Message) => {
      this.messages.push(data);
    });

    this.socket.on('user-joined', (data) => {
      this.messages.push({
        content: `${data.id} joined the room`,
      });
    });

    this.socket.on('connect_error', (err) => {
      this.messages.push({
        content: err.message,
      });
    });
  }
}
