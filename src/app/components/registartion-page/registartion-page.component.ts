import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { User } from '../../types/user';
import { UserService } from '../../services/user.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-registartion-page',
  standalone: true,
  imports: [RouterModule, FormsModule],
  templateUrl: './registartion-page.component.html',
  styleUrl: './registartion-page.component.css'
})
export class RegistartionPageComponent {


  user: User = {
    email: '',
    username: '',
    password: '',
    passwordC: ''

  }
  passwordDoNotMatch: boolean = false;
  emailExists: boolean = false;
  usernameExists: boolean = false;

  constructor(private router: Router, private userService: UserService){}

  isPasswordMatch(){
    if(this.user.password === this.user.passwordC){
      return true;
    }
    else{
      this.passwordDoNotMatch= true;
      return false;
      
    }
  }

  register(){
    this.userService.checkEmail(this.user.email).subscribe((response: any) => {
      if(response.status === true){

        this.userService.checkUsername(this.user.username).subscribe((response: any) => {
          if(response.status === true){
            this.userService.addUser(this.user);
            this.router.navigate(['/registration-page-two']);
          }
          else{
            console.log('Username already exists');
            this.usernameExists = true;
          }
        })
      }
      else{
        console.log('Email already exists');
        this.emailExists = true;
        
      }
    });
  }

}
