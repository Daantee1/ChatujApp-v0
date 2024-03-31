import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css'
})
export class MessagesComponent implements OnInit, OnDestroy{
  @Input() messages: string[] = [];
  messagesFromOtherUsers: string[] = [];
 
  currentUser: any;

  constructor(private chatService: ChatService, private auth: AuthService) {
  
  }

  ngOnInit(): void {
   
  }
  ngOnDestroy(): void {
    
  }
  

  
}
