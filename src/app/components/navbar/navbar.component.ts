import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  loggedIn: boolean = false;

  constructor(private auth: AuthService) {
    this.auth.loggedIn.subscribe((value: any) => {
      this.loggedIn = value;
    })
   }
   logOut(){
     this.auth.loggedIn.next(false);
   }
}
