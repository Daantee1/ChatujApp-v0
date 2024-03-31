import { Injectable } from '@angular/core';
import { Profile } from '../types/profile';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private apiUrl = 'http://localhost:8081/api/profiles'

  constructor(private http: HttpClient) { }

  addProfile(profile: Profile){;
    return this.http.post(`${this.apiUrl}/add`, profile);
    
  }
}
