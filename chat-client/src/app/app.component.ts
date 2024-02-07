import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { io } from 'socket.io-client';
import { Message } from '../models/message.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  socket = io('ws://localhost:3000');

  title = 'chat-client';
  messages: Message[] = [];

  roomInput!: string;
  messageInput!: string;

  sendMessage() {
    if (!this.messageInput?.trim()) return;

    this.messages.push({ content: this.messageInput });
    this.socket.emit('message', this.assembleMessageData());
    this.messageInput = '';
  }

  ngOnInit() {
    this.socket.on('connect', () => {
      this.messages.push({
        content: `You connected with id: ${this.socket.id}`,
      });
    });

    this.socket.on('message', (data: Message) => {
      this.messages.push(data);
    });
  }

  private assembleMessageData(): Message {
    return {
      content: this.messageInput,
    };
  }
}
