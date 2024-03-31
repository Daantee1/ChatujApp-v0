import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8081/api/users'

  loggedIn = new BehaviorSubject(false);
  currentUser = new BehaviorSubject([]);

  constructor(private http: HttpClient) {
    
   }

  login(email: any, password: any){
    return this.http.get(`${this.apiUrl}/login/${email}/${password}`)
  }
  getCurrentUser(){
    return this.currentUser.asObservable();
  }

  
}
