import { NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MessagesComponent } from '../messages/messages.component';
import { FormsModule } from '@angular/forms';
import { ChatService } from '../../services/chat.service';
import { v4 as uuidv4 } from 'uuid';
@Component({
  selector: 'app-chatbox',
  standalone: true,
  templateUrl: './chatbox.component.html',
  styleUrl: './chatbox.component.css',
  imports: [NgClass, MessagesComponent, FormsModule],
})
export class ChatboxComponent {
  searchPerson: boolean = false;
  searchPersonEffect: boolean = false;
  isloggedIn: boolean = false;
  currentUser: any;
  message: string = '';
  messages: string[] = [];
  

  constructor(private router: Router, private auth: AuthService, private chatService: ChatService) {
    this.auth.loggedIn.subscribe((value: any) => {
      this.isloggedIn = value;
    });
    this.currentUser = this.auth.currentUser
    
    console.log('Current user:', this.currentUser);
  }
 

  sendMessage(){
    if (this.isloggedIn) {
      this.messages.push(this.message);
      this.message = ''; 
    } else {
      this.router.navigate(['/login-page']); 
    }
  }

  isLoggedIn() {
    if (!this.isloggedIn) {
      this.router.navigate(['/login-page']);
      return false;
    } else {
      this.chatService.createRoom(this.currentUser.id);
      return true;
      
    }
  }

  searchingPerson() {
    this.searchPersonEffect = true;
    setTimeout(() => {
      this.searchPersonEffect = false;
      this.searchPerson = true;
    }, 3000);
  }
}
