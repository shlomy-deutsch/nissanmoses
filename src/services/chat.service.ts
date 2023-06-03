import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  public socket: Socket |any;

  public connect(): void {
    this.socket = io('https://mispara.herokuapp.com/');
  }

  public disconnect(): void {
    this.socket?.disconnect();
  }

  public send(obj: any): void {
    if (this.socket && this.socket.connected) {

      this.socket.emit('msg-from-client', obj);
    }
  }
}
