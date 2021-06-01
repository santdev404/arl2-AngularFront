import { Component, OnInit } from '@angular/core';
import {User} from '../../models/user';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UserService]
})
export class RegisterComponent implements OnInit {
  public page_title: string;
  public user: User;
  public status: string;

  constructor(
    private _userService: UserService
  ) { 
    this.page_title = "Register";
    this.user = new User(1, '', '', 'ROLE_USER', '', '', '', '');
    this.status = "";
  }

  ngOnInit(): void {
    console.log('Register uploaded');
    console.log(this._userService.test());
  }

  onSubmit(form:any){
    
    this._userService.register(this.user).subscribe(
      response => {
        if(response.status == "success"){
          this.status = response.status;
          form.reset();
        }else{
          this.status = "error";
        }
        
      },
      error => {
        this.status = 'error';
        console.log(<any>error);
      }
    );
    
    
  }

}
