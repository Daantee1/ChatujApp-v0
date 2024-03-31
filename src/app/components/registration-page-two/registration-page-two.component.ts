import { AfterViewInit, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Profile } from '../../types/profile';
import { ProfileService } from '../../services/profile.service';
import { UserService } from '../../services/user.service';
import { concatMap, delay } from 'rxjs';
import { User } from '../../types/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration-page-two',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './registration-page-two.component.html',
  styleUrl: './registration-page-two.component.css',
})
export class RegistrationPageTwoComponent implements AfterViewInit{
  hobbies: string[] = [];
  hobby: string = '';
  currentUser: User[] = []

  profile: Profile = {
    gender: '',
    province: '',
    hobbies: this.hobbies,
    userId: 0,
  };

  constructor(
    private profileService: ProfileService,
    private userService: UserService,
    private router: Router
  ) {
   
  }
  ngAfterViewInit(): void {
   
  }

  addUserDetails() {
    this.userService.register(this.userService.userData[0]).pipe(
      concatMap((response: any) => {
        console.log('Full response:', response);
        return this.userService.getUser();
      })
    ).subscribe((response: any) => {
      const data = response;
      const user = data.result.find((user: User) => user.email === this.userService.userData[0].email);
      if (user) {
        this.profile.userId = user.id;
        console.log('User id', this.profile.userId);
        console.log('Profile', user.id);
        this.profileService.addProfile(this.profile).subscribe((response: any) => {
          console.log('Profile added', response);
          this.router.navigate(['/login-page']);
        });

      } else {
        console.log('User not found');
      }
    });
  }

  addHobbies() {
    if (this.hobbies.length < 5) {
      this.hobbies.push(this.hobby);
      this.hobby = '';
    } else {
    }
  }
  deleteHobby(hobby: string) {
    this.hobbies = this.hobbies.filter((h) => h !== hobby);
  }
}
