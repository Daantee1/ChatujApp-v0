import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { User } from '../../types/user';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [RouterModule, FormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {

  user: User = {
    email: '',
    username: '',
    password: ''
  }
  emailOrPasswordIncorrect: boolean = false;

  constructor(private auth: AuthService, private router: Router) { }

  login() {
    this.auth.login(this.user.email, this.user.password).subscribe((response: any) => {
      if(response.status === false){
        this.emailOrPasswordIncorrect = true;
      }else{
         this.auth.currentUser = response.result 
        this.auth.loggedIn.next(true);
        this.router.navigate(['/home']);
      }
      
    })
  }

}
