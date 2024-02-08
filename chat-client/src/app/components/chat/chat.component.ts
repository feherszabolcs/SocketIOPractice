import { Component, OnInit } from '@angular/core';
import { Message } from '../../models/message.model';
import { io } from 'socket.io-client';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css',
})
export class ChatComponent implements OnInit {
  title = 'chat-client';
  roomInput!: string;
  messageInput!: string;

  constructor(public chatService: ChatService) {}

  sendMessage() {
    if (!this.messageInput?.trim()) return;

    this.chatService.sendMessage(this.assembleMessageData());
    this.messageInput = '';
  }

  joinRoom() {
    if (!this.roomInput?.trim()) return;
    this.chatService.joinRoom(this.roomInput);
  }

  ngOnInit() {
    this.chatService.init();
  }

  private assembleMessageData(): Message {
    return {
      content: this.messageInput,
      room: this.roomInput?.trim() || undefined,
    } as Message;
  }
}
