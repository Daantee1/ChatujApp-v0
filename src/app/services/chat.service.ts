import { Injectable, OnInit } from '@angular/core';
import { Socket, io } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class ChatService implements OnInit {
  private socket!: Socket;
  private url = 'http://localhost:8081';
  private initialized = false;

  constructor() {}

  ngOnInit() {
    this.socket = io(this.url);
  }

  createRoom(userId: string): void {
    this.socket.emit('createRoom', { userId });
    console.log('room created');
  }

  joinRoom(data: { user: any; room: any }): void {
    this.socket.emit('join', data);
  }

  sendMessage(data: { user: any; room: string; message: string }): void {
    this.socket.emit('message', data);
  }
}
